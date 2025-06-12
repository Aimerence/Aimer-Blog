---
author: Sat Naing
pubDatetime: 2022-09-26T12:13:24Z
modDatetime: 2025-06-12T20:02:23+08:00
title: 预定义配色方案
slug: predefined-color-schemes
featured: false
draft: false
tags:
  - color-schemes
description:
  AstroPaper 博客主题的一些精心制作的预定义配色方案。
---

我为这个 AstroPaper 博客主题制作了一些预定义的配色方案。你可以用这些配色方案替换原有的配色。

如果你不知道如何配置配色方案，请查看[这篇博客文章](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)。

## 目录

## 浅色配色方案

浅色配色方案必须使用 CSS 选择器 `:root` 和 `html[data-theme="light"]` 来定义。

### 龙虾配色

![龙虾配色方案](https://user-images.githubusercontent.com/53733092/192282447-1d222faf-a3ce-44a9-9cfe-ac873155e5a9.png)

```css
:root,
html[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --muted: #efd8b0;
  --border: #dc9891;
}
```

### 叶蓝配色

![叶蓝配色方案](https://user-images.githubusercontent.com/53733092/192318782-e80e3c39-54b5-423e-8f4b-9ae60402fc8d.png)

```css
:root,
html[data-theme="light"] {
  --background: #f2f5ec;
  --foreground: #353538;
  --accent: #1158d1;
  --muted: #bbc789;
  --border: #7cadff;
}
```

### 粉红浅色

![粉红配色方案](https://user-images.githubusercontent.com/53733092/192286510-892d0042-2d6d-471e-bb72-954221ae2d17.png)

```css
:root,
html[data-theme="light"] {
  --background: #fafcfc;
  --foreground: #222e36;
  --accent: #d3006a;
  --muted: #f1bad4;
  --border: #e3a9c6;
}
```

## 深色配色方案

深色配色方案必须定义为 `html[data-theme="dark"]`。

### AstroPaper 1 原始深色主题

![AstroPaper 1 默认深色主题](https://user-images.githubusercontent.com/53733092/215769153-13b0ad8d-5ba2-44b1-af06-e5ae61293f62.png)

```css
html[data-theme="dark"] {
  --background: #2f3741;
  --foreground: #e6e6e6;
  --accent: #1ad9d9;
  --muted: #596b81;
  --border: #3b4655;
}
```

### 深牡蛎配色

![深牡蛎配色方案](https://user-images.githubusercontent.com/53733092/192314524-45ec5904-3d8f-450a-9edf-1e32c5e11d6c.png)

```css
html[data-theme="dark"] {
  --background: #21233d;
  --foreground: #f4f7f5;
  --accent: #ff5256;
  --muted: #4a4e86;
  --border: #b12f32;
}
```

### 粉红深色

![粉红深色配色方案](https://user-images.githubusercontent.com/53733092/192307050-fbd55326-911c-4001-87c6-a8ad9378ac2e.png)

```css
html[data-theme="dark"] {
  --background: #353640;
  --foreground: #e9edf1;
  --accent: #ff78c8;
  --muted: #715566;
  --border: #86436b;
}
```

### Astro 深色（高对比度）

![Astro 深色配色方案](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

```css
html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #8a3302;
  --border: #ab4b08;
}
```

### Astro 深色（AstroPaper 2 的新默认深色主题）

![新深色配色方案 - 低对比度](https://user-images.githubusercontent.com/53733092/215772856-d5b7ae35-ddaa-4ed6-b0bf-3fa5dbcf834c.png)

```css
html[data-theme="dark"] {
  --background: #212737; /* 较低对比度背景 */
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #8a3302;
  --border: #ab4b08;
}
```

### Astro 深紫色（AstroPaper 3 的新主题）

![AstroPaper v3 新主题](https://github.com/satnaing/astro-paper/assets/53733092/c8b5d7e1-a3bc-4852-a5ad-4abf7b3cec79)

```css
html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #eb3fd3;
  --muted: #7d4f7c;
  --border: #642451;
}
```

### AstroPaper v4 特别版（AstroPaper 4 的新深色主题）

![AstroPaper v4 新主题](https://github.com/satnaing/astro-paper/assets/53733092/66eb74dc-7a0e-4f2e-982d-25f5c443b25a)

```css
html[data-theme="dark"] {
  --background: #000123;
  --accent: #617bff;
  --foreground: #eaedf3;
  --muted: #0c0e4f;
  --border: #303f8a;
}
```
