---
author: Sat Naing
pubDatetime: 2022-09-23T04:58:53Z
modDatetime: 2025-03-20T03:15:57.792Z
title: 如何配置 AstroPaper 主题
slug: how-to-configure-astropaper-theme
featured: true
draft: false
tags:
  - configuration
  - docs
description: 如何让 AstroPaper 主题完全符合你的个性。
---

AstroPaper 是一个高度可定制的 Astro 博客主题。使用 AstroPaper，你可以根据个人喜好定制所有内容。本文将解释如何在配置文件中轻松进行一些自定义设置。

## 目录

## 配置 SITE

重要的配置位于 `src/config.ts` 文件中。在该文件中，你会看到 `SITE` 对象，你可以在其中指定网站的主要配置。

在开发过程中，可以将 `SITE.website` 留空。但在生产模式下，你应该在 `SITE.website` 选项中指定你的部署 URL，因为这将用于规范 URL、社交卡片 URL 等，这些对 SEO 很重要。

```js
// 文件：src/config.ts
export const SITE = {
  website: "https://astro-paper.pages.dev/", // 替换为你的部署域名
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "一个极简、响应式且对 SEO 友好的 Astro 博客主题。",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 分钟
  showArchives: true,
  showBackButton: true, // 在文章详情页显示返回按钮
  editPost: {
    enabled: true,
    text: "建议修改",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true, // 启用自动动态 og-image 生成
} as const;
```

以下是 SITE 配置选项

| 选项                  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `website`             | 你的已部署网站 URL                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `author`              | 你的名字                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `profile`             | 你的个人/作品集网站 URL，用于更好的 SEO。如果你没有，请设置为 `null` 或空字符串 `""`。                                                                                                                                                                                                                                                                                                                                            |
| `desc`                | 你的网站描述。对 SEO 和社交媒体分享有用。                                                                                                                                                                                                                                                                                                                                                                                          |
| `title`               | 你的网站名称                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ogImage`             | 网站的默认 OG 图片。对社交媒体分享有用。OG 图片可以是外部图片 URL，也可以放在 `/public` 目录下。                                                                                                                                                                                                                                                                                                                                  |
| `lightAndDarkMode`    | 启用或禁用网站的`明暗模式`。如果禁用，将使用主要配色方案。此选项默认启用。                                                                                                                                                                                                                                                                                                                                                        |
| `postPerIndex`        | 在首页`最近`部分显示的文章数量。                                                                                                                                                                                                                                                                                                                                                                                                   |
| `postPerPage`         | 你可以指定每个文章页面显示多少篇文章。（例如：如果你将 `SITE.postPerPage` 设置为 3，每页将只显示 3 篇文章）                                                                                                                                                                                                                                                                                                                       |
| `scheduledPostMargin` | 在生产模式下，具有未来 `pubDatetime` 的文章将不可见。但是，如果文章的 `pubDatetime` 在未来 15 分钟内，它将可见。如果你不喜欢默认的 15 分钟边界，可以设置 `scheduledPostMargin`。                                                                                                                                                                                                                                                  |
| `showArchives`        | 决定是否在网站上显示`归档`菜单（位于`关于`和`搜索`菜单之间）及其对应页面。此选项默认设置为 `true`。                                                                                                                                                                                                                                                                                                                              |
| `showBackButton`      | 决定是否在每篇博客文章中显示`返回`按钮。                                                                                                                                                                                                                                                                                                                                                                                           |
| `editPost`            | 此选项允许用户通过在博客文章标题下提供编辑链接来建议更改。可以通过将 `SITE.editPost.enabled` 设置为 `false` 来禁用此功能。                                                                                                                                                                                                                                                                                                         |
| `dynamicOgImage`      | 此选项控制在博客文章前置元数据中未指定 `ogImage` 时是否[生成动态 og-image](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/)。如果你有很多博客文章，你可能想要禁用此功能。查看[权衡](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/#trade-off)了解更多详情。                                                                                        |

## 配置区域设置

你可以配置用于构建的默认区域设置（例如，文章页面中的日期格式），以及用于浏览器渲染的区域设置（例如，搜索页面中的日期格式）。你可以在 `src/constants.ts` 文件中更新区域设置。

```js
// 文件：src/constants.ts
export const LOCALE = {
  lang: "en", // html lang 代码。将此设置为空，默认将为 "en"
  langTag: ["en-EN"], // BCP 47 语言标签。将此设置为空 [] 以使用环境默认值
} as const;
```

`LOCALE.lang` 将用作 HTML ISO 语言代码，如 `<html lang="en">`。如果你不指定此项，默认将设置为 `en`。
`LOCALE.langTag` 用作[日期时间区域设置](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#locales)。对于此项，你可以指定一个区域设置数组作为备用语言。将 `LOCALE.langTag` 留空 `[]` 以在构建时和运行时使用环境默认值。

## 配置 logo 或标题

在 AstroPaper v5 之前，你可以在 `src/config.ts` 文件中的 `LOGO_IMAGE` 对象中更新你的网站名称/logo。但是，在 AstroPaper v5 中，此选项已被移除，改用 Astro 的内置 SVG 和 Image 组件。

![指向网站 logo 的箭头](https://res.cloudinary.com/noezectz/v1663911318/astro-paper/AstroPaper-logo-config_goff5l.png)

你有 3 个选项可以选择：

### 选项 1：SITE 标题文本

这是最简单的选项。你只需要在 `src/config.ts` 文件中更新 `SITE.title`。

### 选项 2：Astro 的 SVG 组件

如果你想使用 SVG logo，你可能想要使用此选项。

- 首先在 `src/assets` 目录中添加一个 SVG。（例如：`src/assets/dummy-logo.svg`）
- 然后在 `src/components/Header.astro` 中导入该 SVG

  ```astro
  ---
  // 其他导入
  import DummyLogo from "@/assets/dummy-logo.svg";
  ---
  ```

- 最后，用导入的 logo 替换 `{SITE.title}`。

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <DummyLogo class="scale-75 dark:invert" />
    <!-- {SITE.title} -->
  </a>
  ```

这种方法的最大优点是你可以根据需要自定义 SVG 样式。在上面的例子中，你可以看到如何在暗模式下反转 SVG logo 的颜色。

### 选项 3：Astro 的 Image 组件

如果你的 logo 是图片但不是 SVG，你可以使用 Astro 的 Image 组件。

- 在 `src/assets` 目录中添加你的 logo。（例如：`src/assets/dummy-logo.png`）
- 在 `src/components/Header.astro` 中导入 `Image` 和你的 logo

  ```astro
  ---
  // 其他导入
  import { Image } from "astro:assets";
  import dummyLogo from "@/assets/dummy-logo.png";
  ---
  ```

- 然后，用导入的 logo 替换 `{SITE.title}`。

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <image src="{dummyLogo}" alt="Dummy Blog" class="dark:invert" />
    <!-- {SITE.title} -->
  </a>
  ```

使用这种方法，你仍然可以使用 CSS 类调整图片的外观。但是，这可能并不总是符合你的需求。如果你需要根据明暗模式显示不同的 logo 图片，请查看 `Header.astro` 组件中如何处理明暗图标。

## 配置社交链接

你可以在 `src/constants.ts` 中的 `SOCIALS` 对象中配置社交链接。

![指向社交链接图标的箭头](https://github.com/user-attachments/assets/8b895400-d088-442f-881b-02d2443e00cf)

```ts
export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: ` ${SITE.title} on Github`,
    icon: IconGitHub,
  },
  {
    name: "X",
    href: "https://x.com/username",
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/username/",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
] as const;
```

## 配置分享链接

你可以在 `src/constants.ts` 中的 `SHARE_LINKS` 对象中配置分享链接。

![指向分享链接图标的箭头](https://github.com/user-attachments/assets/4f930b68-b625-45df-8c41-e076dd2b838e)

## 结论

这是关于如何自定义此主题的简要说明。如果你懂一些编程，你可以进行更多自定义。关于自定义样式，请阅读[这篇文章](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)。感谢阅读。✌🏻
