/*** Defaults ***/

if (typeof window.APP == 'undefined') {
    window.APP = {};
}

if (typeof window.APP.VENDORS == 'undefined') {
    window.APP.VENDORS = {};
}

if (typeof window.APP.VENDORS.DEFAULTS == 'undefined') {
    window.APP.VENDORS.DEFAULTS = {};
}

window.APP.VENDORS.DEFAULTS.validate = {
    default: function($form) {
        if ($form && typeof $form !== 'undefined' && $form.length) {
            $form.find('[data-form-rules]').not(':hidden:not(.selectized):not([data-form-include]):not(.flatpickr-input)').each(function() {
                var $input = $(this);
                $input.on('change', function() {
                    $input.valid();
                });
            });
            return {
                ignore: ':hidden:not(.selectized):not([data-form-include]):not(.flatpickr-input)',
                errorPlacement: function($error, $element) {
                    var $errorContainer = {};
                    var $nameErrorContainer = $("[data-form-validation='" + $element.attr("name") + "']");
                    var $idErrorContainer = $("[data-form-validation='" + $element.attr("id") + "']");
                    var $formGroupContainer = $element.closest('[data-form-group]');
                    var $defaultErrorContainer = $formGroupContainer.find("[data-form-validation]");
                    $formGroupContainer.addClass('is-invalid').removeClass('is-valid');
                    if ($nameErrorContainer.length) {
                        $errorContainer = $nameErrorContainer;
                    } else if ($idErrorContainer.length) {
                        $errorContainer = $idErrorContainer;
                    } else {
                        $errorContainer = $defaultErrorContainer;
                    }
                    if (!$errorContainer.length && $formGroupContainer.length) {
                        $formGroupContainer.append('<div class="form-validation" data-form-validation="true"> </div>');
                        $errorContainer = $formGroupContainer.find("[data-form-validation]");
                    }
                    if (!$errorContainer.length && !$formGroupContainer.length) {
                        $element.parent().append('<div class="form-validation" data-form-validation="true"> </div>');
                        $errorContainer = $formGroupContainer.find("[data-form-validation]");
                    }
                    // Remove backend & empty errors
                    $errorContainer.children().each(function() {
                        if ((typeof $(this).attr('id') === 'undefined') || $(this).text().length === 0) {
                            $(this).remove();
                        }
                    });
                    // Check duplicated errors input within group or just append it if there is no other errors
                    var $errors = $errorContainer.children().filter('.error');
                    var append = true;
                    if ($errors.length) {
                        $errors.each(function(index, error) {
                            if (error.textContent === $error.get(0).textContent) {
                                append = false;
                            }
                        });
                    }
                    if (append) {
                        // Append error
                        $errorContainer.append($error);
                    }
                },
                success: function($error) {
                    var $formGroupContainer = $error.closest('[data-form-group]');
                    var $errorContainer = $error.parent();
                    // Remove empty errors
                    if ($error.text().length === 0) {
                        $error.remove();
                    }
                    // Check if any input within group has other errors
                    if (!$errorContainer.children().filter('.error').length) {
                        $formGroupContainer.removeClass('is-invalid').addClass('is-valid');
                    }
                },
                errorElement: "p"
            }
        }
    }
}



// Set Defaults

jQuery.extend(jQuery.validator.messages, {
    required: __("This Field is Required"),
    remote: __("Invalid"),
    email: String(__("This value should be a valid email.")).slice(0, -1),
    url: __("Please Enter a Valid Url"),
    date: __("Please Provide a Valid Date"),
    dateISO: __("Please Provide a Valid Date"),
    number: __("Please Enter a Valid Number"),
    digits: String(__("This value should be digits.")).slice(0, -1),
    creditcard: __("Invalid"),
    equalTo: __("Invalid"),
    accept: __("Invalid"),
    maxlength: jQuery.validator.format(String(APP.UTILS.TEXT.sprintf(__("This value is too long. It should have %s characters or fewer."), '{0}')).slice(0, -1)),
    minlength: jQuery.validator.format(String(APP.UTILS.TEXT.sprintf(__("This value is too short. It should have %s characters or more."), '{0}')).slice(0, -1)),
    rangelength: jQuery.validator.format(String(APP.UTILS.TEXT.sprintf(__("This value is invalid. Its' characters should be between %s and %s."), '{0}', '{1}')).slice(0, -1)),
    range: jQuery.validator.format(String(APP.UTILS.TEXT.sprintf(__("This value is invalid. Its' value should be between %s and %s."), '{0}', '{1}')).slice(0, -1)),
    max: jQuery.validator.format(String(APP.UTILS.TEXT.sprintf(__("This value should be lower than or equal to %s."), '{0}')).slice(0, -1)),
    min: jQuery.validator.format(String(APP.UTILS.TEXT.sprintf(__("This value should be greater than or equal to %s."), '{0}')).slice(0, -1)),
});

if (typeof $.validator !== 'undefined') {
    $.validator.setDefaults(window.APP.VENDORS.DEFAULTS.validate.default());
    $.validator.dataRules = function(element) {
        var $input = $(element);
        // Loop through rules
        var rules = {};
        var dataAttrRules = $(element).data("form-rules");
        dataAttrRules && $.each(dataAttrRules.split('|'), function() {
            var inputRuleName = this.split(':')[0];
            var inputRuleValue = this.split(':').length > 1 ? this.replace(inputRuleName + ':', '') : true;
            // Map rules
            switch (inputRuleName) {
                case 'min':
                case 'max':
                    if ($input.prop("tagName").toLowerCase() == 'textarea' || ($input.prop("tagName").toLowerCase() == 'input' && $input.attr('type') == 'text')) {
                        inputRuleName = inputRuleName + 'length';
                    }
                    break;
                default:
                    break;
            }
            rules[inputRuleName] = inputRuleValue;
        });
        return rules;
    };
    // Check if the last active element doesn't have name so don't focus it when form is invalid.
    $.validator.prototype.findLastActive = function() {
        var lastActive = this.lastActive;
        return lastActive && $.grep(this.errorList, function(n) {
            return lastActive.name ? n.element.name === lastActive.name : false;
        }).length === 1 && lastActive;
    }
}