import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  public numeroDigitado: number = 1;
  public numeroSecreto: number = 0;

  public jogoEstaFinalizado: boolean = false;
  public mensagemAcerto: string = "🎉 Parabéns! Você acertou o número secreto!";

  public dicaNumeroMaiorQue: number = 1;
  public dicaNumeroMenorQue: number = 100;

  ngOnInit(): void {
    this.numeroSecreto = this.obterNumeroSecreto();
  }

  public adivinhar(): void {
    if (this.numeroDigitado < this.numeroSecreto)
      alert(`O número digitado '${this.numeroDigitado}' é menor que o número secreto! Tente novamente.`);

    else if (this.numeroDigitado > this.numeroSecreto)
      alert(`O número digitado '${this.numeroDigitado}' é maior que o número secreto! Tente novamente.`);

    else {
      this.mensagemAcerto;
      this.jogoEstaFinalizado = true;
    }
  }

  public reiniciar(): void {
    this.numeroDigitado = 1;
    this.dicaNumeroMaiorQue = 1;
    this.dicaNumeroMenorQue = 100;

    this.jogoEstaFinalizado = false;

    this.numeroSecreto = this.obterNumeroSecreto();
  }

  public obterNumeroSecreto(): number {
    const numeroAleatorio: number = Math.random() * 100;

    const numeroSecreto = Math.floor(numeroAleatorio);

    console.log(numeroSecreto);

    return numeroSecreto;
  }
}
