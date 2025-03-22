---
pubDatetime: 2025-03-08T08:18:19.693Z
title: AstroPaper 5.0
slug: astro-paper-v5
featured: true
ogImage: ../../../assets/images/AstroPaper-v5.png
tags:
  - release
description: "AstroPaper v5：保持简洁外观，更新内部机制。"
---

终于，期待已久的 AstroPaper v5 来了。AstroPaper v5 保持了相同的简约和清爽外观，但在内部进行了重大更新。

![AstroPaper v5](@/assets/images/AstroPaper-v5.png)

## 目录

## 主要变更

### 升级到 Astro v5 [#455](https://github.com/satnaing/astro-paper/pull/455)

AstroPaper 现在使用 Astro v5，带来了所有新特性和改进。

### Tailwind v4

AstroPaper 已升级到 Tailwind v4，这包括了许多内部样式的变更。`tailwind.config.js` 文件已被移除，现在所有配置都位于 `src/styles/global.css` 文件中。与排版相关的样式已被提取并移至 `src/styles/typography.css`。

由于 TailwindCSS v4 的新行为，组件中 `<style>` 块内的样式已被移除并替换为内联的 Tailwind 类。

此外，整个 UI 的调色板也已更新。新的调色板现在只包含五种颜色：

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
```

### 移除 React + Fuse.js，改用 Pagefind 搜索

在之前的版本中，React.js 和 Fuse.js 被用于搜索功能和 OG 图片生成。在 AstroPaper v5 中，React.js 已被移除，改用 [Pagefind](https://pagefind.app/)，这是一个静态站点搜索工具。

搜索体验与之前的版本几乎相同，但现在由于 Pagefind 的支持，所有内容（不仅仅是标题和描述）都被索引并可搜索。

在开发模式中使用 Pagefind 的想法来自[这篇博客文章](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)。

### 更新导入别名

导入别名已从 `@directory` 更新为 `@/directory`，这意味着你现在需要这样导入：

```astro
---
import { slugifyStr } from "@/utils/slugify";
import IconHash from "@/assets/icons/IconHash.svg";
---
```

### 迁移到 `pnpm`

AstroPaper 已从 `npm` 切换到 `pnpm`，它提供了更快和更高效的包管理。

### 用 Astro 的 Svg 组件替换图标/svg

AstroPaper v5 使用 Astro 的实验性 [SVG 组件](https://docs.astro.build/en/reference/experimental-flags/svg/) 替换了内联 SVG。这个更新减少了在 `socialIcons` 对象中预定义 SVG 代码的需求，使代码库更清晰和易于维护。

### 分离常量和配置

项目结构已重新组织。`src/config.ts` 文件现在只包含 `SITE` 对象，它保存了项目的主要配置。所有常量，如 `LOCALE`、`SOCIALS` 和 `SHARE_LINKS`，都已移至 `src/constants.ts` 文件。

## 其他值得注意的变更

- 博客文章目录已从 `src/content/blog/` 更新为 `src/data/blog/`。
- 集合定义文件（`src/content/config.ts`）现在被替换为 `src/content.config.ts`。
- 各种依赖已升级以提高性能和安全性。
- 移除了 `IBM Plex Mono` 字体，改用默认系统等宽字体。
- `返回` 按钮逻辑已更新。现在，AstroPaper v5 使用浏览器会话来临时存储返回 URL，而不是触发浏览器的历史 API。如果会话中不存在返回 URL，它将重定向到主页。
- 还有一些小的样式和布局变更。

## 结语

AstroPaper v5 带来了许多变更，但核心体验保持不变。在保持 AstroPaper 以简洁和极简设计著称的同时，享受更流畅、更高效的博客平台！

欢迎探索这些变更并分享你的想法。一如既往，感谢你的支持！

如果你喜欢这个主题，请考虑给仓库点个星。你也可以通过 GitHub Sponsors 支持我，或者给我买杯咖啡。当然，这些行为完全是可选的，不是必需的。

尽情享用！

[Sat Naing](https://satnaing.dev/)
