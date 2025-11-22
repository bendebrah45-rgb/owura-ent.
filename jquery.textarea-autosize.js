/**
 * Textarea Autosize (Created by Omar)
 * Based on Github: https://github.com/MartinF/jQuery.Autosize.Input
 * Usage:
 * > ## Using Data attribute:
 * > data-textarea-autosize='true'
 * > ## Pass extra options:
 * > data-textarea-autosize='{"space": -16}'
 * > ## jQuery:
 * > $("textarea").textareaAutosize();
 * > ## Pass extra options:
 * > $("textarea").textareaAutosize({space: -16});
 */
(function(n) {
    var t = function() {
            function n(n) {
                typeof n == "undefined" && (n = -16);
                this.space = n
            }
            return n
        }(),
        i;
    n.textareaAutosizeOptions = t;
    i = function() {
        function n(t, i) {
            var r = this;
            this._input = $(t);
            this._options = $.extend({}, n.getDefaultOptions(), i);
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
                this._input.height("auto").height(this._input.get(0).scrollHeight + this._options.space);
            },
            n.getDefaultOptions = function() {
                return this._defaultOptions
            },
            n.getInstanceKey = function() {
                return "textareaAutosizeInstance"
            },
            n._defaultOptions = new t,
            n
    }();
    n.textareaAutosize = i,
        function(t) {
            var i = "textarea-autosize";
            t.fn.textareaAutosize = function(u) {
                return this.each(function() {
                    if (this.tagName == "TEXTAREA") {
                        var f = t(this);
                        f.data(n.textareaAutosize.getInstanceKey()) || (u == undefined && (u = f.data(i)),
                            f.data(n.textareaAutosize.getInstanceKey(), new n.textareaAutosize(this, u)))
                    }
                })
            };
            t(function() {
                t("textarea[data-" + i + "]").textareaAutosize();
            })
        }(jQuery)
})(jQuery);