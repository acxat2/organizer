import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'momentYear'
})
export class MomentYearPipe implements PipeTransform {

  transform(m: moment.Moment | null, format: string = 'yyyy'): string {
    return m ? m.format(format) : '';
  }

}
