export type Dificuldade = 'facil' | 'medio' | 'dificil';

export interface DificuldadeConfig {
  max: number;
  tentativas: number;
  titulo: string;
  cardClass: string;
}

export const CONFIG: Record<Dificuldade, {max: number, tentativas: number, titulo: string, cardClass: string}> = {
  facil: {max: 10, tentativas: 3, titulo: "Fácil (1-10)", cardClass: "bg-success-subtle border-success"},
  medio: {max: 50, tentativas: 5, titulo: "Médio (1-50)", cardClass: "bg-warning-subtle border-warning"},
  dificil: {max: 100, tentativas: 7, titulo: "Difícil (1-100)", cardClass: "bg-danger-subtle border-danger"}
}