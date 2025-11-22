/**
 * Input Number
 * Author: Omar Hany
 * 
 * Usage:
 * > ## Using Data attribute:
 * > data-input-number='true'
 * > ## Pass extra options:
 * > data-input-number='{"decimal": false, "negative": false}'
 * > ## jQuery:
 * > $("input").inputNumber();
 * > ## Pass extra options:
 * > $("input").inputNumber({decimal: false, negative: false});
 */
(function($) {
    var pluginName = 'inputNumber';
    var dataAttribute = 'input-number';

    function InputNumberPlugin(element, options) {
        var $el = $(element);
        var dataAttrOptions = $el.data(dataAttribute);

        if (dataAttrOptions && typeof dataAttrOptions == 'object') {
            options = dataAttrOptions;
        }

        var invalidChars = ["+", "E", "e"];

        options = $.extend({}, $.fn[pluginName].defaults, options);

        function init() {

            if (!options.negative) {
                invalidChars.push('-');
            }
            if (!options.decimal) {
                invalidChars.push('.');
            }


            $el.on('keydown', function(e) {
                if (invalidChars.includes(e.key)) {
                    e.preventDefault();
                }
            });

            $el.on('input', function(e) {
                if (!options.negative) {
                    if ($el.val().includes('-')) {
                        $el.val($el.val().replaceAll('-', ''));
                    }
                }
                if (!options.decimal) {
                    if ($el.val().includes('.')) {
                        $el.val($el.val().replaceAll('.', ''));
                    }
                }

            });
        }

        function option(key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        init();

        return {
            option: option,
        };
    }

    $.fn[pluginName] = function(options) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof options === "object" || !options) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new InputNumberPlugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        decimal: true,
        negative: true
    };

    (function() {
        $("input[data-" + dataAttribute + "]").inputNumber();
    })();

})(jQuery);