function modalConfirm(message, icon, color) {
    return new Promise(function(resolve) {
        // Remove any existing modal
        var existing = document.getElementById("modalConfirmModal");
        if (existing) existing.parentNode.removeChild(existing);

        // Build modal HTML
        var modalHtml = `<div class="modal modal-delete fade" id="modalConfirmModal" tabindex="-1" aria-labelledby="modalConfirmModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        ${icon ? `<i class="${icon} text-${color || 'danger'}"></i>` : '<i class="mdi mdi-trash-can-outline text-danger"></i>'}
                        <div>
                            ${message}
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn ${color ? `btn-${color}` : 'btn-danger'}" id="modalConfirmOkBtn">${__(
                          "Yes"
                        )}</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modalConfirmCancelBtn">${__(
                          "No"
                        )}</button>
                    </div>
                </div>
            </div>
        </div>`;

        // Append modal HTML to body
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = modalHtml;
        document.body.appendChild(tempDiv.firstChild);

        var modalEl = document.getElementById("modalConfirmModal");
        var okBtn = document.getElementById("modalConfirmOkBtn");
        var cancelBtn = document.getElementById("modalConfirmCancelBtn");
        var resolved = false;

        // Create Bootstrap modal instance
        var modal = new bootstrap.Modal(modalEl);

        function finish(result) {
            if (!resolved) {
                resolved = true;
                resolve(result);
                modal.hide();
            }
        }

        okBtn.onclick = function() {
            finish(true);
        };
        cancelBtn.onclick = function() {
            finish(false);
        };

        // Also resolve false if modal is closed by backdrop or 'x'
        modalEl.addEventListener("hidden.bs.modal", function handler() {
            finish(false);
            modalEl.removeEventListener("hidden.bs.modal", handler);
            if (modalEl.parentNode) {
                modalEl.parentNode.removeChild(modalEl);
            }
        });

        modal.show();
    });
}