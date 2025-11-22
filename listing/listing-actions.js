/******************************************************************************
 ***
 ***  Listing Actions:
 ***
 ***  - Event Listener for actions that changes <form>'s action/url
 ***  - and add more data and capable of processing data and merge it into
 ***  - a Comma separated value into one field and disabled the others
 ***  
 ***  - Data Attributes:
 ***  
 ***    [data-la-action]: Form Action URL
 ***    URL, Required
 ***  
 ***    [data-la-method]: Form Method
 ***    "GET" OR "POST", Optional
 ***  
 ***    [data-la-separate]: Data Separation
 ***    "comma", Optional
 ***  
 ***    [data-la-data]: Extra Data
 ***    '{"key": "value"}', Optional
 ***
 ***  - Usage:
 ***  
 ***    Simple Action with form defaults:
 ***    <button class="dropdown-item" type="submit" data-la-action="https://">
 ***  
 ***    Advanced Action with GET method:
 ***    <button class="dropdown-item" type="submit" data-la-action="https://" data-la-method="GET">
 ***  
 ***    Advanced Action with GET method and comma separation:
 ***    <button class="dropdown-item" type="submit" data-la-action="https://" data-la-method="GET" data-la-separate="comma">
 ***  
 ***    Advanced Action with POST method and extra data:
 ***    <button class="dropdown-item" type="submit" data-la-action="https://" data-la-method="POST" data-la-data='{"entity_key":"request_type"}]"}'>
 ***
 ******************************************************************************/

//  Helpers
function getCheckedListingFields($inputs) {
    var fields = [];
    $inputs.each(function() {
        var name = $(this).attr('name');
        if (name && name.indexOf('[]')) {
            var fieldNameIndex = fields.findIndex(function(f) {
                return f.name == name;
            });
            if (fieldNameIndex == -1) {
                fields.push({
                    name: name,
                    values: [],
                    $inputs: {},
                });
            }
        }
    });
    fields.forEach(function(fieldObject) {
        var $filteredInputs = $inputs.filter('[name="' + fieldObject.name + '"]');
        fieldObject.$inputs = $filteredInputs;
        $filteredInputs.each(function() {
            fieldObject.values.push($(this).val());
        });
    });
    return fields;
}

/**
 * Actions that submits the table's form
 */

$('[data-la-action]').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var confirmData = $this.data('la-confirm');

    function callback() {
        var $form = $('[data-lt-form]:visible');
        var method = $this.data('la-method');
        var actionUrl = $this.data('la-action');
        var separateByComma = $this.data('la-separate') && $this.data('la-separate') == 'comma' ? true : false;
        var extraData = $this.data('la-data');
        if (method) {
            $form.attr('method', method);
        }
        if (actionUrl) {
            $form.attr('action', actionUrl);
        }
        if (separateByComma) {
            var $inputs = $form.find('[data-lc-item]:checked:not(:disabled)');
            var checkedFields = getCheckedListingFields($inputs);
            checkedFields.forEach(function(fieldObject) {
                fieldObject.$inputs.each(function() {
                    $(this).removeAttr('name');
                });
                $('<input>').attr({
                    type: 'hidden',
                    name: fieldObject.name.replace('[]', ''),
                    value: fieldObject.values.join(','),
                    'data-current-page': "current-page",
                }).appendTo($form);
            });
        }
        if (extraData) {
            for (var key in extraData) {
                if (typeof extraData[key] === 'object') {
                    for (var inputName in extraData[key]) {
                        $('<input>').attr({
                            type: 'hidden',
                            name: key + '[' + inputName + ']',
                            value: extraData[key][inputName],
                        }).appendTo($form)
                    }
                } else {
                    $('<input>').attr({
                        type: 'hidden',
                        name: key,
                        value: extraData[key],
                    }).appendTo($form);
                }
            }
        }
        var $inputData = $this.attr('data-get-ids-ajax');
        var $input = $('input[name="ids"][data-lc-input="all-filtered-pages"]');
        if ($(this).attr('target')) {
            $form.attr('target', $(this).attr('target'));
        }
        if ($inputData && 'all' === $input.val()) {
            getFilteredIds($input, $inputData);
            return setTimeout(() => $form.submit(), 1000);
        }
        $form.submit();
    }
    if (confirmData) {
        modalConfirm(confirmData.message, confirmData.icon ? confirmData.icon : null, confirmData.color ? confirmData.color : null)
            .then(function(confirmed) {
                if (confirmed) {
                    callback();
                }
            });
    } else {
        callback();
    }
});

$('[data-la-input]').on('click', function(e) {
    var $form = $('[data-lt-form]');
    var $inputs = $form.find('[data-lc-item]:checked:not(:disabled)');
    var checkedFields = getCheckedListingFields($inputs);
    var checkedIds = checkedFields.find(function(f) {
        return f.name == 'ids[]'
    });
    var $allFilteredPagesInputs = $('[data-lc-input="all-filtered-pages"]');
    var inputSelector = $(this).attr('data-la-input');
    var $input = $(inputSelector);
    if (checkedIds && checkedIds.values.length) {
        $input.val(checkedIds.values.join(','));
    } else if (typeof $allFilteredPagesInputs.attr('disabled') === 'undefined') {
        $input.val($allFilteredPagesInputs.filter('[name="ids"]').val());
    }
    var $inputData = $(this).attr('data-get-ids-ajax');
    if ($inputData && 'all' === $input.val()) {
        getFilteredIds($input, $inputData);
    }
});

function getFilteredIds($input, $inputData) {
    let inputData = JSON.parse($inputData);
    let requestData = JSON.parse(inputData.data);
    requestData.ids = 'all';
    $.ajax({
        url: inputData.url,
        method: inputData.method,
        data: requestData,
        dataType: 'json',
        success: function(response) {
            $input.val(response.ids);
            console.log(response.ids)
        },
        error: function(xhr, status, error) {
            console.error('AJAX request failed:', error);
        }
    });
}