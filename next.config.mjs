const isDev = process.env.NODE_ENV === 'development';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' https://www.paypal.com https://cdn.jsdelivr.net 'unsafe-inline' 'unsafe-eval';
  style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com ${isDev ? "'unsafe-inline'" : ''};
  style-src-elem 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com ${isDev ? "'unsafe-inline'" : ''};
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
  img-src 'self' data: https:;
  connect-src 'self' https://www.paypal.com https://www.sandbox.paypal.com;
  frame-src 'self' https://www.paypal.com https://www.sandbox.paypal.com;
`;

const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
