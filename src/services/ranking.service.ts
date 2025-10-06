// src/app/shared/ranking.service.ts
import { Injectable } from '@angular/core';
import { Dificuldade } from '../core/models/game.types';
import { RankingItem } from '../core/models/ranking.model';

const KEY = 'jogo-adivinhacao-ranking-v1';

@Injectable({ providedIn: 'root' })
export class RankingService {

  add(item: RankingItem): void {
    const list = this.load();
    list.push(item);
    list.sort(this.compare);
    if (list.length > 10) list.length = 10;
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  load(filter: Dificuldade | 'todos' = 'todos'): RankingItem[] {
    const json = localStorage.getItem(KEY);
    const list: RankingItem[] = json ? JSON.parse(json) : [];
    const filtered = filter === 'todos' ? list : list.filter(x => x.dificuldade === filter);
    return [...filtered].sort(this.compare);
  }

  clear(): void { localStorage.removeItem(KEY); }

  private compare(a: RankingItem, b: RankingItem): number {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;                
    if (a.tentativasUsadas !== b.tentativasUsadas) return a.tentativasUsadas - b.tentativasUsadas;
    return new Date(b.dataISO).getTime() - new Date(a.dataISO).getTime();
  }
}