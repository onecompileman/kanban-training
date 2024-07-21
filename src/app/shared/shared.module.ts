import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortItemByOrderPipe } from './pipes/sort-item-by-order.pipe';



@NgModule({
  declarations: [
    SortItemByOrderPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortItemByOrderPipe
  ]
})
export class SharedModule { }
