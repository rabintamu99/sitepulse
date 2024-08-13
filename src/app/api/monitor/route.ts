import { NextResponse } from 'next/server';
import axios from 'axios';
import tls from 'tls';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

async function getSSLInfo(targetUrl: string): Promise<{ valid_from: string; valid_to: string; issuer: any; subject: any }> {
  return new Promise((resolve, reject) => {
    const { hostname, port } = new URL(targetUrl);
    const options = {
      host: hostname || "",
      port: port ? parseInt(port, 10) : 443,
      servername: hostname || "",
    };

    const socket = tls.connect(options, () => {
      const cert = socket.getPeerCertificate();
      resolve({
        valid_from: cert.valid_from,
        valid_to: cert.valid_to,
        issuer: cert.issuer,
        subject: cert.subject,
      });
      socket.end();
    });

    socket.on('error', (err) => {
      reject(err);
    });
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');
  const userId = searchParams.get('userId');
  const checkInterval = searchParams.get('checkInterval');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Enter the URL of the site you want to monitor' }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
  }

  // Check if userId exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    const start = performance.now();
    const response = await axios.get(targetUrl, {
      timeout: 10000,
      responseType: 'text',
      validateStatus: () => true,
    });
    const end = performance.now();
    const responseTime = Math.ceil(end - start);

    const ttfb = response.headers['request-startTime'] ? parseFloat(response.headers['request-startTime']) - start : null;
    const sslInfo = await getSSLInfo(targetUrl);

    // Upsert website and get the website ID
    const website = await prisma.website.upsert({
      where: { url: targetUrl },
      update: {
        status: response.status,
        responseTime: responseTime,
        ttfb: ttfb,
        sslInfo: sslInfo,
        error: null,
        uptime: 100, // Added this line
        checkInterval
      },
      create: {
        url: targetUrl,
        status: response.status,
        responseTime: responseTime,
        ttfb: ttfb,
        sslInfo: sslInfo,
        userId: userId,
        checkInterval,
        uptime: 100,
      },
    });

    // Save metrics to the Metric table
    await prisma.metric.create({
      data: {
        websiteId: website.id,
        status: response.status,
        responseTime: responseTime,
      },
    });

    return NextResponse.json({
      siteName: targetUrl,
      status: "Up",
      statusCode: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      responseTime: Math.ceil(responseTime),
      ttfb: ttfb ? `TTFB is ${ttfb} ms` : 'TTFB not available',
      sslInfo,
    });
  } catch (error) {
    // Upsert website status as down in the database
    const website = await prisma.website.upsert({
      where: { url: targetUrl },
      update: {
        status: 500,
        error: (error as Error).message,
        uptime: 0,
      },
      create: {
        url: targetUrl,
        status: 500,
        responseTime: 0,
        ttfb: null,
        sslInfo: '',
        error: (error as Error).message,
        userId: userId,
        uptime: 0,
      },
    });

    // Save metrics to the Metric table
    await prisma.metric.create({
      data: {
        websiteId: website.id,
        status: 500,
        responseTime: 0,
      },
    });

    return NextResponse.json({
      status: 'down',
      error: (error as Error).message,
    }, { status: 500 });
  }
}


export async function checkWebsiteStatus() {
  console.log('Checking website status...');

  // Fetch all websites from the database
  const websites = await prisma.website.findMany();

  console.log(`Found ${websites.length} websites to check.`);

  for (const website of websites) {
    console.log(`Checking website: ${website.url}`);
    try {
      const start = performance.now();
      const response = await axios.get(website.url, {
        timeout: 10000,
        responseType: 'text',
        validateStatus: () => true,
      });
      const end = performance.now();
      const responseTime = Math.ceil(end - start);

      const ttfb = response.headers['request-startTime'] ? parseFloat(response.headers['request-startTime']) - start : null;
      const sslInfo = await getSSLInfo(website.url);

      // Update website status in the database
      const updatedWebsite = await prisma.website.update({
        where: { id: website.id },
        data: {
          status: response.status,
          responseTime: responseTime,
          ttfb: ttfb,
          sslInfo: sslInfo,
          error: null,
          uptime: 100, 
          checkInterval: '',
        },
      });

      console.log(`Updated website: ${updatedWebsite.url}, Status: ${updatedWebsite.status}, Response Time: ${updatedWebsite.responseTime}ms`);

      // Save metrics to the Metric table
      const newMetric = await prisma.metric.create({
        data: {
          websiteId: website.id,
          status: response.status,
          responseTime: responseTime,
        },
      });

      console.log(`Saved metric for website: ${website.url}, Status: ${newMetric.status}, Response Time: ${newMetric.responseTime}ms`);

    } catch (error) {
      // Update website status as down in the database
      const updatedWebsite = await prisma.website.update({
        where: { id: website.id },
        data: {
          status: 500,
          error: (error as Error).message,
          uptime: 0, // Adjust as needed
        },
      });

      console.log(`Error updating website: ${updatedWebsite.url}, Error: ${updatedWebsite.error}`);

      // Save metrics to the Metric table
      const newMetric = await prisma.metric.create({
        data: {
          websiteId: website.id,
          status: 500,
          responseTime: 0,
        },
      });

      console.log(`Saved error metric for website: ${website.url}, Status: ${newMetric.status}`);
    }
  }
}

// Ensure the cron job is only scheduled once in a server environment
if (typeof process.env.CRON_JOB !== 'boolean') {
  process.env.CRON_JOB = 'true';
  cron.schedule('*/5 * * * *', checkWebsiteStatus);
}