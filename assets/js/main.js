document.addEventListener('DOMContentLoaded', function() {
  // 为研究兴趣部分的链接添加点击事件
  const links = document.querySelectorAll('#research-interests a');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // 滚动到目标元素
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 添加高亮效果
        targetElement.style.transition = 'background-color 0.5s ease';
        targetElement.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';

        setTimeout(() => {
          targetElement.style.backgroundColor = '';
        }, 2000);
      }
    });
  });

  // 添加论文点击效果
  document.querySelectorAll('.publications .title').forEach(title => {
    title.style.cursor = 'pointer';

    title.addEventListener('click', function() {
      const paper = this.closest('li');

      // 添加点击效果
      paper.style.transition = 'transform 0.2s ease';
      paper.style.transform = 'scale(0.98)';

      setTimeout(() => {
        paper.style.transform = 'translateY(-3px)';
      }, 200);

      // 如果有PDF链接，打开它
      const pdfLink = paper.querySelector('a[href$=".pdf"]');
      if (pdfLink) {
        setTimeout(() => {
          window.open(pdfLink.href, '_blank');
        }, 300);
      }
    });
  });



  // 键盘支持 - 按ESC键关闭所有打开的abstract和bibtex
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const openAbstracts = document.querySelectorAll('.abstract-content:not(.hidden)');
      openAbstracts.forEach(abstract => {
        const button = abstract.closest('.col-sm-9').querySelector('.abstract-btn');
        if (button) {
          toggleAbstract(button);
        }
      });

      const openBibtexes = document.querySelectorAll('.bibtex-content:not(.hidden)');
      openBibtexes.forEach(bibtex => {
        const button = bibtex.closest('.col-sm-9').querySelector('.bibtex-btn');
        if (button) {
          toggleBibtex(button);
        }
      });
    }
  });

  // 点击外部区域关闭abstract和bibtex
  document.addEventListener('click', function(e) {
    // 检查点击是否为Abstract/BibTeX按钮或其内容，如果是就不关闭
    if (e.target.closest('.abstract-btn') || e.target.closest('.abstract-content') ||
        e.target.closest('.bibtex-btn') || e.target.closest('.bibtex-content')) {
      return;
    }

    // 检查点击是否在论文项目外部
    if (!e.target.closest('.publication-item')) {
      const openAbstracts = document.querySelectorAll('.abstract-content:not(.hidden)');
      openAbstracts.forEach(abstract => {
        const button = abstract.closest('.col-sm-9').querySelector('.abstract-btn');
        if (button) {
          toggleAbstract(button);
        }
      });

      const openBibtexes = document.querySelectorAll('.bibtex-content:not(.hidden)');
      openBibtexes.forEach(bibtex => {
        const button = bibtex.closest('.col-sm-9').querySelector('.bibtex-btn');
        if (button) {
          toggleBibtex(button);
        }
      });
    }
  });

  // 为所有Abstract按钮添加点击事件监听器
  document.querySelectorAll('.abstract-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleAbstract(this);
    });
  });

  // 为所有BibTeX按钮添加点击事件监听器
  document.querySelectorAll('.bibtex-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleBibtex(this);
    });
  });
});

function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Abstract button functionality
function toggleAbstract(button) {
  // 找到对应的abstract内容div
  const abstractDiv = button.closest('.col-sm-9').querySelector('.abstract-content');

  if (!abstractDiv) return; // 如果没有找到abstract div就返回

  if (abstractDiv.classList.contains('hidden')) {
    // 显示abstract
    abstractDiv.classList.remove('hidden');
    abstractDiv.classList.add('slide-enter');
    button.innerHTML = '<i class="fas fa-align-left"></i> Hide';
    button.classList.add('active');

    // 移除动画类
    setTimeout(() => {
      abstractDiv.classList.remove('slide-enter');
    }, 300);
  } else {
    // 隐藏abstract
    abstractDiv.classList.add('slide-exit');
    button.innerHTML = '<i class="fas fa-align-left"></i> ABS';
    button.classList.remove('active');

    // 添加hidden类并移除动画类
    setTimeout(() => {
      abstractDiv.classList.add('hidden');
      abstractDiv.classList.remove('slide-exit');
    }, 300);
  }
}

// BibTeX button functionality
function toggleBibtex(button) {
  // 找到对应的bibtex内容div
  const bibtexDiv = button.closest('.col-sm-9').querySelector('.bibtex-content');

  if (!bibtexDiv) return; // 如果没有找到bibtex div就返回

  if (bibtexDiv.classList.contains('hidden')) {
    // 显示bibtex
    bibtexDiv.classList.remove('hidden');
    bibtexDiv.classList.add('slide-enter');
    button.innerHTML = '<i class="fas fa-quote-right"></i> Hide';
    button.classList.add('active');

    // 移除动画类
    setTimeout(() => {
      bibtexDiv.classList.remove('slide-enter');
    }, 300);
  } else {
    // 隐藏bibtex
    bibtexDiv.classList.add('slide-exit');
    button.innerHTML = '<i class="fas fa-quote-right"></i> BIB';
    button.classList.remove('active');

    // 添加hidden类并移除动画类
    setTimeout(() => {
      bibtexDiv.classList.add('hidden');
      bibtexDiv.classList.remove('slide-exit');
    }, 300);
  }
}