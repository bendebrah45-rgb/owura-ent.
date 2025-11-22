/******************************************************************************
 ***
 ***  Scrollbars:
 ***
 ***  - Add plugin for OverlayScrollbars library
 ***
 ******************************************************************************/

OverlayScrollbarsGlobal.OverlayScrollbars.plugin([OverlayScrollbarsGlobal.ClickScrollPlugin]);


/******************************************************************************
 ***
 ***  System Sidebar:
 ***
 ***  - Initialize custom scrollbar for sidebar
 ***  - Load/Save last scrollbar position from local storage
 ***  - Load/Save last scrollbar shrink status from cookies
 ***  - Load/Save last opened menu item from local storage
 ***  - Load last dark mode status from local storage
 ***  - Event Listeners for sidebar button, page content backdrop, resize window
 ***
 ******************************************************************************/


var SIDEBAR_SCROLLBAR = {};

function initSidebarScrollbar() {
    var sidebarList = document.querySelector('[data-sidebar-list]');
    if (sidebarList) {
        SIDEBAR_SCROLLBAR = OverlayScrollbarsGlobal.OverlayScrollbars(sidebarList, {
            scrollbars: {
                autoHide: 'leave',
                clickScroll: true,
            }
        }, {
            initialized(instance) {
                instance.elements().viewport.scrollTo({
                    top: getLastMenuPosition()
                });
            },
            scroll(instance, event) {
                var position = event.target.scrollTop;
                saveLastMenuPosition(position);
            }
        });
    }
}

function getLastMenuPosition() {
    var position = window.APP.UTILS.DATA.LOCAL_STORAGE.get('lastMenuPosition');
    if (position !== null) {
        return position;
    } else {
        return 0;
    }
}

function saveLastMenuPosition(lastMenuPosition) {
    if (lastMenuPosition !== null) {
        window.APP.UTILS.DATA.LOCAL_STORAGE.set('lastMenuPosition', lastMenuPosition);
    } else {
        window.APP.UTILS.DATA.LOCAL_STORAGE.remove('lastMenuPosition');
    }
}

function saveSidebarShrinkStatus(sidebarShrinkStatus) {
    if (sidebarShrinkStatus !== null) {
        window.APP.UTILS.DATA.COOKIES.set('menuClass', sidebarShrinkStatus);
    } else {
        window.APP.UTILS.DATA.COOKIES.remove('menuClass');
    }
}

function loadSidebarShrinkStatus() {
    var shrinkStatus = window.APP.UTILS.DATA.COOKIES.get('menuClass');
    if (shrinkStatus !== null && shrinkStatus == 'shrinked-sidebar' && $(document).width() > 993) {
        $(document.documentElement).get(0).dataset.sidebarShrink = 'true';
    } else {
        $(document.documentElement).get(0).dataset.sidebarShrink = 'false';
    }
}

function loadLastOpenedListItem() {
    var id = window.APP.UTILS.DATA.LOCAL_STORAGE.get('openedMenuItem');
    if (id !== null) {
        var parentListItem = $('[data-app-sidebar-list-item="' + id + '"]');
        var subList = parentListItem.find('[data-app-sidebar-list-item-sublist]');
        if (!$(document.documentElement).data('sidebar-shrink')) {
            parentListItem.addClass('sidebar-list-item--active');
            subList.show();
        } else {
            parentListItem.addClass('sidebar-list-item--shrink-active');
        }
    }
}

function saveLastOpenedListItem(lastOpenedListItem) {
    if (lastOpenedListItem !== null) {
        window.APP.UTILS.DATA.LOCAL_STORAGE.set('openedMenuItem', lastOpenedListItem);
    } else {
        window.APP.UTILS.DATA.LOCAL_STORAGE.remove('openedMenuItem');
    }
}

function removeLastOpenedListItem() {
    window.APP.UTILS.DATA.LOCAL_STORAGE.remove('openedMenuItem');
}

function loadDarkModeStatus() {
    var darkStatus = window.APP.UTILS.DATA.LOCAL_STORAGE.get('dark');
    if (darkStatus !== null && darkStatus == 'true') {
        $(document.documentElement).get(0).dataset.bsTheme = 'dark';
    }
}

// Before DOMContentLoaded event
loadSidebarShrinkStatus();
loadDarkModeStatus();

document.addEventListener('DOMContentLoaded', function() {
    loadLastOpenedListItem();
    if ($(document.documentElement).get(0).dataset.sidebarShrink == 'false') {
        initSidebarScrollbar();
    }
});

$(document).on('click', '[data-app-sidebar-list-item-btn]', function(e) {
    $('[data-app-sidebar-list-item]').removeClass('sidebar-list-item--shrink-active');
    var parentBtn = e.target;
    var parentListItem = $(parentBtn).closest('[data-app-sidebar-list-item]');
    var subList = parentListItem.find('[data-app-sidebar-list-item-sublist]');
    if (subList.is(':visible')) {
        parentListItem.removeClass('sidebar-list-item--active');
        subList.slideUp(function() {
            removeLastOpenedListItem();
        });
    } else {
        var siblings = parentListItem.addClass('sidebar-list-item--active').siblings();
        siblings.each(function(i, sibling) {
            $(sibling).removeClass('sidebar-list-item--active').find('[data-app-sidebar-list-item-sublist]').slideUp(function() {
                subList.slideDown(function() {
                    if ((siblings.length - 1) == i) {
                        saveLastOpenedListItem(parentListItem.data('app-sidebar-list-item'));
                    }
                });
            });
        });
    }
});

$(document).on('click', '[data-header-sidebar-btn]', function(e) {
    var $btn = $('[data-header-sidebar-btn]');
    var $sidebar = $('[data-sidebar]');
    var $content = $('[data-content]');
    if ($(document).width() < 993) {
        $sidebar.toggleClass('phone-show');
        $content.toggleClass('phone-hide');
        $btn.toggleClass('phone-active');
        if (typeof SIDEBAR_SCROLLBAR.destroy == 'undefined') {
            initSidebarScrollbar();
            $(document.documentElement).get(0).dataset.sidebarShrink = 'false';
        }
    } else {
        if (typeof SIDEBAR_SCROLLBAR.destroy != 'undefined') {
            $(document.documentElement).get(0).dataset.sidebarShrink = 'true';
            SIDEBAR_SCROLLBAR.destroy();
            SIDEBAR_SCROLLBAR = {};
        } else if (typeof SIDEBAR_SCROLLBAR.destroy == 'undefined') {
            initSidebarScrollbar();
            $(document.documentElement).get(0).dataset.sidebarShrink = 'false';
        }
        if ($(document.documentElement).get(0).dataset.sidebarShrink == 'true') {
            saveSidebarShrinkStatus('shrinked-sidebar');
        } else {
            saveSidebarShrinkStatus('ad1');
        }
    }
    var $activeListItem = $('.sidebar-list-item--shrink-active[data-app-sidebar-list-item]');
    if (($('[data-header-sidebar-btn]').hasClass('phone-active') || $(document.documentElement).get(0).dataset.sidebarShrink == 'false') && $activeListItem.length) {
        var $subList = $activeListItem.find('[data-app-sidebar-list-item-sublist]');
        $activeListItem.removeClass('sidebar-list-item--shrink-active').addClass('sidebar-list-item--active');
        $subList.show();
    }
    $activeListItem = $('.sidebar-list-item--active[data-app-sidebar-list-item]');
    if (!$('[data-header-sidebar-btn]').hasClass('phone-active') && $(document.documentElement).get(0).dataset.sidebarShrink == 'true' && $activeListItem.length) {
        var $subList = $activeListItem.find('[data-app-sidebar-list-item-sublist]');
        $activeListItem.removeClass('sidebar-list-item--active').addClass('sidebar-list-item--shrink-active');
        $subList.hide();
    }
});

$(document).on('click', '.phone-hide[data-content] [data-content-body]', function(e) {
    var $btn = $('[data-header-sidebar-btn]');
    var $sidebar = $('[data-sidebar]');
    var $content = $('[data-content]');
    if ($(document).width() < 993) {
        $sidebar.removeClass('phone-show');
        $content.removeClass('phone-hide');
        $btn.removeClass('phone-active');
    }
});

$(document).on('click', '[data-content-body]', function(e) {
    var $activeListItem = $('.sidebar-list-item--active[data-app-sidebar-list-item]');
    if ($(document).width() > 993 && $activeListItem.length && $(document.documentElement).get(0).dataset.sidebarShrink == 'true') {
        var $subList = $activeListItem.find('[data-app-sidebar-list-item-sublist]');
        $activeListItem.removeClass('sidebar-list-item--active').addClass('sidebar-list-item--shrink-active');
        $subList.hide();
    }
});

$(window).on('resize', function(e) {
    var $btn = $('[data-header-sidebar-btn]');
    var $sidebar = $('[data-sidebar]');
    var $content = $('[data-content]');
    if ($(document).width() < 993) {
        $sidebar.removeClass('phone-show');
        $content.removeClass('phone-hide');
    } else {
        $btn.removeClass('phone-active');
    }
});

/******************************************************************************
 ***
 ***  System Notifications:
 ***
 ***  - Load/Render system notifications from ajax request
 ***  - Event listeners for notification items
 ***
 ******************************************************************************/

function renderNotificationsCount() {
    var $countElement = $('[data-header-notifications-count]');
    var url = $countElement.data('header-notifications-count') ? $countElement.data('header-notifications-count') : '';
    if ($countElement.length && url.length) {
        $.ajax({
            url,
            type: 'GET',
            success: function(response) {
                if (response.count > 0) {
                    $countElement.show();
                    $countElement.text(response.count);
                } else {
                    $countElement.hide();
                }
            },
            error: function(request, status, error) {
                console.error('issue with fetching notification count')
            }
        });
    }
}

var NOTIFICATIONS_LOADED = false;

function renderNotifications(url) {
    var $itemsElement = $('[data-header-notifications-items]');
    if (typeof url == 'undefined') {
        $('[data-header-notifications-back-btn]').hide();
        url = $itemsElement.data('header-notifications-items') ? $itemsElement.data('header-notifications-items') : '';
    } else {
        $('[data-header-notifications-back-btn]').show();
    }
    if ($itemsElement.length && url.length) {
        $.ajax({
            url,
            type: 'GET',
            beforeSend: function() {
                $itemsElement.addClass('loading');
            },
            success: function(response) {
                if (response.length > 0) {
                    $itemsElement.html('');
                    $itemsElement.removeClass('empty');
                    NOTIFICATIONS_LOADED = true;
                    for (var index = 0; index < response.length; index++) {
                        var obj = response[index];
                        var template = $($("[data-header-notifications-item-template]").html());
                        var dismissUrl = obj.dismiss_url;
                        template.find('[data-header-notifications-item-text]').html(obj.message);
                        template.find('[data-header-notifications-item-date]').text(obj.date);
                        if (obj.total > 1) {
                            var url = obj.url;
                            template.on('click', function(e) {
                                renderNotifications(url);
                            });
                            template.find('[data-header-notifications-item-dismiss-btn-text="single"]').remove();
                            template.find('[data-header-notifications-item-link]').remove();
                        } else {
                            template.find('[data-header-notifications-item-dismiss-btn-text="all"]').remove();
                            template.find('[data-header-notifications-item-link]').attr('href', obj.url);
                        }
                        template.find('[data-header-notifications-item-dismiss-btn]').on('click', function() {
                            $.ajax({
                                url: dismissUrl,
                                type: 'GET',
                                success: function() {
                                    renderNotificationsCount();
                                    renderNotifications();
                                },
                            });
                        });
                        $itemsElement.append(template);
                    }
                } else {
                    $itemsElement.html('');
                    $itemsElement.addClass('empty');
                    var template = $($("[data-header-notifications-empty-template]").html());
                    $itemsElement.append(template);
                }
            },
            error: function(request, status, error) {
                console.error('issue with fetching notification count');
            },
            complete: function() {
                $itemsElement.removeClass('loading');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderNotificationsCount();
});

$(document).on('click', '[data-header-notifications-btn]', function() {
    if (!NOTIFICATIONS_LOADED) {
        renderNotifications();
    }
});

$(document).on('click', '[data-header-notifications-back-btn]', function() {
    renderNotifications();
});

/******************************************************************************
 ***
 ***  Tooltips:
 ***
 ***  - Initialize all tooltips
 ***  
 ***  - Usage:
 ***  
 ***    Refresh:
 ***    initOrRefreshTooltips();
 ***
 ******************************************************************************/

function initOrRefreshTooltips() {
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(function(tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

initOrRefreshTooltips();


/******************************************************************************
 ***
 ***  Fancybox:
 ***
 ***  - Initialize Fancybox lightbox
 ***  
 ***  - Usage:
 ***    <a target="_blank" href="https://picsum.photos/1000/1000" data-fancybox data-src="https://picsum.photos/1000/1000">
 ***       <img src="https://picsum.photos/38/38" class="thumb" data-bs-toggle="tooltip" data-bs-title="IMAGENAME.jpeg" title="IMAGENAME.jpeg" />
 ***     </a>
 *** 
 ***    Refresh:
 ***    initOrRefreshFancybox();
 ***
 ******************************************************************************/

function initOrRefreshFancybox() {
    if (typeof Fancybox != 'undefined') {
        Fancybox.defaults.Hash = false;
        Fancybox.defaults.parentEl = window.top.document.body;
        Fancybox.bind("[data-fancybox]", {
            Hash: false,
            parentEl: window.top.document.body
        });
    }
}


$(document).ready(function() {
    initOrRefreshFancybox();
});