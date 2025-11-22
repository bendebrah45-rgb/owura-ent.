$(document).on('click', '.support-btn, .support-modal-btn', function() {
    IzamModal.closeModals();
    IzamModal.addUrlModal('/v2/owner/support-channels/index', '', '', false, false)
});