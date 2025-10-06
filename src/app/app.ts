import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

type Dificuldade = 'facil' | 'medio' | 'dificil';

const configInicial: Record<Dificuldade, {max: number, tentativas: number, titulo: string, cardClass: string}> = {
  facil: {max: 10, tentativas: 3, titulo: "Fácil (1-10)", cardClass: "bg-success-subtle border-success"},
  medio: {max: 50, tentativas: 5, titulo: "Médio (1-50)", cardClass: "bg-warning-subtle border-warning"},
  dificil: {max: 100, tentativas: 7, titulo: "Difícil (1-100)", cardClass: "bg-danger-subtle border-danger"}
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgClass],
  templateUrl: './app.html'
})
export class App implements OnInit {
  public readonly CONFIG = configInicial;

  private readonly PONTOS_MAX = 100;
  public pontuacao = this.PONTOS_MAX;
  public cardClass = 'bg-danger-subtle border-danger';

  public numeroDigitado: number = 1;
  public numeroSecreto: number = 0;

  public dicaNumeroMaiorQue: number = 1;
  public dicaNumeroMenorQue: number = 100;

  public jogoEstaFinalizado: boolean = false;
  public mensagemAcerto: string | null = null;

  public dificuldadeSelecionada: Dificuldade | null = null;
  public maxAtual = 100;
  public tentativasRestantes = 0;

  ngOnInit(): void {
    this.abrirModalDificuldade();
  }

  public abrirModalDificuldade(): void {
    const el = document.getElementById('modalDificuldade');

    if (!el) return;

    new bootstrap.Modal(el, { backdrop: 'static', keyboard: false }).show();
  }

  public iniciarJogo(d: Dificuldade): void {
    this.dificuldadeSelecionada = d;

    const config = configInicial[d];
    this.maxAtual = config.max;
    this.tentativasRestantes = config.tentativas;
    this.cardClass = config.cardClass;

    this.dicaNumeroMaiorQue = 1;
    this.dicaNumeroMenorQue = this.maxAtual;
    this.numeroDigitado = 1;
    this.jogoEstaFinalizado = false;

    this.pontuacao = this.PONTOS_MAX;    

    this.numeroSecreto = this.sortear(1, this.maxAtual);

    const el = document.getElementById('modalDificuldade');
    if (el) bootstrap.Modal.getInstance(el)?.hide();
  }

  public adivinhar(): void {
    const diff = Math.abs(this.numeroDigitado - this.numeroSecreto);

    if (this.numeroDigitado < this.numeroSecreto) {
      alert(`O número digitado '${this.numeroDigitado}' é menor que o número secreto! Tente novamente.`);
      
      this.consumiuTentativa();

      this.descontarPontos(diff);
    }
    else if (this.numeroDigitado > this.numeroSecreto) {
      alert(`O número digitado '${this.numeroDigitado}' é maior que o número secreto! Tente novamente.`);
      
      this.consumiuTentativa();

      this.descontarPontos(diff);
    }
    else {
      this.jogoEstaFinalizado = true;

      const modalEl = document.getElementById('modalAcerto');
      if (!modalEl) return;

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  public reiniciar(): void {
    this.abrirModalDificuldade();
  }

  public sortear(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public consumiuTentativa(): void {
    this.tentativasRestantes--;

    if (this.tentativasRestantes <= 0) {
      this.jogoEstaFinalizado = true;

      const modalEl = document.getElementById('modalErro');

      if (modalEl) new bootstrap.Modal(modalEl).show();  
    }
  }

  private descontarPontos(dist: number): void {
    let perda = 0;

    if (dist >= 10) perda = 10;

    else if (dist >= 5) perda = 5;

    else if (dist >= 1) perda = 2;

    this.pontuacao = Math.max(0, this.pontuacao - perda);
  }
}
