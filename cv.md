---
layout: page
title: CV
description: Nathan Wang-Ly's work in behavioural science and strategy, and his education in psychology.
---

<link rel="stylesheet" href="{{ '/assets/css/cv.css' | relative_url }}">

<section class="cv-section" aria-labelledby="cv-work-heading">
  <h2 id="cv-work-heading">Work</h2>
  {% assign work_list = site.data.experience.work %}
  {% assign sorted_work = work_list | sort: "display_order" %}

  {% for item in sorted_work %}
  <article class="cv-item">
    <div class="cv-organisation">
      <img class="cv-org-logo" src="{{ item.logo | relative_url }}" alt="{{ item.company }} logo">
      <div class="cv-org">{{ item.company }}</div>
    </div>

    {% if item.roles %}
      {% for role in item.roles %}
      <div class="cv-entry">
        <div class="cv-years">{{ role.years }}</div>
        <div class="cv-entry-content">
          <div class="cv-title">{{ role.title }}</div>
          <ul class="cv-desc-list">
            {% for line in role.description %}
              <li>{{ line | markdownify | remove: '<p>' | remove: '</p>' }}</li>
            {% endfor %}
          </ul>
        </div>
      </div>
      {% endfor %}
    {% else %}
      <div class="cv-entry">
        <div class="cv-years">{{ item.years }}</div>
        <div class="cv-entry-content">
          <div class="cv-title">{{ item.title }}</div>
          <ul class="cv-desc-list">
            {% for line in item.description %}
              <li>{{ line | markdownify | remove: '<p>' | remove: '</p>' }}</li>
            {% endfor %}
          </ul>
        </div>
      </div>
    {% endif %}
  </article>
  {% endfor %}
</section>

<section class="cv-section" aria-labelledby="cv-education-heading">
  <h2 id="cv-education-heading">Education</h2>
  {% assign education_list = site.data.experience.education %}
  {% assign sorted_education = education_list | sort: "display_order" %}

  {% for item in sorted_education %}
  <article class="cv-item cv-education-item">
    <div class="cv-organisation">
      <img class="cv-org-logo" src="{{ item.logo | relative_url }}" alt="{{ item.company }} logo">
      <div class="cv-org">{{ item.company }}</div>
    </div>
    <div class="cv-entry">
      <div class="cv-years">{{ item.years }}</div>
      <div class="cv-entry-content">
        <div class="cv-title">{{ item.title }}</div>
        <ul class="cv-desc-list">
          {% for line in item.description %}
            <li>{{ line | markdownify | remove: '<p>' | remove: '</p>' }}</li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </article>
  {% endfor %}
</section>
