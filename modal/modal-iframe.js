/******************************************************************************
 ***
 ***  Modal Iframe:
 ***
 ***  - Event Listener for clicking button
 ***
 ***  Usage:
 ***  <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalIframe" data-mi-url="https://oidev.daftra.local/" data-mi-title="Dashboard">
 ***  
 ***  [data-mi-url]: modal iframe url
 ***  [data-mi-title]: modal title
 ***
 ******************************************************************************/

$(document).ready(function() {
    var $modal = '';
    var $modalIframe = '';
    var $title = '';
    if (typeof window.top.$ != 'undefined' && window.top.$('[data-mi-iframe]').length) {
        $modalIframe = window.top.$('[data-mi-iframe]');
        $modal = $modalIframe.closest('#modalIframe');
        $modalDialog = $modal.children();
        $title = $modal.find('[data-mi-modal-title]');
    }

    if ($modalIframe) {
        $('[data-mi-url]').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var title = $this.data('mi-title');
            var size = $this.data('mi-size');
            var url = $this.data('mi-url');
            if (url) {
                $modalIframe.parent().addClass('loading');
                $modalIframe.attr('src', url);
            }
            if (title) {
                $title.html(title);
            }
            if (size) {
                $modalDialog.removeClass('modal-fullscreen');
                $modalDialog.addClass(`modal-${size}`);
            } else {
                $modalDialog.attr('class', 'modal-dialog modal-fullscreen');
            }
            $modal.modal('show');
        });

        $modalIframe.get(0).addEventListener('load', function(e) {
            var $this = $(this);
            $this.parent().removeClass('loading');
        });
    }
});