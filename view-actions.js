/**
 * View Actions
 * * Move actions to dropdown when its offscreen
 */

/**
 * Move actions to dropdown when its offscreen
 */

function moveOffscreenActionsToDropdown(wrapper) {
    var items = $('[data-va-items]', wrapper).get(0);
    var btn = $('[data-va-btn]', wrapper).get(0);
    var dropdown = $('[data-va-dropdown]', wrapper).get(0);
    var dropdownChildren = dropdown.children;
    var extraPixels = 55;
    var hiddenChildrenItemsCount = 0;
    var itemsChildrenWidth = 0;

    for (var child of [...dropdownChildren]) {
        items.appendChild(child);
    }

    var itemsChildren = items.children;

    for (var child of [...itemsChildren]) {
        itemsChildrenWidth += child.getBoundingClientRect().width;
        if (itemsChildrenWidth + extraPixels > (items.getBoundingClientRect().width)) {
            hiddenChildrenItemsCount++;
            dropdown.appendChild(child);
        }
    }

    if (itemsChildrenWidth + 55 < $(window).width()) {
        hiddenChildrenItemsCount = 0;
        for (var item of [...dropdownChildren]) {
            items.appendChild(item);
        }
    }

    if (hiddenChildrenItemsCount > 0) {
        btn.style.display = '';
    } else {
        btn.style.display = 'none';
    }
}


/**
 * Run On Init
 * Resize Event Listener
 */
$('[data-va]').each(function() {
    var wrapper = this;
    moveOffscreenActionsToDropdown(wrapper);
    $(window).on('resize', function() {
        moveOffscreenActionsToDropdown(wrapper);
    });
});