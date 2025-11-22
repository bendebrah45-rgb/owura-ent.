$.toast = function(text, type, title, delay, autohide) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;
    var autohide = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var $toastsContainer = $('[data-toast-container]');
    if (!$toastsContainer.length) {
        $(document.body).append('<div class="toast-container" data-toast-container="true"></div>');
        $toastsContainer = $('[data-toast-container]');
    }
    var toastIcons = {
        danger: 'mdi mdi-alert-rhombus',
        warning: 'mdi mdi-alert-rhombus',
        info: 'mdi mdi-information',
        success: 'mdi mdi-check-circle',
    };
    var $node = $('<div class="toast ' + (type ? 'toast-' + type : '') + ' fade show" role="alert" aria-live="assertive" aria-atomic="true">\n' +
        '        <div class="toast-body">\n' +
        '            <div class="toast-content">\n' +
        '                <i class="toast-icon" data-toast-icon="true"></i>\n' +
        '                <div class="toast-text">\n' +
        '                    <div class="toast-title" data-toast-title="true"></div>\n' +
        '                    <p data-toast-text="true"></p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>\n' +
        '        </div>\n' +
        '    </div>');
    $node.find('[data-toast-icon]').addClass(type ? toastIcons[type] : toastIcons['warning']);
    $node.find('[data-toast-text]').html(text);
    if (title) {
        $node.find('[data-toast-title]').html(title);
    } else {
        $node.find('[data-toast-title]').remove();
    }
    $toastsContainer.append($node);
    if (bootstrap.Toast) {
        var instance = bootstrap.Toast.getOrCreateInstance($node.get(0), {
            autohide: autohide,
            delay: delay
        });
        instance.show();
    }
    $node.get(0).addEventListener('hidden.bs.toast', function() {
        $node.remove();
    });
}