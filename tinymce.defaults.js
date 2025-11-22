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

function getAllStylesheets() {
    const allCssStylesheetsLinks = [];
    const stylesheets = document.styleSheets;
    for (let i = 0; i < stylesheets.length; i++) {
        if (stylesheets[i].href) {
            allCssStylesheetsLinks.push(stylesheets[i].href);
        }
    }
    return allCssStylesheetsLinks;
}


window.APP.VENDORS.DEFAULTS.tinymce = {
    default: {
        inline: false,
        menubar: false,
        plugins: 'table link lists directionality pagebreak image',
        verify_html: false,
        cleanup: false,
        allow_conditional_comments: true,
        extended_valid_elements: "span[*]",
        contextmenu: false,
        content_css: getAllStylesheets(),
        body_class: 'iframe editor',
        hidden_input: false,
        editable_class: 'mce-inline-editable-area',
        noneditable_class: 'mce-inline-non-editable-area',
        toolbar_persist: true,
        font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
        toolbar: "restoredraft undo redo styles textstyle alignment indent outdent bullist numlist ltr rtl link pagebreak image table",
        relative_urls: false,
        convert_urls: false,
        setup: function(editor) {
            editor.ui.registry.addGroupToolbarButton('alignment', {
                icon: 'align-left',
                tooltip: 'Alignment',
                items: 'alignleft aligncenter alignright | alignjustify'
            });
            editor.ui.registry.addGroupToolbarButton('textstyle', {
                icon: 'change-case',
                tooltip: 'Text Style',
                items: 'fontsize | bold italic underline | forecolor backcolor | fontfamily'
            });
            editor.on('change', function() {
                editor.save();
            });
        }
    },
    template: {
        inline: false,
        menubar: false,
        plugins: 'table link lists directionality pagebreak image code',
        verify_html: false,
        cleanup: false,
        allow_conditional_comments: true,
        extended_valid_elements: "span[*]",
        contextmenu: false,
        body_class: 'iframe editor',
        hidden_input: false,
        editable_class: 'mce-inline-editable-area',
        noneditable_class: 'mce-inline-non-editable-area',
        toolbar_persist: true,
        font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
        toolbar: "restoredraft undo redo styles textstyle alignment indent outdent bullist numlist ltr rtl link pagebreak image table code",
        relative_urls: false,
        convert_urls: false,
        setup: function(editor) {
            editor.ui.registry.addGroupToolbarButton('alignment', {
                icon: 'align-left',
                tooltip: 'Alignment',
                items: 'alignleft aligncenter alignright | alignjustify'
            });
            editor.ui.registry.addGroupToolbarButton('textstyle', {
                icon: 'change-case',
                tooltip: 'Text Style',
                items: 'fontsize | bold italic underline | forecolor backcolor | fontfamily'
            });
            editor.on('change', function() {
                editor.save();
            });
        }
    },

}