import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], field: string, value: any): any {
    return items.filter(item => item[field] === (value));
  }
}

