import { ZipCode } from './shared/types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

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
  url: string = 'http://api.zippopotam.us';

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get Zip Code
   * 
   * @param contry 
   * @returns 
   */
  getZipCode(code: string, contry = 'us'): Observable<any> {
    return this.http.get<ZipCode[]>(`${this.url}/${contry}/${code}`);
  }
}
