---
layout: page
title: CV
---

<link rel="stylesheet" href="{{ '/assets/css/cv.css' | relative_url }}">

## Work

{% assign work_list = site.data.experience.work %}
{% assign sorted_work = work_list | sort: "year_end" | reversed %}

{% for item in sorted_work %}
<div class="cv-item">
  <div class="cv-org">{{ item.company }}</div>
  
  {% if item.roles %}
    {% for role in item.roles %}
    <div class="role-entry" style="margin-bottom: 15px; margin-top: 10px;">
      <div class="cv-header">
        <span class="cv-title" style="font-size: 1.1rem;">{{ role.title }}</span>
        <span class="cv-years">{{ role.years }}</span>
      </div>
      <ul class="cv-desc-list">
        {% for line in role.description %}
          <li>{{ line | markdownify | remove: '<p>' | remove: '</p>' }}</li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
    
  {% else %}
    <div class="cv-header">
      <span class="cv-title">{{ item.title }}</span>
      <span class="cv-years">{{ item.years }}</span>
    </div>
    <ul class="cv-desc-list">
      {% for line in item.description %}
        <li>{{ line | markdownify | remove: '<p>' | remove: '</p>' }}</li>
      {% endfor %}
    </ul>
  {% endif %}
</div>
{% endfor %}

## Education

{% assign education_list = site.data.experience.education %}
{% assign sorted_education = education_list | sort: "year_end" | reversed %}

{% for item in sorted_education %}
<div class="cv-item">
  <div class="cv-header">
    <span class="cv-title">{{ item.title }}</span>
    <span class="cv-years">{{ item.years }}</span>
  </div>
  <div class="cv-org">{{ item.company }}</div>
  <ul class="cv-desc-list">
    {% for line in item.description %}
      <li>{{ line }}</li>
    {% endfor %}
  </ul>
</div>
{% endfor %}