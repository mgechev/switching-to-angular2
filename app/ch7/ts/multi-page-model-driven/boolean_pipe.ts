import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {
  constructor() {}
  transform(flag: boolean, args: string[]): string {
    return flag ? args[0] : args[1];
  }
}
