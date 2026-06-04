/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  // Static export so the app can be hosted on GitHub Pages.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Served at https://<user>.github.io/rehabos/ on GitHub Pages.
  basePath: isPages ? "/rehabos" : "",
};

export default nextConfig;
