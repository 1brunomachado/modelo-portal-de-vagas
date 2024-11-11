import { isEnrollOpen, isEnrollClosed } from "./enroll.js";
import { applyFilters } from "./main.js";

// Função de filtro genérica
export function filterList(data, params) {
  return data.filter((item) => {
    return Object.entries(params).every(([key, value]) => {
      if (!value) return true;

      if (key === "status") {
        if (value === "open") {
          return isEnrollOpen(item.endEnroll);
        } else if (value === "closed") {
          return isEnrollClosed(item.endEnroll);
        }
      }
      return item[key] === value;
    });
  });
}

// Popula os selects com opções únicas
export function populateSelectOptions(el, arr) {
  const select = document.getElementById(el);
  arr.sort().forEach((item) => {
    select.add(new Option(item, item));
  });
}

// Função para tratar a mudança dos selects
function handleSelectChange() {
  const params = {
    category: document.getElementById("filter-type").value,
    city: document.getElementById("filter-city").value,
    status: document.getElementById("filter-status").value || "open",
  };
  updateUrlParams(params);
  applyFilters(params);
}

// Adiciona o evento de mudança para todos os selects
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", handleSelectChange);
});

// Inicializa as opções para os selects com base nos dados
export function initOptions(data) {
  const options = {
    "filter-type": [...new Set(data.map((obj) => obj.category))],
    "filter-city": [...new Set(data.map((obj) => obj.city))],
  };
  Object.entries(options).forEach(([el, arr]) => {
    populateSelectOptions(el, arr);
  });
}

// Atualiza a URL com os parâmetros de categoria e cidade
export function updateUrlParams(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  });
  window.history.pushState({}, "", url);
}

// Captura o valor dos parâmetros na URL
export function getUrlParam(param) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}

// Inicializa os filtros com base nos valores dos parâmetros da URL ou usa valores padrões
export function initFilterParam(param, el) {
  const value = getUrlParam(param) || "";
  document.getElementById(el).value = value;
  return value;
}
