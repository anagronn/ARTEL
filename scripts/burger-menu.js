const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.close-btn')
const burgerContainer = document.querySelector('.burger-container');
const burgerMenu = document.querySelector('.burger-menu');
const links = document.querySelectorAll('.menu-link');
burgerBtn.addEventListener('click', () => {
  burgerContainer.style.display = 'flex';
  document.body.style.overflowY = 'hidden';
  setTimeout(() => {
    burgerContainer.classList.add('active');
    burgerMenu.classList.add('active');
  }, 10);
})

closeBtn.addEventListener('click', () => {
  closeMenu();
})

links.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  })
  
})

function closeMenu(){
  burgerContainer.classList.remove('active');
  burgerMenu.classList.remove('active');
  document.body.style.overflowY = 'scroll';
  setTimeout(() => {
    burgerContainer.style.display = 'none';
  }, 500);
}