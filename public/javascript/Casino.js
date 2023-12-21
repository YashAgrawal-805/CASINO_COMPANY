function updateNavMenu() {
    var menu = document.getElementById("menu");
    var navMenus = document.querySelectorAll("#navmenu");
    var MENU = document.getElementById("MENU");
    if (window.innerWidth <= 575) {
        navMenus.forEach(function(navMenu) {
            navMenu.classList.add("navmenu");
        });
        MENU.classList.remove("king");
        MENU.classList.add("MENU");
        menu.addEventListener("click",function(){
            MENU.style.transition = "0.5s";
            MENU.classList.add("SHIFTEFMENU");
        })

        var cross = document.getElementsByClassName("cross")[0];
        cross.addEventListener("click",function(){
            MENU.style.transition = "0.5s";
            MENU.classList.remove("SHIFTEFMENU");
        })
    } else {
        MENU.style.transition = "0s";
        navMenus.forEach(function(navMenu) {
            navMenu.classList.remove("navmenu");
        });
        MENU.classList.add("king");
        MENU.classList.remove("MENU");
        MENU.classList.remove("SHIFTEFMENU");
    }
}

updateNavMenu();
window.addEventListener("resize", updateNavMenu);