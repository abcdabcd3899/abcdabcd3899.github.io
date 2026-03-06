<div class="lab-content-wrapper">
  <div class="lab-title">
    <img src="{{ site.baseurl }}/assets/img/daslab-logo.png" alt="DASLAB Logo" class="lab-logo">
  </div>

  <div class="research-areas">
    <h2>Research Areas</h2>
    <p>
      In the era of large language models (LLMs), the boundary between unstructured and structured data is blurring, creating unprecedented opportunities for data system. Our lab's vision is to build the next generation of data systems that can seamlessly harness the power of LLMs. We design and build intelligent, scalable, and distributed data systems that can efficiently manage and process massive datasets for both traditional and AI workloads. We are particularly interested in exploring the intersection of AI and data systems.
    </p>
  </div>

  <div class="members-section">
    <h2>Members</h2>
    <h3 class="research-group-title">Principal Investigator (PI)</h3>
    <div class="lab-member-container">
      {% for member in site.data.lab %}
        {% if member.name == "Jun-Peng Zhu" %}
          <div class="lab-member-card">
            <div class="lab-member-card-inner">
              <div class="lab-member-photo">
                <img src="{{ member.photo | relative_url }}" alt="{{ member.name }}">
              </div>
              <div class="lab-member-info">
                <h3 class="lab-member-name">
                  <a href="{{ member.homepage }}">{{ member.name }}</a>
                </h3>
                <p class="lab-member-duration">{{ member.duration }}</p>
              </div>
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>

    <h3 class="research-group-title">Students</h3>
    <div class="lab-member-container">
      {% for member in site.data.lab %}
        {% unless member.name == "Jun-Peng Zhu" %}
          <div class="lab-member-card">
            <div class="lab-member-card-inner">
              <div class="lab-member-photo">
                <img src="{{ member.photo | relative_url }}" alt="{{ member.name }}">
              </div>
              <div class="lab-member-info">
                <h3 class="lab-member-name">
                  <a href="{{ member.homepage }}">{{ member.name }}</a>
                </h3>
                <p class="lab-member-duration">{{ member.duration }}</p>
              </div>
            </div>
          </div>
        {% endunless %}
      {% endfor %}
    </div>
  </div>
</div>
