import { NextResponse } from 'next/server';
import axios from 'axios';
import tls from 'tls';
import url from 'url';
import { performance } from 'perf_hooks';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getSSLInfo(targetUrl: string): Promise<{ valid_from: string; valid_to: string; issuer: any; subject: any }> {
  return new Promise((resolve, reject) => {
    const { hostname, port } = url.parse(targetUrl);
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
  console.log(targetUrl);

  if (!targetUrl) {
    return NextResponse.json({ error: 'enter the url of the site you want to monitor' }, { status: 400 });
  }

  try {
    const start = performance.now();
    const response = await axios.get(targetUrl, {
      timeout: 10000,
      responseType: 'text',
      validateStatus: () => true,
    });
    const end = performance.now();
    const responseTime = end - start;

    const ttfb = response.headers['request-startTime'] ? parseFloat(response.headers['request-startTime']) - start : null;
    const sslInfo = await getSSLInfo(targetUrl);

    // Save website and status to the database
    // await prisma.website.upsert({
    //   where: { url: targetUrl },
    //   update: {
    //     status: response.status,
    //     responseTime: responseTime,
    //     ttfb: ttfb,
    //     sslInfo: sslInfo,
    //     error: null,
    //   },
    //   create: {
    //     url: targetUrl,
    //     status: response.status,
    //     responseTime: responseTime,
    //     ttfb: ttfb,
    //     sslInfo: sslInfo,
    //   },
    // });

    return NextResponse.json({
      siteName: targetUrl,
      status: "Up",
      statusCode: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      responseTime: `response time is ${responseTime} ms`,
      ttfb: ttfb ? `TTFB is ${ttfb} ms` : 'TTFB not available',
      sslInfo,
    });
  } catch (error) {
    // Save website status as down in the database
    // await prisma.website.upsert({
    //   where: { url: targetUrl },
    //   update: {
    //     status: 'down',
    //     error: (error as Error).message,
    //   },
    //   create: {
    //     url: targetUrl,
    //     status: 'down',
    //     error: (error as Error).message,
    //   },
    // });

    return NextResponse.json({
      status: 'down',
      error: (error as Error).message,
    }, { status: 500 });
  }
}
