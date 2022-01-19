export const api = {
  'url': 'https://api.example.com'
}

export const url = 'http://localhost:3000'

// NOTE: NTML support
export const title = 'Your site title'
export const subTitle = 'your site subtitle'

export const defaultRobotsMeta = "noarchive, nofollow, noimageindex, noindex"

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
    'key': 'mermaid',
    'inject': [
      {
        'async': false,
        'type': "",
        'src': "https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js",
        'code': ""
      },
      {
        'async': false,
        'type': "text/javascript",
        'src': "",
        'code': `window.onload = function () {
          mermaid.initialize({startOnLoad:true});
        };`
      }
    ]
  },
  {
    'kind': 'js',
    'key': 'mathjax',
    'inject': [
      {
        'async': false,
        'type': "",
        'src': "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML",
        'code': ""
      },
      {
        'async': false,
        'type': "text/x-mathjax-config",
        'src': "",
        'code': `MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['$','$'], ['\\(','\\)']],
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            processEscapes: true
          },
          CommonHTML: { matchFontHeight: false }
        });`
      }
    ]
  }
]
