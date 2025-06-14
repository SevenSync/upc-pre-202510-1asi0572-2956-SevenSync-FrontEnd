// src/app/shared/pipes/requirement-level.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import {RequirementLevel} from '../plants/model/plant.entity';

type IconType = 'sun' | 'water';

@Pipe({
  name: 'requirementIcons',
  standalone: true, // Ideal para Angular 17+
})
export class RequirementLevelPipe implements PipeTransform {
  transform(level: RequirementLevel, type: IconType): string {
    const icon = type === 'sun' ? '☀️' : '💧';
    switch (level) {
      case 'Alta':
        return icon.repeat(3);
      case 'Media':
        return icon.repeat(2);
      case 'Bajo':
        return icon.repeat(1);
      default:
        return '';
    }
  }
}
