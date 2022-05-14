import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionLoaderComponent } from './selection-loader.component';



@NgModule({
  declarations: [SelectionLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [SelectionLoaderComponent]
})
export class SelectionLoaderModule { }
