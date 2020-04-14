import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicOverlap'
})
export class DynamicOverlapPipe implements PipeTransform {

  transform(dragging: boolean, index: number): number {
    return dragging ? -70 * index : 0;
  }

}
