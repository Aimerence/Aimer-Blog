---
title: 在 Astro 中集成 Giscus 评论系统（最简方案）
author: Aimerence
pubDatetime: 2024-03-23T13:20:00+08:00
modDatetime: 2025-03-23T21:19:59+08:00
featured: false
draft: false
tags:
  - astro
  - blog
  - tutorial
description: 使用原生 JavaScript 方式在 Astro 博客中集成 Giscus 评论系统，支持明暗主题切换。

---

本文介绍如何在 Astro 博客中集成 Giscus 评论系统，采用原生 JavaScript 方案，无需额外依赖。

## 前提条件

1. GitHub 仓库必须是公开的
2. 已安装 [Giscus GitHub App](https://github.com/apps/giscus)
3. 已为仓库开启 Discussions 功能

## 获取配置参数

1. 访问 [Giscus 配置页面](https://giscus.app/zh-CN)
2. 输入你的仓库信息
3. 选择讨论分类映射方式（推荐使用 `pathname`）
4. 选择主题（我们会在代码中动态切换主题）
5. 记录生成的配置参数，主要是：
   - repo
   - repo-id
   - category
   - category-id

## 创建评论组件

创建文件 `src/components/Comments.astro`：

```astro
---
---

<section class="mx-auto mt-12">
  <div id="giscus-container">
    <script
      src="https://giscus.app/client.js"
      data-repo="你的用户名/仓库名"
      data-repo-id="你的仓库ID"
      data-category="你的分类名称"
      data-category-id="你的分类ID"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-theme="noborder_light"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async
    ></script>
  </div>
</section>

<script is:inline>
  function updateGiscusTheme() {
    const theme = document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark_dimmed"
      : "light";
    
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
    } else {
      const giscusContainer = document.getElementById("giscus-container");
      if (giscusContainer) {
        const giscusScript = giscusContainer.querySelector("script");
        if (giscusScript) {
          giscusScript.setAttribute(
            "data-theme",
            theme === "dark" ? "noborder_dark" : "noborder_light"
          );
        }
      }
    }
  }

  // 初始化时更新主题
  updateGiscusTheme();

  // 监听主题变化
  const observer = new MutationObserver(updateGiscusTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // 页面加载完成时更新主题
  window.addEventListener("load", updateGiscusTheme);

  // 监听 iframe 加载
  const bodyObserver = new MutationObserver(() => {
    if (document.querySelector("iframe.giscus-frame")) {
      updateGiscusTheme();
    }
  });
  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
</script>
```

主要配置说明：
- `data-mapping="pathname"`: 使用页面路径映射评论
- `data-reactions-enabled="1"`: 启用表情反应
- `data-input-position="top"`: 评论框在顶部
- `data-lang="zh-CN"`: 使用中文界面
- `data-theme="noborder_light"`: 默认使用无边框亮色主题

## 添加到文章布局

修改 `src/layouts/PostDetails.astro`：

```astro
---
import Comments from "@/components/Comments.astro";
// ... 其他导入
---

<Layout {...layoutProps}>
  <!-- ... 其他内容 ... -->
  
  <hr class="my-6 border-dashed" />
  
  <Comments />
  
  <!-- ... 其他内容 ... -->
</Layout>
```

## 主题切换原理

1. 使用 `MutationObserver` 监听 `data-theme` 属性变化
2. 当主题切换时，通过 `postMessage` 更新 Giscus iframe 的主题
3. 使用 `noborder_light` 和 `noborder_dark` 主题，保持整洁的外观

## 优点

1. 不需要额外的依赖（如 React）
2. 代码简洁，易于维护
3. 性能好，加载快
4. 完美支持明暗主题切换
5. 配置集中在组件内，方便修改

## 常见问题

1. 评论不显示
   - 检查仓库是否公开
   - 确认 Discussions 功能已开启
   - 验证配置参数是否正确

2. 主题不跟随切换
   - 确保网站使用 `data-theme` 属性控制主题
   - 检查 `updateGiscusTheme` 函数是否正确执行

3. 评论框位置不对
   - 调整 `data-input-position` 参数
   - 修改 `section` 的 margin 样式

## 结语

这种实现方式不仅简单，而且性能好，推荐在 Astro 项目中使用。如果你需要更复杂的功能，也可以考虑使用 React 版本的实现。

## 参考资料

- [Giscus 官方文档](https://giscus.app)
- [Astro 文档](https://docs.astro.build)
- [MutationObserver MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 