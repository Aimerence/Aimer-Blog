export const SITE = {
  website: "https://www.521942.xyz/", // replace this with your deployed domain
  author: "Aimer",
  profile: "https://github.com/Aimerence/",
  desc: "A simple blog .",
  title: "Aimer",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/Aimerence/aimer-blog/edit/main",
  },
  dynamicOgImage: true,
} as const;
