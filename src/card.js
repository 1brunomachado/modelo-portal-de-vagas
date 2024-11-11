import { getEnrollButton, getEnrollStatus } from "./enroll.js";
import { modalCard } from "./modal.js";
import { setAttributes } from "./utils.js";

// Cria e retorna um botão com atributos especificados
export function createButton({ tag, attr, cls, text }) {
  const button = document.createElement(tag);
  if (attr) {
    setAttributes(button, attr);
  }
  button.className = cls;
  button.textContent = text;
  return button;
}

// Cria um cartão de curso e exibe na página
export function cardCourse(item) {
  const list = document.querySelector(".cursos");
  const card = document.createElement("div");
  const image = document.createElement("img");
  const school = document.createElement("h3");
  const dates = document.createElement("p");
  const schedule = document.createElement("div");
  const requirements = document.createElement("div");
  const enroll = getEnrollButton(item);

  card.className = "curso-card";
  image.src = item.img;
  school.textContent = item.city;
  dates.textContent = getEnrollStatus(item);
  schedule.textContent = "Cronograma";
  requirements.textContent = "Requisitos";

  addClickEvent(schedule, item, "schedule");
  addClickEvent(requirements, item.requirements, "requirements");

  card.append(image, school, dates, schedule, requirements, enroll);
  list.append(card);
}

// Função genérica para adicionar eventos de clique
function addClickEvent(element, content, type) {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    modalCard(content, type);
  });
}
