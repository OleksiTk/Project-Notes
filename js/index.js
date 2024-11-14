let creatNotes = document.querySelector(".create__notes");
let writeBox = document.querySelector(".creat-notes__container");

creatNotes.addEventListener("click", creatWriteNotes);

// Оновлення localStorage
function updateStorage() {
  // Масив для збереження всіх текстів
  let notes = [];

  // Збираємо всі нотатки з контейнера
  let allNotes = writeBox.querySelectorAll(".creat-notes--write");

  // Для кожної нотатки зберігаємо текст, який вміщений в .creat-notes--input__box
  allNotes.forEach((note) => {
    let noteContent = note.querySelector(".creat-notes--input__box").innerText;
    notes.push(noteContent);
  });

  // Зберігаємо масив в localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Створення нової нотатки
function creatWriteNotes() {
  // Створюємо елементи
  let div = document.createElement("div");
  let write = document.createElement("p");
  let img = document.createElement("img");

  // Налаштовуємо атрибути
  write.setAttribute("contenteditable", "true");
  div.classList.add("creat-notes--write");
  write.classList.add("creat-notes--input__box");
  img.classList.add("creat-notes--delet");
  img.src = "img/delete.png";
  img.setAttribute("width", 30);
  img.setAttribute("height", 30);

  // Додаємо елементи до DOM
  div.appendChild(write);
  div.appendChild(img);
  writeBox.appendChild(div);

  // Оновлюємо localStorage після додавання нової нотатки
  updateStorage();

  // Додаємо обробник для редагування тексту
  write.addEventListener("input", updateStorage);
}

// Обробка події видалення нотатки
writeBox.addEventListener("click", function deletNotes(e) {
  if (e.target.classList.contains("creat-notes--delet")) {
    e.target.parentElement.remove();
    updateStorage(); // Оновлюємо localStorage після видалення
  }
});

// Завантажуємо нотатки з localStorage при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  // Отримуємо збережені нотатки з localStorage
  let savedNotes = JSON.parse(localStorage.getItem("notes"));

  if (savedNotes) {
    // Відновлюємо нотатки з localStorage
    savedNotes.forEach((noteText) => {
      let div = document.createElement("div");
      let write = document.createElement("p");
      let img = document.createElement("img");

      write.setAttribute("contenteditable", "true");
      div.classList.add("creat-notes--write");
      write.classList.add("creat-notes--input__box");
      img.classList.add("creat-notes--delet");
      img.src = "img/delete.png";
      img.setAttribute("width", 30);
      img.setAttribute("height", 30);

      // Встановлюємо текст, який був збережений в localStorage
      write.innerText = noteText;

      div.appendChild(write);
      div.appendChild(img);
      writeBox.appendChild(div);
    });
  }
});
