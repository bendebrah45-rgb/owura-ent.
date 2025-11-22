/******************************************************************************
 ***
 ***  Helpers:
 ***
 ******************************************************************************/
function hasHorizontalScrollbar(el) {
    return el.clientWidth < el.scrollWidth;
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

/******************************************************************************
 ***
 ***  Listing Table:
 ***  - Event Listener for table row actions (dropdowns)
 ***  - Event Listener for table column hover
 ***  - Event Listener for table fixed column shadow
 ***  - Event Listener for table dragging
 ***  - Event Listener for table fixed header
 ***  - Initialize table row items lightbox images
 ***
 ******************************************************************************/

/**
 * Row Actions
 * Fixes z-index problems in dropdowns
 * 
 * Usage:
 * <div class="dropdown" data-lt-dropdown="true">
 */

var rowActions = document.querySelectorAll('[data-lt-dropdown]');

rowActions.forEach(function(item) {
    item.addEventListener('shown.bs.dropdown', function(e) {
        var $cell = $(this).closest('[data-lt-dropdown-cell]');
        var $tableResponsiveDiv = $(this).closest('[data-lt-responsive]');
        $cell.addClass('clicked');
        if ($tableResponsiveDiv.get(0).clientWidth == 0 || hasHorizontalScrollbar($tableResponsiveDiv.get(0))) {
            $tableResponsiveDiv.get(0).style.setProperty("--listing-table-min-height", "0px");
        }
    });
    item.addEventListener('shown.bs.dropdown', function(e) {
        setTimeout(function() {
            var $tableResponsiveDiv = $(this).closest('[data-lt-responsive]');
            if ($tableResponsiveDiv.get(0).clientWidth == 0 || hasHorizontalScrollbar($tableResponsiveDiv.get(0)) || window.frameElement) {
                if (typeof bootstrap != 'undefined') {
                    var dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(this);
                    var dropdownMenu = dropdownInstance._menu;
                    var tableHeight = $tableResponsiveDiv.height();
                    var dropdownMenuHeight = $(dropdownMenu).height();
                    var distanceBetweenTableTopAndDropdown = 0;
                    if (tableHeight < (dropdownMenuHeight + 35)) {
                        distanceBetweenTableTopAndDropdown = $(dropdownMenu).offset().top - $tableResponsiveDiv.offset().top;
                    }
                    $tableResponsiveDiv.get(0).style.setProperty("--listing-table-min-height", (dropdownMenuHeight + distanceBetweenTableTopAndDropdown + 35) + "px");
                }
                if ($('.dropdown-menu:visible').length) {
                    $tableResponsiveDiv.addClass('clicked');
                } else {
                    $tableResponsiveDiv.removeClass('clicked');
                }
            } else {
                $tableResponsiveDiv.addClass('clicked-2');
            }
        }.bind(this), 0);
    });
    item.addEventListener('hide.bs.dropdown', function(e) {
        var $cell = $(this).closest('[data-lt-dropdown-cell]');
        $cell.removeClass('clicked');
    });
    item.addEventListener('hidden.bs.dropdown', function(e) {
        var $tableResponsiveDiv = $(this).closest('[data-lt-responsive]');
        if ($tableResponsiveDiv.get(0).clientWidth == 0 || hasHorizontalScrollbar($tableResponsiveDiv.get(0))) {
            if (!$('.dropdown-menu:visible').length) {
                $tableResponsiveDiv.removeClass('clicked');
                $tableResponsiveDiv.removeClass('clicked-2');
            }
        } else {
            $tableResponsiveDiv.removeClass('clicked');
            $tableResponsiveDiv.removeClass('clicked-2');
        }
    });
});

/**
 * Column Hover
 * Apply css class to hovered <col>
 * 
 * Usage:
 * <table class="table listing-table" data-lt="true">
    <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
    </colgroup>
 */

$("[data-lt]").each(function() {
    var table = this;
    var cols = table.querySelectorAll("col");
    var heads = table.querySelectorAll("th");
    var events = {
        mouseover: function(e) {
            var t = e.target.closest("td");
            if (t) {
                var cellIndex = t.cellIndex;
                for (var i = 0, n = cols.length; i < n; i++) {
                    if (cols[i] && cols[i].classList) {
                        cols[i].classList[i === cellIndex ? "add" : "remove"]("hovered");
                        heads[i].classList[i === cellIndex ? "add" : "remove"]("hovered");
                    }
                }
            }
        },
        mouseout: function(e) {
            var t = e.target;
            if ((t.nodeName === "TD") && !t.contains(e.relatedTarget) && cols[t.cellIndex]) {
                cols[t.cellIndex].classList.remove("hovered");
                heads[t.cellIndex].classList.remove("hovered");
            } else if ((t.nodeName === "A") && !t.contains(e.relatedTarget) && cols[t.parentElement.cellIndex]) {
                cols[t.parentElement.cellIndex].classList.remove("hovered");
                heads[t.parentElement.cellIndex].classList.remove("hovered");
            }
        }
    };
    for (var event in events) {
        table.addEventListener(event, events[event]);
    }
});

/**
 * Column Shadow
 * Apply shadow for fixed columns
 * 
 * Usage:
 * <div class="listing-table-responsive" data-lt-responsive="true">
 */

$('[data-lt-responsive]').each(function() {
    $(this).addClass('cell-shadow');
    if (hasHorizontalScrollbar(this)) {
        // $(this).addClass('cell-shadow-start');
        $(this).addClass('cell-shadow-end');
    }
    $(this).on('scroll', function() {
        if (Math.abs(this.scrollLeft) + this.offsetWidth > this.scrollWidth - 5) {
            $(this).addClass('cell-shadow-start');
            $(this).removeClass('cell-shadow-end');
        } else if (this.scrollLeft === 0) {
            $(this).removeClass('cell-shadow-start');
            $(this).addClass('cell-shadow-end');
        } else {
            $(this).addClass('cell-shadow-start');
            $(this).addClass('cell-shadow-end');
        }
    });
});

/**
 * Table Double Scrollbar / Fixed on Scroll
 * - Initialize double scrollbar
 * - Make double scrollbar library fixed when scrolling page
 */

if (typeof $.fn.doubleScroll != 'undefined' && !isTouchDevice()) {
    $('[data-lt-responsive]').each(function() {
        $(this).doubleScroll({
            class: 'listing-table-scroll'
        });
    });
}

if (!isTouchDevice()) {
    $('[data-lt-responsive]').each(function() {
        var table = $(this).find('table').get(0);
        var $thead = $(table).find('thead');
        var $wrapper = $(this).closest('[data-lt-wrapper]');
        var $scrollbar = $wrapper.length > 0 ? $wrapper.find('[data-double-scroll]') : null;
        if ($scrollbar.length) {
            window.addEventListener('scroll', function() {
                var headerHeight = $('[data-content-start]').length && $('[data-content-start]').get(0).clientHeight || 0;
                var pageHeadHeight = $('[data-page-start]').length && $('[data-page-start]').get(0).clientHeight || 0;
                var theadHeight = $thead.get(0).clientHeight || 0;
                var theadPaddingHeight = 16;
                // var offset = ($('.page-head:visible').height() || -23) + ($('.header').height() || 0) + ($thead.height() || 0) - ($thead.height() / 3) - 3;
                // var offset = (pageHeadHeight || -23) + headerHeight + theadHeight - (theadHeight / 3) - 3;
                var offset = pageHeadHeight + headerHeight + (pageHeadHeight > 0 ? -5 : theadPaddingHeight) + (pageHeadHeight > 0 ? theadHeight + 1 : 0) - (pageHeadHeight > 0 ? theadHeight / 2 : 0);
                if ((table.offsetTop - (pageHeadHeight > 0 ? pageHeadHeight : 0)) - window.scrollY <= 0) {
                    $scrollbar.addClass('fixed-offset');
                    // $scrollbar.get(0).style.setProperty("--listing-table-scroll-offset", (window.scrollY - table.offsetTop - headerHeight + theadPaddingHeight + 50 + offset) + 'px');
                    $scrollbar.get(0).style.setProperty("--listing-table-scroll-offset", (window.scrollY + window.scrollY) + 'px');
                } else {
                    $scrollbar.removeClass('fixed-offset');
                    $scrollbar.get(0).style.setProperty("--listing-table-scroll-offset", "0px");
                }
                // reached end of the page
                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    $scrollbar.removeClass('fixed-offset');
                }
            });
        }
    });
}

/**
 * Table Drag Scroll
 * Apply dragging with mouse to scroll table contents horizontally
 * 
 * Usage:
 * <div class="listing-table-responsive" data-lt-responsive="true">
 */

if (!isTouchDevice()) {
    $('[data-lt-responsive]').each(function() {
        var tableResponsiveWrapper = this;
        var isDown = false;
        var startX;
        var scrollLeft;

        tableResponsiveWrapper.addEventListener('mousedown', function(e) {
            isDown = true;
            startX = e.pageX - tableResponsiveWrapper.offsetLeft;
            scrollLeft = tableResponsiveWrapper.scrollLeft;
        });

        tableResponsiveWrapper.addEventListener('mouseleave', function(e) {
            if (isDown) {
                e.preventDefault();
            };
            isDown = false;
        });

        tableResponsiveWrapper.addEventListener('mouseup', function(e) {
            if (isDown) {
                e.preventDefault();
            };
            isDown = false;
        });

        tableResponsiveWrapper.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - tableResponsiveWrapper.offsetLeft;
            var walk = (x - startX) * 3;
            tableResponsiveWrapper.scrollLeft = scrollLeft - walk;
        });
    });
}

/**
 * Table Fixed Header
 * Make <thead> fixed when scrolling page
 * 
 * Usage:
 * <div class="listing-table-responsive" data-lt-responsive="true">
 *  <table class="table listing-table" data-lt="true">
 *   <thead data-lt-head="true">
 */

if ($(window).width() > 993) {
    $('[data-lt-responsive]').each(function() {
        var table = $(this).find('table').get(0);
        var $thead = $(table).find('[data-lt-head]');
        if ($thead.length) {
            window.addEventListener('scroll', function() {
                // var headerHeight = 45;
                var headerHeight = $('[data-content-start]').length && $('[data-content-start]').get(0).clientHeight || 0;
                var pageHeadHeight = $('[data-page-start]').length && $('[data-page-start]').get(0).clientHeight || 0;
                var theadHeight = $thead.get(0).clientHeight || 0;
                var theadPaddingHeight = 16;
                // var offset = ($('.page-head:visible').height() || -23) + ($('.header').height() || 0) + ($thead.height() || 0) - ($thead.height() / 3) - 3;
                // var offset = (pageHeadHeight || -23) + headerHeight + theadHeight - (theadHeight / 3) - 3;
                var offset = pageHeadHeight + headerHeight + (pageHeadHeight > 0 ? -5 : theadPaddingHeight) + (pageHeadHeight > 0 ? theadHeight + 1 : 0) - (pageHeadHeight > 0 ? theadHeight / 2 : 0);
                if ((table.offsetTop - (pageHeadHeight > 0 ? pageHeadHeight : 0)) - window.scrollY <= 0) {
                    $thead.addClass('fixed-offset');
                    $thead.get(0).style.setProperty("--listing-table-thead-offset", (window.scrollY - table.offsetTop - headerHeight + offset) + 'px');
                } else {
                    $thead.removeClass('fixed-offset');
                    $thead.get(0).style.setProperty("--listing-table-thead-offset", "0px");
                }
            });
        }
    });
}

/**
 * Table Keyboard Shortcuts
 * <up> & </down> to navigate through items
 * <space> to check item
 * <enter> to open actions dropdown
 */

if ($(window).width() > 993 && $('[data-lt]').length) {
    $(window).on('keydown', function(e) {
        if ($(document.activeElement).attr('data-lc-item') || !$(document.activeElement).is(':input')) {
            var $table = $('[data-lt]');
            var $tableBody = $table.find('tbody');
            if ($(document.activeElement).attr('data-lc-item')) {
                $(document.activeElement).closest('tr').focus();
            }
            switch (e.keyCode) {
                case 38:
                    e.preventDefault();
                    var $prevElement = $tableBody.find('tr:first-child');
                    if (document.activeElement.nodeName == 'TR') {
                        if (document.activeElement.previousElementSibling) {
                            $prevElement = $(document.activeElement.previousElementSibling);
                        }
                    }
                    $prevElement.focus();
                    $('html, body').animate({
                        scrollTop: $prevElement.offset().top - 200
                    }, 1);
                    break;
                case 40:
                    e.preventDefault();
                    var $nextElement = $tableBody.find('tr:first-child');
                    if (document.activeElement.nodeName == 'TR') {
                        if (document.activeElement.nextElementSibling) {
                            $nextElement = $(document.activeElement.nextElementSibling);
                        }
                    }
                    $nextElement.focus();
                    $('html, body').animate({
                        scrollTop: $nextElement.offset().top - 200
                    }, 1);
                    break;
                case 32:
                    if (document.activeElement.nodeName == 'TR') {
                        e.preventDefault();
                        $(document.activeElement).find('[data-lc-item]').prop('checked', !$(document.activeElement).find('[data-lc-item]').prop('checked'));
                        $(document.activeElement).find('[data-lc-item]').change();
                    }
                    break;
                case 13:
                    e.preventDefault();
                    if (document.activeElement.nodeName == 'TR') {
                        var $dropdown = $(document.activeElement).find('[data-lt-dropdown]');
                        if (typeof bootstrap !== 'undefined') {
                            var instance = bootstrap.Dropdown.getOrCreateInstance($dropdown.get(0));
                            instance.toggle();
                            instance._menu.children[0].children[0].focus();
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    });
    rowActions.forEach(function(item) {
        item.addEventListener('hidden.bs.dropdown', function(e) {
            var $row = $(this).closest('tr');
            setTimeout(function() {
                if (!$(document.body).find('[data-lt-dropdown] .dropdown-menu.show').length) {
                    $row.focus();
                }
            }, 10);
        });
    });
}