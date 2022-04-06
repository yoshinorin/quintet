export const api = {
  'url': 'https://api.example.com'
}

export const siteName = 'yourSiteName';
export const siteType = 'blog';
export const mainAuthor = 'yourName';
export const lang = "ja";
export const locale = "ja_JP";
export const url = 'http://localhost:3000';
export const favicon = {
  "url": "your/favicon.ico",
  "type": "img"
};
export const defaultImage = 'defaultImage.jpg';

// NOTE: NTML support
export const title = 'Your site title'
export const subTitle = 'your site subtitle'

export const defaultRobotsMeta = "noarchive, nofollow, noimageindex, noindex"

export const archivesPage = {
  'titlePlaceholder': 'filter by title'
}
export const tagsPage = {
  'titlePlaceholder': 'filter by tag name'
}

export const headerItems = [
  {
    'url': '/',
    'position': 'left', //left or right
    'text': 'Home',
    'content': 'Home'   // HTML support
  }
]

export const coverBottomItems = [
  {
    'url': '/',
    'position': 'left', //left or right
    'text': 'Home',
    'content': 'Home'   // HTML support
  }
]

// NOTE: HTML support
export const copyrights = '&copy; jhon due'

export const footerItems = [
  {
    'url': '/',
    'text': 'home'
  },
  {
    'url': '/about',
    'text': 'about'
  }
]


// NOTE: inject external resource (perhaps from CDN) to under the <head>.
export const externalResources = [
  {
    'kind': 'js',
    'src': {
      'key': 'mermaid', // must be same with registerd db record key
      'async': false,
      'src': "https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js",
    },
    'code': {
      'key': 'mermaid', // must be same with registerd db record key
      'async': false,
      'type': "text/javascript",
      'code': `window.onload = function () {
        mermaid.initialize({startOnLoad:true});
      };`
     }
  },
  {
    'kind': 'js',
    'src': {
      'key': 'mathjax', // must be same with registerd db record key
      'async': false,
      'src': "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML",
    },
    'code': {
      'key': 'mathjax', // must be same with registerd db record key
      'async': false,
      'type': "text/x-mathjax-config",
      'code': `MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$','$'], ['\\(','\\)']],
          skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
          processEscapes: true
        },
        CommonHTML: { matchFontHeight: false }
      });`
    }
  }
]

// Should not send request list to API server
export const filterRequestPaths = [
  '**.svg',
  '**.jpg',
  '**.png',
  '**.xml',
]
