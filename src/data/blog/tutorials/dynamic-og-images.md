---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-06-12T20:02:22+08:00
title: AstroPaper 博客文章中的动态 OG 图片生成
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: AstroPaper v1.4.0 的新功能，为博客文章引入动态 OG 图片生成。
---

AstroPaper v1.4.0 的新功能，为博客文章引入动态 OG 图片生成。

## 目录

## 简介

OG 图片（又称社交图片）在社交媒体互动中扮演着重要角色。如果你不知道什么是 OG 图片，它是当我们在 Facebook、Discord 等社交媒体上分享网站 URL 时显示的图片。

> 在 Twitter 上使用的社交图片在技术上并不叫做 OG 图片。但是，在这篇文章中，我会使用术语 OG 图片来指代所有类型的社交图片。

## 默认/静态 OG 图片（旧方式）

AstroPaper 已经提供了一种为博客文章添加 OG 图片的方法。作者可以在前置元数据 `ogImage` 中指定 OG 图片。即使作者没有在前置元数据中定义 OG 图片，也会使用默认的 OG 图片作为后备（在这种情况下是 `public/astropaper-og.jpg`）。但问题是默认的 OG 图片是静态的，这意味着每篇没有在前置元数据中包含 OG 图片的博客文章都会使用相同的默认 OG 图片，尽管每篇文章的标题/内容都不相同。

## 动态 OG 图片

为每篇文章生成动态 OG 图片可以让作者避免为每篇博客文章指定 OG 图片。此外，这将防止后备 OG 图片对所有博客文章都相同。

在 AstroPaper v1.4.0 中，使用了 Vercel 的 [Satori](https://github.com/vercel/satori) 包来生成动态 OG 图片。

对于以下博客文章，将在构建时生成动态 OG 图片：

- 在前置元数据中没有包含 OG 图片
- 没有标记为草稿

## AstroPaper 动态 OG 图片的解析

AstroPaper 的动态 OG 图片包括_博客文章标题_、_作者名称_和_网站标题_。作者名称和网站标题将从 **"src/config.ts"** 文件的 `SITE.author` 和 `SITE.title` 中获取。标题从博客文章前置元数据的 `title` 生成。
![动态 OG 图片示例链接](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非拉丁字符问题

包含非拉丁字符的标题不会直接正确显示。要解决这个问题，我们必须在 `loadGoogleFont.ts` 中用你喜欢的字体替换 `fontsConfig`。

```ts
// 文件：loadGoogleFont.ts

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP:wght@700",
      weight: 700,
      style: "normal",
    },
    { name: "Noto Sans", font: "Noto+Sans", weight: 400, style: "normal" },
    {
      name: "Noto Sans",
      font: "Noto+Sans:wght@700",
      weight: 700,
      style: "normal",
    },
  ];
  // 其他代码
}
```

> 查看[这个 PR](https://github.com/satnaing/astro-paper/pull/318)了解更多信息。

## 权衡

虽然这是一个很好的功能，但也有权衡。每个 OG 图片的生成大约需要一秒钟。一开始可能不会注意到这一点，但随着博客文章数量的增长，你可能想要禁用这个功能。由于每个 OG 图片都需要时间生成，拥有许多 OG 图片将线性增加构建时间。

例如：如果一个 OG 图片需要一秒钟生成，那么 60 个图片将需要大约一分钟，600 个图片将需要大约 10 分钟。随着内容规模的扩大，这可能会显著影响构建时间。

相关问题：[#428](https://github.com/satnaing/astro-paper/issues/428)

## 限制

在写这篇文章时，[Satori](https://github.com/vercel/satori) 还相对较新，尚未达到主要版本。因此，这个动态 OG 图片功能仍然有一些限制。

- 此外，还不支持 RTL 语言。
- 在标题中[使用表情符号](https://github.com/vercel/satori#emojis)可能有点棘手。
