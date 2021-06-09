import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enseignant } from '../models/Enseignant';

const url = 'http://localhost:8282';

@Injectable({
  providedIn: 'root',
})
export class EnseignantService {
  constructor(private http: HttpClient) {}

  getEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(`${url}/enseignant/list`);
  }

  nouveauEnseignant(enseignant: Enseignant): Observable<Enseignant> {
    return this.http.post<Enseignant>(`${url}/enseignant/add`, enseignant);
  }

  getEnseignantById(id: number): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${url}/enseignant/get/${id}`);
  }

  modifierEnseignant(enseignant: Enseignant): Observable<Enseignant> {
    return this.http.post<Enseignant>(`${url}/enseignant/edit`, enseignant);
  }

  deleteEnseignant(enseignant: Enseignant) {
    return this.http.get(`${url}/enseignant/delete/${enseignant.matricule}`);
  }
}
