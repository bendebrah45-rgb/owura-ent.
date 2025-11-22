/**
 * Dropdown Phone Number
 * Author: Ahmed MamdOuh
 * 
 * Usage:
 * > ## Using Data attribute:
 * > data-input-phone='true'
 * > ## jQuery:
 * > $("input").inputPhone();
 */
(function($) {
    var pluginName = 'inputPhone';
    var dataAttribute = 'input-phone';

    function inputPhonePlugin(element) {
        var $el = $(element);
        // var $dataAttr = $el.data(dataAttribute);
        var codeInput = [];
        var phoneInput = [];
        var fullValue = '';

        function init() {
            var $container = $el.closest('[data-form-group]');
            codeInput = $container.find($(`[data-input-phone-code]`)).get(0);
            phoneInput = $container.find($(`[data-input-phone-number]`)).get(0);
            fullValue = $el.get(0).value;

            $(codeInput).on('change', function() {
                $(phoneInput).val(codeInput.value + ' ');
                handleChange();
            });

            $(phoneInput).on('input', function(e) {
                var numericalChars = new Set([".", " ", "+", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
                phoneInput.value = phoneInput.value.split("").filter(function(char) {
                    return numericalChars.has(char);
                }).join("");

            });

            $(phoneInput).on('keypress, keydown', function(e) {
                if ((e.ctrlKey || e.shiftKey) && e.which == 8) {
                    return false;
                }
                var max = String(codeInput.value + ' ').length;
                if ((e.which != 37 && (e.which != 39)) &&
                    ((phoneInput.selectionStart < max) ||
                        ((phoneInput.selectionStart == max) && (e.which == 8)))) {
                    return false;
                }
            });


            $(phoneInput).on('change', function(e) {
                handleChange();
            });



            function handleChange() {
                var value;
                if ($(codeInput).val() && $(phoneInput).val() && ($(codeInput).val() != $(phoneInput).val().replace(/\s/g, ''))) {
                    value = $(phoneInput).val().replace(/\s/g, '');
                } else {
                    value = '';
                }

                fullValue = value;
                $el.val(fullValue);
            }

            handleInitialValue();

            function handleInitialValue() {
                var value = fullValue;
                if (value) {
                    var phoneObj = libphonenumber.parsePhoneNumber(value);
                    if (typeof phoneObj != "undefined") {
                        codeInput.value = '+' + phoneObj.countryCallingCode;
                        if (typeof codeInput.selectize != 'undefined') {
                            codeInput.selectize.setValue('+' + phoneObj.countryCallingCode, true);
                        }
                        phoneInput.value = '+' + phoneObj.countryCallingCode + ' ' + phoneObj.nationalNumber;
                    } else {
                        codeInput.value = value;
                    }
                } else {
                    $(phoneInput).val(codeInput.value + ' ');
                    handleChange();
                }
            }


        }

        init();

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
                    $.data(this, 'plugin_' + pluginName, new inputPhonePlugin(this, options));
                }
            });
        }
    };


    (function() {
        $("input[data-" + dataAttribute + "]").inputPhone();
    })();

})(jQuery);