<div class="students">
  {% assign students_by_group = site.data.students | group_by: "research_group" %}
  {% for group in students_by_group %}
    <h2 class="research-group-title">{{ group.name }}</h2>
    <div class="student-container">
      {% for student in group.items %}
        <div class="student-card">
          <div class="student-card-inner">
            <div class="student-photo">
              <img src="{{ student.photo | relative_url }}" alt="{{ student.name }}">
            </div>
            <div class="student-info">
              <h3 class="student-name">
                <a href="{{ student.homepage }}">{{ student.name }}</a>
              </h3>
              <p class="student-duration">{{ student.duration }}</p>
              <p class="student-research">{{ student.research }}</p>
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  {% endfor %}
</div>

