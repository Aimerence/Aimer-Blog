---
author: Alberto Perdomo
pubDatetime: 2024-09-08T20:58:52.737Z
modDatetime: 2025-03-09T09:24:07.841Z
title: 如何在 Astro 博客文章中添加 LaTeX 公式
tags:
  - docs
description: 学习如何使用 Markdown、KaTeX 和 remark/rehype 插件在 Astro 博客文章中添加 LaTeX 公式。
---

本文档演示如何在 AstroPaper 的 Markdown 文件中使用 LaTeX 公式。LaTeX 是一个强大的排版系统，通常用于数学和科学文档。

<figure>
  <img
    src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="黑板上复杂方程式的特写，展示化学和数学符号。免费照片"
  />
  <figcaption class="text-center">
    照片来自 <a href="https://www.pexels.com/photo/close-up-of-complicated-equations-written-on-a-blackboard-22690748/">Vitaly Gariev</a>
  </figcaption>
</figure>

## 目录

## 使用说明

在本节中，你将找到如何在 AstroPaper 的 Markdown 文件中添加 LaTeX 支持的说明。

1. 通过运行以下命令安装必要的 remark 和 rehype 插件：

   ```bash
   pnpm install rehype-katex remark-math katex
   ```

2. 更新 Astro 配置（`astro.config.ts`）以使用这些插件：

   ```ts
   // 其他导入
   import remarkMath from "remark-math";
   import rehypeKatex from "rehype-katex";

   export default defineConfig({
     // 其他配置
     markdown: {
       remarkPlugins: [
         remarkMath, // <- 新插件
         remarkToc,
         [remarkCollapse, { test: "Table of contents" }],
       ],
       rehypePlugins: [rehypeKatex], // <- 新插件
       shikiConfig: {
         // 更多主题，访问 https://shiki.style/themes
         themes: { light: "min-light", dark: "night-owl" },
         wrap: true,
       },
     },
     // 其他配置
   });
   ```

3. 在主布局文件 `src/layouts/Layout.astro` 中导入 KaTeX CSS

   ```astro
   ---
   import { LOCALE, SITE } from "@config";

   // astro 代码
   ---

   <!doctype html>
   <!-- 其他... -->
   <script is:inline src="/toggle-theme.js"></script>

   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
   />

   <body>
     <slot />
   </body>
   ```

4. 最后一步，在 `src/styles/typography.css` 中为 `katex` 添加文本颜色。

   ```css
   @plugin '@tailwindcss/typography';

   @layer base {
     /* 其他类 */

     /* Katex 文本颜色 */
     .prose .katex-display {
       @apply text-foreground;
     }

     /* ===== 代码块和语法高亮 ===== */
     /* 其他类 */
   }
   ```

这样就完成了，这个设置允许你在 Markdown 文件中编写 LaTeX 公式，这些公式在网站构建时会被正确渲染。完成后，文档的其余部分将正确显示。

---

## 行内公式

行内公式写在单个美元符号 `$...$` 之间。以下是一些例子：

1. 著名的质能等价公式：`$E = mc^2$`
2. 二次方程公式：`$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. 欧拉恒等式：`$e^{i\pi} + 1 = 0$`

---

## 块级公式

对于更复杂的公式或当你想要公式单独显示在一行时，使用双美元符号 `$$...$$`：

高斯积分：

```bash
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

黎曼 zeta 函数的定义：

```bash
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$
```

麦克斯韦方程组的微分形式：

```bash
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```

---

## 使用数学符号

LaTeX 提供了广泛的数学符号：

- 希腊字母：`$\alpha$`、`$\beta$`、`$\gamma$`、`$\delta$`、`$\epsilon$`、`$\pi$`
- 运算符：`$\sum$`、`$\prod$`、`$\int$`、`$\partial$`、`$\nabla$`
- 关系：`$\leq$`、`$\geq$`、`$\approx$`、`$\sim$`、`$\propto$`
- 逻辑符号：`$\forall$`、`$\exists$`、`$\neg$`、`$\wedge$`、`$\vee$`
