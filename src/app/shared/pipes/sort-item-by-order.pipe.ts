import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortItemByOrder',
})
export class SortItemByOrderPipe implements PipeTransform {
  transform(items: any[]): any[] {
    return items.sort((item1, item2) => item1.order - item2.order);
  }
}
