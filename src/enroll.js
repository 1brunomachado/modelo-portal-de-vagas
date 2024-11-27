import { createButton } from "./card.js";
import { formatDate } from "./utils.js";

// Definição dos status de inscrição
export const isCanceled = (cancellation) => ({
  tag: "a",
  attr: {
    href: cancellation,
    target: "_blank",
  },
  cls: "card-btn btn-cancel",
  text: "Comunicado de cancelamento",
});

export const hasCandidates = (classifieds) => ({
  tag: "a",
  attr: {
    href: classifieds,
    target: "_blank",
  },
  cls: "card-btn btn-candidates",
  text: "Lista de selecionados",
});

export const soonEnroll = {
  tag: "div",
  attr: {
    disabled: true,
  },
  cls: "card-btn btn-soon",
  text: "Inscrições em breve",
};

export const openEnroll = {
  tag: "div",
  cls: "card-btn btn-open",
  text: "Inscreva-se",
};

export const closeEnroll = {
  tag: "div",
  attr: {
    disabled: true,
  },
  cls: "card-btn btn-close",
  text: "Inscrições encerradas",
};

// Funções de verificação de status de inscrição
export function isEnrollSoon(startEnroll) {
  return new Date() < new Date(startEnroll);
}

export function isEnrollOpen(endEnroll) {
  return new Date() < new Date(endEnroll);
}

export function isEnrollClosed(endEnroll) {
  return new Date() > new Date(endEnroll);
}

// Função para obter o status das inscrições
export function getEnrollStatus({ cancellation, startEnroll, endEnroll, classes }) {
  const text = cancellation
    ? "Processo cancelado"
    : isEnrollSoon(startEnroll)
    ? `Inscrições em ${formatDate(startEnroll)}`
    : isEnrollOpen(endEnroll)
    ? `Inscrições até ${formatDate(endEnroll)}`
    : `Início das aulas em ${formatDate(classes)}`;

  return text;
}

// Função para obter o botão de inscrição com base no status
export function getEnrollButton({ cancellation, classifieds, startEnroll, endEnroll }) {
  const status = cancellation
    ? isCanceled(cancellation)
    : classifieds
    ? hasCandidates(classifieds)
    : isEnrollSoon(startEnroll)
    ? soonEnroll
    : isEnrollOpen(endEnroll)
    ? openEnroll
    : closeEnroll;
  return createButton(status);
}
