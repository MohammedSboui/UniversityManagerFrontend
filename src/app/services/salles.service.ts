import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from '../models/Salle';

const url = 'http://localhost:8282';

@Injectable({
  providedIn: 'root',
})
export class SallesService {
  constructor(private http: HttpClient) {}

  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${url}/salle/list`);
  }

  nouveauSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(`${url}/salle/add`, salle);
  }

  getSalleById(id: number): Observable<Salle> {
    return this.http.get<Salle>(`${url}/salle/get/${id}`);
  }

  modifierSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(`${url}/salle/edit`, salle);
  }

  deleteSalle(salle: Salle) {
    return this.http.get(`${url}/salle/delete/${salle.numSalle}`);
  }
}
