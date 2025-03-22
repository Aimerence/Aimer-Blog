---
title: 我如何开发我的作品集网站和博客
author: Sat Naing
pubDatetime: 2022-03-25T16:55:12.000+00:00
slug: how-do-i-develop-my-portfolio-and-blog
featured: false
draft: false
tags:
  - NextJS
  - TailwindCSS
  - HeadlessCMS
  - Blog
description:
  "示例文章：我使用 NextJS 和无头 CMS 开发我的第一个作品集网站和博客的经历。"
---

> 本文最初来自我的[博客文章](https://satnaing.dev/blog/posts/how-do-i-develop-my-portfolio-and-blog)。我放这篇文章是为了演示如何使用 AstroPaper 主题写博客文章。

我使用 NextJS 和无头 CMS 开发我的第一个作品集网站和博客的经历。

![构建作品集](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg&w=2048&q=75)

## 动机

自从大学生活以来，我一直在想用我的自定义域名（**satnaing.dev**）启动我自己的网站。但直到这个项目之前，这一直没有实现。我已经完成了几个关于 Web 应用程序开发的项目和工作，但我没有努力去做这件事。

那么，"博客呢？"你可能会问。是的，博客也在我的项目列表中有一段时间了。我一直想用一些最新的技术做一个博客项目。然而，我一直忙于我的工作和其他项目，所以博客项目从未开始。

这些天，我倾向于开发自己的项目时注重质量而不是数量。项目完成后，我通常会在 Github 仓库中放一个适当的 readme 文件。但 Github 仓库的 readme 只适合技术方面（这只是我的想法）。我想写下我的经历和挑战。因此，我决定制作自己的博客。另外，在这一点上，我有足够的经验和信心来开发这个项目。

## 技术栈

对于前端，我想使用 [React](https://reactjs.org/ "React 官方网站")。但仅仅使用 React 对 SEO 来说不够好；而且我必须考虑许多因素，如路由、图片优化等。所以，我选择 [NextJS](https://nextjs.org/ "NextJS 官方网站") 作为我的主要前端技术栈。当然还有用于类型检查的 TypeScript。（据说当你习惯了 TypeScript 就会爱上它 😉）

对于样式，我使用 [TailwindCSS](https://tailwindcss.com/ "Tailwind CSS 官方网站")。这是因为我喜欢 Tailwind 提供的开发体验，而且与其他组件 UI 库（如 MUI 或 React Bootstrap）相比，它有很多灵活性。

这个项目的所有内容都存放在 GitHub 仓库中。我所有的博客文章（包括这一篇）都是用 Markdown 文件格式写的，因为我很习惯这个。但为了轻松地编写 Markdown 及其前置元数据，我使用 [Forestry](https://forestry.io/ "Forestry 官方网站") 无头 CMS。它是一个基于 git 的 CMS，可以提供 Markdown 和其他内容。因此，我可以使用 Markdown 或所见即所得编辑器写内容。此外，用它写前置元数据也很轻松。

图片和资源上传并存储在 [Cloudinary](https://cloudinary.com/ "Cloudinary 官方网站") 中。我通过 Forestry 连接 Cloudinary，并直接在仪表板中管理它们。

总之，这些是我在这个项目中使用的技术栈。

- 前端：NextJS (TypeScript)
- 样式：TailwindCSS
- 动画：GSAP
- CMS：Forestry 无头 CMS
- 部署：Vercel

## 功能

以下是我的作品集和博客的一些特定功能

### SEO 友好

整个项目的开发都考虑到了 SEO。我使用了适当的元标签、描述和标题对齐。这个网站现在已被 Google 索引。

> 你可以在 Google 上使用"sat naing dev"等关键词搜索这个网站

![在 Google 上搜索 satnaing.dev](https://res.cloudinary.com/noezectz/image/upload/v1648231400/SatNaing/satnaing-on-google_asflq6.png "satnaing.dev 已被索引")

此外，由于正确使用了元标签，当在社交媒体上分享时，这个网站会显示得很好。

![在 Facebook 上分享时 satnaing.dev 的卡片布局](https://res.cloudinary.com/noezectz/image/upload/v1653106955/SatNaing/satnaing-dev-share-on-facebook_1_zjoehx.png "在 Facebook 上分享时的卡片布局")

### 动态站点地图

站点地图在 SEO 中扮演着重要角色。因此，这个网站的每个页面都应该包含在 sitemap.xml 中。每当我创建新的内容、标签或分类时，我的网站都会自动生成站点地图。

### 明暗主题

由于近年来暗色主题的趋势，现在许多网站都默认包含暗色主题。当然，我的网站也支持明暗主题。

### 完全可访问

这个网站是完全可访问的。你可以只使用键盘就能导航。我采用了所有 a11y 增强最佳实践，如在所有图片中包含替代文本、不跳过标题、使用语义 HTML 标签、正确使用 aria 属性。

### 搜索框、分类和标签

所有博客内容都可以通过搜索框搜索。此外，内容可以通过分类和标签进行过滤。这样，博客读者可以搜索和阅读他们真正想要的内容。

### 性能和 Lighthouse 分数

由于适当的开发和最佳实践，这个网站获得了很好的性能和 lighthouse 分数。这是这个网站的 lighthouse 分数。

![satnaing.dev Lighthouse 分数](https://user-images.githubusercontent.com/53733092/159957822-7082e459-11e9-4616-8f1e-49d0881f7cbb.png "satnaing.dev Lighthouse 分数")

### 动画

最初我使用 [Framer Motion](https://www.framer.com/motion/ "Framer Motion") 为这个网站添加动画和微交互。然而，当我试图使用一些复杂的动画和视差效果时，我发现与 Framer Motion 集成不太方便（可能是因为我不太擅长也不太习惯使用它）。因此，我决定使用 [GSAP](https://greensock.com/ "GSAP 动画库") 来实现所有的动画。它是最流行的动画库之一，能够实现复杂和高级的动画。你可以在这个网站的几乎每个页面上看到动画和微交互。

![satnaing.dev 的动画](https://res.cloudinary.com/noezectz/image/upload/v1653108324/SatNaing/ezgif.com-gif-maker_2_hehtlm.gif "satnaing.dev 网站")

## 结语

总之，这个项目给了我很多关于开发博客网站（SSG）的经验和信心。现在，我已经获得了关于基于 git 的 CMS 以及它如何与 NextJS 交互的知识。我还学习了关于 SEO、动态站点地图生成和 Google 索引程序的知识。我将在未来制作更好的项目。敬请期待！✌🏻

最后但同样重要的是，我要感谢我的朋友 [Swann Fevian Kyaw](https://www.facebook.com/bon.zai.3910 "Swann Fevian Kyaw 的 Facebook 账号") (@[ToonHa](https://www.facebook.com/ToonHa-102639465752883 "ToonHa Facebook 页面"))，他为我的网站英雄部分画了一个漂亮的插图。

## 项目链接

- 网站：[https://satnaing.dev/](https://satnaing.dev/ "https://satnaing.dev/")
- 博客：[https://satnaing.dev/blog](https://satnaing.dev/blog "https://satnaing.dev/blog")
- 代码库：[https://github.com/satnaing/my-portfolio](https://github.com/satnaing/my-portfolio "https://github.com/satnaing/my-portfolio")
