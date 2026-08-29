import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStatistiqueDto } from '../dto/dashboard-statistique.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  baseUrl = environment.apiUrl + "/dashboard";

  constructor(private http: HttpClient) {}

  statistiques(): Observable<DashboardStatistiqueDto> {

    return this.http.get<DashboardStatistiqueDto>(this.baseUrl);

  }

}

