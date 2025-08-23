import { NextResponse } from 'next/server';

export function GET() {
  const robots = `
User-agent: *
Allow: /

Sitemap: https://modatepe.com/sitemap.xml
  `.trim();

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}