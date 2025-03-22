---
author: Sat Naing
pubDatetime: 2023-01-30T15:57:52.737Z
title: AstroPaper 2.0
slug: astro-paper-2
featured: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - release
description: 带有 Astro v2 增强功能的 AstroPaper。类型安全的 markdown 内容、错误修复和更好的开发体验等。
---

Astro 2.0 已经发布，带来了一些很酷的功能、重大变更、开发体验改进、更好的错误覆盖等。AstroPaper 利用了这些很酷的功能，特别是内容集合 API。

<!-- ![介绍 AstroPaper 2.0](https://user-images.githubusercontent.com/53733092/215683840-dc2502f5-8c5a-44f0-a26c-4e7180455056.png) -->

![介绍 AstroPaper 2.0](https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png)

## 目录

## 功能和变更

### 类型安全的前置元数据和重新定义的博客模式

感谢 Astro 的内容集合，AstroPaper 2.0 的 markdown 内容的前置元数据现在是类型安全的。博客模式在 `src/content/_schemas.ts` 文件中定义。

### 博客内容的新家

所有博客文章都从 `src/contents` 移动到 `src/content/blog` 目录。

### 新的获取 API

现在使用 `getCollection` 函数获取内容。不再需要指定内容的相对路径。

```ts
// 旧的内容获取方法
- const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",);

// 新的内容获取方法
+ const postImportResult = await getCollection("blog");
```

### 修改搜索逻辑以获得更好的搜索结果

在 AstroPaper 的旧版本中，当有人搜索文章时，要搜索的标准键是 `title`、`description` 和 `headings`（headings 指博客文章的所有标题 h1 ~ h6）。在 AstroPaper v2 中，当用户输入时，只会搜索 `title` 和 `description`。

### 重命名的前置元数据属性

以下前置元数据属性已重命名。

| 旧名称    | 新名称      |
| --------- | ----------- |
| datetime  | pubDatetime |
| slug      | postSlug    |

### 博客文章的默认标签

如果一篇博客文章没有任何标签（换句话说，未指定前置元数据属性 `tags`），将为该博客文章使用默认标签 `others`。但您可以在 `/src/content/_schemas.ts` 文件中设置默认标签。

```ts
// src/contents/_schemas.ts
export const blogSchema = z.object({
  // ---
  // 用您想要的任何内容替换 "others"
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
});
```

### 新的预定义深色配色方案

AstroPaper v2 有一个新的深色配色方案（高对比度和低对比度），它基于 Astro 的深色标志。查看[此链接](https://astro-paper.pages.dev/posts/predefined-color-schemes#astro-dark)了解更多信息。

![新的预定义深色配色方案](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

### 自动类排序

AstroPaper 2.0 包含了使用 [TailwindCSS Prettier 插件](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) 的自动类排序

### 更新的文档和 README

所有 [#docs](https://astro-paper.pages.dev/tags/docs/) 博客文章和 [README](https://github.com/satnaing/astro-paper#readme) 都已针对 AstroPaper v2 进行了更新。

## 错误修复

- 修复博客文章页面中的损坏标签
- 在标签页面中，面包屑的最后一部分现在更新为小写以保持一致性
- 在标签页面中排除草稿文章
- 修复页面重新加载后的 'onChange 值不更新问题'
