---
title: 给 AstroPaper v5 添加文章目录(TOC)功能
slug: add-table-of-contents
author: Aimerence
pubDatetime: 2025-03-23T14:30:00+08:00
modDatetime: 2025-03-23T22:29:01+08:00
featured: false
draft: false
tags:
  - astro
  - blog
  - tutorial
  - toc
description: 详细介绍如何在 AstroPaper v5 主题中添加文章目录功能，包括目录生成、样式设置和主题适配。
---

本文将介绍如何在 AstroPaper v5 主题中添加文章目录(Table of Contents)功能。这个功能可以帮助读者快速浏览文章结构，并方便地跳转到感兴趣的部分。

## 实现步骤

### 1. 创建工具函数

首先创建 `src/utils/generateToc.ts` 文件，用于生成目录结构：

```typescript
import type { MarkdownHeading } from "astro";

export interface TocItem extends MarkdownHeading {
  children: Array<TocItem>;
}

function injectChild(items: Array<TocItem>, item: TocItem) {
  const lastItem = items.at(-1);
  if (!lastItem) {
    items.push(item);
    return;
  }

  const lastItemDepth = lastItem.depth;
  const itemDepth = item.depth;

  if (itemDepth > lastItemDepth) {
    injectChild(lastItem.children, item);
    return;
  }

  items.push(item);
}

export function generateToc(headings: ReadonlyArray<MarkdownHeading>) {
  const bodyHeadings = headings.filter(({ depth }) => depth >= 2 && depth <= 4);
  const toc: Array<TocItem> = [];

  for (const heading of bodyHeadings) {
    injectChild(toc, { ...heading, children: [] });
  }

  return toc;
}
```

### 2. 创建目录组件

创建 `src/components/Toc.astro` 文件：

```astro
---
import type { MarkdownHeading } from "astro";
import { generateToc } from "@/utils/generateToc";
import TOCHeading from "./TocHeading.astro";

interface Props {
  headings: MarkdownHeading[];
}

const { headings } = Astro.props;
const toc = generateToc(headings);
---

<aside class="lg:block fixed left-[82%] top-32 order-2 -me-32 hidden basis-64 max-h-[calc(100vh-12rem)] overflow-auto hover-scrollbar">
  <h2 class="font-semibold">目录</h2>
  <ul class="mt-4 text-sm">
    {toc.map(heading => <TOCHeading heading={heading} />)}
  </ul>
</aside>

<script is:inline>
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href")?.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });
</script>

<style>
  .hover-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .hover-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hover-scrollbar:hover {
    scrollbar-width: thin;
    -ms-overflow-style: auto;
  }
  .hover-scrollbar:hover::-webkit-scrollbar {
    display: block;
    width: 2px;
  }
  .hover-scrollbar:hover::-webkit-scrollbar-track {
    background: transparent;
  }
  .hover-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: var(--color-text-muted);
    border-radius: 1px;
  }
</style>
```

### 3. 创建目录项组件

创建 `src/components/TocHeading.astro` 文件：

```astro
---
import type { TocItem } from "@/utils/generateToc";

interface Props {
  heading: TocItem;
}

const {
  heading: { depth, slug, text, children },
} = Astro.props;
---

<li class={`${depth > 2 ? "ms-2" : ""}`}>
  <a
    aria-label={`Scroll to section: ${text}`}
    class={`block line-clamp-2 hover:text-accent text-nowrap max-w-[14rem] overflow-hidden overflow-ellipsis ${
      depth <= 2 ? "mt-3" : "mt-2 text-[0.80rem]"
    }`}
    href={`#${slug}`}
  ><span class="me-0.5"></span>{text}</a>
  {
    children.length > 0 && (
      <ul>
        {children.map(heading => (
          <Astro.self heading={heading} />
        ))}
      </ul>
    )
  }
</li>
```

### 4. 修改文章布局

修改 `src/layouts/PostDetails.astro` 文件：

1. 添加导入语句：
```astro
import TOC from "@/components/Toc.astro";
```

2. 获取文章标题：
```astro
const { Content, headings } = await render(post);
```

3. 添加目录组件：
```astro
<div class="mx-auto flex w-full max-w-[1600px] justify-between gap-8 px-4">
  <main>
    <!-- 原有内容 -->
  </main>
  {!!headings.length && <TOC headings={headings} />}
</div>
```

## 功能特点

1. **自动生成目录**：自动提取文章中的 h2-h4 标题
2. **嵌套结构**：支持多级标题的嵌套显示
3. **响应式设计**：在小屏幕上自动隐藏
4. **固定位置**：目录固定在右侧，滚动时保持可见
5. **优雅的滚动条**：
   - 默认隐藏滚动条
   - 鼠标悬停时显示细滚动条
   - 滚动条样式与主题配色一致
   - 跨浏览器兼容性支持
6. **样式优化**：
   - 标题超出时显示省略号
   - 悬停时显示强调色
   - 适配主题的明暗模式

## 使用说明

1. 目录会自动提取文章中的 h2-h4 标题
2. 点击目录项可平滑滚动到对应位置
3. 在宽度小于 1280px 的屏幕上，目录会自动隐藏
4. 目录样式会自动跟随主题的明暗模式切换

## 注意事项

1. 确保文章中使用了正确的标题层级（h2-h4）
2. 标题文本不要太长，否则会被截断
3. 如果文章很短或没有标题，目录将不会显示

## 自定义调整

如果需要调整目录的样式或行为，可以：

1. 修改固定位置：调整 `left-[82%]` 和 `top-32` 的值
2. 调整宽度：修改 `max-w-[14rem]` 的值
3. 更改字体大小：调整 `text-[0.80rem]` 的值
4. 修改响应式断点：更改 `lg:block` 的值
5. 调整滚动条样式：
   - 修改滚动条宽度：更改 `width: 2px` 的值
   - 调整滚动条颜色：修改 `background-color` 的值
   - 更改圆角大小：调整 `border-radius` 的值

## 结语

这个实现方案保持了 AstroPaper 主题的设计风格，同时提供了良好的阅读体验。如果你有其他需求，也可以基于这个基础版本进行扩展。 