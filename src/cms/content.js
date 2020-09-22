$(document).ready(function() {
    console.log('ready')



    // 导航下拉菜单
    var timer = null,
        headerWrapper = $('.header-wrapper'),
        headerContentDropdown = headerWrapper.find('.header-content-dropdown');

    headerContentDropdown.mouseover(function() {
        clearTimeout(timer)
    }).mouseout(function(evt) {
        clearTimeout(timer)
        timer = setTimeout(function() {
            headerContentDropdown.fadeOut('fast')
        }, 400)
    });

    headerWrapper.find('.hasSubMenu').mouseover(function(evt) {
        headerContentDropdown.fadeIn('fast')
    }).mouseout(function(evt) {
        clearTimeout(timer)
        timer = setTimeout(function() {
            headerContentDropdown.fadeOut('fast')
        }, 400)
    })

})