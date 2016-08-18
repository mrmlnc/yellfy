extends layouts/_default

block vars
  -
    page = {
      language: 'ru',
      name: '${slug}',
      title: 'Page: ${slug}',
      appTitle: 'Yellfy',
      description: 'Your great description of page'
    }
block header
  include partials/_header

block main
  include pages/${slug}/_main

block footer
  include partials/_footer
