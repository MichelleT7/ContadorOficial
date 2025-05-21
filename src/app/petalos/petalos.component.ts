import { Component, OnInit } from '@angular/core';
import { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

@Component({
  selector: 'app-rose-petals',
  templateUrl: './petalos.component.html',
  styleUrls: ['./petalos.component.css']
})
export class RosePetalsComponent implements OnInit {
  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#FF6B6B", "#FFA3A3", "#FFD3D3"] // Tonos rosados/rojos
      },
      shape: {
        type: "image",
        images: [
          {
            src: "assets/rose-petal.png", // Necesitarás una imagen de pétalo
            width: 20,
            height: 20
          }
        ]
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 15,
        random: true
      },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      }
    },
    retina_detect: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }
}