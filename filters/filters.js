/******************************************************************************
 ***
 ***  Filters:
 ***
 ***  - Event Listener for Show/Hide Button to hide Advanced Button
 ***
 ******************************************************************************/

/**
 * Event Listener for Show/Hide Button to hide Advanced Button
 */
$('[data-bs-target="[data-filters-collapse]"]').on("click", function() {
    if ($('[data-id="filter-head"]').children().length > 0) {
        $("[data-filters-hidden]").toggleClass("d-none");
    }
});