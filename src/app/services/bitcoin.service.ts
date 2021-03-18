import { Bitcoin } from './../models/bitcoin.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/bitcoins';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Bitcoin[]> {
    return this.http.get<Bitcoin[]>(baseUrl);
  }

  get(id: any): Observable<Bitcoin> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  createAll(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByDate(date: any): Observable<Bitcoin[]> {
    return this.http.get<Bitcoin[]>(`${baseUrl}?date=${date}`);
  }
}
