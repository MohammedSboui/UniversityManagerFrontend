import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universite } from '../models/Universite';

const url = 'http://localhost:8282';

@Injectable({
  providedIn: 'root',
})
export class UniversitesService {
  constructor(private http: HttpClient) {}

  getUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${url}/universite/list`);
  }

  nouveauUniversite(universite: Universite): Observable<Universite> {
    return this.http.post<Universite>(`${url}/universite/add`, universite);
  }

  getUniversiteById(id: number): Observable<Universite> {
    return this.http.get<Universite>(`${url}/universite/get/${id}`);
  }

  modifierUniversite(universite: Universite): Observable<Universite> {
    return this.http.post<Universite>(`${url}/universite/edit`, universite);
  }

  deleteUniversite(universite: Universite) {
    return this.http.get(`${url}/universite/delete/${universite.codeUni}`);
  }
}
