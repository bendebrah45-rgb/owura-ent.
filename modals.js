function getUrlVars(url) {
    var vars = [],
        hash;
    var hashes = url.slice(url.indexOf("?") + 1).split("&");
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function() {
    $(document).on("click", ".mini-btn", function() {
        IzamModal.setMinimized(true);
        if ($('[data-app-form-uploader="images"]').length) {
            $('[data-app-form-uploader="images"]').get(0).appFormUploader.destroy();
        }
    });

    $(document).on("click", ".maxi-btn", function() {
        IzamModal.setMinimized(false);
        if ($('[data-app-form-uploader-wrapper="images"]').length == 0) {
            new window.IzLayout.UiUploader().initAllInNode($(".attachments-input"));
            $('[data-app-form-uploader-wrapper="images"]').insertBefore(
                $('[data-app-form-uploader-file-items="images"]')
            );
        }
    });

    $(document).on("click", ".help-close", function() {
        IzamModal.closeModals();
    });

    $(document).on("click", ".back-modal-btn", function() {
        IzamModal.closeCurrentModal(this);
    });

    var modalData = IzamModal.getModalData();
    if (modalData) {
        $("#modal-container").html(modalData);
        IzamModal.setMinimized(true);
    }
});

var modalHtml = `<div class="forms-modal">
<div class="forms-header">
    <div class="forms-header-action back-action">
        <div class="modal-title-container"> 
        </div>
    </div>
    <div class="forms-header-action">
        <div class="btn modal-header-btn maxi-btn">
            <i class="mdi mdi-window-maximize"></i>
        </div>
     <div class="btn modal-header-btn help-close">
            <i class="fa fa-times" style="font-size:20px"></i>
        </div>
    </div>
</div>
<div class="modal-content-container">

</div>
</div>`;

var IzamModal = {
    appendModal(icon, title, showTitle, fullHeight) {
        $("#modal-container").append(modalHtml);
        this.setMinimized(false);
        // append title and icon to modal header
        $(".modal-title-container")
            .last()
            .html("<span class='header-icon'>" + icon + "</span> <span class='header-title'>" + title + "</span>");
        if (fullHeight == false) {
            $(".forms-modal").last().addClass("auto-height");
        }

        if (showTitle) {
            $(".forms-modal").last().addClass("show-title");
        }
        // if modals length > 0, append the modal back arrow
        if ($(".forms-modal").length > 1) {
            $(".back-action").last().prepend(`<div
      class="btn btn-default modal-header-btn back-modal-btn"
    >
      <i class="fa fa-chevron-left"></i>
    </div>`);
        }
        $("#help-container").addClass("opened");
        setTimeout(function() {
            $(".forms-modal").last().addClass("opened");
        }, 200);
    },

    addUrlModal(
        url,
        icon = "",
        title = "",
        showTitle = false,
        fullHeight = true,
        callback = false
    ) {
        this.appendModal(icon, title, showTitle, fullHeight);
        if (fullHeight) {
            $(".modal-content-container")
                .last()
                .html(
                    '<div class="modal-loader-container"><div class="inner-loader"></div></div>'
                );
        } else {
            $(".modal-content-container")
                .last()
                .html(
                    '<div class="modal-loader-container min-height"><div class="inner-loader"></div></div>'
                );
        }

        $.ajax({
            url: url,
            success: function(data) {
                $(".modal-content-container").last().html(data);
                if (getUrlVars(url) && getUrlVars(url)["type"]) {
                    $(".modal-content-container")
                        .last()
                        .find(".page-container .modal-type")
                        .text(getUrlVars(url)["type"]);
                }
                if (getUrlVars(url) && getUrlVars(url)["question"]) {
                    $(".modal-content-container")
                        .last()
                        .find(".page-container #subject")
                        .val('');

                    $(".modal-content-container")
                        .last()
                        .find(".page-container #Message")
                        .val('');
                }
                if (callback) {
                    callback();
                }

                $(document).trigger("IzamModalLoaded");

            },
        });
    },

    addHtmlModal(
        htmlCode,
        icon = "",
        title = "",
        showTitle = false,
        fullHeight = true,
        extendedWidth = false
    ) {
        this.appendModal(icon, title, showTitle, fullHeight);
        $(".modal-content-container").last().html(htmlCode);

        if (extendedWidth) {
            $(".forms-modal").last().addClass("extended-width");
        }
    },

    closeCurrentModal(elem) {
        $(elem).closest(".forms-modal").removeClass("opened");
        setTimeout(function() {
            $(elem).closest(".forms-modal").remove();
        }, 200);
    },

    closeModals() {
        $("#help-container").removeClass("opened");
        $(".forms-modal").removeClass("opened");
        $(".forms-modal").remove();
        this.clearModalData();
    },

    setMinimized(minimized = false) {
        if (minimized) {
            this.saveModalData();
            $("#help-container").removeClass("opened");
            $(".forms-modal").addClass("minimized");
        } else {
            this.clearModalData();
            $("#help-container").addClass("opened");
            $(".forms-modal").removeClass("minimized");
        }
    },

    saveModalData() {
        // $('[data-app-form-uploader="images"]').get(0).appFormUploader.destroy();
        // $('#modules-select').get(0).selectize.destroy();
        window.localStorage.setItem(
            "modalData",
            JSON.stringify($("#modal-container").html())
        );
    },

    getModalData() {
        if (window.localStorage.getItem("modalData")) {
            return JSON.parse(window.localStorage.getItem("modalData"));
        }
        return false;
    },

    clearModalData() {
        window.localStorage.removeItem("modalData");
    },
};

function loadSupportScript() {
    var cssId = "help-css"; // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.id = cssId;
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "/dist/app/js/pages/help/help.styles.css";
        link.media = "all";
        head.appendChild(link);
    }
    if (
        "querySelector" in document &&
        "addEventListener" in window &&
        $("#help-script").length < 1
    ) {
        // Create a script tag
        var script = document.createElement("script");

        // Assign a URL to the script element
        script.src = "/dist/app/js/pages/help/help.js";
        script.id = "help-script";

        // Get the first script tag on the page (we'll insert our new one before it)
        var ref = document.querySelector("script");

        // Insert the new node before the reference node
        ref.parentNode.insertBefore(script, ref);
    }

    return true;
}