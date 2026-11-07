import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://www.521942.xyz/",
    title: "Aimer",
    description: "A simple blog.",
    author: "Aimer",
    profile: "https://github.com/Aimerence/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,  // 暂时禁用以解决satori依赖问题
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/Aimerence/aimer-blog/edit/main/",
    },
    search: "pagefind",
    toc: true,
    comments: true,  // 启用Giscus评论系统
  },
  socials: [
    { name: "github",   url: "https://github.com/Aimerence/Aimer-Blog" },
    { name: "mail",     url: "mailto:liusijia1942@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});