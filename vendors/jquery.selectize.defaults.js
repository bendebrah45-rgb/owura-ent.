/**
 * Defaults
 */

if (typeof window.APP == 'undefined') {
    window.APP = {};
}

if (typeof window.APP.VENDORS == 'undefined') {
    window.APP.VENDORS = {};
}

if (typeof window.APP.VENDORS.DEFAULTS == 'undefined') {
    window.APP.VENDORS.DEFAULTS = {};
}

window.APP.VENDORS.DEFAULTS.selectize = {
    single: {
        selectOnTab: false,
        hideSelected: false,
        loadThrottle: 600,
        plugins: {
            "auto-width": {},
            "readonly": {},
            "template": {},
            "clear-option": {},
            "preserve-option-attributes": {},
            "option-deselect": {},
            "disable-auto-scroll": {},
            "search-helper-text": {},
            "disable-search-cache": {},
            "disable-search-filter": {}
        },
    },
    multiple: {
        selectOnTab: false,
        hideSelected: false,
        loadThrottle: 600,
        plugins: {
            "auto-width": {},
            "readonly": {},
            "template": {},
            "clear-option": {},
            "preserve-option-attributes": {},
            "multiple-change-event-fix": {},
            "multiple-remove-button": {},
            "option-deselect": {},
            "multiple-auto-unfocus-items": {},
            "disable-auto-scroll": {},
            "search-helper-text": {},
            "disable-search-cache": {},
            "disable-search-filter": {}
        },
    },
    singleFilter: {
        selectOnTab: false,
        hideSelected: false,
        loadThrottle: 600,
        plugins: {
            "auto-width": {},
            "readonly": {},
            "template": {},
            "clear-option": {},
            "preserve-option-attributes": {},
            "clear-button": {},
            "disable-auto-scroll": {},
            "option-deselect": {},
            "icon": {},
            "search-helper-text": {},
            "disable-search-cache": {},
            "disable-search-filter": {}
        },
    },
    multipleFilter: {
        selectOnTab: false,
        hideSelected: false,
        loadThrottle: 600,
        plugins: {
            "auto-width": {},
            "readonly": {},
            "template": {},
            "clear-option": {},
            "preserve-option-attributes": {},
            "clear-button": {},
            "multiple-change-event-fix": {},
            "multiple-plus": {},
            "multiple-remove-button": {},
            "option-deselect": {},
            "multiple-auto-unfocus-items": {},
            "disable-auto-scroll": {},
            "icon": {},
            "search-helper-text": {},
            "disable-search-cache": {},
            "disable-search-filter": {}
        },
    },
    tags: {
        delimiter: ',',
        persist: false,
        hideSelected: true,
        loadThrottle: 600,
        plugins: {
            "auto-width": {},
            "readonly": {},
            "template": {},
            "clear-option": {},
            "preserve-option-attributes": {},
            "multiple-change-event-fix": {},
            "multiple-remove-button": {},
            "option-deselect": {},
            "multiple-auto-unfocus-items": {},
            "disable-auto-scroll": {},
            "disable-search-cache": {},
            "disable-search-filter": {}
        },
        create: function(input) {
            return {
                value: input,
                text: input,
            };
        },

    },
}

if (typeof Selectize !== 'undefined') {
    Selectize.defaults = Object.assign(Selectize.defaults, window.APP.VENDORS.DEFAULTS.selectize.single);
}