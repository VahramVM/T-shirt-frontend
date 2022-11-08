import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ret'
})
export class PipesPipe implements PipeTransform {

 

  transform() {
    return 0;
  }

 
}
