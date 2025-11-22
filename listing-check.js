/******************************************************************************
 ***
 ***  Listing Multiple Check:
 ***
 ***  - Event Listener for Single checkboxes
 ***  - Event Listener for Check-All checkbox
 ***  - Event Listener for None/Current-Page/Filtered-Pages buttons
 ***
 ***  Inputs values:
 ***  current-page | ids=##,##,## | all checked items in current page
 ***  none | ids=none | checked items in current page
 ***  all-filtered-pages | ids=all | filtered results items
 ***  
 ***  Data sent in request:
 ***  ids=none = no items checked
 ***  ids=##,##,## = checked items (maybe all of current page or some of them)
 ***  ids=all = all filtered pages
 ***
 ******************************************************************************/

/**
 * Move [data-lc-input="all-filtered-pages"] input to form
 */

$(document).ready(function() {
    var $allFilteredPagesInputs = $('[data-lc-input="all-filtered-pages"]');
    var $form = $('[data-lt-form]');
    if ($form.length && $allFilteredPagesInputs.length) {
        $form.append($allFilteredPagesInputs);
    }
});

/**
 * Event Listener for Single checkboxes
 * 
 * Usage:
 * <input class="form-check-input" type="checkbox" name="ids[]" value="23" data-lc-item="true" />
 */

$('[data-lc-item]').on('change', function() {
    var $toggleInput = $('[data-lc-toggle]');
    var $items = $('[data-lc-item]:visible');
    var $checkedItems = $items.filter(':checked');
    var $uncheckedItems = $items.filter(':not(:checked)');
    var $allFilteredPagesInputs = $('[data-lc-input="all-filtered-pages"]');
    var $visibleElements = $('[data-lc-visible="true"]');
    var $invisibleElements = $('[data-lc-visible="false"]');
    var $selected = $('[data-lc-selected]');
    var $count = $('[data-lc-count]');
    var $container = $(this).closest('[data-lc-item-container]').length ? $(this).closest('[data-lc-item-container]') : $(this).closest('tr');
    if ($($container).length) {
        $container[$(this).prop('checked') ? 'addClass' : 'removeClass']('active');
    }
    if ($allFilteredPagesInputs.length) {
        $allFilteredPagesInputs.attr('disabled', 'disabled');
    }
    $items.each(function() {
        if ($(this).attr('disabled')) {
            $(this).removeAttr('disabled');
        }
    });
    if ($items.length == $checkedItems.length) {
        $toggleInput.prop("indeterminate", false);
        $toggleInput.prop("checked", true);
        $visibleElements.showFlex();
        $invisibleElements.hide();
        $selected.show();
    } else if ($items.length == $uncheckedItems.length) {
        $toggleInput.prop("indeterminate", false);
        $toggleInput.prop("checked", false);
        $visibleElements.hide();
        $invisibleElements.showFlex();
        $selected.hide();
    } else {
        $selected.show();
        $visibleElements.showFlex();
        $invisibleElements.hide();
        $toggleInput.prop("indeterminate", true);
        $toggleInput.prop("checked", false);
    }
    $count.html($checkedItems.length);
});

/**
 * Event Listener for Check-All checkbox
 * 
 * Usage:
 * <input class="form-check-input" type="checkbox" data-lc-toggle="current-page" />
 */

$('[data-lc-toggle]').on('change', function() {
    var $this = $(this);
    var $items = $('[data-lc-item]:visible');
    var $allFilteredPagesInputs = $('[data-lc-input="all-filtered-pages"]');
    var $visibleElements = $('[data-lc-visible="true"]');
    var $invisibleElements = $('[data-lc-visible="false"]');
    var $selected = $('[data-lc-selected]');
    var $count = $('[data-lc-count]');
    if ($allFilteredPagesInputs.length) {
        $allFilteredPagesInputs.attr('disabled', 'disabled');
    }
    if ($this.prop('checked')) {
        $visibleElements.showFlex();
        $invisibleElements.hide();
        $selected.show();
    } else {
        $visibleElements.hide();
        $invisibleElements.showFlex();
        $selected.hide();
    }
    $items.each(function() {
        if ($(this).attr('disabled')) {
            $(this).removeAttr('disabled');
        }
    });
    switch ($this.data('lc-toggle')) {
        case 'current-page':
            $items.prop('checked', $this.prop('checked'));
            $items.each(function() {
                var $container = $(this).closest('[data-lc-item-container]').length ? $(this).closest('[data-lc-item-container]') : $(this).closest('tr');
                if ($($container).length) {
                    $container[$(this).prop('checked') ? 'addClass' : 'removeClass']('active');
                }
            });
            $count.html($items.length);
            break;

        default:
            break;
    };
});

/**
 * Event Listener for None/Current-Page/Filtered-Pages buttons
 * 
 * Usage:
 * <div class="btn-group listing-check" data-lc-total="155">
 * <button class="dropdown-item" type="button" data-lc-check="none">
 * 
 * Add Extra fields when choose "all-filtered":
 * <input type="hidden" name="conditions_link" value="requisitions_a2cc90d4e1ec3e44da777ae20f27862f" data-lc-input="all-filtered-pages" disabled />
 * <input type="hidden" name="ids" value="all" data-lc-input="all-filtered-pages" disabled />
 */
$('[data-lc-check]').on('click', function() {
    var $this = $(this);
    var $form = $('[data-lt-form]');
    var $toggleInput = $('[data-lc-toggle]');
    var $count = $('[data-lc-count]');
    var total = $('[data-lc-total]').length ? $('[data-lc-total]').data('lc-total') : __('All');
    var $allFilteredPagesInputs = $('[data-lc-input="all-filtered-pages"]');
    var $currentPage = $('[data-current-page]');
    if ($allFilteredPagesInputs.length) {
        $allFilteredPagesInputs.attr('disabled', 'disabled');
    }
    switch ($this.data('lc-check')) {
        case 'none':
            $toggleInput.prop('checked', false).trigger('change');
            $count.html(0);
            break;

        case 'current-page':
            $currentPage.removeAttr('disabled');
            $toggleInput.prop("indeterminate", false);
            $toggleInput.prop('checked', true).trigger('change');
            break;

        case 'all-filtered-pages':
            $currentPage.attr('disabled', 'disabled');
            $toggleInput.prop("indeterminate", false);
            $toggleInput.prop('checked', true).trigger('change');
            $count.html(total);
            if ($allFilteredPagesInputs.length) {
                $allFilteredPagesInputs.removeAttr('disabled');
            }
            // remove input names
            var fieldNames = [];
            var $inputs = $form.find('[data-lc-item]:visible');
            $inputs.each(function() {
                var name = $(this).attr('name');
                if (name && name.indexOf('[]')) {
                    var fieldNameIndex = fieldNames.findIndex(function(f) {
                        return f.name == name;
                    });
                    if (fieldNameIndex == -1) {
                        fieldNames.push({
                            name: name,
                            values: [],
                        });
                    }
                }
            });
            fieldNames.forEach(function(fieldNameObject) {
                var $filteredInputs = $inputs.filter('[name="' + fieldNameObject.name + '"]');
                $filteredInputs.each(function() {
                    $(this).attr('disabled', 'disabled');
                });
            });
            break;

        default:
            break;
    };
});