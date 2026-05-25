import { NextResponse, type NextRequest } from 'next/server';

import { SESSION_COOKIE, sessionCodec } from '@/lib/session';

// Next.js 16 "proxy" convention (formerly "middleware"). Protects routes by
// verifying the signed session cookie; unauthenticated requests are redirected
// home. The matcher keeps this off public routes.
export async function proxy(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await sessionCodec.unseal(token) : null;

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*'],
};
