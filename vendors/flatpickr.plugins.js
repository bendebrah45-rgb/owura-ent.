if (typeof window.APP == 'undefined') {
    window.APP = {};
}

if (typeof window.APP.VENDORS == 'undefined') {
    window.APP.VENDORS = {};
}

if (typeof window.APP.VENDORS.PLUGINS === 'undefined') {
    window.APP.VENDORS.PLUGINS = [];
}

if (typeof window.APP.VENDORS.PLUGINS.flatpickr === 'undefined') {
    window.APP.VENDORS.PLUGINS.flatpickr = [];
}

if (typeof window.APP.VENDORS.PLUGINS.flatpickr.default === 'undefined') {
    window.APP.VENDORS.PLUGINS.flatpickr.default = [];
}

if (typeof window.APP.VENDORS.PLUGINS.flatpickr.range === 'undefined') {
    window.APP.VENDORS.PLUGINS.flatpickr.range = [];
}

/**
 * Close calendar in iframe
 */
(function() {
    'use strict';

    function closeCalendarInIframe(test) {
        return function(fp) {
            if (window.top !== window.self) {
                window.top.document.addEventListener('click', function() {
                    fp.close();
                });
            }
        }
    }
    window.APP.VENDORS.PLUGINS.flatpickr.default.push(new closeCalendarInIframe());
    window.APP.VENDORS.PLUGINS.flatpickr.range.push(new closeCalendarInIframe());
})();

/**
 * Disabled & Readonly Plugin
 */

(function() {
    'use strict';

    function disabledReadonly(test) {
        return function(fp) {
            return {
                onReady(selectedDates, dateStr, instance) {
                    function checkDisabledReadonly(instance) {
                        if (instance.altInput) {
                            var $inputGroup = $(instance.altInput).closest('.input-group');
                            if (instance.input.attributes.readonly || instance.input.attributes.disabled) {
                                instance.altInput.setAttribute('disabled', 'disabled');
                                if ($inputGroup.length && $inputGroup.find(':input').length == 2) {
                                    $inputGroup.addClass('bg-secondary');
                                }
                            } else {
                                instance.altInput.removeAttribute('disabled');
                                if ($inputGroup.length && $inputGroup.find(':input').length == 2) {
                                    $inputGroup.removeClass('bg-secondary');
                                }
                            }
                        }
                    }
                    checkDisabledReadonly(instance);
                    $(instance.input).on('change', function() {
                        checkDisabledReadonly(instance);
                    });
                }
            }
        }
    }
    window.APP.VENDORS.PLUGINS.flatpickr.default.push(new disabledReadonly());
    window.APP.VENDORS.PLUGINS.flatpickr.range.push(new disabledReadonly());
})();

/**
 * Range Plugin
 */

(function() {
    'use strict';

    var predefinedRanges = function() {
        return function(fp) {

            let rangesNav = document.createElement('ul');
            rangesNav.className = "nav flex-column flatpickr-predefined-ranges";

            const pluginData = {
                ranges: typeof fp.config.ranges !== 'undefined' ? fp.config.ranges : {},
                rangesOnly: typeof fp.config.rangesOnly === 'undefined' || fp.config.rangesOnly,
                rangesAllowCustom: typeof fp.config.rangesAllowCustom === 'undefined' || fp.config.rangesAllowCustom,
                rangesCustomLabel: typeof fp.config.rangesCustomLabel !== 'undefined' ? fp.config.rangesCustomLabel : 'Custom Range',
                rangesNav: rangesNav,
                rangesButtons: {}
            };

            /**
             * @param {string} label
             * @returns HTML Element
             */
            const addRangeButton = function(label) {

                let button = document.createElement('button');
                button.type = "button";
                button.className = "nav-link btn btn-link";
                button.innerText = label;

                pluginData.rangesButtons[label] = button;

                let item = document.createElement('li');
                item.className = "nav-item d-grid";

                item.appendChild(pluginData.rangesButtons[label]);

                pluginData.rangesNav.appendChild(item);

                return pluginData.rangesButtons[label];
            };

            /**
             * Loop the ranges and check for one that matches the selected dates, adding
             * an active class to its corresponding button.
             *
             * If there are selected dates and a range is not matched, check for a custom
             * range button and set it to active.
             *
             * If there are no selected dates or a range is not matched, check if the
             * rangeOnly option is true and if so hide the calendar.
             *
             * @param {Array} selectedDates
             */
            const selectActiveRangeButton = function(selectedDates) {
                let isPredefinedRange = false;
                let current = pluginData.rangesNav.querySelector('.active');

                if (current) {
                    current.classList.remove('active');
                }

                if (selectedDates.length > 0) {
                    let startDate = moment(selectedDates[0]);
                    let endDate = selectedDates.length > 1 ? moment(selectedDates[1]) : startDate;
                    for (const [label, range] of Object.entries(pluginData.ranges)) {
                        if (startDate.isSame(moment(range[0]), 'day') && endDate.isSame(moment(range[1]), 'day')) {
                            pluginData.rangesButtons[label].classList.add('active');
                            isPredefinedRange = true;
                            break;
                        }
                    }
                }

                if (selectedDates.length > 0 &&
                    !isPredefinedRange &&
                    pluginData.rangesButtons.hasOwnProperty(pluginData.rangesCustomLabel)
                ) {
                    pluginData.rangesButtons[pluginData.rangesCustomLabel].classList.add('active');
                    fp.calendarContainer.classList.remove('flatpickr-predefined-ranges-only');
                } else if (pluginData.rangesOnly) {
                    fp.calendarContainer.classList.add('flatpickr-predefined-ranges-only');
                }
            };

            return {
                /**
                 * Loop the ranges and add buttons for each range which a click handler to set the date.
                 * Also adds a custom range button if the rangesAllowCustom option is set to true.
                 */
                onReady(selectedDates) {
                    for (const [label, range] of Object.entries(pluginData.ranges)) {
                        addRangeButton(label).addEventListener('click', function() {

                            let start = moment(range[0]).toDate();
                            let end = moment(range[1]).toDate();

                            if (!start) {
                                fp.clear();
                            } else {
                                fp.setDate([start, end], true);
                            }

                            fp.close();
                        });
                    }

                    if (pluginData.rangesNav.children.length > 0) {
                        if (pluginData.rangesOnly && pluginData.rangesAllowCustom) {
                            let customButton = addRangeButton(pluginData.rangesCustomLabel);
                            customButton.addEventListener('click', function() {
                                let current = pluginData.rangesNav.querySelector('.active');
                                if (current) {
                                    current.classList.remove('active');
                                }
                                customButton.classList.add('active');
                                fp.calendarContainer.classList.remove('flatpickr-predefined-ranges-only');
                            });
                        }

                        fp.calendarContainer.prepend(pluginData.rangesNav);
                        fp.calendarContainer.classList.add('flatpickr-has-predefined-ranges');
                        // make sure the right range button is active for the default value
                        selectActiveRangeButton(selectedDates);
                    }
                },

                /**
                 * Make sure the right range button is active when a value is manually entered
                 *
                 * @param {Array} selectedDates
                 */
                onValueUpdate(selectedDates) {
                    selectActiveRangeButton(selectedDates);
                }
            };
        };
    }

    window.APP.VENDORS.PLUGINS.flatpickr.range.push(new predefinedRanges());

})();

/**
 * Select Same Day In Range Plugin
 */

(function() {
    'use strict';

    function selectSameDayInRange(test) {
        return function(fp) {
            return {
                onClose(selectedDates, dateStr, instance) {
                    if (instance.config.mode === 'range' && selectedDates.length === 1) {
                        selectedDates[1] = selectedDates[0];
                        instance.setDate(selectedDates, true);
                    }
                }
            }
        }
    }
    window.APP.VENDORS.PLUGINS.flatpickr.range.push(new selectSameDayInRange());

})();

/**
 * Hijri Plugin
 */

(function() {
    'use strict';

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== undefined)
            e.textContent = content;
        return e;
    }

    var defaultConfig = {
        showHijriDates: true,
        showHijriToggle: false,
        theme: "light",
        hijriToggleText: "Show Hijri Date",
    };

    function hijriCalendarPlugin(dateTime, pluginConfig) {
        if (!dateTime || typeof dateTime.fromJSDate === "undefined") {
            throw new Error("hijriCalendarPlugin requires luxon luxon.DateTime class.");
        }
        var config = __assign(__assign({}, defaultConfig), pluginConfig);
        return function(fp) {
            var self = {
                luxon: null,
                hijriMonthContainer: null,
                hijriMonthName: null,
            };

            function build() {
                if (!fp.rContainer)
                    return;
                self.hijriMonthContainer = createElement("div", "flatpickr-hijri-month-container");
                self.hijriMonthName = createElement("span", "flatpickr-hijri-month-name");
                self.hijriMonthName.innerHTML = "رمضان";
                self.hijriMonthContainer.appendChild(self.hijriMonthName);
                fp.monthNav.insertAdjacentElement("afterend", self.hijriMonthContainer);
                self.hijriMonthContainer.tabIndex = -1;
                buildMonth();
                buildActions();
                return;
            }

            function buildDay(_dObj, _dStr, _fp, dayElem) {
                if (!config.showHijriDates) {
                    return;
                }
                var hijriDate = dateTime
                    .fromJSDate(dayElem.dateObj)
                    .reconfigure({
                        outputCalendar: "islamic-umalqura"
                    })
                    .toFormat("dd");
                var date = dayElem.innerText;
                var wrapper = createElement("span", "flatpickr-hijri-date-wrapper", "");
                var dateEl = createElement("span", "flatpickr-hijri-date-date", date);
                var className = "flatpickr-hijri-date-hijri";
                if (dayElem.classList.contains("nextMonthDay") ||
                    dayElem.classList.contains("prevMonthDay")) {
                    className += " flatpickr-hijri-date-not-allowed";
                }
                if (dayElem.classList.contains("selected")) {
                    className += " flatpickr-hijri-date-selected";
                }
                var hijriEl = createElement("span", className, hijriDate);
                wrapper.appendChild(dateEl);
                wrapper.appendChild(hijriEl);
                dayElem.innerHTML = wrapper.outerHTML;
            }

            function buildMonth() {
                if (!self.hijriMonthContainer || !self.hijriMonthName) {
                    return;
                }
                var d = new Date(fp.currentYear, fp.currentMonth);
                var dt = dateTime.fromJSDate(d);
                if (typeof fp.config.locale === "string" &&
                    fp.config.locale.startsWith("ar")) {
                    dt = dt.setLocale(fp.config.locale);
                }
                dt = dt.reconfigure({
                    outputCalendar: "islamic-umalqura",
                });
                var monthBegin = dt.startOf("month").toFormat("LLLL");
                var monthEnd = dt.endOf("month").toFormat("LLLL");
                var yearBegin = dt.startOf("month").toFormat("y");
                var yearEnd = dt.endOf("month").toFormat("y");
                var month;
                if (yearBegin !== yearEnd) {
                    if (monthBegin !== monthEnd) {
                        month = "".concat(monthBegin, " ").concat(yearBegin, " / ").concat(monthEnd, " ").concat(yearEnd);
                    } else {
                        month = monthBegin;
                    }
                } else {
                    if (monthBegin !== monthEnd) {
                        month = "".concat(monthBegin, " / ").concat(monthEnd, " ").concat(yearBegin);
                    } else {
                        month = "".concat(monthBegin, " ").concat(yearBegin);
                    }
                }
                self.hijriMonthName.innerHTML = month;
            }

            function buildActions() {
                var actionsContainer = createElement("div", "flatpickr-hijri-actions ".concat(config.showHijriToggle ? "visible" : "", " ").concat(config.theme, "Theme"), "ACTIONS");
                actionsContainer.innerHTML = "\n        <label for=\"flatpickr-hijri-switch\">".concat(config.hijriToggleText, "</label>\n        <label class=\"flatpickr-hijri-switch\">\n            <input id=\"flatpickr-hijri-switch\" class=\"flatpickr-hijri-switch\" type=\"checkbox\">\n            <span class=\"flatpickr-hijri-slider\"></span>\n        </label>\n      ");
                actionsContainer.tabIndex = -1;
                var confirmDateContainer = fp.calendarContainer.querySelector(".flatpickr-confirm");
                fp.calendarContainer.appendChild(actionsContainer);
                fp.calendarContainer.insertBefore(actionsContainer, confirmDateContainer);
                var switchInput = fp.calendarContainer.querySelector("input.flatpickr-hijri-switch");
                switchInput.checked = true;
                switchInput.addEventListener("change", function(event) {
                    var _a;
                    config.showHijriDates = (_a = event.target) === null || _a === void 0 ? void 0 : _a.checked;
                    if (self.hijriMonthName) {
                        self.hijriMonthName.innerHTML = "";
                    }
                    if (config.showHijriDates) {
                        buildMonth();
                    }
                    fp.redraw();
                });
            }
            return {
                onMonthChange: [buildMonth],
                onDayCreate: [buildDay],
                onReady: [build],
            };
        };
    }

    if (window.APP.USER.dateShowHijri) {
        window.APP.VENDORS.PLUGINS.flatpickr.default.push(hijriCalendarPlugin(luxon.DateTime));
        window.APP.VENDORS.PLUGINS.flatpickr.range.push(hijriCalendarPlugin(luxon.DateTime));
    }

})();