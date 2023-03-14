import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LevyService {
  constructor(private http: HttpClient) {}

  calculateLevy(car:any){
    return this.http
        .post(
          'https://localhost:7067/api/Levy',
          car,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
  }
}
