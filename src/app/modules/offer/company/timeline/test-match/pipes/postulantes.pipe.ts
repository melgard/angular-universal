import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'postulantes'
})
export class PostulantesPipe implements PipeTransform {

  transform(items: any[], args?: string): any {
    if (!args) {
      return items;
    }
    return items.filter(item => {
      if (item.fastView && item.fastView.full_name) {
        if (item.fastView.full_name.toLowerCase().includes(args.toLowerCase())) {
          return item;
        }
      }

    });
  }


}
