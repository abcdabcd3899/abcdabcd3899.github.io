<div class="publications">

{% assign sorted_papers = site.data.publications.main | sort: "year" | reverse %}

<!-- 首先显示 Under Review 的论文 (只在完整publications页面显示) -->
{% assign under_review_papers = sorted_papers | where: "under_review", true %}
{% if under_review_papers.size > 0 and page.layout != 'homepage' %}
  <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: #0A4B8F; border-bottom: 2px solid #0A4B8F; padding-bottom: 0.5rem;">Under Review</h3>

  <ol class="bibliography">
  {% for link in under_review_papers %}
    {% if page.layout == 'homepage' and link.selected != true %}
      {% continue %}
    {% endif %}

    <li id="{{ link.id }}" class="publication-item">
    <div class="pub-row">
      <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
        {% if link.image %}
        <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
        {% if link.conference_short %}
        <abbr class="badge">{{ link.conference_short }}</abbr>
        {% endif %}
        {% endif %}
      </div>
      <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
          <div class="title">
            <a href="{{ link.pdf }}">{{ link.title }}</a>
          </div>
          <div class="author">
            {% assign author_list = link.authors %}
            <!-- 检查 Jun-Peng Zhu 是否是通信作者 -->
            {% assign is_corr_author = false %}
            {% if link.corresponding_authors %}
              {% for corr_author in link.corresponding_authors %}
                {% if corr_author == "Jun-Peng Zhu" %}
                  {% assign is_corr_author = true %}
                {% endif %}
              {% endfor %}
            {% endif %}

            <!-- 高亮第一作者 Jun-Peng Zhu，如果是通信作者则添加标记 -->
            {% if is_corr_author %}
              {% assign author_list = author_list | replace: "Jun-Peng Zhu", '<strong><em style="color: #0A4B8F;">Jun-Peng Zhu</em></strong><sup><i class="fas fa-envelope" style="font-size: 0.8em;"></i></sup>' %}
            {% else %}
              {% assign author_list = author_list | replace: "Jun-Peng Zhu", '<strong><em style="color: #0A4B8F;">Jun-Peng Zhu</em></strong>' %}
            {% endif %}

            <!-- 动态标记其他通信作者 -->
            {% if link.corresponding_authors %}
              {% for corr_author in link.corresponding_authors %}
                {% unless corr_author == "Jun-Peng Zhu" %}
                  {% assign replacement = corr_author | append: '<sup><i class="fas fa-envelope" style="font-size: 0.8em;"></i></sup>' %}
                  {% assign author_list = author_list | replace: corr_author, replacement %}
                {% endunless %}
              {% endfor %}
            {% endif %}

            {{ author_list }}
          </div>
          {% if link.conference %}
          <div class="periodical" style="font-weight: bold; color: #0A4B8F; margin-bottom: 2px;">
            <em>{{ link.conference }}</em>
          </div>
          {% endif %}
        <div class="links">
          {% if link.abstract %}
          <button class="abstract-btn btn btn-sm z-depth-0" style="font-size:12px;">
            <i class="fas fa-align-left"></i> ABS
          </button>
          {% endif %}
          {% if link.bibtex %}
          <button class="bibtex-btn btn btn-sm z-depth-0" style="font-size:12px;">
            <i class="fas fa-quote-right"></i> BIB
          </button>
          {% endif %}
          {% if link.pdf %}
          <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-file-pdf"></i> PDF
          </a>
          {% endif %}
          {% if link.appendix %}
          <a href="{{ link.appendix }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-file-alt"></i> Appendix
          </a>
          {% endif %}
          {% if link.code %}
          <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-code"></i> Code
          </a>
          {% endif %}
          {% if link.video %}
          <a href="{{ link.video }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-video"></i> Video
          </a>
          {% endif %}
          {% if link.page %}
          <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-globe"></i> Project Page
          </a>
          {% endif %}
          {% if link.blog %}
          <a href="{{ link.blog }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-pen-nib"></i> Blog
          </a>
          {% endif %}
          {% if link.citations %}
          <span class="btn btn-sm z-depth-0 citation-badge" title="Google Scholar引用次数" style="font-size:12px; background-color: #f8f9fa; color: #6c757d; border: 1px solid #dee2e6; cursor: default;">
            <i class="fas fa-quote-left"></i> {{ link.citations }}
          </span>
          {% endif %}
          {% if link.others %}
          {{ link.others }}
          {% endif %}
        </div>

        {% if link.abstract %}
        <div class="abstract-content hidden">
          <p>{{ link.abstract }}</p>
        </div>
        {% endif %}

        {% if link.bibtex %}
        <div class="bibtex-content hidden" style="position: relative;">
          <pre class="bibtex-code" style="padding: 10px; border-radius: 4px; font-size: 12px; white-space: pre-wrap; word-wrap: break-word; overflow-x: auto;"><code>{{ link.bibtex }}</code></pre>
          <button class="copy-bibtex-btn" title="Copy BibTeX">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        {% endif %}

        {% if link.notes %}
        <div class="pub-notes">
          <strong><i>{{ link.notes }}</i></strong>
        </div>
        {% endif %}
        <!-- 显示标签 -->
        {% if link.labels %}
        <div class="tags">
          {% for label in link.labels %}
            {% assign label_class = label | downcase | replace: ", ", "-" | replace: " ", "-" | replace: ",", "" %}
            <span class="tag tag-{{ label_class }}">{{ label }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </div>
    </div>
    </li>
  {% endfor %}
  </ol>
{% endif %}

<!-- 然后按年份显示已发表/接收的论文 -->
{% assign published_papers = sorted_papers | where: "under_review", false %}
{% assign current_year = "" %}
{% for link in published_papers %}
  {% if page.layout == 'homepage' and link.selected != true %}
    {% continue %}
  {% endif %}

  {% assign year_string = link.year | toString %}
  {% assign paper_year = year_string | slice: 0, 4 %}

  {% if paper_year != current_year %}
    {% unless current_year == "" %}
      </ol>
    {% endunless %}

    <!-- 简洁的年份标题 -->
    <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: #0A4B8F; border-bottom: 2px solid #0A4B8F; padding-bottom: 0.5rem;">{{ paper_year }}</h3>

    <ol class="bibliography">
    {% assign current_year = paper_year %}
  {% endif %}

  <li id="{{ link.id }}" class="publication-item">
  <div class="pub-row">
    <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
      {% if link.image %}
      <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
      {% if link.conference_short %}
      <abbr class="badge">{{ link.conference_short }}</abbr>
      {% endif %}
      {% endif %}
    </div>
    <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
        <div class="title">
          <a href="{{ link.pdf }}">{{ link.title }}</a>
        </div>
        <div class="author">
          {% assign author_list = link.authors %}
          <!-- 检查 Jun-Peng Zhu 是否是通信作者 -->
          {% assign is_corr_author = false %}
          {% if link.corresponding_authors %}
            {% for corr_author in link.corresponding_authors %}
              {% if corr_author == "Jun-Peng Zhu" %}
                {% assign is_corr_author = true %}
              {% endif %}
            {% endfor %}
          {% endif %}

          <!-- 高亮第一作者 Jun-Peng Zhu，如果是通信作者则添加标记 -->
          {% if is_corr_author %}
            {% assign author_list = author_list | replace: "Jun-Peng Zhu", '<strong><em style="color: #0A4B8F;">Jun-Peng Zhu</em></strong><sup><i class="fas fa-envelope" style="font-size: 0.8em;"></i></sup>' %}
          {% else %}
            {% assign author_list = author_list | replace: "Jun-Peng Zhu", '<strong><em style="color: #0A4B8F;">Jun-Peng Zhu</em></strong>' %}
          {% endif %}

          <!-- 动态标记其他通信作者 -->
          {% if link.corresponding_authors %}
            {% for corr_author in link.corresponding_authors %}
              {% unless corr_author == "Jun-Peng Zhu" %}
                {% assign replacement = corr_author | append: '<sup><i class="fas fa-envelope" style="font-size: 0.8em;"></i></sup>' %}
                {% assign author_list = author_list | replace: corr_author, replacement %}
              {% endunless %}
            {% endfor %}
          {% endif %}

          {{ author_list }}
        </div>
        {% if link.conference %}
        <div class="periodical" style="font-weight: bold; color: #0A4B8F; margin-bottom: 2px;">
          <em>{{ link.conference }}</em>
        </div>
        {% endif %}

        <div class="links">
          {% if link.abstract %}
          <button class="abstract-btn btn btn-sm z-depth-0" style="font-size:12px;">
            <i class="fas fa-align-left"></i> ABS
          </button>
          {% endif %}
          {% if link.bibtex %}
          <button class="bibtex-btn btn btn-sm z-depth-0" style="font-size:12px;">
            <i class="fas fa-quote-right"></i> BIB
          </button>
          {% endif %}
          {% if link.pdf %}
          <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-file-pdf"></i> PDF
          </a>
          {% endif %}
          {% if link.appendix %}
          <a href="{{ link.appendix }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-file-alt"></i> Appendix
          </a>
          {% endif %}
          {% if link.code %}
          <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-code"></i> Code
          </a>
          {% endif %}
          {% if link.video %}
          <a href="{{ link.video }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-video"></i> Video
          </a>
          {% endif %}
          {% if link.page %}
          <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-globe"></i> Project Page
          </a>
          {% endif %}
          {% if link.blog %}
          <a href="{{ link.blog }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">
            <i class="fas fa-pen-nib"></i> Blog
          </a>
          {% endif %}
          {% if link.citations %}
          <span class="btn btn-sm z-depth-0 citation-badge" title="Google Scholar引用次数" style="font-size:12px; background-color: #f8f9fa; color: #6c757d; border: 1px solid #dee2e6; cursor: default;">
            <i class="fas fa-quote-left"></i> {{ link.citations }}
          </span>
          {% endif %}
          {% if link.others %}
          {{ link.others }}
          {% endif %}
        </div>

        {% if link.abstract %}
        <div class="abstract-content hidden">
          <p>{{ link.abstract }}</p>
        </div>
        {% endif %}

        {% if link.bibtex %}
        <div class="bibtex-content hidden" style="position: relative;">
          <pre class="bibtex-code" style="padding: 10px; border-radius: 4px; font-size: 12px; white-space: pre-wrap; word-wrap: break-word; overflow-x: auto;"><code>{{ link.bibtex }}</code></pre>
          <button class="copy-bibtex-btn" title="Copy BibTeX">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        {% endif %}

        {% if link.notes %}
        <div class="pub-notes">
          <strong><i>{{ link.notes }}</i></strong>
        </div>
        {% endif %}
        <!-- 显示标签 -->
        {% if link.labels %}
        <div class="tags">
          {% for label in link.labels %}
            {% assign label_class = label | downcase | replace: ", ", "-" | replace: " ", "-" | replace: ",", "" %}
            <span class="tag tag-{{ label_class }}">{{ label }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </div>
    </div>
  </li>
{% endfor %}

{% unless current_year == "" %}
  </ol>
{% endunless %}

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Copy BibTeX functionality
  document.querySelectorAll('.copy-bibtex-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();

      const bibtexCode = this.previousElementSibling.querySelector('code');
      const textToCopy = bibtexCode.textContent;

      // Copy to clipboard
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(function() {
          showCopyFeedback(btn, true);
        }).catch(function() {
          fallbackCopyTextToClipboard(textToCopy, btn);
        });
      } else {
        fallbackCopyTextToClipboard(textToCopy, btn);
      }
    });
  });

  // Copy feedback function
  function showCopyFeedback(btn, success) {
    const originalHtml = btn.innerHTML;
    const originalTitle = btn.title;

    if (success) {
      btn.innerHTML = '<i class="fas fa-check"></i>';
      btn.title = 'Copied!';
      btn.classList.add('success');
    } else {
      btn.innerHTML = '<i class="fas fa-times"></i>';
      btn.title = 'Copy failed';
      btn.classList.add('error');
    }

    setTimeout(function() {
      btn.innerHTML = originalHtml;
      btn.title = originalTitle;
      btn.classList.remove('success', 'error');
    }, 2000);
  }

  // Fallback copy function for older browsers
  function fallbackCopyTextToClipboard(text, btn) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      showCopyFeedback(btn, successful);
    } catch (err) {
      showCopyFeedback(btn, false);
    }

    document.body.removeChild(textArea);
  }
});
</script>
