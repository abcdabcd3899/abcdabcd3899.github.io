// Representative Work: click-to-play videos.
// The cover is a plain link to the MP4 (works without JS); with JS it is swapped
// for an inline <video> on click, so no video bytes are downloaded until then.
document.addEventListener('DOMContentLoaded', function () {
  var players = document.querySelectorAll('.showcase-player[data-video]');

  function pauseOthers(current) {
    document.querySelectorAll('.showcase video').forEach(function (v) {
      if (v !== current && !v.paused) v.pause();
    });
  }

  players.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      var video = document.createElement('video');
      video.className = 'showcase-video';
      video.src = link.getAttribute('data-video');
      video.poster = link.getAttribute('data-poster') || '';
      video.controls = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('aria-label', link.getAttribute('aria-label') || 'Demo video');
      video.addEventListener('play', function () { pauseOthers(video); });

      link.replaceWith(video);
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { /* autoplay blocked: controls are visible, user can press play */ });
      }
      video.focus();
    });
  });
});
