/**
 * Tabs
 * * Convert Tabs to Accordion on mobile
 * * Apply hashes on click and activate tab from url hash
 */


/**
 * Convert Tabs to Accordion on mobile
 */

function checkAccordionTabs() {
    if ($(document).width() < 993) {
        $('[data-tab]').each(function() {
            if (!$(this).attr('data-tab-accordion')) {
                convertTabsToAccordion(this);
            }
        });
    } else {
        $('[data-tab]').each(function() {
            if ($('[data-tab-content]', this).hasClass('tab-content-mobile')) {
                $('[data-tab-content]', this).addClass('tab-content').removeClass('tab-content-mobile');
            }
        });
    }
}

function convertTabsToAccordion(wrapper) {
    var $tabPanes = $("[data-tab-pane]", wrapper);
    $tabPanes.each(function(i, tabPane) {
        var $tabButton = $('[data-tab-btn]', wrapper).eq(i);
        var $tabButtonClone = $tabButton.clone();
        $tabButtonClone.removeClass("nav-link").addClass("tab-btn-mobile");
        $tabButtonClone.attr("data-bs-toggle", "collapse");
        $tabButtonClone.removeAttr("data-tab-btn");
        $tabButtonClone.attr("data-tab-btn-mobile", "true");
        if (!$tabButtonClone.hasClass('active')) {
            $tabButtonClone.addClass('collapsed');
        }
        $tabButtonClone.insertBefore(tabPane);
    });
    $tabPanes.addClass('collapse tab-pane-mobile');
    $('[data-tab-content]', wrapper).removeClass('tab-content').addClass('tab-content-mobile');
    $(wrapper).attr('data-tab-accordion', 'true');
}

$(window).on("resize", function() {
    checkAccordionTabs();
});

$(document).ready(function() {
    checkAccordionTabs();
});

$(document).on('click', '[data-tab] [data-tab-btn-mobile]', function() {
    var $wrapper = $(this).closest('[data-tab]');
    $wrapper.find('[data-tab-btn-mobile]').not(this).addClass('collapsed');
    $wrapper.find('[data-tab-btn]').not($($(this).attr('data-bs-target'))).removeClass('active');
    $wrapper.find('[data-tab-btn]').filter('[data-bs-target="' + $(this).attr('data-bs-target') + '"]').addClass('active');
    $wrapper.find('[data-tab-pane]').not($($(this).attr('data-bs-target'))).removeClass('show');
});


/**
 * Apply hashes on click and activate tab from url hash
 */

$(document).ready(function() {
    var hash = window.location.hash;
    if (hash !== "") {
        var $tabButtons = $("[data-tab] [data-bs-target='" + hash + "']");
        if ($tabButtons.length > 0) {
            if (!$tabButtons.first().hasClass('active')) {
                setTimeout(function() {
                    $tabButtons.filter(':visible').click();
                }, 1);
            }
        }
    } else {
        history.replaceState({}, "", $("[data-tab] [data-bs-target]").filter(':visible').eq(0).attr('data-bs-target'));
    }
});

$(document).on('click', '[data-tab] [data-tab-btn-mobile], [data-tab] [data-tab-btn]', function() {
    var hash = $(this).attr("data-bs-target");
    if (typeof hash !== undefined && hash !== "") {
        history.replaceState({}, "", hash);
    } else {
        window.location.hash = "";
    }
});


$(window).on("hashchange", function(e) {
    var hash = window.location.hash;
    if (hash !== "") {
        var $tabButtons = $("[data-bs-target='" + hash + "']");
        if ($tabButtons.length > 0) {
            $tabButtons.filter(':visible').trigger('click');
        }
    }
});