var h = require('hyperscript')
var path = require('path')
var id = require('./keys').id

require('depject')([
  require('./views'),
  {
  message_name: require('./modules/message-name.js'),
  message_link: require('./modules/message-link.js'),
  nav: require('./modules/nav'),
  sbot:  require('./modules/sbot'),
  identity:  require('patchidentity'),
  compose:  require('patchcompose'),
  names:  require('patchavatar-names'),
  avatarRaw:  require('patchavatar-raw'),
  confirm:  require('patchconfirm-lightbox'),
  suggest: require('patchsuggest')
  },
  {
    app: {
      gives: {},
      needs: { 
        nav: { screen: 'first' },
        avatar: {image: 'first', name: 'first'}
      },
      create: function (api) {
        document.head.appendChild(h('style', require('./style.css.json')))
        document.body.appendChild(h('div.navbar',
          h('div.internal',
            h('li', h('a.Avatar', {href: '#' + id}, api.avatar.image(id))),
            h('li', h('a', {href: '#' + id}, api.avatar.name(id))),
            h('li', h('a', {href: '#'}, 'Public')),
            //h('li', h('a', {href: '#mentions'}, 'Mentions')),
            h('li', h('a', {href: '#private'}, 'Private')),
            h('li', h('a', {href: '#compose'}, 'Compose')),
            //h('li', h('a', {href: '#key'}, 'Key')),
            /*h('form.search', { onsubmit: function (e) {
                //if (err) throw err
                window.location.hash = '?' + search.value
                e.preventDefault()
              }},
              search,
              h('button.btn.btn-primary.btn-search', 'Search')
            )*/
          )
        ))
        document.body.appendChild(api.nav.screen())
        return function () {}
      }
    }
  },
  require('./modules/vote'),
  require('patchcompose-drafts'),
  require('patchcompose-file')
])


