import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { VistaComponent } from '../vista/vista.component';


@Component({
  selector: 'app-regresivo',
  standalone: true,              
  imports: [CommonModule, VistaComponent], 
  templateUrl: './regresivo.component.html',
  styleUrls: ['./regresivo.component.css']   
})
export class RegresivoComponent implements OnInit, OnDestroy {

  petals = Array.from({ length: 30 }, (_, i) => i);

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private intervalId: any;
  cuentaFinalizada: boolean = false;


  weddingDate: Date = new Date('2025-06-29T11:00:00');

  // Arrays para posiciones y tiempos aleatorios de pétalos
  private petalPositions: number[] = [];
  private petalDelays: number[] = [];
  private petalDurations: number[] = [];

  ngOnInit(): void {
    this.initializePetalAnimations();
    this.startCountdown();
    this.launchConfetti();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private initializePetalAnimations(): void {
    // Generar posiciones y tiempos aleatorios para cada pétalo
    this.petalPositions = this.petals.map(() => Math.random() * 100);
    this.petalDelays = this.petals.map(() => Math.random() * 5);
    this.petalDurations = this.petals.map(() => 3 + Math.random() * 4);
  }

  getRandomPosition(index: number): number {
    return this.petalPositions[index] || Math.random() * 100;
  }

  getRandomDelay(index: number): number {
    return this.petalDelays[index] || Math.random() * 5;
  }

  getRandomDuration(index: number): number {
    return this.petalDurations[index] || 3 + Math.random() * 4;
  }

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
    this.updateCountdown();
  }

  updateCountdown(): void {
    const now = new Date();
    const diff = this.weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
    this.days = this.hours = this.minutes = this.seconds = 0;
    clearInterval(this.intervalId);
    this.cuentaFinalizada = true; 
    return;
    }


    this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }

  launchConfetti(): void {
    const duration = 7 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 25,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() > animationEnd) {
        clearInterval(interval);
      }
    }, 250);
  }

  getFormattedWeddingDate(): string {
    return this.weddingDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  getFormattedCurrentDate(): string {
    return new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}

