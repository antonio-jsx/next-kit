import { routeLog } from '@/lib/logger';
import { NextResponse } from 'next/server';

const log = routeLog('GET', '/api/health');

export function GET() {
  log.info('Health check requested');
  return NextResponse.json({ status: 'ok' });
}
