document.querySelectorAll('[data-app-sidebar-list-item="104"]').forEach(i => i.remove());
var activeAppGroupInLocalStorage = getActiveAppGroupInLocalStorage();
if (document.querySelectorAll("[data-app-manager-dropdown-btn]").length && activeAppGroupInLocalStorage) {
    activateAppGroup(activeAppGroupInLocalStorage);
}

function getActiveAppGroupInLocalStorage() {
    if (typeof localStorage != 'undefined') {
        return localStorage.getItem('activeAppGroup');
    }
    return null;
}

function setActiveAppGroupInLocalStorage(id) {
    if (typeof localStorage != 'undefined') {
        localStorage.setItem('activeAppGroup', id);
    }
}

function activateAppGroup(id) {
    var app = document.querySelector('[data-app-manager-dropdown-app="' + id + '"]');
    if (app) {
        // var $this = $('[data-app-manager-dropdown-app="' + id + '"]')
        var appManagerButtonContainer = closest(app, "[data-app-manager-dropdown-container]");
        // var $container = $this.closest("[data-app-manager-dropdown-container]");
        var newTitle = app.querySelector("[data-app-manager-dropdown-app-title]").innerHTML;
        var newColor = app.querySelectorAll("[data-app-manager-dropdown-app-icon]").length ?
            app.querySelector("[data-app-manager-dropdown-app-icon]").style.color :
            "";
        var newIcon = app.querySelectorAll("[data-app-manager-dropdown-app-icon]").length ?
            app.querySelector("[data-app-manager-dropdown-app-icon]").attributes.class.value :
            "";
        var $titleContainer = appManagerButtonContainer.querySelector(
            "[data-app-manager-dropdown-btn]"
        );


        app.parentElement.querySelectorAll("[data-app-manager-dropdown-app]").forEach(function(item) {
            if (item != app) {
                item.classList.remove('active');
            }
        });

        app.classList.add("active");

        $titleContainer.querySelector("[data-app-manager-dropdown-btn-title]").innerHTML = newTitle;

        if (newIcon) {
            $titleContainer
                .querySelector("[data-app-manager-dropdown-btn-app-icon]")
                .attributes.class.value = 'app-manager-dropdown-btn-app-icon ' + newIcon;
            if (newColor) {
                $titleContainer
                    .querySelector("[data-app-manager-dropdown-btn-app-icon]")
                    .style.color = newColor;
            }
        } else if ($titleContainer.querySelectorAll("[data-app-manager-dropdown-btn-app-icon]").length) {
            $titleContainer
                .querySelector("[data-app-manager-dropdown-btn-app-icon]")
                .attributes.class.value = "";
            if (newColor) {
                $titleContainer
                    .querySelector("[data-app-manager-dropdown-btn-app-icon]")
                    .style.color = '';
            }
        }

        document.querySelectorAll('[data-app-sidebar-list-item]').forEach(function(item) {
            if (item.dataset.appSidebarListItem != 1) {
                var $listItem = item;
                var $subItems = $listItem.querySelectorAll('[data-app-sidebar-list-item-sublist-item-group-id]');
                var $subItemsSameAppGroup = [];
                var $subItemsNotSameAppGroup = [];
                $subItems.forEach(function(subItem) {
                    if (subItem.dataset.appSidebarListItemSublistItemGroupId == id) {
                        $subItemsSameAppGroup.push(subItem);
                    } else {
                        $subItemsNotSameAppGroup.push(subItem);
                    }
                });
                show($listItem);
                show($subItems);
                if (id) {
                    if ($subItemsSameAppGroup.length) {
                        hide($subItemsNotSameAppGroup);
                    } else {
                        hide($listItem);
                    }
                }
            }
        });
    }
}

document.querySelectorAll("[data-app-manager-dropdown-btn]").forEach(function(btn) {
    btn.addEventListener('click', function() {
        var container = closest(btn, "[data-app-manager-dropdown-container]");
        var dropdown = container.querySelector('[data-app-manager-dropdown]');
        if (container.querySelector("[data-app-manager-dropdown]").style.display == 'block') {
            container.querySelector("[data-app-manager-dropdown]").style.display = 'none';
        } else {
            container.querySelector("[data-app-manager-dropdown]").style.display = 'block';
        }
        if (container.classList.contains('app-manager-dropdown-active')) {
            container.classList.remove('app-manager-dropdown-active');
        } else {
            container.classList.add('app-manager-dropdown-active');
        }
        dropdown.style.top = btn.getBoundingClientRect().top + btn.getBoundingClientRect().height + 'px';
    });
});

document.querySelectorAll("[data-app-manager-dropdown-btn]").forEach(function(btn) {
    btn.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            btn.dispatchEvent(new Event("click"));
        }
    });
});

document.addEventListener("click", function(e) {
    var $title = document.querySelector("[data-app-manager-dropdown-btn]");
    if ($title && !$title.isEqualNode(e.target) && !$title.contains(e.target)) {
        hide(document.querySelector("[data-app-manager-dropdown]"));
        document.querySelector("[data-app-manager-dropdown-container]").classList.remove("app-manager-dropdown-active");
    }
});

document.querySelectorAll("[data-app-manager-dropdown-app]").forEach(function(app) {
    app.addEventListener('click', function(e) {
        e.preventDefault();
        var id = app.dataset.appManagerDropdownApp;
        activateAppGroup(id);
        setActiveAppGroupInLocalStorage(id);
    });
});

function closest(elem, selector) {
    while (elem !== document.body) {
        elem = elem.parentElement;
        if (elem.matches(selector)) return elem;
    }
    return null;
}

function hide($list) {
    var list = typeof $list.length != 'undefined' ? $list : [$list];
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
}

function show($list) {
    var list = typeof $list.length != 'undefined' ? $list : [$list];
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'block';
    }
}