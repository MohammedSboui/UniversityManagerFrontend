import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seance } from '../models/Seance';

const url = 'http://localhost:8282';

@Injectable({
  providedIn: 'root',
})
export class SeancesService {
  constructor(private http: HttpClient) {}

  getSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${url}/seance/list`);
  }

  nouveauSeance(seance: Seance): Observable<Seance> {
    return this.http.post<Seance>(`${url}/seance/add`, seance);
  }

  getSeanceById(id: number): Observable<Seance> {
    return this.http.get<Seance>(`${url}/seance/get/${id}`);
  }

  modifierSeance(seance: Seance): Observable<Seance> {
    return this.http.post<Seance>(`${url}/seance/edit`, seance);
  }

  deleteSeance(seance: Seance) {
    return this.http.get(`${url}/seance/delete/${seance.idSeance}`);
  }
}
