import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestingService {

  constructor(private http: HttpClient) { }

  get(url: string){
    return this.http.get(url)
  }
}
