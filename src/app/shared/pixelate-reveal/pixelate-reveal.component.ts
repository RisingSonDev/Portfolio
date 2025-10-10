import { Component, Input, OnInit } from '@angular/core';

type Cell = { delay: number };

@Component({
  selector: 'app-pixelate-reveal',
  templateUrl: './pixelate-reveal.component.html',
  styleUrls: ['./pixelate-reveal.component.scss'],
})
export class PixelateRevealComponent implements OnInit {
  /** Grid density: more = smaller pixels */
  @Input() rows = 100;
  @Input() cols = 100;

  /** Total reveal duration (ms) */
  @Input() duration = 1200;

  /** Overlay color (usually your page bg) */
  @Input() color = '#000';

  /** Optional: skip showing again if already seen in this tab */
  @Input() oncePerSession = true;

  cells: Cell[] = [];
  alive = true;

  ngOnInit(): void {
   

    if (this.oncePerSession && sessionStorage.getItem('pixelateSeen') === '1') {
      this.alive = false;
      return;
    }

    const total = this.rows * this.cols;

    // Build cells with randomized delays for an organic reveal
    // Bias slightly so it starts fast and eases out near the end
    for (let i = 0; i < total; i++) {
      const r = Math.random();
      const delay = Math.floor(r * this.duration * 0.9);
      this.cells.push({ delay });
    }
    
    // Remove overlay after animation completes
    setTimeout(() => {
      this.alive = false;
      if (this.oncePerSession) sessionStorage.setItem('pixelateSeen', '1');
    }, this.duration + 300);
  }
}
