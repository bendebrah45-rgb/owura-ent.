/**
 * Input Autosize (Modified by Omar)
 * Github: https://github.com/MartinF/jQuery.Autosize.Input
 * Usage:
 * > ## Using Data attribute:
 * > data-input-autosize='true'
 * > ## Pass extra options:
 * > data-input-autosize='{"space": 16}'
 * > ## jQuery:
 * > $("input").inputAutosize();
 * > ## Pass extra options:
 * > $("input").inputAutosize({space: 16});
 */
(function(n) {
    var t = function() {
            function n(n) {
                typeof n == "undefined" && (n = 16);
                this.space = n
            }
            return n
        }(),
        i;
    n.inputAutosizeOptions = t;
    i = function() {
        function n(t, i) {
            var r = this;
            this._input = $(t);
            this._options = $.extend({}, n.getDefaultOptions(), i);
            this._mirror = $('<span class="mw-100 overflow-hidden" style="position:absolute; top:-999px; left:0; white-space:pre;"/>');
            $.each(["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], function(n, t) {
                r._mirror[0].style[t] = r._input.css(t)
            });
            $("body").append(this._mirror);
            this._input.on("keydown keyup input propertychange change", function() {
                r.update()
            });
            (function() {
                r.update()
            })()
        }
        return n.prototype.getOptions = function() {
                return this._options
            },
            n.prototype.update = function() {
                var n = this._input.val() || this._input.attr('placeholder') || "",
                    t;
                n !== this._mirror.text() && (this._mirror.text(n),
                    t = this._mirror.width() + this._options.space,
                    this._input.width(t),
                    this._input.css('max-width', t))
            },
            n.getDefaultOptions = function() {
                return this._defaultOptions
            },
            n.getInstanceKey = function() {
                return "inputAutosizeInstance"
            },
            n._defaultOptions = new t,
            n
    }();
    n.inputAutosize = i,
        function(t) {
            var i = "input-autosize",
                r = ["text", "password", "search", "url", "tel", "email", "number"];
            t.fn.inputAutosize = function(u) {
                return this.each(function() {
                    if (this.tagName == "INPUT" && t.inArray(this.type, r) > -1) {
                        var f = t(this);
                        f.data(n.inputAutosize.getInstanceKey()) || (u == undefined && (u = f.data(i)),
                            f.data(n.inputAutosize.getInstanceKey(), new n.inputAutosize(this, u)))
                    }
                })
            };
            t(function() {
                t("input[data-" + i + "]").inputAutosize();
            })
        }(jQuery)
})(jQuery);