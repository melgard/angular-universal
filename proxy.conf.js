const PROXY_CONFIG = [
  {
    context: [
      '/api/searchables',
      '/api/searchables/offer',
      '/api/searchables/company',
      '/api/searchables/user',
      '/api/timelines',
      '/api/preselected'
    ],
    pathRewrite: {
      '^/api/searchables': '/searchables',
      '^/api/searchables/offer': '/searchables/offer',
      '^/api/searchables/company': '/searchables/company',
      '^/api/searchables/user': '/searchables/user',
      '^/api/timelines': '/timelines',
      '^/api/preselected': '/preselected'
    },
    target: 'http://localhost:3000',
    secure: false
  },
  {
    context: [
      '/me',
      '/logout',
      '/login',
      '/api'
    ],
    target: 'http://localhost:4000',
    secure: false
  }
];

module.exports = PROXY_CONFIG;
