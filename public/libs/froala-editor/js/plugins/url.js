/*!
 * froala_editor v2.7.3 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            return factory(jQuery);
        };
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

  

  $.FE.URLRegEx = '(^| |\\u00A0)(' + $.FE.LinkRegEx + '|' + '([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}\\.[a-z0-9+-_]{1,})' + ')$';

  $.FE.PLUGINS.url = function (editor) {
    var rel = null;

    /*
     * Transform string into a hyperlink.
     */
    function _linkReplaceHandler (match, p1, p2) {
      var dots = '';

      while (p2.length && p2[p2.length - 1] == '.') {
        dots += '.';
        p2 = p2.substring(0, p2.length - 1);
      }

      var link = p2;

      // Convert email.
      if (editor.opts.linkConvertEmailAddress) {
        if (editor.helpers.isEmail(link) && !/^mailto:.*/i.test(link)) {
          link = 'mailto:' + link;
        }
      }
      else if (editor.helpers.isEmail(link)) {
        return p1 + p2;
      }

      if (!/^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(link)) {
        link = '//' + link;
      }

      return (p1 ? p1 : '') + '<a' + (editor.opts.linkAlwaysBlank ? ' target="_blank"' : '') + (rel ? (' rel="' + rel + '"') : '') + ' href="' + link + '">' + p2.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</a>' + dots;
    }

    function _getRegEx () {
      return new RegExp($.FE.URLRegEx, 'gi');
    }

    /*
     * Convert link paterns from html into hyperlinks.
     */
    function _convertToLink (html) {

      if (editor.opts.linkAlwaysNoFollow) {
        rel = 'nofollow';
      }

      // https://github.com/froala/wysiwyg-editor/issues/1576.
      if (editor.opts.linkAlwaysBlank) {
        if (!rel) rel = 'noopener noreferrer';
        else rel += ' noopener noreferrer';
      }

      return html.replace(_getRegEx(), _linkReplaceHandler);
    }

    function _isA (node) {
      if (!node) return false;

      if (node.tagName === 'A') return true;

      if (node.parentNode && node.parentNode != editor.el) return _isA(node.parentNode);

      return false;
    }

    function _lastPart(text) {
      var splits = text.split(' ');

      return splits[splits.length - 1];
    }

    function _inlineType () {
      var range = editor.selection.ranges(0);
      var node = range.startContainer;

      if (!node || node.nodeType !== Node.TEXT_NODE) return false;

      if (_isA(node)) return false;

      if (_getRegEx().test(_lastPart(node.textContent))) {
        $(node).before(_convertToLink(node.textContent));

        node.parentNode.removeChild(node);
      }
      else if (node.previousSibling && node.previousSibling.tagName === 'A') {
        var text = node.previousSibling.innerText + node.textContent;

        if (_getRegEx().test(_lastPart(text))) {
          $(node.previousSibling).replaceWith(_convertToLink(text));

          node.parentNode.removeChild(node);
        }
      }
    }

    /*
     * Initialize.
     */
    function _init () {
      editor.events.on('keydown', function (e) {
        var keycode = e.which;

        if (editor.selection.isCollapsed() && (keycode == $.FE.KEYCODE.ENTER || keycode == $.FE.KEYCODE.SPACE || keycode == $.FE.KEYCODE.PERIOD)) {
          _inlineType();
        }
      }, true);
    }

    return {
      _init: _init
    }
  }

}));
