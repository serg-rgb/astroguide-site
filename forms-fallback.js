/* Progressive enhancement for the static support and account-deletion forms. */
(function () {
  'use strict';

  var API_BASE = 'https://api.astroguides.app/api/v1';
  var copy = {
    en: {
      sending: 'Sending…',
      success: 'Thank you. Your request was received. Reference: ',
      deletionSent: 'Request received. Check your inbox and open the verification link within 24 hours. This receipt does not confirm deletion. Request: ',
      deletionQueued: 'Request received, but we could not deliver the verification email yet. Support will review it and retry delivery. This receipt does not confirm deletion. Reference: ',
      deletionCompleted: 'Your AstroGuide account and its associated data were permanently deleted. Google Play subscriptions must be cancelled separately.',
      deletionNotFound: 'No matching account was found, so no account was deleted. Check the linked Google email, or use authenticated in-app deletion. This static email form cannot accept anonymous recovery credentials.',
      restored: 'Your unfinished form was restored in this tab.',
      invalid: 'Please check the highlighted fields.',
      error: 'We could not send this right now. Your text is saved in this tab; please try again.',
      rate: 'Too many attempts. Your text is saved; please try again in an hour.'
    },
    es: {
      sending: 'Enviando…',
      success: 'Gracias. Recibimos tu solicitud. Referencia: ',
      deletionSent: 'Solicitud recibida. Revisa tu correo y abre el enlace de verificación en 24 horas. Este recibo no confirma la eliminación. Solicitud: ',
      deletionQueued: 'Solicitud recibida, pero aún no pudimos entregar el correo de verificación. Soporte la revisará y reintentará el envío. Este recibo no confirma la eliminación. Referencia: ',
      deletionCompleted: 'Tu cuenta de AstroGuide y sus datos asociados se eliminaron de forma permanente. Las suscripciones de Google Play deben cancelarse por separado.',
      deletionNotFound: 'No encontramos una cuenta coincidente, por lo que no se eliminó ninguna cuenta. Revisa el correo de Google vinculado o usa la eliminación autenticada dentro de la app. Este formulario estático de correo no acepta credenciales de recuperación anónimas.',
      restored: 'Restauramos el formulario sin terminar en esta pestaña.',
      invalid: 'Revisa los campos resaltados.',
      error: 'No pudimos enviarlo ahora. El texto está guardado en esta pestaña; inténtalo de nuevo.',
      rate: 'Demasiados intentos. El texto está guardado; inténtalo de nuevo en una hora.'
    },
    ru: {
      sending: 'Отправляем…',
      success: 'Спасибо. Запрос получен. Номер: ',
      deletionSent: 'Запрос получен. Проверьте почту и откройте ссылку подтверждения в течение 24 часов. Эта квитанция не подтверждает удаление. Запрос: ',
      deletionQueued: 'Запрос получен, но письмо подтверждения пока не доставлено. Поддержка проверит его и повторит отправку. Эта квитанция не подтверждает удаление. Номер: ',
      deletionCompleted: 'Аккаунт AstroGuide и связанные с ним данные безвозвратно удалены. Подписку Google Play нужно отменить отдельно.',
      deletionNotFound: 'Совпадающий аккаунт не найден, поэтому ни один аккаунт не был удалён. Проверьте привязанный Google email или используйте аутентифицированное удаление в приложении. Эта статическая email-форма не принимает данные анонимного восстановления.',
      restored: 'Незаполненная форма восстановлена в этой вкладке.',
      invalid: 'Проверьте выделенные поля.',
      error: 'Сейчас отправить не удалось. Текст сохранён в этой вкладке — попробуйте ещё раз.',
      rate: 'Слишком много попыток. Текст сохранён — попробуйте снова через час.'
    }
  };

  function language() {
    var lang = (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
    return copy[lang] ? lang : 'en';
  }

  function endpoint(form) {
    return API_BASE + (form.name === 'account-deletion' ? '/account-deletion' : '/support');
  }

  function storageKey(form) {
    return 'astroguide:form:' + language() + ':' + form.name;
  }

  function ensureStatus(form) {
    var status = form.querySelector('[data-form-status]');
    if (!status) {
      status = document.createElement('p');
      status.setAttribute('data-form-status', '');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.className = 'form-status';
      form.appendChild(status);
    }
    return status;
  }

  function announce(form, message, state) {
    var status = ensureStatus(form);
    status.textContent = message;
    status.setAttribute('data-state', state || 'info');
  }

  function fieldError(field) {
    var wrapper = field.closest('.form-card__field') || field.parentNode;
    var id = field.id || field.name;
    var errorId = id + '-error';
    var error = wrapper.querySelector('[data-field-error="' + field.name + '"]');
    if (!error) {
      error = document.createElement('p');
      error.className = 'form-field-error';
      error.id = errorId;
      error.setAttribute('data-field-error', field.name);
      error.setAttribute('role', 'alert');
      wrapper.appendChild(error);
    }
    error.textContent = field.validationMessage;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorId);
  }

  function clearFieldError(field) {
    var wrapper = field.closest('.form-card__field') || field.parentNode;
    var error = wrapper.querySelector('[data-field-error="' + field.name + '"]');
    if (error) error.remove();
    if (field.setCustomValidity) field.setCustomValidity('');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  function save(form) {
    var values = {};
    Array.prototype.forEach.call(form.elements, function (field) {
      if (!field.name || field.name === 'website') return;
      values[field.name] = field.type === 'checkbox' ? field.checked : field.value;
    });
    try { sessionStorage.setItem(storageKey(form), JSON.stringify(values)); } catch (_) {}
  }

  function restore(form) {
    var raw;
    try { raw = sessionStorage.getItem(storageKey(form)); } catch (_) { return; }
    if (!raw) return;
    try {
      var values = JSON.parse(raw);
      Object.keys(values).forEach(function (name) {
        var field = form.elements[name];
        if (!field || name === 'website') return;
        if (field.type === 'checkbox') field.checked = values[name] === true;
        else field.value = values[name];
      });
      announce(form, copy[language()].restored, 'info');
    } catch (_) {}
  }

  function clearSaved(form) {
    try { sessionStorage.removeItem(storageKey(form)); } catch (_) {}
  }

  function serialize(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });
    data.language = language();
    data.website = data.website || '';
    if (form.name === 'account-deletion') data.confirm = Boolean(form.elements.confirm.checked);
    return data;
  }

  function enhance(form) {
    var words = copy[language()];
    var button = form.querySelector('[type="submit"]');
    var originalButtonText = button ? button.textContent : '';
    var submitting = false;

    form.action = endpoint(form);
    form.removeAttribute('novalidate');

    if (!form.elements.website) {
      var trap = document.createElement('div');
      trap.className = 'form-honeypot';
      trap.setAttribute('aria-hidden', 'true');
      trap.innerHTML = '<label>Leave this field empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label>';
      form.appendChild(trap);
    }

    restore(form);
    var query = new URLSearchParams(window.location.search);
    if (query.get('deletion') === 'not_found' && form.name === 'account-deletion') {
      clearSaved(form);
      announce(form, words.deletionNotFound, 'error');
    } else if (query.get('deleted') === '1' && form.name === 'account-deletion') {
      clearSaved(form);
      announce(form, words.deletionCompleted, 'success');
    } else if (query.get('submitted') === '1') {
      clearSaved(form);
      var redirectedCopy = form.name === 'account-deletion'
        ? (query.get('verification') === 'queued' ? words.deletionQueued : words.deletionSent)
        : words.success;
      announce(
        form,
        redirectedCopy + (query.get('request') || '—'),
        form.name === 'account-deletion' ? 'info' : 'success'
      );
    }

    form.addEventListener('input', function (event) {
      clearFieldError(event.target);
      save(form);
    });
    form.addEventListener('change', function (event) {
      clearFieldError(event.target);
      save(form);
    });
    form.addEventListener('invalid', function (event) { fieldError(event.target); }, true);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (submitting) return;
      Array.prototype.forEach.call(form.elements, function (field) {
        if (!field.name || !field.required || typeof field.value !== 'string') return;
        if (!field.value.trim()) field.setCustomValidity(words.invalid);
      });
      if (!form.checkValidity()) {
        Array.prototype.forEach.call(form.elements, function (field) {
          if (field.willValidate && !field.validity.valid) fieldError(field);
        });
        announce(form, words.invalid, 'error');
        form.reportValidity();
        return;
      }

      submitting = true;
      if (button) {
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        button.textContent = words.sending;
      }
      announce(form, words.sending, 'info');

      fetch(endpoint(form), {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(serialize(form))
      }).then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (body) {
          if (!response.ok) {
            var error = new Error(body.message || words.error);
            error.status = response.status;
            throw error;
          }
          return body;
        });
      }).then(function (body) {
        clearSaved(form);
        form.reset();
        var successCopy = form.name === 'account-deletion'
          ? (body.verificationEmailSent === false ? words.deletionQueued : words.deletionSent)
          : words.success;
        announce(
          form,
          successCopy + (body.requestId || '—'),
          form.name === 'account-deletion' ? 'info' : 'success'
        );
      }).catch(function (error) {
        save(form);
        announce(form, error.status === 429 ? words.rate : (error.message || words.error), 'error');
      }).then(function () {
        submitting = false;
        if (button) {
          button.disabled = false;
          button.removeAttribute('aria-busy');
          button.textContent = originalButtonText;
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[name="support"], form[name="account-deletion"]').forEach(enhance);
  });
})();
