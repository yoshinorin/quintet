export const api = {
  url: "http://localhost:9002"
};

export const publicApi = {
  url: "http://localhost:9002"
};

export const siteName = "E2E Test Site";
export const mainAuthor = "john doe";
export const lang = "ja";
export const locale = "ja_JP";
export const url = "http://localhost:3000";
export const favicon = {
  url: "your/favicon.ico",
  type: "img"
};
export const defaultImage = "defaultImage.jpg";

// NOTE: NTML support
export const title = "E2E Test Site Title";
export const subTitle = "E2E Test Site Subtitle";

export const defaultRobotsMeta = "noarchive, nofollow, noimageindex, noindex";

export const archivesPage = {
  titlePlaceholder: "filter by title",
  pathPlaceholder: "filter by path",
  found: "posts"
};
export const tagsPage = {
  titlePlaceholder: "filter by tag name",
  found: "tags"
};

export const headerItems = [
  {
    url: "/",
    position: "left", //left or right
    text: "Home",
    content: "Go to Home" // HTML support
  }
];

export const coverBottomItems = [
  {
    url: "/archives/",
    position: "left", //left or right
    text: "Archives",
    content: "Go to Archives" // HTML support
  }
];

export const pinned = [
  { title: "title1", description: "example description1", url: "/" },
  { title: "title2", description: "example description2", url: "/" },
  { title: "title3", description: "example description3", url: "/" }
];

// NOTE: HTML support
export const copyrights = "&copy; jhon due";

export const footerItems = [
  {
    url: "/",
    text: "FooterHome"
  },
  {
    url: "/about",
    text: "FooterAbout"
  }
];

// Inject <meta> to all pages. Only supports `name` and `content`.
export const injectMetas = [
  {
    name: "injectedMetaName",
    content: "injectedMetaContent"
  }
];

// NOTE: inject external resource (perhaps from CDN) to under the <head>.
export const externalResources = [
  {
    kind: "js",
    src: {
      key: "mermaid", // must be same with registerd db record key
      async: false,
      src: "https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js"
    },
    code: {
      key: "mermaid", // must be same with registerd db record key
      async: false,
      type: "text/javascript",
      code: `window.onload = function () {
        mermaid.initialize({startOnLoad:true});
      };`
    }
  },
  {
    kind: "js",
    src: {
      key: "mathjax", // must be same with registerd db record key
      async: false,
      src: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML"
    },
    code: {
      key: "mathjax", // must be same with registerd db record key
      async: false,
      type: "text/x-mathjax-config",
      code: `MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$','$'], ['\\(','\\)']],
          skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
          processEscapes: true
        },
        CommonHTML: { matchFontHeight: false }
      });`
    }
  }
];

// Should not send request list to API server
export const filterRequestPaths = [
  "**.svg",
  "**.jpg",
  "**.png",
  "**.xml",
  "**.ico",
  "**.webp"
];
