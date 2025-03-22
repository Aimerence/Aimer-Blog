---
author: Sat Naing
pubDatetime: 2023-09-25T10:25:54.547Z
title: AstroPaper 3.0
slug: astro-paper-v3
featured: false
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - release
description: "AstroPaper 版本 3：通过 Astro v3 和无缝视图过渡提升您的网络体验"
---

我们很高兴宣布 AstroPaper v3 的发布，它包含了新功能、增强功能和错误修复，以提升您的 Web 开发体验。让我们来看看这个版本的亮点：

![AstroPaper v3](@/assets/images/AstroPaper-v3.png)

## 目录

## 功能和变更

### Astro v3 集成

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/18fdb604-1ca3-41a0-8372-1367759091ff" type="video/mp4">
  <!-- <source src="/assets/docs/astro-paper-v3-view-transitions-demo.mp4" type="video/mp4"> -->
</video>

AstroPaper 现在完全支持 [Astro v3](https://astro.build/blog/astro-3/)，提供更好的性能和渲染速度。

此外，我们添加了对 Astro 的 [ViewTransitions API](https://docs.astro.build/en/guides/view-transitions/) 的支持，让您能够创建引人注目和动态的视图过渡。

在"最近文章"部分，只会显示非特色文章，以避免重复并更好地支持 ViewTransitions API。

### 更新 OG 图片生成逻辑

![示例 OG 图片](https://user-images.githubusercontent.com/40914272/269252964-a0dc6735-80f7-41ed-8e74-4d4d70f96891.png)

我们更新了自动 OG 图片生成的逻辑，使其更加可靠和高效。此外，它现在支持文章标题中的特殊字符，确保准确、灵活和吸引眼球的社交媒体预览。

`SITE.ogImage` 现在是可选的。如果未指定，AstroPaper 将使用 `SITE.title`、`SITE.desc` 和 `SITE.website` 自动生成 OG 图片。

### 主题元标签

添加了主题颜色元标签，可以动态适应主题切换，确保无缝的用户体验。

> 注意顶部的区别

**_AstroPaper v2 主题切换_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/3ab5a1e8-1891-4264-a5bb-0ded69143c1a" type="video/mp4">
</video>

**_AstroPaper v3 主题切换_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/8ac9deb8-d1f8-4029-86bd-6aa0def380b4" type="video/mp4">
</video>

## 其他变更

### Astro Prettier 插件

内置安装了 Astro Prettier 插件，以保持项目整洁和有组织。

### 次要样式变更

解决了单行代码块换行的问题，使您的代码片段看起来更加整洁。

更新了导航样式 CSS，以允许在导航中添加更多导航链接。

## 升级到 AstroPaper v3

> 本节仅适用于那些想从旧版本升级到 AstroPaper v3 的用户。

本节将帮助您从 AstroPaper v2 迁移到 AstroPaper v3。

在阅读本节的其余部分之前，您可能还想查看[这篇文章](https://astro-paper.pages.dev/posts/how-to-update-dependencies/)，了解如何升级依赖项和 AstroPaper。

## 选项 1：全新重启（推荐）

在此版本中，进行了许多更改：替换旧的 Astro API 为新的 API、错误修复、新功能等。因此，如果您是一个没有进行太多自定义的用户，您应该遵循这种方法。

**_步骤 1：保留所有已更新的文件_**

保留所有已经更新的文件很重要。这些文件包括：

- `/src/config.ts`（在 v3 中未触及）
- `/src/styles/base.css`（在 v3 中有少量更改；如下所述）
- `/src/assets/`（在 v3 中未触及）
- `/public/assets/`（在 v3 中未触及）
- `/content/blog/`（这是您的博客内容目录 🤷🏻‍♂️）
- 您进行的任何其他自定义更改。

```css
/* 文件：/src/styles/base.css */
@layer base {
  /* 其他代码 */
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-skin-card-muted;
  }

  /* 旧代码
  code {
    white-space: pre;
    overflow: scroll;
  } 
  */

  /* 新代码 */
  code,
  blockquote {
    word-wrap: break-word;
  }
  pre > code {
    white-space: pre;
  }
}

@layer components {
  /* 其他代码 */
}
```

**_步骤 2：用 AstroPaper v3 替换其他所有内容_**

在此步骤中，除了上述文件/目录（加上您自定义的文件/目录）之外，用 AstroPaper v3 替换所有内容。

**_步骤 3：模式更新_**

请记住，`/src/content/_schemas.ts` 已被替换为 `/src/content/config.ts`。

此外，`/src/content/config.ts` 不再导出 `BlogFrontmatter` 类型。

因此，需要将文件中的所有 `BlogFrontmatter` 类型更新为 `CollectionEntry<"blog">["data"]`。

例如：`src/components/Card.tsx`

```ts
// AstroPaper v2
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}
```

```ts
// AstroPaper v3
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}
```

## 选项 2：使用 Git 升级

不建议大多数用户使用这种方法。如果可以的话，您应该执行"选项 1"。只有在您知道如何解决合并冲突并且知道自己在做什么的情况下才这样做。

实际上，我已经为这种情况写了一篇博客文章，您可以在[这里](https://astro-paper.pages.dev/posts/how-to-update-dependencies/#updating-astropaper-using-git)查看。

## 结语

准备好探索 AstroPaper v3 中令人兴奋的新功能和改进了吗？立即开始[使用 AstroPaper](https://github.com/satnaing/astro-paper)。

有关其他错误修复和集成更新，请查看[发布说明](https://github.com/satnaing/astro-paper/releases/tag/v3.0.0)了解更多信息。

如果您在升级过程中遇到任何错误或困难，请随时在 [GitHub](https://github.com/satnaing/astro-paper) 上提出问题或开始讨论。
