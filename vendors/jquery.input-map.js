/**
 * Map Location
 * Author: Ahmed MamdOuh
 * 
 * Usage:
 * > ## Using Data attribute:
 * > data-input-map='true'
 */

(function($) {
    if (typeof google.maps === 'undefined' || typeof google.maps.plugins === 'undefined' || typeof google.maps.plugins.loader === 'undefined') {
        return;
    }
    var pluginName = 'inputMap',
        dataAttribute = 'input-map',
        API_KEY = "AIzaSyDnZASFpMHtMzqMc7syGNI-GgwmKfeWVQ8",
        mapsLoader = google.maps.plugins.loader.Loader,
        loader = {},
        DefaultPosition = {
            lat: 30.0108141,
            lng: 31.2052693,
            zoom: 15
        };


    function InputMapPlugin(element) {
        var $el = $(element);

        function init() {
            var $container = $el.closest('[data-form-group]'),
                $address = $container.find('[data-input-map-location]'),
                $map = $container.find('[data-input-map]'),
                $lat = $container.find('[data-input-map-lat]'),
                $long = $container.find('[data-input-map-long]'),
                $zoom = $container.find('[data-input-map-zoom]'),
                $placeholder = $container.find('[data-input-map-placeholder]'),
                $placeholderButton = $container.find('[data-input-map-placeholder-btn]'),
                $clearButton = $container.find('[data-form-input-clear]'),
                map = {},
                marker = {};


            $placeholderButton.on("click", function(e) {
                $map.addClass('show');
                $placeholder.addClass('hide');
                if ($lat.val()) {
                    handleInitialValue();
                } else {
                    checkLocationPermission().then(function(position) {
                        render({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            zoom: 14
                        });
                    }).catch(function(err) {
                        var message = __('The system cannot detect your Location Please check Your Settings');
                        if (typeof $.toast !== 'undefined') {
                            $.toast(message, 'warning');
                        } else {
                            alert(message);
                        }
                        renderDefaultPosition();
                    });
                }
            });


            $clearButton.on("click", function(e) {
                $map.removeClass('show');
                $placeholder.removeClass('hide');
                $lat.val('');
                $long.val('');
                $zoom.val('');
                $address.val('');
            });




            /*** Render ***/

            function render(position) {
                initLoader();
                loader
                    .load()
                    .then(function(google) {
                        var mapOptions = {
                            center: position,
                            zoom: position.zoom,
                            controlSize: 25,
                            streetViewControl: false,
                            zoomControl: true,
                            mapTypeControl: false,
                            clickableIcons: false,
                        };

                        map = new google.maps.Map($map[0], mapOptions);
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            draggable: true,
                            title: __("Location"),
                        });
                        geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            location: position
                        }).then(function(response) {
                            if (response.results && response.results.length) {
                                var address = $address.val();
                                if (address != undefined) {
                                    for (var i = response.results.length - 1; i > 0; i--) {
                                        if (String(response.results[i].formatted_address).indexOf('+') == -1) {
                                            address = response.results[i].formatted_address;
                                        }
                                    }
                                    $address.val(address);
                                    $address.trigger('change');
                                }
                            }
                        });
                        initEventListeners();
                        addCurrentLocationControl();
                        updateLatLong();
                        updateZoom();
                    })
                    .catch(function(e) {
                        console.log("error", e);
                    });
            }

            /*** initLoader ***/
            function initLoader() {
                loader = new mapsLoader({
                    apiKey: API_KEY,
                    version: "weekly",
                    libraries: [],
                    nonce: "caffe67d7b989af3a1c7f4a1a6c79bd9fb2b4eb0",
                });


            }


            /*** Render Default Position ***/

            function renderDefaultPosition(error) {
                render(DefaultPosition)
            }


            /*** Handle Initial Value ***/

            function handleInitialValue() {
                var position = {};
                position.lat = parseFloat($lat.val());
                position.lng = parseFloat($long.val());
                position.zoom = parseFloat($zoom.val());
                render({
                    lat: position.lat,
                    lng: position.lng,
                    zoom: position.zoom
                });
            }

            /*** Check Location Permission ***/

            function checkLocationPermission(options) {
                return new Promise(function(resolve, reject) {
                    navigator.geolocation.getCurrentPosition(resolve, function({
                        code,
                        message
                    }) {
                        reject(Object.assign(new Error(message), {
                                name: "PositionError",
                                code
                            })),
                            options
                    });
                });
            }


            /*** Check Add Current Location Control ***/
            function addCurrentLocationControl() {
                var controlDiv = document.createElement("div");
                var controlUI = document.createElement("div");
                controlUI.style.backgroundColor = "#fff";
                controlUI.style.border = "2px solid #fff";
                controlUI.style.borderRadius = "3px";
                controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
                controlUI.style.cursor = "pointer";
                controlUI.style.marginTop = "6px";
                controlUI.style.marginLeft = "6px";
                controlUI.style.marginBottom = "6px";
                controlUI.style.textAlign = "center";
                controlDiv.appendChild(controlUI);
                var controlText = document.createElement("div");
                controlText.style.color = "rgb(25,25,25)";
                controlText.style.fontSize = "16px";
                controlText.style.lineHeight = "25px";
                controlText.style.paddingLeft = "5px";
                controlText.style.paddingRight = "5px";
                controlText.innerHTML = `<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDY5LjMzMyA0NjkuMzMzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NjkuMzMzIDQ2OS4zMzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGQ9Ik0yMzQuNjY3LDE0OS4zMzNjLTQ3LjE0NywwLTg1LjMzMywzOC4xODctODUuMzMzLDg1LjMzM1MxODcuNTIsMzIwLDIzNC42NjcsMzIwUzMyMCwyODEuODEzLDMyMCwyMzQuNjY3DQoJUzI4MS44MTMsMTQ5LjMzMywyMzQuNjY3LDE0OS4zMzN6IE00MjUuMzg3LDIxMy4zMzNDNDE1LjU3MywxMjQuMzczLDM0NC45Niw1My43NiwyNTYsNDMuOTQ3VjBoLTQyLjY2N3Y0My45NDcNCglDMTI0LjM3Myw1My43Niw1My43NiwxMjQuMzczLDQzLjk0NywyMTMuMzMzSDBWMjU2aDQzLjk0N2M5LjgxMyw4OC45Niw4MC40MjcsMTU5LjU3MywxNjkuMzg3LDE2OS4zODd2NDMuOTQ3SDI1NnYtNDMuOTQ3DQoJQzM0NC45Niw0MTUuNTczLDQxNS41NzMsMzQ0Ljk2LDQyNS4zODcsMjU2aDQzLjk0N3YtNDIuNjY3SDQyNS4zODdMNDI1LjM4NywyMTMuMzMzeiBNMjM0LjY2NywzODQNCgljLTgyLjQ1MywwLTE0OS4zMzMtNjYuODgtMTQ5LjMzMy0xNDkuMzMzczY2Ljg4LTE0OS4zMzMsMTQ5LjMzMy0xNDkuMzMzUzM4NCwxNTIuMjEzLDM4NCwyMzQuNjY3UzMxNy4xMiwzODQsMjM0LjY2NywzODR6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" alt="" style="height: 15px; width: 15px;">`;
                controlUI.appendChild(controlText);
                controlUI.addEventListener("click", function() {
                    checkLocationPermission().then(function(position) {
                        var latLng = new google.maps.LatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
                        marker.setPosition(latLng);
                        map.setCenter(latLng);
                        updateCenter();
                        updateLatLong();
                        updateZoom();
                        updateAddress();
                    }).catch(function(err) {
                        var message = __('The system cannot detect your Location Please check Your Settings');
                        if (typeof $.toast !== 'undefined') {
                            $.toast(message, 'warning');
                        } else {
                            alert(message);
                        }
                        renderDefaultPosition();
                    });
                });
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
            }


            /*** init Event Listeners Location Control ***/

            function initEventListeners() {

                map.addListener('click', function(e) {
                    marker.setPosition(e.latLng);
                    map.setCenter(e.latLng);
                    updateCenter();
                    updateLatLong();
                    updateZoom();
                    updateAddress();
                });
                map.addListener('zoom_changed', function(e) {
                    updateZoom();
                });
                marker.addListener('dragend', function() {
                    updateCenter();
                    updateLatLong();
                    updateZoom();
                    updateAddress();
                });

                marker.addListener('click', function() {
                    updateCenter();
                    updateLatLong();
                    updateZoom();
                    updateAddress();
                });
            }


            /*** Update Address ***/
            function updateAddress() {
                var position = marker.getPosition();
                geocoder.geocode({
                    location: position
                }).then(function(response) {
                    if (response.results && response.results.length) {
                        var address = $address.val();
                        if (address != undefined) {
                            for (var i = response.results.length - 1; i > 0; i--) {
                                if (String(response.results[i].formatted_address).indexOf('+') == -1) {
                                    address = response.results[i].formatted_address;
                                }
                            }
                            $address.val(address);
                            $address.trigger('change');
                        }
                    }
                });

            }


            /*** Update Center ***/

            function updateCenter() {
                var position = marker.getPosition();
                map.setCenter(position);
            }

            /*** Update Latitude and Longitude ***/

            function updateLatLong() {
                var position = marker.getPosition();
                $lat.val(position.lat);
                $long.val(position.lng);
            }

            /*** Update Zoom ***/
            function updateZoom() {
                $zoom.val(map.getZoom());
            }

        }
        init();
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
                    $.data(this, 'plugin_' + pluginName, new InputMapPlugin(this, options));
                }
            });
        }
    };


    (function() {
        $("[data-" + dataAttribute + "]").inputMap();
    })();

})(jQuery);