---
author: Sat Naing
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2025-03-20T03:22:19.075Z
title: 在 AstroPaper 主题中添加新文章
slug: adding-new-posts-in-astropaper-theme
featured: true
draft: false
tags:
  - docs
description:
  使用 AstroPaper 主题创建或添加新文章的一些规则和建议。
---

以下是在 AstroPaper 博客主题中创建新文章的一些规则/建议、技巧和窍门。

<figure>
  <img
    src="https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="经典木制书桌，配有写作用品、复古时钟和皮包的免费照片"
  />
    <figcaption class="text-center">
    图片来源：<a href="https://www.pexels.com/photo/brown-wooden-desk-159618/">Pixabay</a>
  </figcaption>
</figure>

## 目录

## 创建博客文章

要写一篇新的博客文章，请在 `src/data/blog/` 目录中创建一个 markdown 文件。

> 在 AstroPaper v5.1.0 之前，所有博客文章都必须在 `src/data/blog/` 中，这意味着你不能将它们组织到子目录中。

从 AstroPaper v5.1.0 开始，你现在可以将博客文章组织到子目录中，这使得内容管理更加容易。

例如，如果你想将文章分组到 `2025` 下，你可以将它们放在 `src/data/blog/2025/` 中。这也会影响文章的 URL，所以 `src/data/blog/2025/example-post.md` 将在 `/posts/2025/example-post` 可用。

如果你不希望子目录影响文章 URL，只需在文件夹名称前加上下划线 `_`。

```bash
# 示例：博客文章结构和 URL
src/data/blog/very-first-post.md          -> mysite.com/posts/very-first-post
src/data/blog/2025/example-post.md        -> mysite.com/posts/2025/example-post
src/data/blog/_2026/another-post.md       -> mysite.com/posts/another-post
src/data/blog/docs/_legacy/how-to.md      -> mysite.com/docs/how-to
src/data/blog/Example Dir/Dummy Post.md   -> mysite.com/example-dir/dummy-post
```

> 💡 提示：你也可以在前置元数据中覆盖博客文章的 slug。详见下一节。

如果子目录 URL 没有出现在构建输出中，请删除 node_modules，重新安装包，然后重新构建。

## 前置元数据

前置元数据是存储博客文章（文章）重要信息的主要位置。前置元数据位于文章顶部，使用 YAML 格式编写。在 [astro 文档](https://docs.astro.build/en/guides/markdown-content/) 中阅读更多关于前置元数据及其用法的信息。

以下是每篇文章的前置元数据属性列表。

| 属性               | 描述                                                                                                | 备注                                           |
| ------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **_title_**        | 文章标题 (h1)                                                                                       | 必需<sup>\*</sup>                              |
| **_description_**  | 文章描述。用于文章摘要和网站描述。                                                                | 必需<sup>\*</sup>                              |
| **_pubDatetime_**  | ISO 8601 格式的发布日期时间。                                                                      | 必需<sup>\*</sup>                              |
| **_modDatetime_**  | ISO 8601 格式的修改日期时间。（仅在博客文章被修改时添加此属性）                                  | 可选                                           |
| **_author_**       | 文章作者。                                                                                          | 默认 = SITE.author                             |
| **_slug_**         | 文章的 slug。此字段是可选的。                                                                      | 默认 = 文件名转换后的 slug                     |
| **_featured_**     | 是否在首页的特色部分显示此文章                                                                    | 默认 = false                                    |
| **_draft_**        | 将此文章标记为"未发布"。                                                                          | 默认 = false                                    |
| **_tags_**         | 此文章的相关关键词。以 YAML 数组格式编写。                                                        | 默认 = others                                   |
| **_ogImage_**      | 文章的 OG 图片。用于社交媒体分享和 SEO。可以是远程 URL 或相对于当前文件夹的图片路径。           | 默认 = `SITE.ogImage` 或生成的 OG 图片         |
| **_canonicalURL_** | 规范 URL（绝对），用于文章已存在于其他来源的情况。                                               | 默认 = `Astro.site` + `Astro.url.pathname`     |
| **_hideEditPost_** | 隐藏博客标题下的编辑文章按钮。这仅适用于当前博客文章。                                           | 默认 = false                                    |

> 提示！你可以通过在控制台运行 `new Date().toISOString()` 获取 ISO 8601 日期时间。记得删除引号。

前置元数据中只有 `title`、`description` 和 `pubDatetime` 字段是必需的。

标题和描述（摘要）对搜索引擎优化（SEO）很重要，因此 AstroPaper 建议在博客文章中包含这些内容。

`slug` 是 URL 的唯一标识符。因此，`slug` 必须是唯一的，与其他文章不同。`slug` 的空格应该用 `-` 或 `_` 分隔，但推荐使用 `-`。Slug 是使用博客文章文件名自动生成的。但是，你可以在博客文章的前置元数据中定义你的 `slug`。

例如，如果博客文件名是 `adding-new-post.md` 并且你没有在前置元数据中指定 slug，Astro 将使用文件名自动为博客文章创建一个 slug。因此，slug 将是 `adding-new-post`。但如果你在前置元数据中指定了 `slug`，这将覆盖默认的 slug。你可以在 [Astro 文档](https://docs.astro.build/en/guides/content-collections/#defining-custom-slugs) 中阅读更多相关信息。

如果你在博客文章中省略 `tags`（换句话说，如果没有指定标签），默认标签 `others` 将用作该文章的标签。你可以在 `/src/content/config.ts` 文件中设置默认标签。

```ts
// src/content/config.ts
export const blogSchema = z.object({
  // ---
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]), // 用你想要的任何内容替换 "others"
  // ---
});
```

### 前置元数据示例

以下是文章的前置元数据示例。

```yaml
# src/content/blog/sample-post.md
---
title: 文章的标题
author: 你的名字
pubDatetime: 2022-09-21T05:17:19Z
slug: the-title-of-the-post
featured: true
draft: false
tags:
  - some
  - example
  - tags
ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # 远程 URL
description: 这是示例文章的示例描述。
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

## 添加目录

默认情况下，文章（文章）不包含任何目录（toc）。要包含目录，你必须以特定方式指定它。

以 h2 格式（markdown 中的 ##）写入 `目录`，并将其放在你希望它出现在文章中的位置。

例如，如果你想将目录放在介绍段落的下方（就像我通常做的那样），你可以按以下方式操作。

```md
---
# 一些前置元数据
---

以下是在 AstroPaper 博客主题中创建新文章的一些建议、技巧和窍门。

## 目录

<!-- 文章的其余部分 -->
```

## 标题

关于标题有一点需要注意。AstroPaper 博客文章使用标题（前置元数据中的标题）作为文章的主标题。因此，文章中的其余标题应该使用 h2 \~ h6。

这个规则不是强制性的，但出于视觉、可访问性和 SEO 的目的，强烈建议遵循。

## 存储博客内容的图片

以下是存储图片并在 markdown 文件中显示它们的两种方法。

> 注意！如果需要在 markdown 中设置优化图片的样式，你应该[使用 MDX](https://docs.astro.build/en/guides/images/#images-in-mdx-files)。

### 在 `src/assets/` 目录中（推荐）

你可以在 `src/assets/` 目录中存储图片。这些图片将通过 [Image Service API](https://docs.astro.build/en/reference/image-service-reference/) 被 Astro 自动优化。

你可以使用相对路径或别名路径（`@/assets/`）来提供这些图片。

示例：假设你想显示路径为 `/src/assets/images/example.jpg` 的 `example.jpg`。

```md
![something](@/assets/images/example.jpg)

<!-- 或者 -->

![something](../../assets/images/example.jpg)

<!-- 使用 img 标签或 Image 组件将不起作用 ❌ -->
<img src="@/assets/images/example.jpg" alt="something">
<!-- ^^ 这是错误的 -->
```

> 从技术上讲，你可以在 `src` 下的任何目录中存储图片。在这里，`src/assets` 只是一个建议。

### 在 `public` 目录中

你可以在 `public` 目录中存储图片。请记住，存储在 `public` 目录中的图片不会被 Astro 处理，这意味着它们将不会被优化，你需要自己处理图片优化。

对于这些图片，你应该使用绝对路径；这些图片可以使用 [markdown 注释](https://www.markdownguide.org/basic-syntax/#images-1) 或 [HTML img 标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) 显示。

示例：假设 `example.jpg` 位于 `/public/assets/images/example.jpg`。

```md
![something](/assets/images/example.jpg)

<!-- 或者 -->

<img src="/assets/images/example.jpg" alt="something">
```

## 额外内容

### 图片压缩

当你在博客文章中放置图片时（特别是对于 `public` 目录下的图片），建议对图片进行压缩。这将影响网站的整体性能。

我推荐的图片压缩网站：

- [TinyPng](https://tinypng.com/)
- [TinyJPG](https://tinyjpg.com/)

### OG 图片

如果文章没有指定 OG 图片，将使用默认的 OG 图片。虽然不是必需的，但应该在前置元数据中指定与文章相关的 OG 图片。OG 图片的推荐尺寸是 **_1200 X 640_** px。

> 从 AstroPaper v1.4.0 开始，如果未指定，OG 图片将自动生成。查看[公告](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/)。
