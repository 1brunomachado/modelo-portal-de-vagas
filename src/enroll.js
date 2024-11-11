import { createButton } from "./card.js";
import { formatDate } from "./utils.js";

// Definição dos status de inscrição
export const isCanceled = (cancellation) => ({
  tag: "a",
  attr: {
    href: cancellation,
    target: "_blank",
  },
  cls: "inscricao-cancelada",
  text: "Comunicado de Cancelamento",
});

export const hasCandidates = (classifieds) => ({
  tag: "a",
  attr: {
    href: classifieds,
    target: "_blank",
  },
  cls: "inscricao-aberta",
  text: "Lista de selecionados",
});

export const soonEnroll = {
  tag: "div",
  cls: "inscricao-breve",
  text: "Inscrições em breve",
};

export const openEnroll = {
  tag: "a",
  attr: {
    href: "terms",
  },
  cls: "inscricao-aberta",
  text: "Inscreva-se",
};

export const closeEnroll = {
  tag: "div",
  cls: "inscricao-fechada",
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
