/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/recipes',
        destination: '/api/recipes',
        permanent: true,
      },
      {
        source: '/recipes/:id',
        destination: '/api/recipes/:id',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
