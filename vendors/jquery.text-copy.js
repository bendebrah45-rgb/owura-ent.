/**
 * Text Copy
 * Author: Omar Hany
 * 
 * Usage:
 * > ## Using Data attribute:
 * > data-text-copy='true'
 * > ## Pass extra options:
 * > data-text-copy='{"buttonEl": "[data-text-copy-btn]", "textEl": "[data-text-copy-text]"}'
 * > data-text-copy='{"buttonEl": "[data-text-copy-btn]", "inputEl": "[data-text-copy-input]"}'
 * > ## jQuery:
 * > $("div").textCopy();
 * > ## Pass extra options:
 * > $("div").textCopy({buttonEl: "[data-text-copy-btn]", textEl: "[data-text-copy-input]"});
 * > $("div").textCopy({buttonEl: "[data-text-copy-btn]", inputEl: "[data-text-copy-input]"});
 * > ** HTML:
 * > <div class="text-copy" data-text-copy="true">
 * >     <p class="text-copy-text" data-text-copy-text="true">Text</p>
 * >     <button class="text-copy-btn" data-text-copy-btn="true">Button</button>
 * > </div>
 */
(function($) {
    var pluginName = 'textCopy';
    var dataAttribute = 'text-copy';

    function textCopyPlugin(element, options) {
        var $el = $(element);
        var dataAttrOptions = $el.data(dataAttribute);

        if (dataAttrOptions && typeof dataAttrOptions == 'object') {
            options = dataAttrOptions;
        }


        options = $.extend({}, $.fn[pluginName].defaults, options);

        function init() {
            var $btn = $el.find(options.buttonEl);
            var $input = $el.find(options.inputEl);
            var $text = $el.find(options.textEl);

            if (!$btn.length) {
                $btn = $(options.buttonEl);
            }

            if (!$input.length) {
                $input = $(options.inputEl);
            }

            if (!$text.length) {
                $text = $(options.textEl);
            }


            if ($btn.length) {
                var tooltipInstance = null;
                if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip.getOrCreateInstance) {
                    tooltipInstance = bootstrap.Tooltip.getOrCreateInstance($btn.get(0));
                }
                $btn.on('click', function() {
                    var text = '';
                    if ($input.length) {
                        text = $input.val();
                        $input.select();
                        document.execCommand("copy");
                    } else if ($text.length) {
                        var temp = $('<input style="opacity: 0;position: absolute;">');
                        $("body").append(temp);
                        temp.val($text.text()).select();
                        document.execCommand("copy");
                        temp.remove();
                    }
                    $btn.addClass('active');
                    $el.addClass('active');
                    $text.addClass('active');
                    $input.addClass('active');
                    if (typeof $.toast !== 'undefined') {
                        $.toast(__('Copied'), 'success');
                    }
                    if (tooltipInstance) {
                        tooltipInstance.setContent({
                            '.tooltip-inner': __('Copied')
                        });
                        tooltipInstance.show();
                        tooltipInstance._config.delay.hide = 2500;
                    }
                    setTimeout(function() {
                        $btn.removeClass('active');
                        $el.removeClass('active');
                        $text.removeClass('active');
                        $input.removeClass('active');
                        if (tooltipInstance) {
                            tooltipInstance.setContent({
                                '.tooltip-inner': __('Copy to Clipboard')
                            });
                            tooltipInstance.hide();
                            tooltipInstance._config.delay.hide = 0;
                        }
                    }, 2500);
                });
            }

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
                    $.data(this, 'plugin_' + pluginName, new textCopyPlugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        buttonEl: "[data-" + dataAttribute + "-btn]",
        textEl: "[data-" + dataAttribute + "-text]",
        inputEl: "[data-" + dataAttribute + "-input]",
    };

    (function() {
        $("[data-" + dataAttribute + "]").textCopy();
    })();

})(jQuery);