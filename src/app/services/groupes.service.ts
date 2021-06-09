import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Groupe } from '../models/Groupe';

const url = 'http://localhost:8282/groupe';

@Injectable({
  providedIn: 'root',
})
export class GroupesService {
  constructor(private http: HttpClient) {}

  ajouterGroupe(groupe: Groupe) {
    return this.http.post<Groupe>(`${url}/addG`, groupe);
  }

  getListGroupe() {
    return this.http.get<Groupe[]>(`${url}/list`);
  }

  modifierGroupe(groupe: Groupe) {
    return this.http.post<Groupe>(`${url}/editG`, groupe);
  }

  deleteGroupe(groupe: Groupe) {
    return this.http.get(`${url}/deleteG`);
  }

  getGroupeById(id: number): Observable<Groupe> {
    return this.http.get<Groupe>(`${url}/getG/${id}`);
  }
}
