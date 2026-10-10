---
layout: page
title: CV
description: Nathan Wang-Ly's work in behavioural science and strategy, and his education in psychology.
---

{% assign cv = site.data.cv %}
<link rel="stylesheet" href="{{ '/assets/css/cv.css' | relative_url }}">

<section class="cv-overview" aria-labelledby="summary-heading">
  <div class="cv-section-heading">
    <h2 id="summary-heading">{{ cv.overview.summary_heading | escape }}</h2>
  </div>

  <div class="cv-overview-card">
    <div class="cv-overview-intro">
      <ul class="cv-background">
        {% for point in cv.overview.summary %}<li>{{ point | escape }}</li>{% endfor %}
      </ul>
    </div>

    <div class="cv-overview-facts">
      <div class="cv-current-role">
        <img src="{{ cv.overview.current.logo | relative_url }}" alt="{{ cv.overview.current.logo_alt | escape }}" class="cv-overview-logo cv-current-logo">
        <div><span class="cv-fact-label">{{ cv.overview.current.label | escape }}</span><strong>{{ cv.overview.current.title | escape }}</strong><span class="cv-fact-company">{{ cv.overview.current.company_line | escape }}</span></div>
      </div>

      <div class="cv-overview-previous">
        <span class="cv-fact-label">{{ cv.overview.previous.label | escape }}</span>
        <div class="cv-logo-row" aria-label="{{ cv.overview.previous.logos_label | escape }}">
          {% for logo in cv.overview.previous.logos limit:4 %}<img src="{{ logo.path | relative_url }}" alt="{{ logo.alt | escape }}" class="cv-overview-logo">{% endfor %}
        </div>
      </div>

      <div class="cv-overview-education">
        <span class="cv-fact-label">{{ cv.overview.education.label | escape }}</span>
        <div class="cv-education-row">
          <img src="{{ cv.overview.education.logo | relative_url }}" alt="{{ cv.overview.education.logo_alt | escape }}" class="cv-overview-logo cv-education-logo">
          <p class="cv-education-degrees">{{ cv.overview.education.degrees | escape }}</p>
        </div>
      </div>
    </div>

    <div class="cv-skill-tags" aria-label="{{ cv.overview.skills_label | escape }}">
      {% for skill in cv.overview.skills %}<span>{{ skill | escape }}</span>{% endfor %}
    </div>
  </div>
</section>

<section class="cv-section" aria-labelledby="experience-heading">
  <div class="cv-section-heading">
    <h2 id="experience-heading">{{ cv.experience.heading | escape }}</h2>
  </div>

  <div class="cv-card-rail" aria-label="{{ cv.experience.rail_label | escape }}" tabindex="0">
    {% for company in cv.experience.companies %}
    <article class="cv-work-card{% if company.current %} cv-work-card-current{% endif %}{% if company.roles.size > 1 %} cv-work-card-grouped{% endif %}">
      {% assign latest_role = company.roles.first %}
      <span class="cv-work-card-top"><span class="cv-work-company"><img src="{{ company.logo | relative_url }}" alt="" class="cv-work-logo">{{ company.company | escape }}</span><span>{{ company.years | escape }}</span></span>
      {% if company.roles.size > 1 %}
      <div class="cv-work-roles">
        {% for role in company.roles %}
        <div class="cv-work-role">
          <h3 class="cv-work-card-title">{{ role.title | escape }}</h3>
          <div class="cv-work-role-timeline"><span class="cv-work-role-years">{{ role.years | escape }}</span></div>
          {% if role.teaser %}<p class="cv-work-card-teaser">{{ role.teaser | escape }}</p>{% endif %}
        </div>
        {% endfor %}
      </div>
      {% else %}
      <h3 class="cv-work-card-title">{{ latest_role.title | escape }}</h3>
      {% if latest_role.teaser %}<p class="cv-work-card-teaser">{{ latest_role.teaser | escape }}</p>{% endif %}
      {% endif %}
    </article>
    {% endfor %}
  </div>
</section>
