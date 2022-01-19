import { Pipe, PipeTransform } from '@angular/core';
import { ReportAll } from '../model/reportAll';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor() { }
  transform(orders: ReportAll[], searchText: string): ReportAll[] {


    searchText = searchText.toLowerCase();
    let search = orders.filter(function (data) {
      return JSON.stringify(data).toLowerCase().includes(searchText);
    });

    return search;

  }
}
