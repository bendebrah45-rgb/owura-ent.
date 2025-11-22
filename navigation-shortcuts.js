if (typeof izamNavigationHandler == 'undefined') {
    class izamNavigationHandler {
        holdKeyName = {
            16: "shiftKey",
            17: "ctrlKey",
            18: "altKey",
        };
        constructor(izNav) {
            this.izNav = this.changeShortcutDirection(izNav);
            this.navigationHandler();
        }

        changeShortcutDirection(keyboardShortcuts) {
            for (var i = 0; i < keyboardShortcuts.length; i++) {
                if ($("html").attr("dir") == "rtl") {
                    switch (keyboardShortcuts[i].key) {
                        case 37:
                            keyboardShortcuts[i].key = 39;
                            break;
                        case 39:
                            keyboardShortcuts[i].key = 37;
                            break;
                        default:
                            break;
                    }
                }
            }
            return keyboardShortcuts;
        }

        isShortcut(e) {
            for (var i = 0; i < this.izNav.length; i++) {
                var shortcut = this.izNav[i];
                if (
                    e.keyCode == shortcut.key &&
                    shortcut.holdKey == null &&
                    e.altKey == false &&
                    e.ctrlKey == false &&
                    e.shiftKey == false
                ) {
                    return shortcut;
                } else if (
                    e.keyCode === shortcut.key &&
                    e[this.holdKeyName[shortcut.holdKey]]
                ) {
                    return shortcut;
                }
            }
            return false;
        }

        navigationHandler = function() {
            var _this = this;
            document.addEventListener("keydown", function(e) {

                var shortcut = _this.isShortcut(e);
                if (shortcut &&
                    document.activeElement.nodeName == "INPUT" ||
                    document.activeElement.nodeName == "SELECT" ||
                    document.activeElement.nodeName == "TEXTAREA" ||
                    document.activeElement.className.indexOf("note-editable") >= 0 ||
                    (document.activeElement.nodeName == "BUTTON" &&
                        $(document.activeElement).hasClass("selectpicker"))
                ) {
                    return true;
                }
                if (shortcut) {
                    var event = new Event(shortcut.action);
                    document.dispatchEvent(event);
                }
            });
        };
    }
    window.izamNavigationHandler = izamNavigationHandler;
}