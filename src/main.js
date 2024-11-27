import { cardCourse } from "./card.js";
import { filterList, initFilterParam, getUrlParam, initOptions } from "./filters.js";

let data = [];

// Função para buscar dados via requisição assíncrona
async function fetchData() {
  try {
    const response = await fetch("src/data.json");
    data = await response.json();
    initOptions(data);
    initPage();
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

// Função para obter a lista de cursos e exibi-los
function getCourses(courses) {
  const list = document.querySelector(".list");
  list.innerHTML = "";

  if (!courses.length) {
    alert("Nnenhum crsuo encontrado.");
  }

  courses
    ?.sort((a, b) => a.endEnroll - b.endEnroll)
    .forEach((item) => {
      cardCourse(item);
    });
}

// Função para aplicar os filtros e exibir os resultados
export function applyFilters(params) {
  const filteredList = filterList(data, params);
  getCourses(filteredList);
}

// Função para inicializar a página com base nos parâmetros da URL ou valores padrões
function initPage() {
  const params = {
    category: initFilterParam("category", "filter-type"),
    city: initFilterParam("city", "filter-city"),
    status: getUrlParam("status") || "open",
  };
  const status = document.getElementById("filter-status");
  status.value = params.status;
  applyFilters(params);
}

// Inicializa a aplicação quando a página for carregada
window.onload = fetchData;
