/******************************************************************************
 ***
 ***  Beta Version Dropdown:
 ***
 ***  - Applied in all old/new layouts
 ***
 ******************************************************************************/

$(document).ready(function() {
    $('body').find('.dropdown-menu.beta-dropdown').on('click', function(e) {
        e.stopPropagation();
    });
    $(".dropdown-menu.beta-dropdown i").on('click', function() {
        $(this).parent().parent().removeClass('open show');
        $(this).parent().removeClass('show')
        $(this).parent().removeAttr('style').removeClass('show')
        $(this).parent().prev().removeClass('show')
    });
});