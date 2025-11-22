/******************************************************************************
 ***
 ***  Listing Floating Actions:
 ***
 ***  - Event Listener for actions that changes <form>'s target
 ***  - Move floating actions to top
 ***  
 ***  - Data Attributes:
 ***  
 ***    [data-lfa]: Wrapper
 ***    
 ******************************************************************************/

/**
 * Change form target (works inside iframes)
 */

$('[data-lfa] [data-la-action]').each(function(i, el) {
    el.addEventListener('click', function(e) {
        $('[data-lt-form]').attr('target', '_top');
    }, true);
});

/**
 * Moving actions to top window (works inside iframes)
 */
$(document).ready(function() {
    if ($('[data-lfa]').length) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var observer = new MutationObserver(function(mutations, observer) {
            if (window.frameElement) {
                var iframeId = window.frameElement.id;
                // remove old clones from top window
                $(window.top.document.body).find('[data-lfa][data-lfa-iframe="' + '#' + iframeId + '"]').parent().remove();
                // make a clone of the floating actions inside iframe
                var $clone = $('[data-lfa]').clone();
                $clone.attr('data-lfa-iframe', '#' + iframeId);
                // re-append new clone when DOM changes inside iframe
                if ($clone.find('[data-lc-count]').length && $clone.find('[data-lc-count]').text() != '0') {
                    $clone.find('[data-la-action]').each(function(i, el) {
                        el.addEventListener('click', function(e) {
                            e.preventDefault();
                            $('[data-lfa]').find('[data-la-action]').eq(i).get(0).click();
                        });
                    });
                    $clone.showFlex();
                    var $wrapper = $('<div class="compat"></div>');
                    $wrapper.append($clone);
                    $(window.top.document.body).append($wrapper);
                }
            }
        });
        observer.observe(document.querySelector('[data-lfa]'), {
            childList: true,
            subtree: true,
            attributes: true
        });
    }
});

/**
 * Check if iframe is visible then show/hide their floating actions accordingly (works if there are multiple iframes too)
 */
var FLOATING_ACTIONS_INTERVAL = null;

function initFloatingActionsInterval() {
    var topWindow = window.top;
    FLOATING_ACTIONS_INTERVAL = setInterval(function() {
        if (window.top && typeof topWindow.$ === 'function' && !topWindow.$('iframe').length) {
            clearInterval(FLOATING_ACTIONS_INTERVAL);
            return;
        }
        if (window.top && typeof topWindow.$ === 'function' && topWindow.$('[data-lfa-iframe]').length) {
            topWindow.$('[data-lfa-iframe]').each(function(i, el) {
                var $floatingAction = $(el);
                var iframeId = $floatingAction.attr('data-lfa-iframe');
                var $iframe = topWindow.$(iframeId);
                if ($iframe.length) {
                    if (!$iframe.is(':visible')) {
                        $floatingAction.hide();
                    } else {
                        $floatingAction.showFlex();
                    }
                }
            });
        }
    }, 1000);
}

initFloatingActionsInterval();