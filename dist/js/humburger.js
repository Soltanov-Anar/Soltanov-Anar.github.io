window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu__items'),
          menuItems = document.querySelectorAll('.menu__item'),
          hamburger = document.querySelector('.hamburger');
        
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu__items_active');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu__items_active');
        });
    })
})