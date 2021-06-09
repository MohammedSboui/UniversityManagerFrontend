import { Injectable } from '@angular/core';
import { Personne } from '../interfaces/personne';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  url = 'http://localhost:5555/personnes/';
  personnes: Array<Personne> = new Array<Personne>();
  constructor(private http: HttpClient) {

  }
  getAll(): Observable <Array<Personne>> {
    return this.http.get<Array<Personne>>(this.url);
  }
  addPerson(p: Personne): Observable<Personne> {
    return this.http.post(this.url, p);
    }
}
