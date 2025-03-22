---
author: Sat Naing
pubDatetime: 2024-01-04T09:30:41.816Z
title: AstroPaper 4.0
slug: "astro-paper-v4"
featured: false
ogImage: ../../../assets/images/AstroPaper-v4.png
tags:
  - release
description: "AstroPaper v4：确保更流畅和功能更丰富的博客体验。"
---

大家好！祝大家新年快乐 🎉，2024 年一切顺利！我们很高兴宣布 AstroPaper v4 的发布，这是一个重要的更新，引入了一系列新功能、改进和错误修复，以提升你的博客体验。非常感谢所有贡献者为实现 v4 版本所做的宝贵投入和努力！

![AstroPaper v4](@/assets/images/AstroPaper-v4.png)

## 目录

## 主要变更

### 升级到 Astro v4 [#202](https://github.com/satnaing/astro-paper/pull/202)

AstroPaper 现在利用了 Astro v4 的功能和能力。然而，这是一个微妙的升级，不会影响大多数 Astro 用户。

![Astro v4](https://astro.build/_astro/header-astro-4.YunweN9V_OmV0l.webp)

### 用 Astro Content `slug` 替换 `postSlug` [#197](https://github.com/satnaing/astro-paper/pull/197)

在 AstroPaper v4 中，博客内容模式中的 `postSlug` 不再可用。最初 Astro 没有 `slug` 机制，因此我们必须自己想办法。自 Astro v3 以来，它支持内容集合和 slug 功能。现在，我们认为是时候采用 Astro 的内置 `slug` 功能了。

**_文件：src/content/blog/astro-paper-4.md_**

```bash
---
author: Sat Naing
pubDatetime: 2024-01-01T04:35:33.428Z
title: AstroPaper 4.0
slug: "astro-paper-v4" # 如果未指定 slug，它将是 'astro-paper-4'（文件名）。
# slug: "" ❌ 不能是空字符串
---
```

`slug` 的行为现在略有不同。在 AstroPaper 的早期版本中，如果博客文章（markdown 文件）中未指定 `postSlug`，则该博客文章的标题将被转换为 slug 并用作 `slug`。然而，在 AstroPaper v4 中，如果未指定 `slug` 字段，则将使用 markdown 文件名作为 `slug`。需要记住的一点是，`slug` 字段可以省略，但不能是空字符串（slug: "" ❌）。

如果你正在从 v3 升级到 v4，请确保将 `src/content/blog/*.md` 文件中的 `postSlug` 替换为 `slug`。

## 新功能

### 为内容创建添加代码片段 [#206](https://github.com/satnaing/astro-paper/pull/206)

AstroPaper 现在包含了用于新博客文章的 VSCode 片段，无需手动复制/粘贴前置元数据和内容结构（目录、标题、摘要等）。

在[这里](https://code.visualstudio.com/docs/editor/userdefinedsnippets#:~:text=In%20Visual%20Studio%20Code%2C%20snippets,Snippet%20in%20the%20Command%20Palette)阅读更多关于 VSCode 片段的信息。

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/136f1903-bade-40a2-b6bb-285a3c726350" type="video/mp4">
</video>

### 在博客文章中添加修改日期时间 [#195](https://github.com/satnaing/astro-paper/pull/195)

通过在博客文章中显示修改日期时间，让读者了解最新更新。这不仅增强了用户对文章新鲜度的信任，还有助于改善博客的 SEO。

![AstroPaper 中的最后修改日期功能](https://github.com/satnaing/astro-paper/assets/53733092/cc89585e-148e-444d-9da1-0d496e867175)

如果你对文章进行了修改，可以添加 `modDatetime`。现在，文章的排序行为略有不同。所有文章都按 `pubDatetime` 和 `modDatetime` 排序。如果一篇文章同时具有 `pubDatetime` 和 `modDatetime`，其排序位置将由 `modDatetime` 决定。如果没有，则只考虑 `pubDatetime` 来确定文章的排序顺序。

### 实现返回顶部按钮 [#188](https://github.com/satnaing/astro-paper/pull/188)

通过新实现的返回顶部按钮，增强博客详情文章的用户导航。

![AstroPaper 中的返回顶部按钮](https://github.com/satnaing/astro-paper/assets/53733092/79854957-7877-4f19-936e-ad994b772074)

### 在标签文章中添加分页 [#201](https://github.com/satnaing/astro-paper/pull/201)

通过在标签文章中添加分页，改进内容组织和导航，使用户更容易探索相关内容。这确保了如果一个标签有很多文章，读者不会被所有相关标签的文章淹没。

<video autoplay loop="loop" muted="muted" plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/9bad87f5-dcf5-4b79-b67a-d6c7244cd616" type="video/mp4">
</video>

### 动态生成 robots.txt [#130](https://github.com/satnaing/astro-paper/pull/130)

AstroPaper v4 现在可以动态生成 robots.txt 文件，让你对搜索引擎索引和网络爬虫有更多控制。此外，sitemap URL 也将添加到 `robot.txt` 文件中。

### 添加 Docker-Compose 文件 [#174](https://github.com/satnaing/astro-paper/pull/174)

通过添加 Docker-Compose 文件，管理你的 AstroPaper 环境现在比以往任何时候都更容易，简化了部署和配置。

## 重构和错误修复

### 用未转换的标签名称替换转换后的标题 [#198](https://github.com/satnaing/astro-paper/pull/198)

为了提高清晰度、用户体验和 SEO，标签页面中的标题（`Tag: some-tag`）不再转换为 slug 格式（`Tag: Some Tag`）。

![未转换的标签名称](https://github.com/satnaing/astro-paper/assets/53733092/2fe90d6e-ec52-467b-9c44-95009b3ae0b7)

### 为最小高度实现 100svh ([79d569d](https://github.com/satnaing/astro-paper/commit/79d569d053036f2113519f41b0d257523d035b76))

我们已将 body 的最小高度更新为使用 100svh，为移动用户提供更好的用户体验。

### 更新网站 URL 作为单一真实来源 [#143](https://github.com/satnaing/astro-paper/pull/143)

网站 URL 现在是单一真实来源，简化了配置并避免了不一致性。在这个 [PR](https://github.com/satnaing/astro-paper/pull/143) 及其相关问题中阅读更多信息。

### 解决浅色模式下代码块文本不可见的问题 [#163](https://github.com/satnaing/astro-paper/pull/163)

我们已修复了浅色模式下代码块文本不可见的问题。

### 在面包屑中解码 Unicode 标签字符 [#175](https://github.com/satnaing/astro-paper/pull/175)

面包屑中标签的最后部分现在已解码，使非英语 Unicode 字符显示得更好。

### 更新 LOCALE 配置以覆盖整体区域设置 ([cd02b04](https://github.com/satnaing/astro-paper/commit/cd02b047d2b5e3b4a2940c0ff30568cdebcec0b8))

LOCALE 配置已更新，以覆盖更广泛的区域设置，满足更多样化的受众需求。

## 结语

我们相信这些更新将显著提升你的 AstroPaper 体验。感谢每一位贡献者、解决问题的人以及给 AstroPaper 点星的人。我们期待看到你用 AstroPaper v4 创作的精彩内容！

博客愉快！

[Sat Naing](https://satnaing.dev) <br/>
AstroPaper 创建者
