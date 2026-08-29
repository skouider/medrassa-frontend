/* import { Injectable } from '@angular/core';
import { InscriptionDto } from '../dto/inscription-request.dto';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { log } from 'node:console';
import { TypeClasse } from '../models/type-classe.enum';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InscriptionResponseDto } from '../dto/inscription-response.dto';
import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {

  baseUrl = environment.apiUrl + '/inscriptions';
  private _currentInscription: InscriptionDto = new InscriptionDto();
  private _selectedInscription: InscriptionResponseDto = new InscriptionResponseDto();
  private inscriptionsSubject = new BehaviorSubject<InscriptionResponseDto[]>([]);
  inscriptions$ = this.inscriptionsSubject.asObservable();
  private refreshSubject = new Subject<void>();

  refresh$ = this.refreshSubject.asObservable();
  keyword = ''


  totalPages: number = 0;

  currentPage: number = 0;

  totalElements: number = 0;


  constructor(private http: HttpClient) {


  }


  loadInscriptions(page: number, size: number) {

    this.http.get<PageResponse<InscriptionResponseDto>>(
      this.baseUrl + "/page?page=" + page + "&size=" + size
    )
      .subscribe(data => {

        this.inscriptionsSubject.next(data.content);

        this.totalPages = data.totalPages;
        this.currentPage = data.number;
        this.totalElements = data.totalElements;

      });

  }


  findAll() {
    this.http.get<Array<InscriptionResponseDto>>(this.baseUrl).subscribe(data => {
      console.log(data);

    })
  }

  saveInscription(inscriptionDto: InscriptionDto): Observable<InscriptionResponseDto> {
    return this.http.post<InscriptionResponseDto>(this.baseUrl, inscriptionDto)
  }

  saveInscriptionAdmin(sesionId: number, inscriptionDto: InscriptionDto): Observable<InscriptionResponseDto> {

    return this.http.post<InscriptionResponseDto>(this.baseUrl + '/admin/' + sesionId,
      inscriptionDto)

  }

  editInscriptionAdmin(id: number, inscriptionDto: InscriptionDto): Observable<InscriptionResponseDto> {
    return this.http.put<InscriptionResponseDto>(this.baseUrl + '/' + id,
      inscriptionDto)


  }

  findByClasse(classeId: number): Observable<InscriptionResponseDto[]> {
    return this.http.get<InscriptionResponseDto[]>(this.baseUrl + '/classe/' + classeId)
  }

  notifyRefresh() {
    this.refreshSubject.next();
  }

  search() {
    return this.http.get<InscriptionResponseDto[]>(
      this.baseUrl + '/search?keyword='+this.keyword).subscribe(data=>{
              
        this.inscriptionsSubject.next(data)
        
      })
  }

  valider(id: number) {
  return this.http.put<InscriptionResponseDto>(
    this.baseUrl + '/' + id + '/valider',
    {}
  );
}

refuser(id: number) {
  return this.http.put<InscriptionResponseDto>(
    this.baseUrl + '/' + id + '/refuser',
    {}
  );
}

annuler(id: number) {
  return this.http.put<InscriptionResponseDto>(
    this.baseUrl + '/' + id + '/annuler',
    {}
  );
}

delete(id: number) {

  return this.http.delete<number>(
    this.baseUrl + '/' + id
  );

}

  public get currentInscription(): InscriptionDto {
    return this._currentInscription;
  }
  public set currentInscription(value: InscriptionDto) {
    this._currentInscription = value;
  }

  public get selectedInscription(): InscriptionResponseDto {
    return this._selectedInscription;
  }
  public set selectedInscription(value: InscriptionResponseDto) {
    this._selectedInscription = value;
  }


}
 */

import { Injectable } from '@angular/core';
import { InscriptionDto } from '../dto/inscription-request.dto';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InscriptionResponseDto } from '../dto/inscription-response.dto';
import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {

  baseUrl = environment.apiUrl + '/inscriptions';

  private _currentInscription: InscriptionDto = new InscriptionDto();

  private _selectedInscription: InscriptionResponseDto =
    new InscriptionResponseDto();

  /*
   * UNE SEULE source pour le tableau
   */
  private inscriptionsSubject =
    new BehaviorSubject<InscriptionResponseDto[]>([]);

  inscriptions$ = this.inscriptionsSubject.asObservable();

  private refreshSubject = new Subject<void>();

  refresh$ = this.refreshSubject.asObservable();

  keyword = '';

  totalPages = 0;
  currentPage = 0;
  totalElements = 0;


  constructor(private http: HttpClient) {
  }


  // =========================================================
  // CHARGER LES INSCRIPTIONS AVEC PAGINATION
  // =========================================================

  loadInscriptions(page: number, size: number): void {

    this.http.get<PageResponse<InscriptionResponseDto>>(
      `${this.baseUrl}/page?page=${page}&size=${size}`
    ).subscribe({

      next: (data) => {

        console.log('INSCRIPTIONS PAGE :', data);

        this.inscriptionsSubject.next(data.content);

        this.totalPages = data.totalPages;
        this.currentPage = data.number;
        this.totalElements = data.totalElements;

      },

      error: (err) => {

        console.error(
          'Erreur lors du chargement des inscriptions :',
          err
        );

        this.inscriptionsSubject.next([]);

      }

    });

  }


  // =========================================================
  // TOUTES LES INSCRIPTIONS
  // =========================================================

  findAll(): Observable<InscriptionResponseDto[]> {

    return this.http.get<InscriptionResponseDto[]>(
      this.baseUrl
    );

  }


  // =========================================================
  // INSCRIPTION CLIENT
  // =========================================================

  saveInscription(
    inscriptionDto: InscriptionDto
  ): Observable<InscriptionResponseDto> {

    return this.http.post<InscriptionResponseDto>(
      this.baseUrl,
      inscriptionDto
    );

  }


  // =========================================================
  // INSCRIPTION ADMIN
  // =========================================================

  saveInscriptionAdmin(
    sessionId: number,
    inscriptionDto: InscriptionDto
  ): Observable<InscriptionResponseDto> {

    return this.http.post<InscriptionResponseDto>(
      `${this.baseUrl}/admin/${sessionId}`,
      inscriptionDto
    );

  }


  // =========================================================
  // MODIFIER INSCRIPTION ADMIN
  // =========================================================

  editInscriptionAdmin(
    id: number,
    inscriptionDto: InscriptionDto
  ): Observable<InscriptionResponseDto> {

    return this.http.put<InscriptionResponseDto>(
      `${this.baseUrl}/${id}`,
      inscriptionDto
    );

  }


  // =========================================================
  // FILTRER PAR CLASSE
  // =========================================================

  findByClasse(
    classeId: number
  ): Observable<InscriptionResponseDto[]> {

    return this.http.get<InscriptionResponseDto[]>(
      `${this.baseUrl}/classe/${classeId}`
    );

  }


  // =========================================================
  // RECHERCHE
  // =========================================================

  search(): void {

    const keyword = this.keyword.trim();

    console.log('Recherche :', keyword);

    this.http.get<InscriptionResponseDto[]>(
      `${this.baseUrl}/search?keyword=${encodeURIComponent(keyword)}`
    ).subscribe(
       (data) => {

        console.log('Résultat recherche :', data);

        
        this.inscriptionsSubject.next(data);

        this.totalPages = 1;
        this.currentPage = 0;
        this.totalElements = data.length;

      },

       (err) => {

        console.error(
          'Erreur lors de la recherche :',
          err
        );

        this.inscriptionsSubject.next([]);

      }

    );
    

  }


  // =========================================================
  // RAFRAÎCHIR
  // =========================================================

  notifyRefresh(): void {
    this.refreshSubject.next();
  }


  // =========================================================
  // VALIDATION
  // =========================================================

  valider(id: number): Observable<InscriptionResponseDto> {

    return this.http.put<InscriptionResponseDto>(
      `${this.baseUrl}/${id}/valider`,
      {}
    );

  }


  // =========================================================
  // REFUS
  // =========================================================

  refuser(id: number): Observable<InscriptionResponseDto> {

    return this.http.put<InscriptionResponseDto>(
      `${this.baseUrl}/${id}/refuser`,
      {}
    );

  }


  // =========================================================
  // ANNULATION
  // =========================================================

  annuler(id: number): Observable<InscriptionResponseDto> {

    return this.http.put<InscriptionResponseDto>(
      `${this.baseUrl}/${id}/annuler`,
      {}
    );

  }


  // =========================================================
  // DELETE
  // =========================================================

  delete(id: number): Observable<number> {

    return this.http.delete<number>(
      `${this.baseUrl}/${id}`
    );

  }


  // =========================================================
  // CURRENT INSCRIPTION
  // =========================================================

  public get currentInscription(): InscriptionDto {
    return this._currentInscription;
  }

  public set currentInscription(
    value: InscriptionDto
  ) {
    this._currentInscription = value;
  }


  // =========================================================
  // INSCRIPTION SELECTIONNEE
  // =========================================================

  public get selectedInscription(): InscriptionResponseDto {
    return this._selectedInscription;
  }

  public set selectedInscription(
    value: InscriptionResponseDto
  ) {
    this._selectedInscription = value;
  }

  setInscriptions(data: InscriptionResponseDto[]): void {
  this.inscriptionsSubject.next(data);
}
}