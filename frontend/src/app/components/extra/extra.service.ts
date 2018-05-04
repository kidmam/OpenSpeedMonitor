import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ExtraService {

  constructor(private http: HttpClient) { }

  getBrowsers() {
    return this.http.get('/rest/allBrowsers');
  }

  getSystems() {
    return this.http.get('/rest/allSystems');
  }

}
