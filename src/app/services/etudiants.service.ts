import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/Etudiant';

const url = 'http://localhost:8282';

@Injectable({
  providedIn: 'root',
})
export class EtudiantsService {
  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${url}/etudiant/list`);
  }

  nouveauEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${url}/etudiant/addE`, etudiant);
  }

  getEutdiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${url}/etudiant/getE/${id}`);
  }

  modifierEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${url}/etudiant/editE`, etudiant);
  }

  deleteEtudiant(etudiant: Etudiant) {
    return this.http.get(`${url}/etudiant/deleteE/${etudiant.numEt}`);
  }
}
