---
layout: page
title: Posts
description: Writing by Nathan Wang-Ly about personal projects and behavioural science.
permalink: /posts/
---

## All Posts

<ul>
  {% for post in site.posts %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span> — 
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
