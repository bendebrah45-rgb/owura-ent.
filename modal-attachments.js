/******************************************************************************
 ***
 ***  Modal Attachments:
 ***
 ***  - Event Listener for clicking button
 ***
 ***  Usage:
 ***  <button type="button" data-ma-data="JSON HERE" data-ma-title="Attachments">
 ***  
 ***  [data-ma-data]: modal data
 ***  [data-ma-title]: modal title
 ***
 ******************************************************************************/

$('[data-ma-data]').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var data = $this.data('ma-data');
    var title = $this.data('ma-title');
    var $modal = typeof window.top.$ !== 'undefined' ? window.top.$('#modalAttachments') : $('#modalAttachments');
    var $modalData = typeof window.top.$ !== 'undefined' ? window.top.$('[data-ma-modal-data]') : $('[data-ma-modal-data]');
    var $title = typeof window.top.$ !== 'undefined' ? window.top.$('[data-ma-modal-title]') : $('[data-ma-modal-title]');
    $modal.modal('show');
    $title.html(title);
    $modalData.html('');
    if (data && Array.isArray(data) && data.length) {
        data.forEach(function(file) {
            $modalData.append(`<div class="col-lg-6 col-xl-3">
                <div class="attachment attachment-sm" title="${file.name}" data-bs-title="${file.name}" data-bs-toggle="tooltip">
                    ${window.APP.UTILS.FILE.isImage(file.name) ? `
                        <div class="attachment-thumb" data-src="${file.url}" data-fancybox>
                            <img src="${file.url}" alt="${file.name}" />
                        </div>
                    ` : `
                        <a class="attachment-thumb" href="${file.url}" target="_blank" download>
                            <i class="${window.APP.UTILS.FILE.getIcon(file.name)}"></i>
                        </a>
                    `}
                    <a class="attachment-meta" href="${file.url}" target="_blank" download>
                        <div class="attachment-meta-row">
                            <div class="attachment-name">
                                <i class="mdi mdi-file"></i>
                                <span>${file.name}</span>
                            </div>
                            <div class="attachment-actions">
                                ${typeof file.size !== 'undefined' ? `<span>${window.APP.UTILS.FILE.formatSize(file.size)}</span>` : ``}
                                <i class="mdi mdi-download attachment-download"></i>
                            </div>
                        </div>
                    </a>
                </div>
            </div>`);
        });
    }
});