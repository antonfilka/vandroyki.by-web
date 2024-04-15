/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "t.me",
        port: "",
      },
      {
        protocol: "https",
        hostname: "vandroykidev.storage.yandexcloud.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
