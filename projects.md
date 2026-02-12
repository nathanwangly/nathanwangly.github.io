---
layout: page
title: Projects
permalink: /projects/
---

<link rel="stylesheet" href="{{ '/assets/css/projects.css' | relative_url }}">

<i>Things that have been keeping me occupied</i>

<div class="projects-list">
  {% for project in site.data.projects %}
  <div class="project-card {% if project.url == nil and project.blog_url == nil %}no-links{% endif %}">
    <div class="project-content">
      <div class="project-meta-row">
        <span class="project-tag">{{ project.tag }}</span>
        {% if project.status %}<span class="status-badge" data-status="{{ project.status | lowercase }}">{{ project.status }}</span>{% endif %}
      </div><h2 class="project-name" style="margin-top: 0 !important; padding-top: 0 !important;">{{ project.name }}</h2>
      <p class="project-description">{{ project.description }}</p>
      
      <div class="project-actions">
        {% if project.project_url and project.project_url != "" %}
          <a href="{{ project.project_url | relative_url }}" class="btn btn-primary">
            <i class="fa-solid fa-external-link"></i> View Project
          </a>
        {% endif %}

        {% if project.post_url and project.post_url != "" %}
          <a href="{{ project.post_url | relative_url }}" class="btn btn-secondary">
            <i class="fa-solid fa-book-open"></i> Read More
          </a>
        {% endif %}
      </div>
    </div>
  </div>
  {% endfor %}
</div>