export { default } from "next/server";

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth/login|.*\\.(png|jpg|jpeg|gif|webp|svg)).*)',
    '/partner/:path*'
  ],
};
