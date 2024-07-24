// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import tls from 'tls';
// import url from 'url';
// import { auth } from '@/auth';
// import { performance } from 'perf_hooks';
// import { PrismaClient } from '@prisma/client';
// import fetch from 'node-fetch';
// import cron from 'node-cron';
// import { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// async function getSSLInfo(targetUrl: string): Promise<{ valid_from: string; valid_to: string; issuer: any; subject: any }> {
//   return new Promise((resolve, reject) => {
//     const { hostname, port } = url.parse(targetUrl);
//     const options = {
//       host: hostname || "",
//       port: port ? parseInt(port, 10) : 443, 
//       servername: hostname || "",
//     };

//     const socket = tls.connect(options, () => {
//       const cert = socket.getPeerCertificate();
//       resolve({
//         valid_from: cert.valid_from,
//         valid_to: cert.valid_to,
//         issuer: cert.issuer,
//         subject: cert.subject,
//       });
//       socket.end();
//     });

//     socket.on('error', (err) => {
//       reject(err);
//     });
//   });
// }

// export async function GET(request: Request) {

//   console.log(request.url);
//   const { searchParams } = new URL(request.url);
//   console.log(searchParams);
//   const targetUrl = searchParams.get('url');
//   const userId = searchParams.get('userId');

//   if (!targetUrl) {
//     return NextResponse.json({ error: 'enter the url of the site you want to monitor' }, { status: 400 });
//   }

//   if (!userId) {
//     return NextResponse.json({ error: 'userId is required' }, { status: 400 });
//   }

//   // Check if userId exists
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   if (!user) {
//     return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
//   }

//   try {
//     const start = performance.now();
//     const response = await axios.get(targetUrl, {
//       timeout: 10000,
//       responseType: 'text',
//       validateStatus: () => true,
//     });
//     const end = performance.now();
//     const responseTime = Math.ceil(end - start);

//     const ttfb = response.headers['request-startTime'] ? parseFloat(response.headers['request-startTime']) - start : null;
//     const sslInfo = await getSSLInfo(targetUrl);

//     // Save website and status to the database
//     await prisma.website.upsert({
//       where: { url: targetUrl },
//       update: {
//         status: response.status,
//         responseTime: responseTime,
//         ttfb: ttfb,
//         sslInfo: sslInfo,
//         error: null,
//       },
//       create: {
//         url: targetUrl,
//         status: response.status,
//         responseTime: responseTime,
//         ttfb: ttfb,
//         sslInfo: sslInfo,
//         userId: userId,
//       },
//     });

//     return NextResponse.json({
//       siteName: targetUrl,
//       status: "Up",
//       statusCode: response.status,
//       statusText: response.statusText,
//       headers: response.headers,
//       data: response.data,
//       responseTime: Math.ceil(responseTime),
//       ttfb: ttfb ? `TTFB is ${ttfb} ms` : 'TTFB not available',
//       sslInfo,
//     });
//   } catch (error) {
//     // Save website status as down in the database
//     await prisma.website.upsert({
//       where: { url: targetUrl },
//       update: {
//         status: 500,
//         error: (error as Error).message,
//       },
//       create: {
//         url: targetUrl,
//         status: 500,
//         responseTime: 0,
//         ttfb: null,
//         sslInfo: '',
//         error: (error as Error).message,
//         userId: userId,
//       },
//     });

//     return NextResponse.json({
//       status: 'down',
//       error: (error as Error).message,
//     }, { status: 500 });
//   }
// }

// async function checkWebsiteStatus() {
//   // Implement the logic to check website status here
//   console.log('Checking website status...');
//   // You can call the GET function or implement similar logic here
// }

// cron.schedule('* * * * *', checkWebsiteStatus);

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'GET') {
//     res.status(200).json(status);
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };


// pages/api/checkStatus.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import tls from 'tls';
import url from 'url';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

async function getSSLInfo(targetUrl) {
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

async function checkWebsiteStatus(targetUrl, userId) {
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

    // Save website and status to the database
    await prisma.website.upsert({
      where: { url: targetUrl },
      update: {
        status: response.status,
        responseTime: responseTime,
        ttfb: ttfb,
        sslInfo: sslInfo,
        error: null,
      },
      create: {
        url: targetUrl,
        status: response.status,
        responseTime: responseTime,
        ttfb: ttfb,
        sslInfo: sslInfo,
        userId: userId,
      },
    });

    return {
      siteName: targetUrl,
      status: "Up",
      statusCode: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      responseTime: Math.ceil(responseTime),
      ttfb: ttfb ? `TTFB is ${ttfb} ms` : 'TTFB not available',
      sslInfo,
    };
  } catch (error) {
    // Save website status as down in the database
    await prisma.website.upsert({
      where: { url: targetUrl },
      update: {
        status: 500,
        error: (error).message,
      },
      create: {
        url: targetUrl,
        status: 500,
        responseTime: 0,
        ttfb: null,
        sslInfo: '',
        error: (error).message,
        userId: userId,
      },
    });

    return {
      status: 'down',
      error: (error).message,
    };
  }
}

export default async (req, res) => {
  if (req.method === 'GET') {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const targetUrl = searchParams.get('url');
    const userId = searchParams.get('userId');

    if (!targetUrl) {
      return res.status(400).json({ error: 'Enter the URL of the site you want to monitor' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const result = await checkWebsiteStatus(targetUrl, userId);
    return res.status(200).json(result);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

// Schedule the periodic check
cron.schedule('* * * * *', async () => {
  console.log('Running a task every minute');
  const websites = await prisma.website.findMany();

  for (const website of websites) {
    await checkWebsiteStatus(website.url, website.userId);
  }
});
