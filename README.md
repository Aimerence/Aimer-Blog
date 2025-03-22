# AstroPaper 📄

![AstroPaper](public/astropaper-og.jpg)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/community/file/1356898632249991861)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/satnaing/astro-paper?color=%232F3741&style=for-the-badge)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white&style=for-the-badge)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)](http://commitizen.github.io/cz-cli/)

AstroPaper 是一个极简、响应式、无障碍访问且对 SEO 友好的 Astro 博客主题。这个主题是基于[我的个人博客](https://satnaing.dev/blog)设计和制作的。

查看[博客文章](https://astro-paper.pages.dev/posts/)或阅读[README 文档部分](#-文档)了解更多信息。

## 🔥 主要特性

- [x] 类型安全的 markdown
- [x] 超快的性能
- [x] 无障碍访问（键盘/屏幕阅读器）
- [x] 响应式设计（适配手机到桌面）
- [x] SEO 友好
- [x] 明暗主题模式
- [x] 模糊搜索
- [x] 草稿文章和分页
- [x] 站点地图和 RSS 订阅
- [x] 遵循最佳实践
- [x] 高度可定制
- [x] 博客文章动态 OG 图片生成 [#15](https://github.com/satnaing/astro-paper/pull/15) ([博客文章](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/))

_注：我已经使用 Mac 上的 **VoiceOver** 和 Android 上的 **TalkBack** 测试了 AstroPaper 的屏幕阅读器可访问性。虽然我无法测试所有其他屏幕阅读器，但 AstroPaper 的无障碍增强功能应该在其他设备上也能正常工作。_

## ✅ Lighthouse 评分

<p align="center">
  <a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fastro-paper.pages.dev%2F&form_factor=desktop">
    <img width="710" alt="AstroPaper Lighthouse Score" src="AstroPaper-lighthouse-score.svg">
  <a>
</p>

## 🚀 项目结构

在 AstroPaper 中，你会看到以下文件夹和文件：

```bash
/
├── public/
│   ├── assets/
|   ├── pagefind/ # 构建时自动生成
│   └── favicon.svg
│   └── astropaper-og.jpg
│   └── favicon.svg
│   └── toggle-theme.js
├── src/
│   ├── assets/
│   │   └── icons/
│   │   └── images/
│   ├── components/
│   ├── data/
│   │   └── blog/
│   │       └── some-blog-posts.md
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── constants.ts
│   └── content.config.ts
└── astro.config.ts
```

Astro 会在 `src/pages/` 目录中查找 `.astro` 或 `.md` 文件。每个页面都会根据其文件名暴露为一个路由。

任何静态资源（如图片）都可以放在 `public/` 目录中。

所有博客文章都存储在 `src/data/blog` 目录中。

## 📖 文档

文档可以通过两种格式阅读：_markdown_ 和 _博客文章_。

- 配置 - [markdown](src/data/blog/how-to-configure-astropaper-theme.md) | [博客文章](https://astro-paper.pages.dev/posts/how-to-configure-astropaper-theme/)
- 添加文章 - [markdown](src/data/blog/adding-new-post.md) | [博客文章](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/)
- 自定义配色方案 - [markdown](src/data/blog/customizing-astropaper-theme-color-schemes.md) | [博客文章](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)
- 预定义配色方案 - [markdown](src/data/blog/predefined-color-schemes.md) | [博客文章](https://astro-paper.pages.dev/posts/predefined-color-schemes/)

## 💻 技术栈

**主框架** - [Astro](https://astro.build/)  
**类型检查** - [TypeScript](https://www.typescriptlang.org/)  
**样式** - [TailwindCSS](https://tailwindcss.com/)  
**UI/UX** - [Figma 设计文件](https://www.figma.com/community/file/1356898632249991861)  
**静态搜索** - [FuseJS](https://pagefind.app/)  
**图标** - [Tablers](https://tabler-icons.io/)  
**代码格式化** - [Prettier](https://prettier.io/)  
**部署** - [Cloudflare Pages](https://pages.cloudflare.com/)  
**关于页面插图** - [https://freesvgillustration.com](https://freesvgillustration.com/)  
**代码检查** - [ESLint](https://eslint.org)

## 👨🏻‍💻 本地运行

你可以通过在所需目录中运行以下命令来开始使用此项目：

```bash
# pnpm
pnpm create astro@latest --template satnaing/astro-paper

# npm
npm create astro@latest -- --template satnaing/astro-paper

# yarn
yarn create astro --template satnaing/astro-paper
```

然后通过运行以下命令启动项目：

```bash
# 如果你在前面的步骤中还没有安装依赖，请先安装依赖
pnpm install

# 开始运行项目
pnpm run dev
```

作为替代方案，如果你已安装 Docker，可以使用 Docker 在本地运行此项目：

```bash
# 构建 Docker 镜像
docker build -t astropaper .

# 运行 Docker 容器
docker run -p 4321:80 astropaper
```

## Google 站点验证（可选）

你可以使用环境变量轻松添加 [Google 站点验证 HTML 标签](https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag)。这一步是可选的。如果你不添加以下环境变量，google-site-verification 标签将不会出现在 HTML 的 `<head>` 部分。

```bash
# 在你的环境变量文件中 (.env)
PUBLIC_GOOGLE_SITE_VERIFICATION=你的-google-站点验证-值
```

## 🧞 命令

所有命令都从项目根目录的终端运行：

> **_注意！_** 对于 `Docker` 命令，我们必须在机器上[安装](https://docs.docker.com/engine/install/) Docker。

| 命令 | 功能 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm run dev` | 在 `localhost:4321` 启动本地开发服务器 |
| `pnpm run build` | 将你的生产站点构建到 `./dist/` |
| `pnpm run preview` | 在部署之前本地预览你的构建 |
| `pnpm run format:check` | 使用 Prettier 检查代码格式 |
| `pnpm run format` | 使用 Prettier 格式化代码 |
| `pnpm run sync` | 为所有 Astro 模块生成 TypeScript 类型 |
| `pnpm run lint` | 使用 ESLint 检查代码 |
| `docker compose up -d` | 在 Docker 上运行 AstroPaper |
| `docker compose run app npm install` | 在 Docker 容器中运行任何上述命令 |
| `docker build -t astropaper .` | 构建 AstroPaper 的 Docker 镜像 |
| `docker run -p 4321:80 astropaper` | 在 Docker 上运行 AstroPaper |

> **_警告！_** Windows PowerShell 用户如果想在开发期间[运行诊断](https://docs.astro.build/en/reference/cli-reference/#astro-check)（`astro check --watch & astro dev`），可能需要安装 [concurrently 包](https://www.npmjs.com/package/concurrently)。更多信息，请参见[此问题](https://github.com/satnaing/astro-paper/issues/113)。

## ✨ 反馈和建议

如果你有任何建议/反馈，可以通过[我的邮箱](mailto:contact@satnaing.dev)联系我。或者，如果你发现了 bug 或想请求新功能，随时可以开一个 issue。

## 📜 许可证

基于 MIT 许可证，版权所有 © 2025

---

由 [Sat Naing](https://satnaing.dev) 👨🏻‍💻 和[贡献者们](https://github.com/satnaing/astro-paper/graphs/contributors)用 🤍 制作。

# Aimer Blog

Test deploy on main branch.
