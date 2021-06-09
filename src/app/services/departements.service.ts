import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../models/Departement';

const url = 'http://localhost:8282';

@Injectable({
  providedIn: 'root',
})
export class DepartementsService {
  constructor(private http: HttpClient) {}

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${url}/departement/list`);
  }

  nouveauDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${url}/departement/add`, departement);
  }

  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${url}/departement/get/${id}`);
  }

  modifierDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${url}/departement/edit`, departement);
  }

  deleteDepartement(departement: Departement) {
    return this.http.get(`${url}/departement/delete/${departement.codeDep}`);
  }
}
