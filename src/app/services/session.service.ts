import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionOuvertureDTO } from '../dto/session-response.dto';
import { environment } from '../../environments/environment';
import { TypeClasse } from '../models/type-classe.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionOuverture } from '../models/session-ouverture.model';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  baseUrl = environment.apiUrl + '/sessions';
  private _currentSession: SessionOuvertureDTO = new SessionOuvertureDTO();

  /* private _sessionOuvertureDTO: SessionOuvertureDTO = new SessionOuvertureDTO(); */
  private _typesSelectionnes: TypeClasse[] = [];



  private _listSessions?: Array<SessionOuvertureDTO> | undefined;
  private sessionsSubject = new BehaviorSubject<SessionOuvertureDTO[]>([]);
  sessions$ = this.sessionsSubject.asObservable();
  /* private _selectedSession!: SessionOuvertureDTO; */


  constructor(private http: HttpClient) {

  }

  public addSession() {
  // 1. Sauvegarder d'abord la session (sans les configurations)
  this.http.post<SessionOuvertureDTO>(this.baseUrl, this.currentSession).subscribe({
    next: (sessionCreee) => {
      
      // 2. Si des types ont été cochés, enregistrer les configurations pour cette session
      if (this.typesSelectionnes.length > 0 && sessionCreee.id) {
        this.http.put(`${this.baseUrl}/${sessionCreee.id}/configuration`, this.typesSelectionnes)
          .subscribe({
            next: () => {
              this.loadSessions();
              this.resetForm();
              alert("Session créée et configurée avec succès !");
            },
            error: (err) => alert("Erreur lors de la configuration : " + err.error.message)
          });
      } else {
        this.loadSessions();
        this.resetForm();
        alert("Session créée avec succès !");
      }

    },
    error: (err) => {
      alert(err.error.message);
    }
  });
}

// Petite méthode d'aide pour réinitialiser
private resetForm() {
  this.currentSession = new SessionOuvertureDTO();
  this.typesSelectionnes = [];
}

/*  public addSession() {

    // Copier les types choisis dans le DTO envoyé au backend
    this.currentSession.configurations = [...this.typesSelectionnes];

    this.http.post<SessionOuvertureDTO>(
        this.baseUrl,
        this.currentSession
    ).subscribe({

        next: (data) => {

            this.loadSessions();

            // Réinitialiser le formulaire
            this.currentSession = new SessionOuvertureDTO();
            this.typesSelectionnes = [];

            alert("Session créée avec succès");

        },

        error: (err) => {

            alert(err.error.message);

        }

    });

} */

  public editSession(id: number) {
    this.currentSession.configurations = [...this.typesSelectionnes];

    return this.http.put<SessionOuvertureDTO>(this.baseUrl + '/' + id, this._currentSession).subscribe(data => {
      this.currentSession = data;

      this.loadSessions()
      alert("Session modifiée avec succès");
      this.typesSelectionnes = [];

    }, err => {
      console.log(err.error.message);
      alert(err.error.message)

    })
  }


  loadSessions() {
    this.http.get<Array<SessionOuvertureDTO>>(this.baseUrl).subscribe(data => {
      this.sessionsSubject.next(data)
    })
  }

  findAll():Observable<SessionOuvertureDTO[]> {
   return this.http.get<Array<SessionOuvertureDTO>>(this.baseUrl)
    
  }

  getSessionById(id: number) {
    this.http.get<SessionOuvertureDTO>(this.baseUrl + '/id').subscribe(data => {
      console.log(data);

    })
  }

  getSessionActive() {
    return this.http.get<SessionOuvertureDTO>(this.baseUrl + '/active').subscribe(data => {

      this._currentSession = data

    }, err => {
      console.log(err);

    })
  }

  /* configurationSession(sessionId: number, types: TypeClasse[]) {
    this.http.put<SessionOuvertureDTO>(this.baseUrl + '/' + sessionId + '/configuration',
      types).subscribe(() => {
        alert('Session ajouté et configurer ✅')
        this.loadSessions()
      })
  } */

  getConfigurationsSessionActive(): Observable<TypeClasse[]> {
    return this.http.get<TypeClasse[]>(
      this.baseUrl + "/active/configurations"
    );
  }

  /* getConfigurationSession(id: number): Observable<TypeClasse[]> {

  return this.http.get<TypeClasse[]>(
    this.baseUrl + '/configurations/' + id 
  );

}
 */  
  ouvrirSession(id: number): Observable<SessionOuvertureDTO> {
    return this.http.put<SessionOuvertureDTO>(`${this.baseUrl}/${id}/ouvrir`,
      this._currentSession);
  }

  fermerSession(id:number): Observable<SessionOuvertureDTO>{
    return this.http.put<SessionOuvertureDTO>(`${this.baseUrl}/${id}/fermer`,
      this._currentSession);
  }
  

  public get typesSelectionnes(): TypeClasse[] {
    return this._typesSelectionnes;
  }
  public set typesSelectionnes(value: TypeClasse[]) {
    this._typesSelectionnes = value;
  }
  

  public get currentSession(): SessionOuvertureDTO {
    return this._currentSession;
  }
  public set currentSession(value: SessionOuvertureDTO) {
    this._currentSession = value;
  }
}
