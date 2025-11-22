/**
 * Defaults
 */

if (typeof window.APP == 'undefined') {
    window.APP = {};
}

if (typeof window.APP.VENDORS == 'undefined') {
    window.APP.VENDORS = {};
}

if (typeof window.APP.VENDORS.DEFAULTS == 'undefined') {
    window.APP.VENDORS.DEFAULTS = {};
}

window.APP.VENDORS.DEFAULTS.flatpickr = {
    date: {
        allowInput: true,
        altInput: true,
        altFormat: window.APP.USER.dateFormat,
        dateFormat: "Y-m-d",
        disableMobile: true,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.default,
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
    },
    time: {
        allowInput: true,
        altInput: true,
        disableMobile: true,
        enableTime: true,
        time_24hr: true,
        noCalendar: true,
        dateFormat: "H:i",
        altFormat: "H:i",
        minuteIncrement: 1,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.default,
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
    },
    dateTime: {
        allowInput: true,
        altInput: true,
        altFormat: window.APP.USER.dateFormat + ' H:i',
        dateFormat: "Y-m-d H:i",
        disableMobile: true,
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.default,
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
    },
    dateRange: {
        allowInput: true,
        altInput: true,
        altFormat: window.APP.USER.dateFormat,
        dateFormat: "Y-m-d",
        disableMobile: true,
        mode: "range",
        showMonths: 2,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.range,
        ranges: {
            'Today': [new Date(), new Date()],
            'Last 30 Days': [moment().subtract(29, 'days').toDate(), new Date()],
            'This Month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
            'Last Month': [
                moment().subtract(1, 'month').startOf('month').toDate(),
                moment().subtract(1, 'month').endOf('month').toDate()
            ]
        },
        rangesOnly: true, // only show the ranges menu unless the custom range button is selected
        rangesAllowCustom: true, // adds a Custom Range button to show the calendar
        rangesCustomLabel: 'Custom Range', // customize the label for the custom range button
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
    },
    dateTimeRange: {
        allowInput: true,
        altInput: true,
        altFormat: window.APP.USER.dateFormat + ' H:i',
        dateFormat: "Y-m-d H:i",
        disableMobile: true,
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1,
        mode: "range",
        showMonths: 2,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.range,
        ranges: {
            'Today': [new Date(), new Date()],
            'Last 30 Days': [moment().subtract(29, 'days').toDate(), new Date()],
            'This Month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
            'Last Month': [
                moment().subtract(1, 'month').startOf('month').toDate(),
                moment().subtract(1, 'month').endOf('month').toDate()
            ]
        },
        rangesOnly: true, // only show the ranges menu unless the custom range button is selected
        rangesAllowCustom: true, // adds a Custom Range button to show the calendar
        rangesCustomLabel: 'Custom Range', // customize the label for the custom range button
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
    },
    dateFilter: {
        allowInput: true,
        altInput: true,
        position: "below left",
        altFormat: window.APP.USER.dateFormat,
        dateFormat: "Y-m-d",
        disableMobile: true,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.default,
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                var $clearBtn = $group.find('[data-form-input-clear]');
                $clearBtn.on('click', function() {
                    instance.clear();
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                });
            }
            if ($(instance.input).val().length) {
                $group.addClass('has-value');
                $group.addClass('show-label');
            } else {
                $group.removeClass('has-value');
                $group.removeClass('show-label');
            }
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
        onClose: function(selectedDates, dateStr, instance) {
            setTimeout(function() {
                var $group = $(instance.altInput).closest('[data-form-group]');
                if ($group.length && instance.altInput.value && instance.altInput.value.length) {
                    $group.addClass('has-value');
                    $group.addClass('show-label');
                } else {
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                }
            }, 1);
        },
    },
    timeFilter: {
        allowInput: true,
        altInput: true,
        disableMobile: true,
        enableTime: true,
        time_24hr: true,
        noCalendar: true,
        dateFormat: "H:i",
        altFormat: "H:i",
        minuteIncrement: 1,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.default,
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                var $clearBtn = $group.find('[data-form-input-clear]');
                $clearBtn.on('click', function() {
                    instance.clear();
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                });
            }
            if ($(instance.input).val().length) {
                $group.addClass('has-value');
                $group.addClass('show-label');
            } else {
                $group.removeClass('has-value');
                $group.removeClass('show-label');
            }
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
        onClose: function(selectedDates, dateStr, instance) {
            setTimeout(function() {
                var $group = $(instance.altInput).closest('[data-form-group]');
                if ($group.length && instance.altInput.value && instance.altInput.value.length) {
                    $group.addClass('has-value');
                    $group.addClass('show-label');
                } else {
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                }
            }, 1);
        },
    },
    dateTimeFilter: {
        allowInput: true,
        altInput: true,
        altFormat: window.APP.USER.dateFormat + ' H:i',
        dateFormat: "Y-m-d H:i",
        disableMobile: true,
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.default,
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                var $clearBtn = $group.find('[data-form-input-clear]');
                $clearBtn.on('click', function() {
                    instance.clear();
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                });
            }
            if ($(instance.input).val().length) {
                $group.addClass('has-value');
                $group.addClass('show-label');
            } else {
                $group.removeClass('has-value');
                $group.removeClass('show-label');
            }
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
        onClose: function(selectedDates, dateStr, instance) {
            setTimeout(function() {
                var $group = $(instance.altInput).closest('[data-form-group]');
                if ($group.length && instance.altInput.value && instance.altInput.value.length) {
                    $group.addClass('has-value');
                    $group.addClass('show-label');
                } else {
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                }
            }, 1);
        },
    },
    dateRangeFilter: {
        allowInput: true,
        altInput: true,
        altFormat: window.APP.USER.dateFormat,
        dateFormat: "Y-m-d",
        disableMobile: true,
        mode: "range",
        showMonths: 2,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.range,
        ranges: {
            'Today': [new Date(), new Date()],
            'Last 30 Days': [moment().subtract(29, 'days').toDate(), new Date()],
            'This Month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
            'Last Month': [
                moment().subtract(1, 'month').startOf('month').toDate(),
                moment().subtract(1, 'month').endOf('month').toDate()
            ]
        },
        rangesOnly: true, // only show the ranges menu unless the custom range button is selected
        rangesAllowCustom: true, // adds a Custom Range button to show the calendar
        rangesCustomLabel: 'Custom Range', // customize the label for the custom range button
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                var $clearBtn = $group.find('[data-form-input-clear]');
                $clearBtn.on('click', function() {
                    instance.clear();
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                });
            }
            if ($(instance.input).val().length) {
                $group.addClass('has-value');
                $group.addClass('show-label');
            } else {
                $group.removeClass('has-value');
                $group.removeClass('show-label');
            }
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
        onClose: function(selectedDates, dateStr, instance) {
            setTimeout(function() {
                var $group = $(instance.altInput).closest('[data-form-group]');
                if ($group.length && instance.altInput.value && instance.altInput.value.length) {
                    $group.addClass('has-value');
                    $group.addClass('show-label');
                } else {
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                }
            }, 1);
        },
    },
    dateTimeRangeFilter: {
        allowInput: true,
        altInput: true,
        altFormat: window.APP.USER.dateFormat + ' H:i',
        dateFormat: "Y-m-d H:i",
        disableMobile: true,
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1,
        mode: "range",
        showMonths: 2,
        plugins: window.APP.VENDORS.PLUGINS.flatpickr.range,
        ranges: {
            'Today': [new Date(), new Date()],
            'Last 30 Days': [moment().subtract(29, 'days').toDate(), new Date()],
            'This Month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
            'Last Month': [
                moment().subtract(1, 'month').startOf('month').toDate(),
                moment().subtract(1, 'month').endOf('month').toDate()
            ]
        },
        rangesOnly: true, // only show the ranges menu unless the custom range button is selected
        rangesAllowCustom: true, // adds a Custom Range button to show the calendar
        rangesCustomLabel: 'Custom Range', // customize the label for the custom range button
        onReady: function(selectedDates, dateStr, instance) {
            instance.altInput.setAttribute('dir', 'ltr');
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                var $clearBtn = $group.find('[data-form-input-clear]');
                $clearBtn.on('click', function() {
                    instance.clear();
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                });
            }
            if ($(instance.input).val().length) {
                $group.addClass('has-value');
                $group.addClass('show-label');
            } else {
                $group.removeClass('has-value');
                $group.removeClass('show-label');
            }
            instance.input.flatpickr = instance;
            instance.altInput.flatpickr = instance;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            var $input = $(instance.altInput);
            var width = $input.width();
            var $group = $(instance.altInput).closest('[data-form-group]');
            if ($group.length) {
                width = $group.width();
            }
            instance.calendarContainer.style.minWidth = width + 'px';
        },
        onClose: function(selectedDates, dateStr, instance) {
            setTimeout(function() {
                var $group = $(instance.altInput).closest('[data-form-group]');
                if ($group.length && instance.altInput.value && instance.altInput.value.length) {
                    $group.addClass('has-value');
                    $group.addClass('show-label');
                } else {
                    $group.removeClass('has-value');
                    $group.removeClass('show-label');
                }
            }, 1);
        },
    },
}

if (typeof flatpickr !== 'undefined') {
    flatpickr.setDefaults(window.APP.VENDORS.DEFAULTS.flatpickr.date);
    flatpickr.l10ns.default.rangeSeparator = "  -  ";
}