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
  const list = document.querySelector(".list");
  const card = document.createElement("article");
  const image = document.createElement("img");
  const content = document.createElement("div");
  const badges = createBadges([item.category, "Presencial", `${item.vacancies} vagas`, item.shift]);
  const school = document.createElement("h3");
  const info = document.createElement("div");
  const dates = document.createElement("p");
  const schedule = document.createElement("div");
  const requirements = document.createElement("div");
  const enroll = getEnrollButton(item);

  card.className = "card";
  image.src = item.img;
  image.alt = item.name;
  image.setAttribute("loading", "lazy");
  content.className = "card-content";
  school.className = "card-title";
  school.textContent = item.city;
  info.className = "card-info";
  dates.className = "card-status";
  dates.textContent = getEnrollStatus(item);
  schedule.className = `card-link link-${formatCategoryClass(item.category)}`;
  schedule.textContent = "Cronograma";
  requirements.className = `card-link link-${formatCategoryClass(item.category)}`;
  requirements.textContent = "Requisitos básicos";

  clickModal(requirements, "requirements", item.requirements);
  clickModal(schedule, "schedule", item);
  if (enroll.classList.contains("btn-open")) {
    clickModal(enroll, "enroll");
  }

  info.append(dates, requirements, schedule);
  content.append(badges, school, info, enroll);
  card.append(image, content);
  list.append(card);
}

// Função genérica para adicionar eventos de clique
function clickModal(element, type, content) {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    modalCard(type, content);
  });
}

// Função auxiliar para criar as badges
function createBadges(arr) {
  const badges = document.createElement("div");
  badges.className = "card-badges";

  arr.forEach((text) => {
    const badge = document.createElement("div");
    badge.textContent = text;
    badge.className = `card-tag tag-${formatCategoryClass(arr[0])}`;
    badges.appendChild(badge);
  });

  return badges;
}

function formatCategoryClass(category) {
  const mapping = {
    Livre: "free",
    Técnico: "technical",
    "RS TI": "rsti",
  };
  return mapping[category];
}
