(function($) {
    var pluginName = "subform";

    function SubformPlugin(element, options) {
        var $el = $(element);
        var dragger;
        options = $.extend({}, $.fn[pluginName].defaults, options);
        var template,
            addBtn = $(options["addBtn"]),
            dragBtn = options["dragBtn"],
            removeBtn = options["removeBtn"],
            onAddRow = options["onAddRow"],
            afterAddRow = options["afterAddRow"],
            onRemoveRow = options["onRemoveRow"],
            afterRemoveRow = options["afterRemoveRow"],
            lastIndex = options["lastIndex"],
            minimumRows = options["minimumRows"],
            maximumRows = options["maximumRows"],
            rowNo = options["rowNo"];
        validation = options["validation"];


        if ($el.find(options["template"]).length) {
            template = $el.find(options["template"]).html();
        } else {
            template = $(options["template"]).html()
        }

        var $addBtn = null;
        if ($el.find(addBtn).length) {
            $addBtn = $el.find(addBtn);
        } else {
            $addBtn = $(addBtn)
        }

        var $validation = null;
        if ($el.find(validation).length) {
            $validation = $el.find(validation);
        }

        if (lastIndex === 0) {
            lastIndex = $el.find('tbody').children().length;
        }

        var $form = $el.closest('form');

        function init() {
            refreshRowNumbers();
            bindEvents();
        }

        function bindEvents() {
            $el.on("click", removeBtn, function(e) {
                e.preventDefault();
                removeRow(this);
            });

            $addBtn.on("click", function(e) {
                e.preventDefault();
                addRow();
            });

            if (dragBtn) {
                enableDraggable();
            }

        }

        function refreshRowNumbers() {
            var $rowNo = $el.find(rowNo);
            if ($rowNo.length) {
                if ($rowNo.is(':input')) {
                    $rowNo.val(function(i) {
                        return i + 1;
                    });
                } else {
                    $rowNo.text(function(i) {
                        return i + 1;
                    });
                }
            }
        }

        function enableDraggable() {
            var el = $el.find("table")[0];
            dragger = tableDragger.default(el, {
                mode: "row",
                onlyBody: true,
                dragHandler: dragBtn,
            });

            dragger.on('drop', function(from, to) {
                refreshRowNumbers();
            });

        }

        function disableDraggable() {
            if (typeof dragger != 'undefined' && dragger && dragger.destroy) {
                dragger.destroy();
            }
        }

        function updateInputValue($input, value) {
            switch ($input.get(0).nodeName) {
                case 'INPUT':
                case 'TEXTAREA':
                    if ($input.attr('type') === 'checkbox' || $input.attr('type') === 'radio') {
                        var key = $input.data('subform-name');
                        $input = $input.closest('tr').find(`input[data-subform-name="${key}"][value="${value}"]`);
                        $input.prop('checked', true);
                    } else {
                        $input.val(value);
                    }
                    break;

                case 'SELECT':
                    if ($input.find(`option[value="${value}"]`).length === 0) {
                        $input.append(`<option value="${value}" selected>${value}</option>`);
                    }
                    $input.val(value);
                    break;

                default:
                    break;
            }
        }

        function updateRowData($row, data) {
            var $inputs = $row.find(`[data-subform-name]`);
            $inputs.each(function() {
                var $input = $(this);
                var key = $input.data('subform-name');
                var chunks = key.split('.');
                var value = '';
                if (chunks.length === 1) {
                    value = data[key];
                } else {
                    value = chunks.reduce(function(accumulator, chunk, index) {
                        return accumulator[chunk];
                    }, data);
                }
                updateInputValue($input, value);
            });
        }

        function addRow(data) {
            return new Promise(function(res, rej) {
                if (maximumRows != -1 && $el.find("tbody").children().length >= maximumRows) {
                    rej(new Error('Error adding row, maybe settings has maximumRows set'));
                    return;
                }
                lastIndex++;
                var newTemplate = template.replace(/__index__/g, lastIndex.toString())
                newTemplate = newTemplate.replace(/__row_no__/g, $el.find("tbody").children().length + 1);
                var $row = $(newTemplate);
                if (data) {
                    updateRowData($row, data);
                }
                var addRow = onAddRow($row, lastIndex);
                if (addRow) {
                    if ($validation !== null) {
                        $validation.html('');
                    }
                    $row = $row.appendTo($el.find('table').find("tbody"));
                    refreshRowNumbers();
                    $el.trigger('subform:add', [$row, lastIndex]);
                    if (dragBtn) {
                        disableDraggable();
                        enableDraggable();
                    }
                    if (typeof $.fn.refreshValidation !== 'undefined' && $form) {
                        $form.refreshValidation();
                    }
                    afterAddRow($row, lastIndex);
                    res($row);
                }
            });
        }

        function addRows(countOrData) {
            if (typeof countOrData === 'number' || typeof countOrData === 'string') {
                for (var index = 0; index < countOrData; index++) {
                    addRow();
                }
            } else if (Array.isArray(countOrData)) {
                for (var index = 0; index < countOrData.length; index++) {
                    addRow(countOrData[index]);
                }
            }
        }

        function getRowByEl(btn) {
            return $(btn).closest("tr");
        }

        function getRowByIndex(index) {
            return $el.find('tbody').find("tr")[index];
        }

        function getLastRow() {
            var index = $el.find('tbody').find("tr").length - 1;
            if (index > -1) {
                return $el.find('tbody').find("tr")[index];
            }
            return null;
        }

        function removeRow(indexOrEl) {
            return new Promise(function(res, rej) {
                if (
                    minimumRows <= 0 ||
                    (minimumRows > 0 && $el.find("tbody").children().length > minimumRows)
                ) {
                    var $row = {};
                    if (typeof indexOrEl == 'string' || typeof indexOrEl === 'number') {
                        $row = getRowByIndex(indexOrEl);
                    } else if (typeof indexOrEl == 'object') {
                        $row = getRowByEl(indexOrEl);
                    } else {
                        $row = getLastRow();
                    }
                    if ($row) {
                        var removeRow = onRemoveRow($row, lastIndex);
                        if (removeRow) {
                            $row.remove();
                            refreshRowNumbers();
                            $el.trigger('subform:remove', [$row, lastIndex]);
                            if (typeof $.fn.refreshValidation !== 'undefined' && $form) {
                                $form.refreshValidation();
                            }
                            afterRemoveRow($row, lastIndex);
                            res($row);
                        }
                    } else {
                        rej(new Error('Error deleting row, table is empty'));
                    }
                } else {
                    rej(new Error('Error deleting row, maybe settings has minimumRows set'));
                }
            });
        }


        init();

        return {
            $el,
            addRow,
            addRows,
            removeRow,
            onAddRow,
            afterAddRow,
            onRemoveRow,
            afterRemoveRow,
            lastIndex,
            minimumRows,
            maximumRows
        }
    }

    $.fn[pluginName] = function(options) {
        if ($(this).data(pluginName) && $(this).data(pluginName) != true) {
            return $(this).data(pluginName);
        }

        if (typeof arguments[0] === "string") {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                if (
                    $.data(this, pluginName) &&
                    typeof $.data(this, pluginName)[methodName] === "function"
                ) {
                    returnVal = $.data(this, pluginName)[methodName].apply(
                        this,
                        args
                    );
                } else {
                    throw new Error(
                        "Method " + methodName + " does not exist on jQuery." + pluginName
                    );
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof options === "object" || !options) {
            var instances = [];
            this.each(function() {
                if (!$.data(this, pluginName) || ($.data(this, pluginName) == true)) {
                    var instance = new SubformPlugin(this, options);
                    $.data(
                        this,
                        pluginName,
                        instance
                    );
                    instances.push(instance);
                }
            });
            if (instances.length == 1) {
                return instances[0];
            } else {
                return instances;
            }
            return
        }
    };

    $.fn[pluginName].defaults = {
        addBtn: "[data-row-add]",
        dragBtn: "[data-cell-drag]",
        removeBtn: "[data-cell-remove]",
        template: "[data-subform-template]",
        validation: "[data-subform-validation]",
        rowNo: "[data-row-no]",
        onAddRow: function() {
            return true;
        },
        afterAddRow: function() {},
        onRemoveRow: function() {
            return true;
        },
        afterRemoveRow: function() {
            return true;
        },
        lastIndex: 0,
        minimumRows: 0,
        maximumRows: -1
    };

    (function() {
        $("[data-subform]").subform();
    })();
})(jQuery);