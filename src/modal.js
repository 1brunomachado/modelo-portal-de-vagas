import { formatDate, formatDateRange, formatDays, formatTime } from "./utils.js";

// Função para criar estrutura de modal
export function modalCard(item, type) {
  const modal = document.createElement("div");
  const modalCard = document.createElement("div");
  const close = document.createElement("span");
  const content = document.createElement("div");

  modal.className = "modal";
  modalCard.className = "modal-card";
  close.className = "close";
  close.textContent = "×";

  close.onclick = () => {
    modal.remove();
  };

  if (type === "schedule") {
    content.append(modalSchedule(item));
  } else if (type === "requirements") {
    content.append(modalRequirements(item));
  }

  modalCard.append(close, content);
  modal.append(modalCard);
  document.body.append(modal);
}

// Conteúdo do cronograma
function modalSchedule({ startEnroll, endEnroll, disclosure, firstCall, secondCall, classes, days, time }) {
  const table = document.createElement("table");
  const stepsContent = [
    "Inscrição dos candidatos",
    "Divulgação da lista dos selecionados e suplentes",
    "1ª chamada para matrícula",
    "2ª chamada para matrícula (suplência, se houver)",
    "Início das aulas",
    "Dias e horário",
  ];
  const periodContent = [
    formatDateRange([startEnroll, endEnroll]),
    formatDate(disclosure),
    formatDateRange(firstCall),
    formatDateRange(secondCall),
    formatDate(classes),
    `${formatDays(days)} das ${formatTime(time[0])} às ${formatTime(time[1])}`,
  ];

  for (let i = 0; i < stepsContent.length; i++) {
    const tr = document.createElement("tr");
    const steps = document.createElement("td");
    const period = document.createElement("td");
    steps.textContent = stepsContent[i];
    period.textContent = periodContent[i];

    tr.append(steps, period);
    table.append(tr);
  }
  return table;
}

// Conteúdo de requisitos
function modalRequirements([age, education, improvement]) {
  const ul = document.createElement("ul");
  const list = [
    "a) Possuir renda familiar mensal per capita de até 2 (dois) salários-mínimos federais;",
    `b) Ter idade igual ou superior a ${age} anos;`,
    `c) Ter a escolaridade igual ou superior ao ${education};`,
  ];
  if (improvement) {
    list.push(
      "d) Apresentar um dos documentos a seguir: Certificado de curso de qualificação profissional, ou Registro de ocupação em Carteira de Trabalho Profissional, ou Declaração da empresa empregadora, ou Autodeclaração de trabalho/experiência profissional."
    );
  }

  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.append(li);
  });
  return ul;
}
