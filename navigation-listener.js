var shortcutsKeys = [{
        key: 13,
        holdKey: 16,
        action: "add_page_url"
    },
    {
        key: 37,
        holdKey: null,
        action: "prev_page_url"
    },
    {
        key: 39,
        holdKey: null,
        action: "next_page_url"
    },
];

function initPageLoader() {
    $("body").append(
        '<div class="page-loader" style="display:none"><div class="spinner-wrap"><div class="spinner-border loading-spinner-icon" role="status"></div></div></div>'
    );
    $("body")
        .find(".page-loader")
        .fadeIn("fast", function() {});
}

setTimeout(() => {
    if (typeof izamNavigation !== "undefined") {
        new izamNavigationHandler(shortcutsKeys);
    }
}, 100);

document.addEventListener("add_page_url", function() {
    var $addNewBtn = $(".add-new-btn");
    if (izamNavigation.add_page_url != null) {
        initPageLoader();
        window.location.href = izamNavigation.add_page_url;
    } else if (
        typeof $addNewBtn !== "undefined" &&
        $addNewBtn.length &&
        !$addNewBtn.hasClass("disabled") &&
        !$addNewBtn.attr("disabled")
    ) {
        $addNewBtn[0].click();
        if ($addNewBtn[0].form && $($addNewBtn[0].form).data('validator')) {
            if ($($addNewBtn[0].form).data('validator').valid()) {
                initPageLoader();
            }
        } else {
            initPageLoader();
        }
    }
});

document.addEventListener("next_page_url", function() {
    var $nextBtn = $("#top-nav-next");
    if (izamNavigation.next_page_url != null) {
        initPageLoader();
        window.location.href = izamNavigation.next_page_url;
    } else if (
        typeof $nextBtn !== "undefined" &&
        $nextBtn.length &&
        !$nextBtn.hasClass("disabled") &&
        !$nextBtn.attr("disabled")
    ) {
        initPageLoader();
        $nextBtn[0].click();
    }
});

document.addEventListener("prev_page_url", function() {
    var $prevBtn = $("#top-nav-prev");
    if (izamNavigation.prev_page_url != null) {
        initPageLoader();
        window.location.href = izamNavigation.prev_page_url;
    } else if (
        typeof $prevBtn !== "undefined" &&
        $prevBtn.length &&
        !$prevBtn.hasClass("disabled") &&
        !$prevBtn.attr("disabled")
    ) {
        initPageLoader();
        $prevBtn[0].click();
    }
});