/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // three.js ships untranspiled ESM; let Next optimise the barrel imports.
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'nayanazimabad.com', pathname: '/wp-content/uploads/**' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Legacy slugs from the old WordPress site keep working.
      { source: '/peace-apartments', destination: '/projects/peace-apartments', permanent: true },
      { source: '/signature', destination: '/projects/signature-tower', permanent: true },
      { source: '/rahat', destination: '/projects/rahat-residency', permanent: true },
      { source: '/rahat-residency-ii', destination: '/projects/rahat-residency-ii', permanent: true },
      { source: '/apartments', destination: '/projects/globe-residency', permanent: true },
      { source: '/grace-tower', destination: '/projects/grace-tower', permanent: true },
    ];
  },
};

export default nextConfig;
