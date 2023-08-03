const mobileMenuBtnE = document.getElementById("mobile-menu-btn");
const mobileMenuE = document.getElementById("mobile-menu");

function toggle (){
    mobileMenuE.classList.toggle("open");
}

mobileMenuBtnE.addEventListener("click", toggle);