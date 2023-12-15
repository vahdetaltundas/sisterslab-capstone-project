/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig
module.exports = {
  async headers() {
    return [
      {
        source: "/api/products", // API endpoint'inizin yolu
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://vahdetaltundas-e-commerce-project.vercel.app",
          },
        ],
      },
      // Diğer API endpoint'leri için benzer ayarları ekleyebilirsiniz
    ];
  },
};
