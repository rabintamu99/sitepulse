// app/api/monitor/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import tls from 'tls';
import url from 'url';
import { performance } from 'perf_hooks';

async function getSSLInfo(targetUrl: string) {
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

    const ttfb = response.headers['request-startTime'] ? response.headers['request-startTime'] - start : null;
    const sslInfo = await getSSLInfo(targetUrl);

    return NextResponse.json({
      status: "your site is up",
      statusCode: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      responseTime: `response time is ${responseTime} ms`,
      ttfb: ttfb ? `TTFB is ${ttfb} ms` : 'TTFB not available',
      sslInfo,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'down',
      error: (error as Error).message,
    }, { status: 500 });
  }
}