/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dummyjson.com/:path*',
      },
    ];
  },
};

export default nextConfig;


// user like this to redirect all endpoint in the dummy to use instead of  import one by one 
// to use in the service 
// export const productBaseUrl = '/api/products';
// export const productService = new ProductApi(productBaseUrl);
// // 