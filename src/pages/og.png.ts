import type { APIRoute } from "astro";
import sharp from "sharp";
import config from "@/config";

export const GET: APIRoute = async () => {
  // 创建一个简单的OG图片，不使用字体API
  const escapedSiteTitle = config.site.title
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const escapedSiteDescription = config.site.description
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const escapedHostname = new URL(config.site.url).hostname
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#fefbfb"/>
    <rect x="40" y="40" width="1120" height="550" rx="8" fill="#ecebeb" stroke="#000" stroke-width="4"/>
    <rect x="20" y="20" width="1120" height="550" rx="8" fill="#fefbfb" stroke="#000" stroke-width="4"/>
    <text x="600" y="300" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#000">${escapedSiteTitle}</text>
    <text x="600" y="380" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="#333">${escapedSiteDescription}</text>
    <text x="1100" y="610" font-family="Arial, sans-serif" font-size="28" font-weight="bold" text-anchor="end" fill="#000">${escapedHostname}</text>
  </svg>`;

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
