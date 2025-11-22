/**
 * Input Auto Complete
 * Author: Ahmed MamdOuh
 * 
 * Usage:
 * > ## Using Data attribute:
 * > data-input-autocomplete='true'
 * > ## jQuery:
 * > $("input").inputAutoComplete();
 * > ## Pass extra options:
 * > $("input").inputAutoComplete({"ajax":'url'});
 */
(function($) {
    var pluginName = 'inputAutoComplete';
    var dataAttribute = 'input-autocomplete';

    function debounce(func, timeout = 500) {
        var timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                func.apply(this, args);
            }, timeout);
        };
    }

    function InputAutocompletePlugin(element, options) {
        var $el = $(element);
        var dataAttrOptions = $el.data(dataAttribute);
        var activeItem = -1;
        if (dataAttrOptions && typeof dataAttrOptions == 'object') {
            options = dataAttrOptions;
        }

        options = $.extend({}, $.fn[pluginName].defaults, options);
        // console.log("options", options);
        var ajaxUrl = options.ajax;

        function init() {

            var $container = $el.closest('[data-form-group]');
            var $dropdown = $container.find('[data-input-autocomplete-dropdown]');
            var $item = $dropdown.find('button');
            // $availableKeywords
            var $staticItems = [];
            // var $dataSuggest = $('[data-app-form-datalist');
            var $dataSuggest = $el;
            // console.log("element", $el);
            // console.log("element", $dataSuggest);

            $item.each(function(i, element) {
                // console.log("i", i);
                $staticItems.push(element.textContent);
            });

            $dataSuggest.on('click', function() {
                $dropdown.show();
                // console.log("$dataSuggest", $dataSuggest.val());
                if ($staticItems.includes($dataSuggest.val())) {
                    filterData();
                }
            });

            $(document).on('click', function(e) {
                // console.log("e.target", e.target);
                if (e.target != $dataSuggest[0]) {
                    $dropdown.hide();
                }
            });

            $dataSuggest.on('input', debounce(function() {
                var result = [];
                var inputValue = $dataSuggest.val();
                this.activeItem = -1;
                // console.log('dataSuggest', inputValue);

                hideLoader();
                if (inputValue.length) {
                    result = $staticItems.filter(function(keyword) {
                        return keyword.toLowerCase().includes(inputValue.toLowerCase());
                    });

                    if (result.length) {
                        clearData();
                        displayResult(result);
                    } else {
                        // Ajax Request
                        if (ajaxUrl) {
                            getDataRequest();
                        } else {
                            clearData();
                            displayResult(result);
                            $dropdown.hide();
                        }
                    }

                } else {
                    clearData();
                    displayResult($staticItems);
                }

            }));


            // KeyDown

            $dataSuggest.on('keyup', function(e) {
                var scrollTop = $dropdown.scrollTop();
                // console.log("scrollTop", scrollTop);

                /* if arrow down is pressed */
                if (e.keyCode == 40) {
                    // console.log("keydown", e.target);
                    activeItem++;
                    // console.log("activeItem",activeItem);
                    if ($item.length > activeItem && activeItem > -1) {
                        $dropdown.scrollTop(scrollTop + $('.input-autocomplete-dropdown-menu button.active').height());
                    } else {
                        $dropdown.scrollTop(0);
                    }
                    focusActiveItem();


                }
                /* if arrow up is pressed */
                else if (e.keyCode == 38) {
                    activeItem--;
                    if ($item.length > activeItem && activeItem > -1) {
                        $dropdown.scrollTop(scrollTop - $('.input-autocomplete-dropdown-menu button.active').height());
                    } else {
                        $dropdown.scrollTop(200);
                    }
                    focusActiveItem();
                }
                /* if enter is pressed */
                else if (e.keyCode == 13) {
                    e.preventDefault();
                    if (activeItem > -1) {
                        if ($item) {
                            $item[activeItem].click();
                            // console.log("$item[activeItem]",$item[activeItem].textContent);
                            $dataSuggest.val($item[activeItem].textContent)
                        }
                    }
                }
            });

            function focusActiveItem() {
                if ($item.length < 1) return false;
                blurItems();
                if (activeItem >= $item.length) activeItem = 0;
                if (activeItem < 0) activeItem = ($item.length - 1);
                $item[activeItem].classList.add("active");
            }

            function blurItems() {
                for (var i = 0; i < $item.length; i++) {
                    $item[i].classList.remove("active");
                }
            }
            // Filter Data
            function filterData() {
                var result = [];
                result = $staticItems.filter(function(keyword) {
                    return keyword.toLowerCase().includes($dataSuggest.val().toLowerCase());
                });
                clearData();
                displayResult(result);
            }

            // Get Data Request
            function getDataRequest() {
                clearData();
                showLoader();
                var q = $dataSuggest.val();
                var urlGetData = ajaxUrl.replaceAll('__q__', encodeURIComponent(q));
                // console.log("urlGetData",urlGetData);
                $.ajax({
                    url: urlGetData,
                    type: 'GET',
                    async: true,
                    success: function(response) {
                        if (response && response.length) {
                            $dropdown.show();
                            // console.log("responseee",response);
                            clearData();
                            hideLoader();
                            displayResult(response);
                        } else {
                            $dropdown.hide();
                            hideLoader();
                        }
                    },
                    error: function(response) {
                        console.log("error", response);
                    }
                });
            }


            // Display Result
            function displayResult(result) {
                $dropdown.show();
                var content = result.map(function(item) {
                    return '<button type="button" class="datalist-menu-item">' + item + '</button>'

                })
                $dropdown.append(content);
                // console.log("content",content);
                activeItem = -1;
                $item = $dropdown.find('button');
                // console.log("item",$item);
            }

            // Clear Dropdown
            function clearData() {
                $dropdown.html('');
            }

            // Selected value
            $dropdown.on('click', $item, function(e) {
                var value = $(e.target).text();
                $dataSuggest.val(value);
            });

            // Show Loader
            function showLoader() {
                $dropdown.addClass('loading');
            }

            // hide Loader
            function hideLoader() {
                setTimeout(function() {
                    $dropdown.removeClass('loading');
                }, 500);
            }
            /*** End Auto Complate ***/
        }

        function option(key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        init();

        return {
            option: option,
        };
    }

    $.fn[pluginName] = function(options) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof options === "object" || !options) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new InputAutocompletePlugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        ajax: false,
        // class: ''
    };

    (function() {
        $("input[data-" + dataAttribute + "]").inputAutoComplete();
    })();

})(jQuery);