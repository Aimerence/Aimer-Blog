---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2025-06-12T20:02:23+08:00
title: 如何在 AstroPaper 中集成 Giscus 评论
slug: how-to-integrate-giscus-comments
featured: false
draft: false
tags:
  - astro
  - blog
  - docs
description: 在 GitHub Pages 托管的静态博客上使用 Giscus 实现评论功能。
---

在 [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) 等平台上托管轻量级静态博客有很多优点，但也会失去一些交互性。幸运的是，[Giscus](https://giscus.app/) 提供了一种在静态网站上嵌入用户评论的方法。

## 目录

## Giscus 的工作原理

[Giscus 使用 GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works) 来读取和存储 GitHub 用户在仓库的 `Discussions` 中发表的评论。

在你的网站上嵌入 Giscus 客户端脚本包，配置正确的仓库 URL，用户就可以查看和发表评论（需要登录 GitHub）。

这种方法是无服务器的，因为评论存储在 GitHub 上并在客户端动态加载，因此非常适合像 AstroPaper 这样的静态博客。

## 设置 Giscus

Giscus 可以在 [giscus.app](https://giscus.app/) 上轻松设置，但我还是会简要说明一下这个过程。

### 前提条件

使用 Giscus 的前提条件是：

- 仓库必须是[公开的](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)
- 已安装 [Giscus app](https://github.com/apps/giscus)
- 已为你的仓库开启 [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) 功能

如果由于任何原因无法满足这些条件，很遗憾，就无法集成 Giscus。

### 配置 Giscus

接下来，需要配置 Giscus。在大多数情况下，预选的默认值是合适的，只有在你有特定原因并且知道自己在做什么的情况下才应该修改它们。不用太担心做出错误的选择；你随时可以调整配置。

但是你需要：

- 为 UI 选择正确的语言
- 指定要连接的 GitHub 仓库，通常是在 GitHub Pages 上托管你的静态 AstroPaper 博客的仓库
- 如果你想确保没有人可以直接在 GitHub 上创建随机评论，请在 GitHub 上创建并设置一个 `Announcement` 类型的讨论
- 定义配色方案

配置完设置后，Giscus 会为你生成一个 `<script>` 标签，你将在接下来的步骤中需要它。

## 简单的脚本标签

现在你应该有一个类似这样的脚本标签：

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[在此输入仓库]"
  data-repo-id="[在此输入仓库 ID]"
  data-category="[在此输入分类名称]"
  data-category-id="[在此输入分类 ID]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

只需将其添加到网站的源代码中。如果你使用 AstroPaper 并想在文章中启用评论，请导航到 `src/layouts/PostDetails.astro` 并将其粘贴到你想要显示评论的位置，可能是在 `Share this post on:` 按钮下方。

```diff
      <ShareLinks />
    </div>

+    <script src="https://giscus.app/client.js"
+        data-repo="[在此输入仓库]"
+        data-repo-id="[在此输入仓库 ID]"
+        data-category="[在此输入分类名称]"
+        data-category-id="[在此输入分类 ID]"
+        ...
+    </script>

  </main>
  <Footer />
</Layout>
```

就这样！你已经成功在 AstroPaper 中集成了评论功能！

## 带有明暗主题的 React 组件

在布局中嵌入的脚本标签相当静态，Giscus 配置（包括 `theme`）被硬编码到布局中。考虑到 AstroPaper 具有明暗主题切换功能，如果评论也能随着网站的其他部分无缝切换明暗主题就更好了。要实现这一点，需要一种更复杂的方法来嵌入 Giscus。

首先，我们要安装 Giscus 的 [React 组件](https://www.npmjs.com/package/@giscus/react)：

```bash
npm i @giscus/react && npx astro add react
```

然后在 `src/components` 中创建一个新的 `Comments.tsx` React 组件：

```tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```

这个 React 组件不仅包装了原生的 Giscus 组件，还引入了额外的属性，即 `lightTheme` 和 `darkTheme`。利用两个事件监听器，Giscus 评论将与网站的主题保持一致，在网站或浏览器主题改变时动态切换明暗主题。

我们还需要在 `src/constants.ts` 中定义 `GISCUS` 配置：

```ts
import type { GiscusProps } from "@giscus/react";

...

export const GISCUS: GiscusProps = {
  repo: "[在此输入仓库]",
  repoId: "[在此输入仓库 ID]",
  category: "[在此输入分类名称]",
  categoryId: "[在此输入分类 ID]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
```

注意，在这里指定 `theme` 将覆盖 `lightTheme` 和 `darkTheme` 属性，导致主题设置变为静态，类似于之前使用 `<script>` 标签嵌入 Giscus 的方法。

最后，将新的 Comments 组件添加到 `src/layouts/PostDetails.astro`（替换之前的 `script` 标签）。

```diff
+ import Comments from "@/components/Comments";

      <ShareLinks />
    </div>

+   <Comments client:only="react" />

    <hr class="my-6 border-dashed" />

  </main>
  <Footer />
</Layout>
```

就这样！
