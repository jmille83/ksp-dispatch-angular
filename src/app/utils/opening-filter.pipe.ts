import { Pipe, PipeTransform } from '@angular/core';
import { OpeningRecord } from './objects/opening-record';

@Pipe({
  name: 'openingFilter'
})
export class OpeningFilterPipe implements PipeTransform {

  transform(openings: OpeningRecord[], isPersonnel: boolean): OpeningRecord[] {
    if (!openings) {
      return openings;
    }
    return openings.filter(opening => opening.personnel === isPersonnel);
  }
}
