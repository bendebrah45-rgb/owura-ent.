/******************************************************************************
 ***
 ***  Modal Delete:
 ***
 ***  - Event Listener for clicking delete action button
 ***
 ***  Usage:
 ***  <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalDelete" data-md-message="Are You Sure You Want To Delete This Bank ?" data-md-action="https://oidev.daftra.local/owner/treasuries/delete/4" data-md-method="GET" data-md-data='{"_token": "spA5QRFDIDwXGq2hOB7XLPoqQUh6yWj0b8VlQQSO"}'>
 ***  
 ***  [data-md-message]: modal message
 ***  [data-md-action]: action URL for form
 ***  [data-md-method]: method for form
 ***  [data-md-data]: other extra data in request
 ***
 ******************************************************************************/

$(document).ready(function() {
    var $oldFormExtraData = '';
    var $form = '';
    var $modal = '';
    var $formMessage = '';
    var topWindow = window;
    if (typeof window.top.$ != 'undefined' && window.top.$('[data-md-form]').length) {
        $oldFormExtraData = window.top.$('[data-md-form-data]');
        $form = window.top.$('[data-md-form]');
        $modal = $form.closest('[data-md-modal],#modalDelete');
        $formMessage = window.top.$('[data-md-form-message]');
        topWindow = window.top;
    }

    if ($form) {
        $('[data-md-action]').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var method = $this.data('md-method');
            var actionUrl = $this.data('md-action');
            var message = $this.data('md-message');
            var extraData = $this.data('md-data');
            if (method) {
                $form.attr('method', method);
            }
            if (actionUrl) {
                $form.attr('action', actionUrl);
            }
            if (message) {
                $formMessage.text(message);
            }
            if (typeof window.top.$ != 'undefined' && window.top.$('[data-md-form]').length) {
                $oldFormExtraData = window.top.$('[data-md-form-data]');
                if ($oldFormExtraData.length) {
                    $oldFormExtraData.remove();
                }
            }
            if (extraData) {
                for (var key in extraData) {
                    if (typeof extraData[key] === 'object') {
                        for (var inputName in extraData[key]) {
                            $('<input>').attr({
                                type: 'hidden',
                                name: key + '[' + inputName + ']',
                                value: extraData[key][inputName],
                                'data-md-form-data': 'true',
                            }).appendTo($form)
                        }
                    } else {
                        $('<input>').attr({
                            type: 'hidden',
                            name: key,
                            value: extraData[key],
                            'data-md-form-data': 'true',
                        }).appendTo($form);
                    }
                }
            }
            if (typeof $modal.modal == "function") {
                $modal.modal('show');
            } else if (typeof topWindow.bootstrap != "undefined") {
                topWindow.bootstrap.Modal.getOrCreateInstance($modal.get(0)).show()

            }
        });
    }
});

/**
 * Shared Delete Event Listener
 * 
 * This is used to handle shared delete events from other layouts.
 * 
 * Usage:
 * <button class="dropdown-item" type="button" data-event-shared-delete='true'>
 * 
 */
$(document).ready(function() {
    $('[data-event-shared-delete]').click(function(e) {
        var eventData = {
            action: $(this).data('md-action'),
            data: $(this).data('md-data'),
            message: $(this).data('md-message'),
            method: $(this).data('md-method')
        };
        if (typeof window.top.EVENTS_SHARED_DELETE !== 'undefined' && window.top.EVENTS_SHARED_DELETE) {
            e.preventDefault();
            const event = new CustomEvent('event-shared-delete', {
                detail: eventData
            });
            window.top.dispatchEvent(event);
        }
    });
});