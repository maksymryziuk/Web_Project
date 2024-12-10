document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menuIcon")
  const menuOpen = document.getElementById("menuOpen") 
  const menuClose = document.getElementById("menuClose")
  const menuList = document.getElementById("menuList") 

  menuIcon.addEventListener('click', ()=> {
    menuOpen.classList.toggle("hide-icon")
    menuClose.classList.toggle("hide-icon")
    menuList.classList.toggle("hide-menu")
  })
})