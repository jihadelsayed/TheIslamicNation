import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-selection-loader',
    //templateUrl: './selection-loader.component.html',

  template: `
    <div [ngStyle]="getMyStyles()" class="skelt-load loader"></div>
  `,
  styleUrls: ['./selection-loader.component.css']
})
export class SelectionLoaderComponent implements OnInit {
  @Input() Cwidth: any;
  @Input() Cheight: any;
  @Input() circle: boolean | undefined;

  constructor() { }

  ngOnInit() {
  }

  getMyStyles() {
    const myStyles = {
        'width': this.Cwidth ? this.Cwidth : '%',
        'height': this.Cheight ? this.Cheight : '%',
        'border-radius': this.circle ? '50%' : ''
    };
    return myStyles;
}

}
