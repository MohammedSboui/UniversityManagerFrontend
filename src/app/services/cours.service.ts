import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../models/Cours';

const url = 'http://localhost:8282';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  constructor(private http: HttpClient) {}

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${url}/cours/list`);
  }

  nouveauCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${url}/cours/add`, cours);
  }

  getCoursById(id: number): Observable<Cours> {
    return this.http.get<Cours>(`${url}/cours/get/${id}`);
  }

  modifierCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${url}/cours/edit`, cours);
  }

  deleteCours(cours: Cours) {
    return this.http.get(`${url}/cours/delete/${cours.codeCours}`);
  }
}
