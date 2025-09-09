import type { BreathingTechnique } from "../@types";

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: "478",
    title: "Respiração 4-7-8",
    description:
      "Uma técnica clássica para acalmar o sistema nervoso e induzir relaxamento profundo. Inspire por 4s, segure por 7s e expire lentamente por 8s. Excelente para reduzir ansiedade e preparar o corpo para o sono.",
    icon: "moon.stars",
    tags: ["Sono profundo", "Relaxamento", "Redução da ansiedade"],
    sequence: [
      { action: "inhale", duration: 4 },
      { action: "hold", duration: 7 },
      { action: "exhale", duration: 8 },
    ],
  },
  {
    id: "box",
    title: "Respiração Quadrada",
    description:
      "Muito usada por atletas e forças especiais para estabilidade mental. Inspire, segure, expire e segure — sempre pelo mesmo tempo. Cria foco, clareza e presença.",
    icon: "square",
    tags: ["Foco", "Estabilidade emocional", "Clareza mental"],
    sequence: [
      { action: "inhale", duration: 4 },
      { action: "hold", duration: 4 },
      { action: "exhale", duration: 4 },
      { action: "hold", duration: 4 },
    ],
  },
  {
    id: "fire",
    title: "Respiração do Fogo (suave)",
    description:
      "Um pranayama energizante que ativa vitalidade e disposição. Inspire rapidamente por 2s e expire vigorosamente por 1s em ciclos curtos. Ideal para despertar o corpo.",
    icon: "flame",
    tags: ["Energia", "Vitalidade", "Atenção plena"],
    sequence: [
      { action: "inhale", duration: 2 },
      { action: "exhale", duration: 1 },
    ],
  },
  {
    id: "cardiac",
    title: "Respiração Cardíaca",
    description:
      "Inspirada na coerência cardíaca, harmoniza corpo e mente. Inspire em 5s, expire em 5s, mantendo um ritmo estável. Promove equilíbrio emocional e bem-estar geral.",
    icon: "heart",
    tags: ["Equilíbrio emocional", "Redução do estresse", "Harmonia"],
    sequence: [
      { action: "inhale", duration: 5 },
      { action: "exhale", duration: 5 },
    ],
  },
  {
    id: "nadi",
    title: "Respiração Alternada (Nadi Shodhana)",
    description:
      "Prática tradicional do yoga para equilibrar os hemisférios cerebrais. Inspire por uma narina, expire pela outra, alternando suavemente. Promove clareza mental e calma.",
    icon: "arrow.right.arrow.left",
    tags: ["Equilíbrio", "Clareza", "Calma profunda"],
    sequence: [
      { action: "inhale", duration: 4 },
      { action: "exhale", duration: 4 },
      { action: "inhale", duration: 4 },
      { action: "exhale", duration: 4 },
    ],
  },
  {
    id: "2-1",
    title: "Respiração 2:1",
    description:
      "Técnica simples para relaxamento: o tempo da expiração é o dobro da inspiração. Ajuda a acalmar o sistema nervoso e reduzir tensões.",
    icon: "wind",
    tags: ["Relaxamento", "Anti-estresse", "Tranquilidade"],
    sequence: [
      { action: "inhale", duration: 3 },
      { action: "exhale", duration: 6 },
    ],
  },
  {
    id: "sigh",
    title: "Suspiro Consciente",
    description:
      "Um suspiro profundo e intencional seguido de expiração longa. Libera tensão acumulada no peito e traz alívio imediato.",
    icon: "sparkles",
    tags: ["Alívio rápido", "Soltar tensão", "Leveza"],
    sequence: [
      { action: "inhale", duration: 2 },
      { action: "exhale", duration: 4 },
    ],
  },
];
