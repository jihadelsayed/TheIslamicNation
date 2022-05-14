import { Component, OnInit } from '@angular/core';
import { caliph, primeMinister, minsters } from 'src/data/pyramid';

@Component({
  selector: 'app-muslims',
  templateUrl: './muslims.component.html',
  styleUrls: ['./muslims.component.css']
})
export class MuslimsComponent implements OnInit {

  constructor() { }

  caliph: any[] = caliph;
  primeMinister: any[] = primeMinister;
  minsters: any[] = minsters;

  ngOnInit(): void {
  }

}
