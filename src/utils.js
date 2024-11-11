// Formata a data para o padrão brasileiro
export function formatDate(date) {
  const dateObject = new Date(`${date}T00:00:00`); // Adicionando hora para evitar problemas com UTC
  return dateObject.toLocaleDateString("pt-BR");
}

// Formata um intervalo de datas
export function formatDateRange(dates) {
  return Array.isArray(dates) ? `${formatDate(dates[0])} até ${formatDate(dates[1])}` : formatDate(dates);
}

// Função para formatar os dias da semana de forma legível
export function formatDays(days) {
  if (days.length > 1) {
    return `${days.slice(0, -1).join(", ")} e ${days[days.length - 1]}`;
  }
  return days[0];
}

// Função para formatar o horário no padrão 12h
export function formatTime(time) {
  const [hourPart, minutePart] = time.split(":");
  const formattedHour = parseInt(hourPart, 10);

  if (minutePart && minutePart !== "00") {
    return `${formattedHour}h${minutePart}`;
  }
  return `${formattedHour}h`;
}

// Define atributos para um elemento HTML
export function setAttributes(el, attr) {
  Object.entries(attr).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
}
