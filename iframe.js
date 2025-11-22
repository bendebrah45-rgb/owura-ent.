/**
 * Iframes
 * * Lazy Iframe
 * * Auto resize Iframe
 */


/**
 * Lazy Iframe Placeholder
 */

$('[data-iframe-btn]').each(function() {
    var iframeId = $(this).attr('data-iframe-btn');
    var $placeholder = $('<div class="iframe-placeholder" data-iframe-placeholder="' + iframeId + '">\n' +
        '  <i class="fa fa-spin fa-spinner-third"></i>\n' +
        '</div>');
    var $iframe = $(iframeId);
    $placeholder.insertBefore($iframe);
    $iframe.get(0).addEventListener('load', function() {
        $iframe.show();
        $iframe.removeClass('iframe-lazy');
        $placeholder.remove();
    });
});

$(document).on('click', '[data-iframe-btn]', function() {
    console.log(111);

    var isLoaded = $(this).attr('data-iframe-btn-loaded');
    if (!isLoaded) {
        var iframeId = $(this).attr('data-iframe-btn');
        var $iframe = $(iframeId);
        $iframe.attr('src', $iframe.data('iframe').src);
        $(this).attr('data-iframe-btn-loaded', 'true');
    }
});


/**
 * Auto resize Iframe
 */

function resizeIframe(iframe) {
    var iframeDocument = iframe.contentWindow.document;
    if (!iframeDocument.body) {
        return;
    }
    var prevHeight = iframe.style.height;
    var newHeight = Math.max(iframeDocument.body.scrollHeight, iframeDocument.body.offsetHeight, iframeDocument.documentElement.clientHeight, iframeDocument.documentElement.scrollHeight, iframeDocument.documentElement.offsetHeight);
    if (newHeight != prevHeight && newHeight > 0) {
        iframe.style.height = newHeight + "px";
        if (iframeDocument.title.toLowerCase().includes('error')) {
            iframe.style.minHeight = 600 + "px"
        }
    }
}

$(document).ready(function() {
    $('[data-iframe]').each(function() {
        var iframe = this;

        if ($(iframe).data('iframe').autoResize) {
            iframe.addEventListener('load', function() {
                iframe.style.height = 0;
                resizeIframe(iframe);
                iframe.contentWindow.$(iframe.contentWindow.document).on('click', function() {
                    setTimeout(() => {
                        resizeIframe(iframe);
                    }, 1);
                });
            });
        }
    });
});

setInterval(function() {
    $('[data-iframe]').each(function() {

        var iframe = this;

        if ($(iframe).data('iframe').autoResize) {
            if (!$(iframe).is(':visible')) {
                return;
            }
            resizeIframe(iframe);
        }
    });
}, 2000);