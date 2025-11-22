/******************************************************************************
 ***
 ***  Listing Pagination Jump:
 ***
 ***  - Event Listener for focusing input
 ***  - Event Listener for focusing out input
 ***  - Event Listener for typing in input
 ***
 ***  Usage:
 ***  <input type="number" class="form-control" placeholder="Page 2 of 3" title="Jump to Page" data-bs-placement="bottom" data-bs-title="Jump to Page" data-bs-toggle="tooltip" data-lj-name="page" min="1" max="3" data-lj-current="2" data-lj-params="&type=1&name=omar" />
 ***  
 ***  min: minimum page
 ***  max: maximum page
 ***  [data-lj-current]: current page
 ***  [data-lj-name]: key in request
 ***  [data-lj-params]: other GET params in request
 ***
 ******************************************************************************/

$('[data-lj-params]').on('focus', function() {
    $(this).val(Number(this.dataset.ljCurrent));
    $(this).select();
});

$('[data-lj-params]').on('blur', function() {
    $(this).val('');
});

$('[data-lj-params]').on('keydown', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        var params = this.dataset.ljParams;
        var max = Number(this.max);
        var min = Number(this.min);
        if (this.value > max || this.value < min) {
            alert(APP.UTILS.TEXT.sprintf(__('This value should be between %s and %s.'), [min, max]));
            return;
        }
        if (window.location.href.includes('iframe')) {
            window.location.href = '?' + this.dataset.ljName + '=' + this.value + params + '&iframe=1';
        } else {
            window.top.location.href = '?' + this.dataset.ljName + '=' + this.value + params;
        }
    }
});