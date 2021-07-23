import { catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ZipCode } from 'app/shared/types';

@Injectable({
  providedIn: 'root'
})
export class ZipService {
  /**
   * Http Client
   */
  http: HttpClient;

  /**
   * Base URL
   */
  url: string = 'https://api.zippopotam.us';

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get Zip Code by US
   * 
   * @param contry 
   * @returns 
   */
  getZipCode(code: string, contry = 'us'): Observable<any> {
    return this.http
      .get<ZipCode[]>(`${this.url}/${contry}/${code}`)
      .pipe(switchMap(evt => of(evt || null)), catchError(_ => of(null)));
  }
}
