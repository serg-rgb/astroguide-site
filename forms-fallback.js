// Static-only fallback for HTML forms that target /api/* routes.
// The Next.js port will replace this with Resend-backed POST handlers.
(function () {
  function buildBody(formData) {
    var lines = [];
    formData.forEach(function (value, key) {
      if (key === 'confirm' || key === 'g-recaptcha-response') return;
      lines.push(key + ': ' + value);
    });
    return lines.join('\n');
  }

  function intercept(form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var topic = (form.dataset.mailSubject || form.getAttribute('name') || 'Message')
        .replace(/[-_]/g, ' ');
      var subject = 'AstroGuide — ' + topic;
      var body = buildBody(data) + '\n\n— Sent from astroguides.app';
      var href = 'mailto:support@astroguides.app'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      window.location.href = href;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[action^="/api/"]').forEach(intercept);
  });
})();
