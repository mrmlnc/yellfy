{% extends "layouts/_default.njk" %}

{% set page = {
  language: 'ru',
  name: '${slug}',
  title: 'Page: ${slug}',
  appTitle: 'Yellfy',
  description: 'Your great description of page'
} %}

{% block header %}
  {% include "partials/_header.njk" %}
{% endblock %}

{% block main %}
  {% include "pages/${slug}/_main.njk" %}
{% endblock %}

{% block footer %}
  {% include "partials/_footer.njk" %}
{% endblock %}
