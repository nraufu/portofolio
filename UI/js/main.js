const navigationItem = document.querySelectorAll('.navigation__item');
const menu = document.querySelector('.navigation__checkbox');

const hideMenu = () => {
    menu.checked = false;
}

if (navigationItem) {
    for (let i = 0; i < navigationItem.length; i++) {
        navigationItem[i].addEventListener('click', hideMenu);
    }
}
