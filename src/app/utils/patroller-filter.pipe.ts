import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../objects/user';

@Pipe({
  name: 'patrollerFilter'
})
export class PatrollerFilterPipe implements PipeTransform {

  transform(patrollers: User[], targetId: string): string {
    if (!patrollers) return null;
    if (!targetId || targetId == "") return null;

    return patrollers.find(patroller => patroller.uid == targetId).lastName;
   }

}
