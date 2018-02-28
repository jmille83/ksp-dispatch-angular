import { Pipe, PipeTransform } from '@angular/core';
import { Patroller } from './patroller';

@Pipe({
  name: 'patrollerFilter'
})
export class PatrollerFilterPipe implements PipeTransform {

  transform(patrollers: Patroller[], targetId: string): string {
    if (!patrollers) return null;
    if (!targetId) return patrollers[0].name;

    return patrollers.find(patroller => patroller.id == targetId).name;
   }

}
