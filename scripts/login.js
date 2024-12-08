let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#a-form");
  const loginForm = document.querySelector("#b-form");

  // Сохранение данных в localStorage
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#a-form #name").value;
    const email = document.querySelector("#a-form #email").value;
    const password = document.querySelector("#a-form #password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Проверка на существующий email
    if (users.some((user) => user.email === email)) {
      alert("Пользователь с таким email уже зарегистрирован!");
      return;
    }

    // Сохранение нового пользователя
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Регистрация прошла успешно!");
    registerForm.reset(); // Очистка формы
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#b-form #email").value;
    const password = document.querySelector("#b-form #password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (email === "admin" && password === "admin") {
      alert("Добро пожаловать, Администратор!");
      localStorage.setItem("loggedInUserName", "Администратор");
      window.location.href = "./main.html"; 
      return;
    }
    
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      alert(`Добро пожаловать, ${user.name}!`);
      localStorage.setItem("loggedInUserName", user.name);
      window.location.href = "./main.html"; 
    } else {
      alert("Неправильный email или пароль!");
    }
  });
});
