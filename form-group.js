/******************************************************************************
 ***
 ***  Form Group:
 ***
 ***  - Event Listeners for Floating Labels
 ***  - Event Listeners for Clear button
 ***
 ******************************************************************************/

/**
 * Event Listeners for Floating Labels
 * Event Listeners for Clear button
 */
function checkInputValue(el) {
    var $group = $(el).closest('[data-form-group]');
    if ($(el).val().length) {
        $group.addClass('has-value');
        $group.addClass('show-label');
    } else {
        $group.removeClass('has-value');
        $group.removeClass('show-label');
    }
}

$(document).ready(function() {
    $('[data-form-input]').each(function() {
        checkInputValue(this);
    });
});

$(document).on('focus', '[data-form-group] [data-form-input]', function(e) {
    $(this).closest('[data-form-group]').addClass('show-label');
});

$(document).on('blur change focusout', '[data-form-group] [data-form-input]', function(e) {
    checkInputValue(this);
});

$(document).on('input', '[data-form-group] [data-form-input]', function(e) {
    $(this).closest('[data-form-group]').addClass('show-label');
    if ($(this).val().length) {
        $(this).closest('[data-form-group]').addClass('has-value');
    } else {
        $(this).closest('[data-form-group]').removeClass('has-value');
    }
});


/**
 * Event Listeners for Clear button
 */

$(document).on('click', '[data-form-group] [data-form-input-clear]', function(e) {
    var $input = $(this).closest('[data-form-group]').find('[data-form-input]');
    if ($input.length) {
        $(this).closest('[data-form-group]').removeClass('has-value');
        $(this).closest('[data-form-group]').removeClass('show-label');
        $input.val('');
        $input.trigger('change');
    }
});