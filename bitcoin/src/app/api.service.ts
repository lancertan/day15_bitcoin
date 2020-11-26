import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = '672991d2586bde3dec5d51a8cecf8e46';
  constructor(private httpClient: HttpClient) { }


public getPrice(){
  return this.httpClient.get(`https://api.nomics.com/v1/currencies/ticker?key=${this.API_KEY}&ids=BTC&convert=SGD`);
}
}