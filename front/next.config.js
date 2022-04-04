/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gift.kakao.com', 'localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:first*/:second*',
        destination: `${process.env.NEXT_PUBLIC_BACK_URI}/api/:first*/:second*`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACK_URI}/api/:path*`,
      },
    ];
  },
}

//https://velog.io/@maliethy/nextjs-reverse-proxy%EB%A1%9C-cors%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0

module.exports = nextConfig
