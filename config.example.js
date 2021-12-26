export const api = {
  'url': 'https://api.example.com'
}

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
    'inject': `
      <script async src="https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js"></script>
      <script>
      window.onload = function () {
        mermaid.initialize({startOnLoad:true});
      };
    </script>`
  },
  {
    'kind': 'js',
    'key': 'mathjax',
    'inject': `
      <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML"></script>
      <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['$','$'], ['\\(','\\)']],
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            processEscapes: true
          },
          CommonHTML: { matchFontHeight: false }
        });
      </script>`
  }
]
