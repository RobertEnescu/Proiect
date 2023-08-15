import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byAuthor',
})
export class ByAuthorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return 'By author ' + value;
  }
}
