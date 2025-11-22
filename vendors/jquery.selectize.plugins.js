function draw_attributes(data) {
    var html = '';
    if (Object.values(data).length && Object.values(data).length > 4) {
        var entries = Object.entries(data).filter(function(e) {
            return e[0] !== '$order' && e[0] !== 'disabled';
        });
        var entriesHtml = '';
        entries.forEach(function(entry, index) {
            entriesHtml = entriesHtml + '"' + entry[0] + '"' + ': ' + (typeof entry[1] === 'string' || entry[1] instanceof String ? '"' + entry[1] + '"' : entry[1]) + (entries.length - 1 == index ? '' : ',');
        });
        html = " data-data='{" + entriesHtml + "}'";
    }
    return html;
}

function escape_html(string) {
    var str = '' + string;
    var matchHtmlRegExp = /["'&<>]/;
    var match = matchHtmlRegExp.exec(str);

    if (!match) {
        return str;
    }

    var escape;
    var html = '';
    var index = 0;
    var lastIndex = 0;

    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
                escape = '&quot;';
                break;
            case 38: // &
                escape = '&amp;';
                break;
            case 39: // '
                escape = '&#39;';
                break;
            case 60: // <
                escape = '&lt;';
                break;
            case 62: // >
                escape = '&gt;';
                break;
            default:
                continue;
        }

        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }

        lastIndex = index + 1;
        html += escape;
    }

    return lastIndex !== index ?
        html + str.substring(lastIndex, index) :
        html;
}

/**
 * Multiple Change Event Fix Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("multiple-change-event-fix", function(pluginOptions) {
        var instance = this;
        instance.onChange = function() {
            "" !== this.getValue() && (this.lastValidValue = this.getValue()),
                this.$input.trigger("input");
            if (!this.getValue().length || !this.$input.attr('multiple')) {
                this.$input.trigger("change");
            }
        }
        instance.on('dropdown_close', function() {
            if (this.$input.attr('multiple')) {
                this.$input.trigger("change");
            }
        });
    });
}

/**
 * Preserve Option Attributes Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("preserve-option-attributes", function(pluginOptions) {
        var instance = this;
        instance.updateOriginalInput = function(opts) {
            var i, n, options, label;
            if (opts = opts || {},
                1 === this.tagType) {
                for (options = [],
                    i = 0,
                    n = this.items.length; i < n; i++)
                    label = this.options[this.items[i]][this.settings.labelField] || "",
                    options.push('<option value="' + escape_html(this.items[i]) + '" selected="selected" ' + draw_attributes(this.options[this.items[i]]) + '>' + escape_html(label) + "</option>");
                options.length || this.$input.attr("multiple") || options.push('<option value="" selected="selected"></option>'),
                    this.$input.html(options.join(""))
            } else
                this.$input.val(this.getValue()),
                this.$input.attr("value", this.$input.val());
            this.isSetup && (opts.silent || this.trigger("change", this.$input.val()))
        }
    });
}

/**
 * Multiple Auto Unfocus Items Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("multiple-auto-unfocus-items", function(pluginOptions) {
        var instance = this;
        instance.on('change', function() {
            instance.$control.find('.item[data-value]').removeClass('active');
        });
    });
}

/**
 * Template Classes
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("template", function(pluginOptions) {
        pluginOptions = $.extend({
            name: '',
        }, pluginOptions);
        var self = this;
        self.on('initialize', () => {
            var template = pluginOptions.name;
            self.$wrapper.addClass('template-' + template);
        });
    });
}

/**
 * Icon Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("icon", function(pluginOptions) {
        pluginOptions = $.extend({
            class: '',
        }, pluginOptions);
        var instance = this;
        var className = pluginOptions.class;
        if ($(instance.$input) && $(instance.$input).parent() && $(instance.$input).parent().find('i').length) {
            var $icon = $(instance.$input).parent().find('i');
            className = $(instance.$input).parent().find('i').attr('class');
            $icon.parent().remove();
        }
        if (className) {
            var $iconWrapper = $('<span class="icon-wrapper"><i class="' + className + '"></i></span>');

            function handleIcon() {
                instance.$wrapper.prepend($iconWrapper);
            }
            instance.on('initialize', function() {
                handleIcon();
            });
            instance.on('change', function() {
                if (!instance.$control.find('.icon-wrapper').length) {
                    handleIcon();
                }
            });
        } else {
            instance.on('initialize', function() {
                $(instance.$wrapper).removeClass('plugin-icon');
            });
        }
    });
}

/**
 * Disable Auto scroll Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("disable-auto-scroll", function() {
        var instance = this;
        instance.setActiveOption = function($option, scroll, animate) {
            var self = this;

            if (self.$activeOption) {
                self.$activeOption.removeClass('active');
                self.trigger('dropdown_item_deactivate', self.$activeOption.attr('data-value'));
            }
            self.$activeOption = null;

            $option = $($option);
            if (!$option.length) return;

            self.$activeOption = $option.addClass('active');
            if (self.isOpen) self.trigger('dropdown_item_activate', self.$activeOption.attr('data-value'));
        };
    });
}

/**
 * Option Deselect Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("option-deselect", function() {
        var instance = this;
        instance.on('initialize', function() {
            $(instance.$dropdown).off('click', '[data-selectable]');
        });
        instance.onOptionSelect = function(e) {
            var value, $target, $option, self = this;

            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }

            // prevent right click on option
            if (e.button && e.button === 2) {
                return;
            }

            $target = $(e.currentTarget);
            if ($target.hasClass('create')) {
                self.createItem(null, function() {
                    if (self.settings.closeAfterSelect) {
                        self.close();
                    }
                });
            } else {
                value = $target.attr('data-value');
                if (typeof value !== 'undefined') {
                    if (self.items.indexOf(value) >= 0) {
                        self.removeItem(value);
                        self.refreshOptions(true);
                        if (self.settings.closeAfterSelect) {
                            self.close();
                        }
                    } else {
                        self.lastQuery = null;
                        self.setTextboxValue('');
                        self.addItem(value);
                        if (self.settings.closeAfterSelect) {
                            self.close();
                        } else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
                            self.setActiveOption(self.getOption(value));
                        }
                    }
                }
            }
        };
    });
}

/**
 * Clear Button Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("clear-button", function() {
        var instance = this;
        var $clearBtn = $('<span class="clear"><button type="button" class="btn btn-input-clear"><i class="fal fa-times"></i></button></span>');

        function handleClearButton() {
            instance.$control.append($clearBtn);
            $clearBtn.find('button').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                instance.setValue([]);
                instance.refreshOptions();
                setTimeout(function() {
                    instance.blur();
                }, 1);
            });
        }
        instance.on('initialize', function() {
            if (instance.getValue().length) {
                handleClearButton();
            }
        });
        instance.on('change', function() {
            if (!instance.$control.find('.clear').length && instance.getValue().length) {
                handleClearButton();
            }
            if (!instance.getValue().length) {
                instance.$control.find('.clear').remove();
            }
        });
    });
}

/**
 * Multiple Plus Plugin
 */

if (typeof Selectize !== 'undefined') {
    Selectize.define("multiple-plus", function(pluginOptions) {
        var instance = this;
        if (instance.settings.mode === 'multi') {
            function handleSelectedOptions() {
                // if (instance.getValue().length < 2 && typeof instance.oneLineLimit == 'undefined') {
                //     return;
                // }

                // if (typeof instance.oneLineLimit == 'undefined') {
                //     instance.oneLineLimit = 0;
                // }

                // if (typeof instance.startHiding == 'undefined') {
                //     instance.startHiding = false;
                // }

                // if (instance.getValue().length < instance.oneLineLimit || instance.oneLineLimit == 0) {
                //     var $visibleItems = instance.$control.find('.item[data-value]');
                //     instance.startHiding = false;
                //     instance.oneLineLimit = 0;
                //     instance.$control.find('.count').remove();
                //     $visibleItems.show();
                //     instance.positionDropdown();
                // }

                // if (instance.getValue().length && instance.$control.get(0).offsetHeight > 42 && !instance.startHiding) {
                //     instance.oneLineLimit = instance.getValue().length - 1;
                //     instance.startHiding = true;
                // }

                // if (instance.startHiding && instance.getValue().length > instance.oneLineLimit) {
                //     var hiddenItemsCount = instance.getValue().length - instance.oneLineLimit;
                //     var $hiddenItems = instance.$control.find('.item[data-value]:nth-child(n+' + (instance.oneLineLimit + 1) + ')');
                //     var $visibleItems = instance.$control.find('.item[data-value]:nth-child(-n+' + (instance.oneLineLimit) + ')');
                //     $hiddenItems.hide();
                //     $visibleItems.show();
                //     if (instance.$control.find('.count').length) {
                //         instance.$control.find('.count').text('+' + (hiddenItemsCount));
                //     } else {
                //         instance.$control.append('<div class="item count">+' + (hiddenItemsCount) + '</div>');
                //     }
                //     instance.positionDropdown();
                // }

                // if (instance.getValue().length == instance.oneLineLimit) {
                //     instance.$control.find('.count').remove();
                //     instance.$control.find('.item').show();
                // }

                if (instance.initialHeight == 0) {
                    instance.$control.find('.item[data-value]:nth-child(n+2)').hide();
                    var hiddenItemsCount = 0;
                    instance.$control.find('.item[data-value]').each(function(i) {
                        if ($(this).attr('style')) {
                            hiddenItemsCount = hiddenItemsCount + 1;
                        }
                    });
                    if (hiddenItemsCount) {
                        if (instance.$control.find('.count').length) {
                            instance.$control.find('.count').text('+' + hiddenItemsCount);
                        } else {
                            instance.$control.append('<div class="item count">+' + (hiddenItemsCount) + '</div>');
                        }
                    }
                    instance.initialHeight = instance.$control.get(0).offsetHeight;
                } else {

                    if (instance.getValue().length) {
                        instance.$control.find('.item[data-value]').show();
                        if (instance.getValue().length == 1) {
                            instance.$control.find('.count').remove();
                            instance.$control.find('.item[data-value]').show();
                        } else if (instance.$control.get(0).offsetHeight > instance.initialHeight) {
                            var top = 0;
                            var hiddenItemsCount = 0;
                            var lastVisibleItem = null;
                            instance.$control.find('.item[data-value]').each(function(i) {
                                if (i == 0) {
                                    top = this.offsetTop;
                                }
                                var action = this.offsetTop == top ? 'show' : 'hide';
                                if (action == 'show') {
                                    lastVisibleItem = this;
                                }
                                $(this)[action]();
                                if (!$(this).is(':visible')) {
                                    hiddenItemsCount = hiddenItemsCount + 1;
                                }
                            });
                            if (instance.$control.find('.item[data-value]')[0] !== lastVisibleItem) {
                                $(lastVisibleItem).hide();
                                hiddenItemsCount = hiddenItemsCount + 1;
                            }
                            if (hiddenItemsCount) {
                                if (instance.$control.find('.count').length) {
                                    instance.$control.find('.count').text('+' + hiddenItemsCount);
                                } else {
                                    instance.$control.append('<div class="item count">+' + (hiddenItemsCount) + '</div>');
                                }
                                instance.positionDropdown();
                            }
                        }
                    } else {
                        instance.$control.find('.count').remove();
                        instance.$control.find('.item').show();
                    }
                }
            }

            instance.on('change', function() {
                handleSelectedOptions();
            });
            instance.initialHeight = instance.$input.get(0).offsetHeight;
            instance.on('initialize', function() {
                handleSelectedOptions();
            });
        }
    });
}

/**
 * Multiple Remove Button Plugin
 */

if (typeof Selectize !== 'undefined') {

    /**
     * Escape special characters in the given string of html.
     *
     * @param  {string} string The string to escape for inserting into HTML
     * @return {string}
     * @public
     */

    Selectize.define('multiple-remove-button', function(options) {
        if (this.settings.mode !== 'single') {
            options = $.extend({
                label: '&times;',
                title: 'Remove',
                className: 'remove',
                append: true
            }, options);

            var multiClose = function(thisRef, options) {

                var self = thisRef;
                var html = '<button type="button" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '"><i class="fal fa-times"></i></button>';

                /**
                 * Appends an element as a child (with raw HTML).
                 *
                 * @param {string} html_container
                 * @param {string} html_element
                 * @return {string}
                 */
                var append = function(html_container, html_element) {
                    var pos = html_container.search(/(<\/[^>]+>\s*)$/);
                    return html_container.substring(0, pos) + html_element + html_container.substring(pos);
                };

                thisRef.setup = (function() {
                    var original = self.setup;
                    return function() {
                        // override the item rendering method to add the button to each
                        if (options.append) {
                            var render_item = self.settings.render.item;
                            self.settings.render.item = function(data) {
                                return append(render_item.apply(thisRef, arguments), html);
                            };
                        }

                        original.apply(thisRef, arguments);

                        // add event listener
                        thisRef.$control.on('click', '.' + options.className, function(e) {
                            e.preventDefault();
                            if (self.isLocked) return;

                            var $item = $(e.currentTarget).parent();
                            self.setActiveItem($item);
                            if (self.deleteSelection()) {
                                self.setCaret(self.items.length);
                            }
                            return false;
                        });

                    };
                })();
            };
            multiClose(this, options);
        }
    });
}

/**
 * Readonly & disabled Plugin
 */

Selectize.define("readonly", function(options) {
    var self = this;
    self.on('initialize', function() {
        if (self.$input.get(0).attributes.readonly || self.$input.get(0).attributes.disabled) {
            self.lock();
        }
        self.$input.on('change', function() {
            if (self.$input.get(0).attributes.readonly || self.$input.get(0).attributes.disabled) {
                self.lock();
            } else {
                self.unlock();
            }
        });
        self.on('change', function() {
            if (self.$input.get(0).attributes.readonly || self.$input.get(0).attributes.disabled) {
                self.lock();
            } else {
                self.unlock();
            }
        });
    });
});

/**
 * Persistent Plugin
 */

Selectize.define('persistent', function(options) {
    var self = this;
    self.on('focus', function() {
        var originalFocus = self.onFocus;
        return function(e) {
            var value = self.getItem(self.getValue()).text();
            self.clear(true);
            self.setTextboxValue(value);
            // self.$control_input.select();
            setTimeout(function() {
                if (self.settings.selectOnTab) {
                    self.setActiveOption(self.getFirstItemMatchedByTextContent(value));
                }
                self.settings.score = null;
            }, 5);
            return originalFocus.apply(this, arguments);
        };
    }());

    self.onBlur = (function() {
        var originalBlur = self.onBlur;
        return function(e) {
            if (self.getValue() === "" && self.lastValidValue !== self.getValue()) {
                self.setValue(self.lastValidValue, true);
            }
            setTimeout(function() {
                self.settings.score = function() {
                    return function() {
                        return 1;
                    };
                };
            }, 0);
            return originalBlur.apply(this, arguments);
        }
    }());
    self.settings.score = function() {
        return function() {
            return 1;
        };
    };

});

/**
 * Auto Width Plugin
 */

Selectize.define('auto-width', function(options) {
    if (typeof Popper !== 'undefined') {
        var self = this;
        self.positionDropdown = function() {
            if (typeof self.popperInstance !== 'undefined') {
                self.popperInstance.update();
            }
        };
        self.on('initialize', function() {
            if (typeof Popper.createPopper !== 'undefined') {
                self.popperInstance = Popper.createPopper(self.$control.get(0), self.$dropdown.get(0), {
                    placement: 'bottom-start',
                    modifiers: [{
                            name: 'preventOverflow',
                            options: {
                                boundary: 'clippingParents'
                            }
                        },
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -2],
                            },
                        },
                    ],
                });
            } else {
                // compatability
                self.popperInstance = new Popper(self.$control.get(0), self.$dropdown.get(0), {
                    placement: 'bottom-start',
                    modifiers: {
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'scrollParent'
                        },
                        offset: {
                            enabled: true
                        },
                    },
                });
            }
        });
    }
});

/**
 * Clear Option
 */

Selectize.define("clear-option", function(options) {
    var self = this;
    self.on('change', function() {
        var values = self.getValue();
        if (!Array.isArray(values)) {
            values = [values];
        }
        var isBlankOption = values.find(function(id) {
            return id === '__clear__'
        });
        if (isBlankOption) {
            self.setValue([]);
            self.close();
        }

    });
});

/**
 * Append Values to
 */

Selectize.define("append-values-to", function(options) {
    var self = this;

    function appendValues() {
        self.$control_input.attr('placeholder', self.settings.placeholder);
        $(options.selector).html('');
        var values = self.getValue();
        if (!options.itemTemplate) {
            console.error('no item template was provided', self);
        } else {
            for (var id of values) {
                var itemHtml = String(options.itemTemplate).replaceAll('__text__', Object.values(self.options).find(function(obj) {
                    return obj.value == id
                }).text);
                var $item = $(itemHtml);
                $item.find('[data-item-remove]').on('click', function() {
                    self.removeItem(id);
                });
                $(options.selector).append($item);
            }
        }
    }
    self.on('change', function() {
        appendValues();
    });
    self.on('initialize', function() {
        appendValues();
    });
});

/**
 * Ajax Helper Text
 */


Selectize.define("search-helper-text", function(options) {
    var self = this;

    options = $.extend({
        title: __("Please enter 1 keyword or more to search"),
        noResultsTitle: __("No results found"),
        class: 'search-helper-text',
        icon: '',
        type: 'div',
        attributes: [],

        html: function(data) {
            let htmlAttributes = '';
            if (data.attributes.length) {
                data.attributes.map(attr => {
                    htmlAttributes = htmlAttributes + `${Object.keys(attr)[0]}="${Object.values(attr)[0]}"`
                });
            }
            return `
                <${data.type} class="${data.class}" ${htmlAttributes} ${data.type == 'button' ? 'type="button"' : ''} style="position: relative;top: 1px; clear: both;">
                    ${data.icon ? '<i class="'+ data.icon +'" style="pointer-events: none;"></i>&nbsp;&nbsp;' : ''}
                    <span style="pointer-events: none;" data-title>${data.title}.</span>
                    <span style="pointer-events: none;" data-no-results-title>${data.noResultsTitle}.</span>
                </${data.type}>
            `;
        }
    }, options);

    self.refreshOptions = (function() {
        var original = self.refreshOptions;
        return function() {
            original.apply(self, arguments);
            if (typeof self.$ajax_helper_text !== 'undefined') {
                if (this.hasOptions || !this.lastQuery) {
                    self.$ajax_helper_text.find('[data-title]').show();
                    self.$ajax_helper_text.find('[data-no-results-title]').hide();
                } else {
                    self.$ajax_helper_text.find('[data-title]').hide();
                    self.$ajax_helper_text.find('[data-no-results-title]').show();
                }
            }
        }
    })();

    self.on('type', function(str) {
        self.$dropdown.show();
    });

    self.on('focus', function() {
        var originalFocus = self.onFocus;
        return function(e) {
            self.positionDropdown();
            self.$dropdown.show();
            return originalFocus.apply(this, arguments);
        };
    }());

    self.setup = (function() {
        var original = self.setup;
        return function() {
            original.apply(self, arguments);
            self.$ajax_helper_text = $(options.html(options));
            self.$dropdown.prepend(self.$ajax_helper_text);
        };
    })();
});

/**
 * Dropdown Header
 */

Selectize.define("dropdown-header", function(options) {
    var self = this;

    options = $.extend({
        title: 'Add',
        icon: 'fa fa-plus',
        class: 'btn btn-primary w-100 justify-content-start',
        type: 'button',
        attributes: [],
        html: function(data) {
            var htmlAttributes = '';
            if (data.attributes.length) {
                data.attributes.map(function(attr) {
                    htmlAttributes = htmlAttributes + `${Object.keys(attr)[0]}="${Object.values(attr)[0]}"`
                });
            }
            return `
                <${data.type} class="${data.class}" ${htmlAttributes} ${data.type == 'button' ? 'type="button"' : ''} style="position: relative;top: 1px;">
                    ${data.icon ? '<i class="'+ data.icon +'" style="pointer-events: none;"></i>&nbsp;&nbsp;' : ''}
                    <span style="pointer-events: none;">${data.title}</span>
                </${data.type}>
            `;
        }
    }, options);

    self.on('type', function() {
        self.$dropdown.show();
    });

    self.on('focus', function() {
        var originalFocus = self.onFocus;
        return function(e) {
            self.positionDropdown();
            self.$dropdown.show();
            return originalFocus.apply(this, arguments);
        };
    }());

    self.setup = (function() {
        var original = self.setup;
        return function() {
            original.apply(self, arguments);
            self.$dropdown_header = $(options.html(options));
            self.$dropdown.prepend(self.$dropdown_header);
        };
    })();
});


/**
 * Dropdown Footer
 */

Selectize.define("dropdown-footer", function(options) {
    var self = this;

    options = $.extend({
        title: 'Add',
        icon: 'fa fa-plus',
        class: 'btn btn-primary w-100 justify-content-start',
        type: 'button',
        attributes: [],
        html: function(data) {
            var htmlAttributes = '';
            if (data.attributes.length) {
                data.attributes.map(function(attr) {
                    htmlAttributes = htmlAttributes + `${Object.keys(attr)[0]}="${Object.values(attr)[0]}"`
                });
            }
            return `
                <${data.type} class="${data.class}" ${htmlAttributes} ${data.type == 'button' ? 'type="button"' : ''} style="position: relative;top: 1px;">
                    ${data.icon ? '<i class="'+ data.icon +'" style="pointer-events: none;"></i>&nbsp;&nbsp;' : ''}
                    <span style="pointer-events: none;">${data.title}</span>
                </${data.type}>
            `;
        }
    }, options);

    self.on('type', function() {
        self.$dropdown.show();
    });

    self.on('focus', function() {
        var originalFocus = self.onFocus;
        return function(e) {
            self.positionDropdown();
            self.$dropdown.show();
            return originalFocus.apply(this, arguments);
        };
    }());

    self.setup = (function() {
        var original = self.setup;
        return function() {
            original.apply(self, arguments);
            self.$dropdown_footer = $(options.html(options));
            self.$dropdown.append(self.$dropdown_footer);
        };
    })();
});

/**
 * Feature: Clear Unselected options before ajax request
 */

Selectize.prototype.clearUnselectedOptions = function(silent) {
    var self = this;

    self.loadedSearches = {};
    self.userOptions = {};
    self.renderCache = {};
    var options = self.options;
    $.each(self.options, function(key, value) {
        if (self.items.indexOf(key) == -1) {
            delete options[key];
        }
    });
    self.options = self.sifter.items = options;
    self.lastQuery = null;
}

/**
 * Feature: Disable Search Cache ajax request
 */

Selectize.define('disable-search-cache', function(options) {
    var self = this;
    if (typeof self.settings.load !== 'undefined') {
        var debounce = function(fn, delay) {
            var timeout;
            return function() {
                var self = this;
                var args = arguments;
                window.clearTimeout(timeout);
                timeout = window.setTimeout(function() {
                    fn.apply(self, args);
                }, delay);
            };
        };
        var newOnSearchChange = function(value) {
            var fn = self.settings.load;
            if (!fn) return;
            self.loadedSearches[value] = true;
            self.load(function(callback) {
                fn.apply(self, [value, callback]);
            });
        };
        self.onSearchChange = self.settings.loadThrottle === null ? newOnSearchChange : debounce(newOnSearchChange, self.settings.loadThrottle);
    }
});

/**
 * Feature: Disable Search Filter ajax request
 */

Selectize.define('disable-search-filter', function(options) {
    var self = this;
    if (typeof self.settings.load !== 'undefined') {
        this.search = function(query) {
            var i, value, score, result, calculateScore;
            var self = this;
            var settings = self.settings;
            var options = this.getSearchOptions();

            // validate user-provided result scoring function
            if (settings.score) {
                calculateScore = self.settings.score.apply(this, [query]);
                if (typeof calculateScore !== 'function') {
                    throw new Error('Selectize "score" setting must be a function that returns a function');
                }
            }

            // perform search
            if (query !== self.lastQuery) {
                if (settings.normalize) query = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                self.lastQuery = query;
                result = self.sifter.search('', $.extend(options, {
                    score: calculateScore
                }));
                self.currentResults = result;
            } else {
                result = $.extend(true, {}, self.currentResults);
            }

            // filter out selected items
            if (settings.hideSelected) {
                for (i = result.items.length - 1; i >= 0; i--) {
                    if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
                        result.items.splice(i, 1);
                    }
                }
            }

            return result;
        };
    }
});

/**
 * Dropdown Radio
 */
Selectize.define("dropdown-radio", function(options) {
    var self = this;
    var valueChecked = '';
    if ($('#tag_radio_value').length) {
        valueChecked = $('#tag_radio_value').val();
    }
    options = $.extend({
        class: 'form-check-input',
        type: 'input',
        attributes: [],
        html: function(data) {
            var htmlAttributes = '';
            if (data.attributes.length) {
                data.attributes.map(function(attr) {
                    htmlAttributes = htmlAttributes + `${Object.keys(attr)[0]}="${Object.values(attr)[0]}"`
                });
            }
            const renderedHTML = Object.entries(options.inputs)
                .map(([key, value]) => {

                    return `
                    <label class="form-check form-check-custom col-6" style="float: left;">
                        <${data.type} class="${data.class}" ${htmlAttributes} ${data.type === 'input' ? `type="radio" name="${data.name || ''}" value="${key || ''}"` : ''}  style="position: relative; top: 1px;" ${valueChecked.toLowerCase() == key.toLowerCase() ? 'checked' : ''}>
                        </${data.type}>
                        <span style="pointer-events: none;" class="form-check-label text-capitalize">${value}</span>
                    </label>
                `;
                }).join('');
            return renderedHTML;
        }
    }, options);
    self.on('type', function() {
        self.$dropdown.show();
    });

    self.on('focus', function() {
        var originalFocus = self.onFocus;
        return function(e) {
            self.positionDropdown();
            self.$dropdown.show();
            return originalFocus.apply(this, arguments);
        };
    }());

    self.setup = (function() {
        var original = self.setup;
        return function() {
            original.apply(self, arguments);
            self.$dropdown_radio = $(options.html(options));
            self.$dropdown.prepend(self.$dropdown_radio);
            // add event listener
            self.$control.parent().find('.form-check-custom').on('click', function(e) {
                self.$dropdown.show();
            });
        };
    })();
});