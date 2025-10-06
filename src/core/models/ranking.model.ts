import { Dificuldade } from "./game.types";

export interface RankingItem {
  nome: string;
  pontos: number;
  dificuldade: Dificuldade;
  tentativasUsadas: number;
  dataISO: string;
}