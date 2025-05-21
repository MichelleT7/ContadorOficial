import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-regresivo',
  standalone: true,              
  imports: [CommonModule],     
  templateUrl: './regresivo.component.html',
  styleUrls: ['./regresivo.component.css']   
})
export class RegresivoComponent implements OnInit, OnDestroy {

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private intervalId: any;

  weddingDate: Date = new Date('2025-06-29T00:00:00');

  ngOnInit(): void {
    this.startCountdown();
    this.launchConfetti();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
    this.updateCountdown();
  }

  updateCountdown(): void {
    const now = new Date(); // ✅ Usa la hora actual del sistema
    const diff = this.weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      this.days = this.hours = this.minutes = this.seconds = 0;
      clearInterval(this.intervalId);
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

  petals = Array.from({ length: 70 }, () => ({
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 10 + Math.random() * 10
}));

  




  getFormattedCurrentDate(): string {
    return new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
