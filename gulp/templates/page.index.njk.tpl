{% extends "layouts/_default.html" %}

{% set page = {
  language: 'ru',
  name: '${slug}',
  title: 'Page: ${slug}',
  appTitle: 'Yellfy',
  description: 'Your great description of page'
} %}

{% block header %}
  {% include "partials/_header.html" %}
{% endblock %}

{% block main %}
  {% include "pages/${slug}/_main.html" %}
{% endblock %}

{% block footer %}
  {% include "partials/_footer.html" %}
{% endblock %}
