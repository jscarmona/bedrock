;(function($, hljs) {
  'use strict';
  $(function () {
    $('[data-code]').each(function (idx, el) {
      var $el = $(el);
      var html = escapeHtml($el.html());

      $el.html(html);
      hljs.highlightBlock($el[0]);
    });
  });

  function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }
})(window.jQuery, window.hljs);