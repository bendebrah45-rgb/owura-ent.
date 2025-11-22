var placeholderPrevActiveElement;

(function($) {
    var pluginName = "inputPlaceholder";

    function InputPlaceholderPlugin(element, options) {
        var $el = $(element);

        options = $.extend({}, $.fn[pluginName].defaults, options);
        var url = options["url"],
            tooltip = options["tooltip"],
            viewAllButton = options["viewAllButton"],
            hiddenInput = options["hiddenInput"];

        var jqXHR = false;
        var placeholderEvalJqXHR = false;
        var placeholderEvalCache = {
            data: {},
            remove: function(url) {
                delete placeholderEvalCache.data[url];
            },
            exist: function(url) {
                return (
                    placeholderEvalCache.data.hasOwnProperty(url) &&
                    placeholderEvalCache.data[url] !== null
                );
            },
            get: function(url) {
                return placeholderEvalCache.data[url];
            },
            set: function(url, cachedData, callback) {
                placeholderEvalCache.remove(url);
                placeholderEvalCache.data[url] = cachedData;
                if ($.isFunction(callback)) callback(cachedData);
            },
        };

        localStorage.removeItem("placeholders");

        // Register last blur element
        window.addEventListener(
            "focus",
            function(e) {
                placeholderPrevActiveElement = document.activeElement;
            },
            true
        );

        // for save mentionsInput plugin value
        $(document).on("input", $el, function() {
            $el.mentionsInput("val", function(text) {
                if (hiddenInput) {
                    $(this)
                        .closest("[data-form-group]")
                        .find(hiddenInput)
                        .val(text);
                } else {
                    $("[type=hidden][name=" + $(this).attr("name") + "]").val(text);
                }
            });
        });

        function init() {
            createFormula();
        }

        function updateTextareaHeight(textarea) {
            $(textarea).height("auto").height($(textarea).get(0).scrollHeight - 12);
        }

        // Create Equation or condition
        function createFormula() {
            if ($el.data("mentionsInput")) {
                return;
            }

            var $that = $el;
            var placeholder_tooltip_url;
            var placeholder_url;
            if (url.length > 0) {
                placeholder_tooltip_url = url.replace(
                    "placeholders",
                    "placeholders/label"
                );
                placeholder_url = url;
            } else {
                placeholder_tooltip_url = $el
                    .data("placeholder-url")
                    .replace("placeholders", "placeholders/label");
                placeholder_url = $el.data("placeholder-url");
            }

            $that.on("keydown keyup input propertychange change mention", function() {
                updateTextareaHeight($that.get(0));
            });
            $(document).ready(function() {
                updateTextareaHeight($that.get(0));
            });

            $that
                .parent()
                .find(viewAllButton)
                .click(function(e) {
                    e.preventDefault();
                    $that.mentionsInput("showList");
                });

            $that
                .closest(".formula-wrap")
                .find(".formula-init")
                .click(function(e) {
                    e.preventDefault();
                    $that.mentionsInput("showList");
                });

            var $icon = $that
                .closest("[data-form-group]")
                .find(viewAllButton)
                .find("i");


            $that.mentionsInput({
                //triggerChar:'$',
                minChars: 0,
                allowRepeat: true,
                showAvatars: false,
                defaultValue: $that.val(),
                onDataRequest: function(mode = "name", query, callback) {
                    if (jqXHR) {
                        jqXHR.abort();
                    }


                    if ($that.data("data")) {
                        var responseData = $that.data("data");
                        responseData = _.filter(responseData, function(item) {
                            if (mode == "id") {
                                //Added second case to filter by name sometimes the id is different from the name
                                return (
                                    item.id.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                                    item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
                                );
                            } else {
                                return (
                                    item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
                                );
                            }
                        });

                        // update tooltip when no result
                        callback.call(this, responseData);
                        return;
                    }

                    // Handle loader
                    $icon
                        .removeClass("mdi-tag-outline")
                        .addClass("mdi-loading mdi-spin rounded-circle");

                    var local_storage_placeholders = JSON.parse(
                        localStorage.getItem("placeholders")
                    );

                    if (local_storage_placeholders === null) {
                        jqXHR = $.getJSON(placeholder_url, function(responseData) {
                            $that.data("data", responseData);

                            parsePlaceholders(responseData, mode, query, $icon, callback);
                        }).done(function(responseData) {
                            localStorage.setItem(
                                "placeholders",
                                JSON.stringify(responseData)
                            );
                        });
                    } else {
                        parsePlaceholders(
                            local_storage_placeholders,
                            mode,
                            query,
                            $icon,
                            callback
                        );
                    }
                },
            });

            var typingTimer;

            function sleep(ms) {
                return new Promise((res, rej) => {
                    setTimeout(function() {
                        res(true);
                    }, ms);
                });
            }

            $that.on("focus", function() {
                if ($that.val()) {
                    doneTyping();
                }
            });

            $that.on("input", function() {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, 1500);
            });

            function doneTyping() {
                if (placeholderEvalJqXHR) {
                    placeholderEvalJqXHR.abort();
                }
                if ($that.val() === "") {
                    $that.closest("[data-form-group]").find(tooltip).hide();
                    $that
                        .closest("[data-form-group]")
                        .find(tooltip)
                        .removeClass("is-visible is-loading");
                    $that
                        .closest("[data-form-group]")
                        .find(".input-placeholder-tooltip-body")
                        .html("");
                    return false;
                }
                if ($that.val().includes("@")) {
                    return false;
                }
                placeholderEvalJqXHR = $.ajax({
                    url: placeholder_tooltip_url,
                    type: "post",
                    data: {
                        equation: $that.val(),
                    },
                    beforeSend: function() {
                        $that.closest("[data-form-group]").find(tooltip).show();
                        sleep(100).then(function() {
                            $that
                                .closest("[data-form-group]")
                                .find(tooltip)
                                .addClass("is-visible is-loading");
                            if (placeholderEvalCache.exist($that.val())) {
                                var cachedData = placeholderEvalCache.get(
                                    $that.val()
                                ).responseJSON;
                                $that
                                    .closest("[data-form-group]")
                                    .find(tooltip)
                                    .removeClass("is-loading");
                                $that
                                    .parent()
                                    .find(".input-placeholder-tooltip-body")
                                    .html(cachedData);
                                return false;
                            }
                            return true;
                        });
                    },
                    success: function(data, status, jqXHR) {
                        placeholderEvalCache.set($that.val(), jqXHR);
                        $that
                            .closest("[data-form-group]")
                            .find(tooltip)
                            .removeClass("is-loading");
                        $that
                            .closest("[data-form-group]")
                            .find(".input-placeholder-tooltip-body")
                            .html(data);
                    },
                    error: function(jqXHR, textStatus, errorThrow) {
                        console.log(jqXHR, textStatus, errorThrow);
                    },
                });
            }

            $that.on("blur", function() {
                if (jqXHR) {
                    jqXHR.abort();
                }
                $that.closest("[data-form-group]").find(tooltip).hide();
                $that
                    .closest("[data-form-group]")
                    .find(tooltip)
                    .removeClass("is-visible is-loading");

                // Handle loader
                $icon
                    .removeClass("mdi-loading mdi-spin rounded-circle")
                    .addClass("mdi-tag-outline");
            });

            $that.bind("input", function() {
                if ("" === $that.val().trim()) {
                    // Handle loader
                    $icon
                        .removeClass("mdi-loading mdi-spin rounded-circle")
                        .addClass("mdi-tag-outline");
                }
            });

            // $el.attr("style", "height: auto !important; overflow: hidden");
        }

        function parsePlaceholders(placeholders, mode, query, $icon, callback) {
            // Handle loader
            $icon
                .removeClass("mdi-loading mdi-spin rounded-circle")
                .addClass("mdi-tag-outline");
            if (mode === "id") {
                placeholders = _.filter(placeholders, function(item) {
                    return item.id.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            } else {
                placeholders = _.filter(placeholders, function(item) {
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            }
            callback.call(this, placeholders);
        }

        init();
    }

    $.fn[pluginName] = function(options) {
        if (typeof arguments[0] === "string") {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                if (
                    $.data(this, "plugin_" + pluginName) &&
                    typeof $.data(this, "plugin_" + pluginName)[methodName] === "function"
                ) {
                    returnVal = $.data(this, "plugin_" + pluginName)[methodName].apply(
                        this,
                        args
                    );
                } else {
                    throw new Error(
                        "Method " + methodName + " does not exist on jQuery." + pluginName
                    );
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof options === "object" || !options) {
            return this.each(function() {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(
                        this,
                        "plugin_" + pluginName,
                        new InputPlaceholderPlugin(this, options)
                    );
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        url: "",
        tooltip: "[data-placeholder-tooltip]",
        viewAllButton: "[data-placeholder-btn]",
        hiddenInput: false,
    };

    (function() {
        // $("[data-placeholder]").inputPlaceholder();
    })();
})(jQuery);