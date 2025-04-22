import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoMenuFilter, PoMenuItemFiltered } from '@po-ui/ng-components';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SamplePoMenuHumanResourcesService {

  private url: string = 'https://po-sample-api.onrender.com/v1/menus';

  constructor(private http: HttpClient) {}

  getFilteredData(search: string): Observable<Array<PoMenuItemFiltered>> {
    const params = { search };

    return this.http.get(this.url, { params }).pipe(map((response: any) => response.items));
  }
}
