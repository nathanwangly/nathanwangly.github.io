---
layout: page
title: Research
---

A collection of my research publications, mostly published during my PhD years. 

My research interests primarily centre around understanding and improving how people make complex decisions under uncertainty.

## Journal articles

{% assign sorted_academic = site.data.publications.academic | sort: "year" | reverse %}

{% for item in sorted_academic %}
  <div class="pub-item">
    <div class="pub-title"><b>{{ item.title }}</b></div>
    <div class="pub-authors"><em>{{ item.authors }}</em>, {{ item.year }}</div>
    <div class="pub-journal">{{ item.journal }}</div>
    
    <div class="pub-links">
      {% if item.link_web %}
        <a href="{{ item.link_web }}" class="text-link">Web</a>
      {% endif %}

      {% if item.link_pdf %}
        <a href="{{ item.link_pdf }}" class="text-link">PDF</a>
      {% endif %}
    </div>
  </div>
{% endfor %}

## Other

{% assign sorted_other = site.data.publications.other | sort: "year" | reverse %}

{% for item in sorted_other %}
  <div class="pub-item">
    <div class="pub-type">[{{ item.type }}]</div>
    <div class="pub-title"><b>{{ item.title }}</b></div>
    <div class="pub-authors"><em>{{ item.authors }}</em>, {{ item.year }}</div>
    
    <div class="pub-links">
      {% if item.link_web %}
        <a href="{{ item.link_web }}" class="text-link">Web</a>
      {% endif %}

      {% if item.link_pdf %}
        <a href="{{ item.link_pdf }}" class="text-link">PDF</a>
      {% endif %}
    </div>
  </div>
{% endfor %}