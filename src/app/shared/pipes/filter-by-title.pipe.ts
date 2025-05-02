import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {
  transform<T extends { title: string }>(value: T[] = [], searchName: string): T[] {
    if (!searchName) return value;
    return value.filter(item => item.title.toLowerCase().includes(searchName.toLowerCase()));
  }
}
