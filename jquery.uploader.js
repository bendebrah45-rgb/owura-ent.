/**
 * Input Uploader
 * Author: Ahmed MamdOuh
 * 
 * Usage:
 * > ## Using Data attribute:
 * > data-input-uploader='true'
 * > ## jQuery:
 * > $("input").inputUploader();
 * > ## Pass extra options:
 * > $("input").inputUploader({"uploaderTemplate":'html',"valueTemplate":'html',"progressTemplate":'html'});
 */

// get File Extension
function getFileExtension(filename, opts) {
    if (!opts) opts = {};
    if (!filename) return "";
    var ext = (/[^./\\]*$/.exec(filename) || [""])[0];
    return opts.preserveCase ? ext : ext.toLowerCase();
}

// string To Fragment
var stringToFragment = function(string) {
    var renderer = document.createElement('template');
    renderer.innerHTML = string;
    return renderer.content;
};


// Format Binary Bytes
var formatBinaryBytes = function(bytes, decimals = 2, returnAsObject = false) {
    if (bytes === 0) return '0 B';

    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    var i = Math.floor(Math.log(bytes) / Math.log(k));

    var size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    var unit = __(sizes[i]);

    if (returnAsObject) {
        return {
            size,
            unit
        }
    }

    return size + ' ' + unit;
}

// Get File Item Icon
var getFileItemIcon = function(fileName) {
    var ext = getFileExtension(fileName);
    switch (ext) {
        case "xls":
        case "xlsx":
            return "mdi mdi-file-excel";
            break;
        case "doc":
        case "docx":
            return "mdi mdi-file-word";
            break;
        case "pdf":
            return "mdi mdi-file-pdf-box";
            break;
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
            return "mdi mdi-file-image";
            break;
        case "txt":
        case "csv":
            return "mdi mdi-file-document";
            break;
        case "zip":
        case "rar":
            return "mdi mdi-file-key";
            break;

        default:
            return "mdi mdi-file";
            break;
    }
}

// File Picker Validator Util
function FilePickerValidator(file, rules) {
    var validRules = [];
    var invalidRules = [];
    var messages = [];

    function validate() {
        var rulesArr = Object.keys(rules);
        rulesArr.forEach(function(v) {
            switch (v) {
                case "max":
                    if (rules.max) {
                        validateMax();
                    }
                    break;
                case "ext":
                    if (rules.ext) {
                        validateExt();
                    }
                    break;

                default:
                    break;
            }
        });
        return true;
    }

    // fails
    function fails() {
        if (invalidRules.length > 0) {
            return true;
        }
        return false;
    }

    // errors
    function errors() {
        return messages;
    }

    // validate Max
    function validateMax() {
        if (file.size <= rules.max) {
            setRuleValid('max');
            return true;
        }
        setRuleInvalid('max');
        return false;
    }

    // validateExt
    function validateExt() {
        if (rules.ext.includes(getFileExtension(file.name))) {
            setRuleValid('ext');
            return true;
        }
        setRuleInvalid('ext');
        return false;
    }

    // setRuleValid
    function setRuleValid(rule) {
        validRules.push(rule);
    }

    // setRuleInvalid
    function setRuleInvalid(rule) {
        invalidRules.push(rule);
        messages.push(FilePickerValidatorMessageUtil(file, rules, rule));
    }

    // validate
    validate();

    return {
        fails: fails(),
        errors: errors()
    }
}

// File Picker Validator Message Util
function FilePickerValidatorMessageUtil(file, rules, type) {
    if (type == 'max') {
        var sizeObj = formatBinaryBytes(rules.max, 2, true);
        var size = sizeObj.size;
        var unit = sizeObj.unit;
        return window.APP.UTILS.TEXT.sprintf(__('Max file size %d %s'), [size, unit]);
    } else if (type == 'ext') {
        return window.APP.UTILS.TEXT.sprintf2(__('Allowed file types: (%s)'), rules.ext.toString());
    }
}

// Templates
var templates = {
    uploaderTemplate: `
           <div class="input-uploader" data-uploader="true">
               <div class="input-uploader-drop">
                   <span class="input-uploader-drop-icon">
                       <svg xmlns="http://www.w3.org/2000/svg" width="33.002" height="44.003" viewBox="0 0 33.002 44.003">
                           <path d="M33-47.27a2.369,2.369,0,0,0-.6-1.459L23.98-57.146a2.37,2.37,0,0,0-1.459-.6H22v11H33ZM21.314-44a2.069,2.069,0,0,1-2.063-2.063V-57.75H2.063A2.063,2.063,0,0,0,0-55.687V-15.81a2.063,2.063,0,0,0,2.063,2.063H30.939A2.063,2.063,0,0,0,33-15.81V-44ZM9.672-42.624A4.125,4.125,0,0,1,13.8-38.5a4.125,4.125,0,0,1-4.125,4.125A4.125,4.125,0,0,1,5.547-38.5,4.125,4.125,0,0,1,9.672-42.624ZM27.548-22h-22l.042-4.167,3.4-3.4a.983.983,0,0,1,1.417.042l3.4,3.4,8.9-8.9a1.031,1.031,0,0,1,1.459,0l3.4,3.4Z" transform="translate(0 57.75)" fill="#e4ebf2" />
                       </svg>
                   </span>
                   <span class="input-uploader-drop-text">
                       <i class="fal fa-cloud-upload text-primary"></i><span>&nbsp;${__('Drop image here or')}&nbsp;</span><span class="text-primary">${__('select from your computer')}</span>
                   </span>
               </div>
           </div>
       `,
    valueTemplate: `
           <div class="input-uploader-item">
               <div class="input-uploader-item-img" data-value-img="true" data-fancybox data-src="__url__" src="__url__" style="display: none;">
                   <img src="__url__" data-bs-toggle="tooltip" data-bs-title="__name__" title="__name__" loading="lazy" />
               </div>

               <div class="input-uploader-item-icon" data-value-icon="true">
                    <i class="uploader-file-item-icon mdi mdi-file"></i>
               </div>
               <span class="input-uploader-item-name" title="__name__">__name__</span>
               <span class="input-uploader-item-size" title="__size__">__size__</span>
               <div class="input-uploader-item-actions">
                   <a class="mdi mdi-download text-primary" href="__url__" target="_blank" download title="${__('Download')}"></a>
                   <i class="mdi mdi-pencil text-dark-3" tabindex="0" title="${__('Edit')}" data-value-edit="true"></i>
                   <i class="mdi mdi-trash-can text-danger" tabindex="0" title="${__('Delete')}" data-value-delete="true"></i>
               </div>
           </div>
       `,
    progressTemplate: `
           <div class="input-uploader-item">
               <div class="input-uploader-item-icon">
                   <i class="uploader-file-item-icon mdi mdi-file"></i>
               </div>
               <span class="uploader-file-item-error" data-value-error="true" style="display: none;" title="__name__ __error__">__error__</span>
               <div class="uploader-file-item-progress" data-value-no-error="true" title="__name__">
                   <div class="progress-active-bar" style="width: __progress__%;">__progress__%</div>
               </div>
               <div class="input-uploader-item-actions">
                   <i class="mdi mdi-close-thick text-danger" tabindex="0" title="${__('Cancel')}" data-value-cancel="true"></i>
               </div>
           </div>
       `
};


(function($) {
    var pluginName = 'inputUploader';
    var dataAttribute = 'input-uploader';

    function InputUploaderPlugin(element, options) {
        var $el = $(element);
        var hiddenInput = element;
        var dataAttrOptions = $el.data(dataAttribute);
        var files = [];
        var xhr = {};
        var isEditing = false;
        var editingId = '';
        var isUploading = false;
        var userDidSubmitDuringUpload = false;
        var lastClickedSubmitBtn = {};
        var uploaderWrapper = {};
        var fileItemsWrapper = {};
        var fileInput = {};
        var fileInputFiles = [];
        var fileInputFilesLength = 0;
        var rules = [];

        // prepare options
        if (dataAttrOptions && typeof dataAttrOptions == 'object') {
            options = dataAttrOptions;
        }
        options = $.extend({}, $.fn[pluginName].defaults, options);
        options.uploaderTemplate ? templates.uploaderTemplate = options.uploaderTemplate : '';
        options.progressTemplate ? templates.progressTemplate = options.progressTemplate : '';
        options.valueTemplate ? templates.valueTemplate = options.valueTemplate : '';
        rules = options.rules;

        // Init File Uploader
        function init() {
            uploaderWrapper = createUploaderWrapper();
            fileItemsWrapper = createFileItemsWrapper();
            fileInput = createUploaderFileInput();
            handleInitialValue();
            addUploaderWrapperEventListeners();
            addFileInputEventListeners();
            addFormEventListeners();
        }

        // Create Uploader Wrapper
        function createUploaderWrapper() {
            var uploaderWrapper = document.createElement('div');
            hiddenInput.parentNode.appendChild(uploaderWrapper);
            return uploaderWrapper;
        }

        // create File Items Wrapper
        function createFileItemsWrapper() {
            var fileItemsWrapper = document.createElement('div');
            if (options.itemsListSelector) {
                $(options.itemsListSelector).append(fileItemsWrapper);
            } else {
                hiddenInput.parentNode.appendChild(fileItemsWrapper);
            }
            return fileItemsWrapper;
        }

        // create Uploader File Input
        function createUploaderFileInput() {
            var fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('hidden', 'hidden');
            fileInput.setAttribute('style', 'display: none');
            if (options.hasOwnProperty('multiple') && options.multiple) {
                fileInput.setAttribute('multiple', 'multiple');
            }
            uploaderWrapper.parentNode.appendChild(fileInput);
            return fileInput;
        }

        // handle Initial Value
        function handleInitialValue() {
            uploaderWrapper.innerHTML = templates.uploaderTemplate;
            files = [];
            if (hiddenInput.value) {
                files = JSON.parse(hiddenInput.dataset.inputUploaderValue);
                refreshFilesDOM();
            }
        }

        // refresh File Progress
        function refreshFileProgress(file) {
            $("[data-input-uploader-file-item-name=" + '"' + file.name + '"' + "] [data-input-uploader-file-item-progress]").css({
                width: file.progress + '%'
            }).html(file.progress ? file.progress + '%' : '0%');
        }

        // get Drag After Element
        function getDragAfterElement(container, y) {
            var draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

            return draggableElements.reduce(function(closest, child) {
                var box = child.getBoundingClientRect()
                var offset = y - box.top - box.height / 2
                if (offset < 0 && offset > closest.offset) {
                    return {
                        offset: offset,
                        element: child
                    }
                } else {
                    return closest
                }
            }, {
                offset: Number.NEGATIVE_INFINITY
            }).element
        }

        // refresh Files DOM
        function refreshFilesDOM() {
            fileItemsWrapper.innerHTML = '';
            fileItemsWrapper.className = 'uploader-file-items';
            if (files.length) {
                fileItemsWrapper.className = 'uploader-file-items';
                if (!options.hasOwnProperty('multiple') || (options.hasOwnProperty('multiple') && options.multiple == false)) {
                    uploaderWrapper.innerHTML = '';
                }
                files.forEach(function(file) {
                    if (file.hasOwnProperty('id')) {
                        var valueTemplateHtml = templates.valueTemplate;
                        valueTemplateHtml = valueTemplateHtml.replaceAll('__id__', file.id);
                        valueTemplateHtml = valueTemplateHtml.replaceAll('__name__', file.name);
                        valueTemplateHtml = valueTemplateHtml.replaceAll('__icon__', getFileItemIcon(file.name));
                        valueTemplateHtml = valueTemplateHtml.replaceAll('__size__', formatBinaryBytes(file.size));
                        valueTemplateHtml = valueTemplateHtml.replaceAll('data-src', 'src');
                        if (file.url) {
                            valueTemplateHtml = valueTemplateHtml.replaceAll('__url__', file.url);
                        } else {
                            // If Image not found
                            valueTemplateHtml = valueTemplateHtml.replaceAll('__url__', 'https://placehold.co/600x400/png');
                        }
                        var node = stringToFragment(valueTemplateHtml);
                        var deleteBtns = node.querySelectorAll('[data-value-delete]');
                        deleteBtns.forEach(function(deleteBtn) {
                            deleteBtn.addEventListener('click', function() {
                                var newFiles = files.filter(function(f) {
                                    return !(f.name == file.name && f.size == file.size)
                                });
                                files = newFiles;
                                refreshFilesDOM();
                                refreshHiddenInputValueDOM();
                                refreshDataValueAttrDOM();
                            })
                        });
                        var editBtns = node.querySelectorAll('[data-value-edit]');
                        editBtns.forEach(function(editBtn) {
                            editBtn.addEventListener('click', function() {
                                isEditing = true;
                                editingId = file.id;
                                fileInput.click();
                            })
                        });
                        if (
                            (getFileExtension(file.name) === 'jpg') ||
                            (getFileExtension(file.name) === 'jpeg') ||
                            (getFileExtension(file.name) === 'png') ||
                            (getFileExtension(file.name) === 'gif')
                        ) {
                            node.querySelector('[data-value-icon]').style.display = 'none';
                            node.querySelector('[data-value-img]').style.display = 'inline-block';
                        }
                        fileItemsWrapper.appendChild(node);
                        var nodeInDOM = fileItemsWrapper.lastElementChild;
                        if (options.sortable && options.multiple) {
                            nodeInDOM.draggable = true;
                            nodeInDOM.classList.add('draggable');
                            nodeInDOM.addEventListener('drag', function(e) {});
                            nodeInDOM.addEventListener('dragstart', function(e) {
                                fileItemsWrapper.querySelectorAll('.not-draggable').forEach(function(elm) {
                                    elm.style.opacity = '0.5';
                                });
                                nodeInDOM.classList.add('dragging');
                            });
                            nodeInDOM.addEventListener('dragend', function(e) {
                                fileItemsWrapper.querySelectorAll('.not-draggable').forEach(function(elm) {
                                    elm.removeAttribute('style');
                                });
                                nodeInDOM.classList.remove('dragging');
                            });
                            nodeInDOM.addEventListener('dragover', function(e) {
                                e.preventDefault();
                                var afterElement = getDragAfterElement(fileItemsWrapper, e.clientY);
                                var draggable = document.querySelector('.dragging');
                                if (draggable) {
                                    if (afterElement == null) {
                                        fileItemsWrapper.appendChild(draggable);
                                    } else {
                                        fileItemsWrapper.insertBefore(draggable, afterElement);
                                    }
                                }
                            });
                            nodeInDOM.addEventListener('drop', function(e) {
                                fileItemsWrapper.querySelectorAll('.not-draggable').forEach(function(elm) {
                                    elm.removeAttribute('style');
                                });
                                var oldIndex = files.findIndex(function(f) {
                                    return f.id === file.id
                                });
                                var newIndex = [...fileItemsWrapper.children].findIndex(function(elm) {
                                    return elm === nodeInDOM
                                })
                                var newFiles = files;
                                if (oldIndex !== newIndex) {
                                    newFiles.splice(oldIndex, 1);
                                    newFiles.splice(newIndex, 0, file);
                                    files = newFiles;
                                    refreshHiddenInputValueDOM();
                                    refreshDataValueAttrDOM();
                                }
                            });
                        }
                    } else {
                        var progressTemplateHtml = templates.progressTemplate;
                        progressTemplateHtml = progressTemplateHtml.replaceAll('__name__', file.name);
                        progressTemplateHtml = progressTemplateHtml.replaceAll('__error__', file.hasOwnProperty('error') ? file.error : '');
                        var node = stringToFragment(progressTemplateHtml);
                        var cancelBtns = node.querySelectorAll('[data-value-cancel]');
                        cancelBtns.forEach(function(cancelBtn) {
                            cancelBtn.addEventListener('click', function() {
                                if (xhr.hasOwnProperty(file.name)) {
                                    xhr[file.name].abort();
                                }
                                var newFiles = files.filter(function(f) {
                                    return !(f.name == file.name && f.size == file.size)
                                });
                                files = newFiles;
                                refreshFilesDOM();
                            })
                        });
                        if (file.hasOwnProperty('error') && file.error) {
                            node.querySelector('[data-value-no-error]').style.display = 'none';
                            node.querySelector('[data-value-error]').style.display = 'inline-block';
                        }
                        fileItemsWrapper.appendChild(node);
                        var nodeInDOM = fileItemsWrapper.lastElementChild;
                        if (options.sortable) {
                            nodeInDOM.classList.add('not-draggable');
                        }
                        nodeInDOM.dataset.inputUploaderFileItemName = file.name;

                        $(nodeInDOM).find('*').contents().filter(function() {
                            return this.nodeType === 3;
                        }).each(function() {
                            if ($(this).text() == '__progress__%') {
                                $(this).get(0).parentNode.dataset.inputUploaderFileItemProgress = "true";
                                $($(this).get(0).parentNode).css({
                                    width: file.progress + '%'
                                }).html(file.progress ? file.progress + '%' : '0%');
                            }
                        });
                    }
                });
            } else {
                uploaderWrapper.innerHTML = templates.uploaderTemplate;
            }
        }

        // refresh Hidden Input Value DOM
        function refreshHiddenInputValueDOM() {
            if (files.length) {
                var value = '';
                files.filter(function(f) {
                    return f.hasOwnProperty('id')
                }).forEach(function(v, i, arr) {
                    value += i === arr.length - 1 ? v.id : v.id + ',';
                })
                hiddenInput.value = value;
            } else {
                uploaderWrapper.innerHTML = templates.uploaderTemplate;
                hiddenInput.value = '';
            }
        }

        // refresh Data Value Attr DOM
        function refreshDataValueAttrDOM() {
            var uploadedFiles = files.filter(function(f) {
                return f.hasOwnProperty('id')
            });
            hiddenInput.dataset.inputUploaderValue = JSON.stringify(uploadedFiles);
        }

        // edit File
        function editFile(editingId, file) {
            var fileIndex = files.findIndex(function(f) {
                return (f.id == editingId)
            });
            files[fileIndex] = file;
        }

        // add File
        function addFile(file) {
            files.push(file);
        }


        // upload File Input Files
        function uploadFileInputFiles() {
            var $closestForm = $(hiddenInput).closest('form'),
                uploadPromisesQueue = [];


            fileInputFiles.forEach(function(file, fileInputIndex) {
                var messages = [];
                var fileAlreadyAdded = files.findIndex(function(f) {
                    return (f.name == file.name && f.size == file.size)
                });

                if (fileAlreadyAdded >= 0) {
                    return;
                }

                if (isEditing) {
                    editFile(editingId, {
                        name: file.name,
                        size: file.size,
                        progress: 0,
                    });
                    isEditing = false;
                    editingId = '';
                } else {
                    addFile({
                        name: file.name,
                        size: file.size,
                        progress: 0,
                    });
                }

                var validator = FilePickerValidator({
                    name: file.name,
                    size: file.size,
                }, {
                    'max': options.rules.max,
                    'ext': options.rules.ext,
                });

                if (validator.fails) {
                    messages = validator.errors;
                    var fileIndex = files.findIndex(function(f) {
                        return (f.name == file.name && f.size == file.size)
                    });
                    files[fileIndex].error = messages[0];
                    refreshFilesDOM();
                    return;
                }

                var p = function() {
                    return new Promise(function(resolve) {
                        var formData = new FormData();
                        formData.append(options.uploadName ? options.uploadName : 'file', file);

                        xhr[file.name] = $.ajax({
                            url: options.uploadUrl,
                            cache: false,
                            method: 'POST',
                            data: formData,
                            async: true,
                            processData: false,
                            contentType: false,
                            beforeSend: function(jqXHR, settings) {
                                isUploading = true;
                                var fileIndex = files.findIndex(function(f) {
                                    return (f.name == file.name && f.size == file.size)
                                });
                                if (typeof files[fileIndex] != 'undefined') {
                                    files[fileIndex].progress = 0;
                                }
                                refreshFilesDOM();
                                refreshFileProgress(files[fileIndex]);
                                refreshHiddenInputValueDOM();
                                refreshDataValueAttrDOM();
                            },
                            xhr: function() {
                                var xhr = new window.XMLHttpRequest();
                                xhr.upload.addEventListener("progress", function(evt) {
                                    if (evt.lengthComputable) {
                                        var percentComplete = parseInt(evt.loaded / evt.total * 100);
                                        var fileIndex = files.findIndex(function(f) {
                                            return (f.name == file.name && f.size == file.size)
                                        });
                                        if (typeof files[fileIndex] != 'undefined') {
                                            files[fileIndex].progress = percentComplete;
                                        }
                                        refreshFileProgress(files[fileIndex]);
                                    }
                                }, false);
                                return xhr;
                            },
                            success: function(response) {
                                var fileIndex = files.findIndex(function(f) {
                                    return (f.name == file.name && f.size == file.size)
                                });
                                files[fileIndex].id = response.id;
                                files[fileIndex].url = response.url;
                                refreshFilesDOM();
                                refreshHiddenInputValueDOM();
                                refreshDataValueAttrDOM();
                                if (fileInputIndex == (fileInputFilesLength - 1)) {
                                    fileInput.value = '';
                                    fileInputFiles = [];
                                    fileInputFilesLength = 0;
                                    if (options.lockFormSubmitWhileUploading && userDidSubmitDuringUpload) {
                                        userDidSubmitDuringUpload = false;
                                        isUploading = false;
                                        lastClickedSubmitBtn.click();
                                    }
                                }
                            },
                            error: function(xhr, status, errMsg) {
                                var fileIndex = files.findIndex(function(f) {
                                    return (f.name == file.name && f.size == file.size)
                                });
                                if (typeof xhr.responseText !== 'undefined') {
                                    if (typeof xhr.responseText === 'string') {
                                        files[fileIndex].error = errMsg;
                                        try {
                                            var errors = JSON.parse(xhr.responseText)['errors'];
                                            for (var error in errors) {
                                                for (var rule in errors[error]) {
                                                    files[fileIndex].error = errors[error][rule];
                                                }
                                            }
                                        } catch (e) {}
                                    } else {
                                        var errors = JSON.parse(xhr.responseText)['errors'];
                                        for (var error in errors) {
                                            for (var rule in errors[error]) {
                                                files[fileIndex].error = errors[error][rule];
                                            }
                                        }
                                    }
                                    refreshFilesDOM();
                                }

                            }
                        }).always(function(jqXHR, statusText) {
                            resolve();
                            isUploading = false;
                            $closestForm.find('[type="submit"]').removeAttr('disabled');
                        });


                    });
                };

                // Check Error Before Upload Promises Queue
                messages.length == 0 ? uploadPromisesQueue.push(p) : '';

            });

            (async function() {
                var asyncFunctions = [...uploadPromisesQueue];
                for (var asyncFn of asyncFunctions) {
                    await asyncFn();
                }
            })();

        }

        // addEventListeners
        function addUploaderWrapperEventListeners() {
            var $uploaderBtn = $(uploaderWrapper),
                $fileInput = $(fileInput);

            $uploaderBtn.on('click', function() {
                $fileInput.click();
            });

            $uploaderBtn.on('dragover', function(e) {
                if (!$uploaderBtn.hasClass('active')) {
                    $uploaderBtn.addClass('active');
                }
                e.preventDefault();
            });

            $uploaderBtn.on('dragenter', function(e) {
                e.preventDefault();
            });

            $uploaderBtn.on('dragleave', function(e) {
                $uploaderBtn.removeClass('active');
                e.preventDefault();
            });

            $uploaderBtn.on('drop', function(e) {
                $uploaderBtn.removeClass('active');
                $fileInput.prop("files", e.originalEvent.dataTransfer.files);
                $fileInput.change();
                e.stopPropagation();
                e.preventDefault();
            });

        }

        // addEventListeners
        function addFileInputEventListeners() {
            var $fileInput = $(fileInput);

            $fileInput.on('change', function() {
                fileInputFiles = [...fileInput.files];
                fileInputFilesLength = fileInput.files.length;
                uploadFileInputFiles();
                refreshFilesDOM();
                refreshHiddenInputValueDOM();
                refreshDataValueAttrDOM();
            });
        }

        // addEventListeners
        function addFormEventListeners() {
            var $closestForm = $(hiddenInput).closest('form');

            $closestForm.find('[type="submit"]').on('click', function(e) {
                lastClickedSubmitBtn = e.currentTarget;
                userDidSubmitDuringUpload = true;
                if (options.lockFormSubmitWhileUploading && isUploading) {
                    alert(__('Your file is still uploading. Please keep this page open until it\'s done.'));
                    $closestForm.find('[type="submit"]').removeAttr('disabled');
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            });
        }

        function destroy() {
            uploaderWrapper.remove();
            fileInput.remove();
        }

        // initialize plugin
        init();

        return {
            option: options,
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
                    $.data(this, 'plugin_' + pluginName, new InputUploaderPlugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        uploaderTemplate: '',
        valueTemplate: '',
        progressTemplate: '',
        lockFormSubmitWhileUploading: "",
        uploadUrl: "",
        rules: {
            'max': 6242880,
            'ext': ['pdf', 'xls', 'xlsx', 'doc', 'docx', 'txt', 'csv', 'png', 'jpeg', 'jpg'],
        },
        sortable: "",
        multiple: false,
        itemsListSelector: "",
    };

    (function() {
        $("input[data-" + dataAttribute + "]").inputUploader();
    })();


})(jQuery);