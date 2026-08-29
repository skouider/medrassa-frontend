import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../models/classe.model';
import { environment } from '../../environments/environment';
import { ClasseResponseDto } from '../dto/classe-response.dto';
import { TypeClasse } from '../models/type-classe.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { log } from 'console';
import { SessionService } from './session.service';
import { Genre } from '../models/genre.enum';


@Injectable({
  providedIn: 'root',
})
export class ClasseService {

  baseUrl = environment.apiUrl+'/classes';
  private _currentClasse: ClasseResponseDto = new ClasseResponseDto(); 
  private _selectedClasse: ClasseResponseDto = new ClasseResponseDto();
 
private _typesSelectionnes: TypeClasse[] = []; 
private _listClasses!: Array<ClasseResponseDto> ; 
private classesSubject = new BehaviorSubject<ClasseResponseDto[]>([]); 
classes$ = this.classesSubject.asObservable();


  constructor(private http:HttpClient){

  }

  loadAllClasses(){
    this.http.get<Array<ClasseResponseDto>>(this.baseUrl).subscribe(data => {
          this.classesSubject.next(data)
        })
  }

  public addClasse() {
    
    
      return this.http.post<ClasseResponseDto>(this.baseUrl, this.currentClasse).subscribe(data => {
       
       
          this._currentClasse = data
        
        alert('classe ajouter avec successé....')
        this.loadAllClasses()
        this._currentClasse = new ClasseResponseDto() 
               
  
      }, err => {
        console.log(err.error.message);
        alert(err.error.message)
  
      })
    }
    
    editClasse(id:number){    
    this.http.put<ClasseResponseDto>(this.baseUrl+'/'+id,
      this.currentClasse).subscribe(data=>{
      console.log('classe selectionner',data);
      this.loadAllClasses()
      this._currentClasse = new ClasseResponseDto()
      alert('Classe Modifier')
    },err=>{
      console.log(err);
      
    })
      console.log("modifier la classe ===",this.currentClasse);
      
    }

  findAll():Observable<ClasseResponseDto[]>{
     return this.http.get<Array<Classe>>(this.baseUrl)
  }

  findClasseBySession(sessionId:number){
    this.http.get<ClasseResponseDto[]>(this.baseUrl+'/session/'+sessionId)
    .subscribe(data=>{
      this.classesSubject.next(data)
      
    })
  }

  findClasseByType(type: TypeClasse, sessionId: number) {

  this.http.get<ClasseResponseDto[]>(
    this.baseUrl + "/type/" + type + "/session/" + sessionId
  ).subscribe(data => {

    this.classesSubject.next(data);

  });

}

findClasseByGenre(genre: Genre, sessionId: number) {

  this.http.get<ClasseResponseDto[]>(
    this.baseUrl + "/genre/" + genre + "/session/" + sessionId
  ).subscribe(data => {

    this.classesSubject.next(data);

  });

}


 findClasseCoran(sessionId:number){
   
   this.http.get<ClasseResponseDto[]>(
     this.baseUrl+"/session/"+sessionId+"/type/CORAN"
    ).subscribe(data=>{
      console.log("afficher la session selectionne coté service",sessionId);
      console.log('afficher les classes coran', data);
      
        this.classesSubject.next(data);

    });

}

findClassePrepa(sessionId:number){

    this.http.get<ClasseResponseDto[]>(
        this.baseUrl+"/session/"+sessionId+"/type/PREPARATOIRE"
    ).subscribe(data=>{

        this.classesSubject.next(data);

    });

}

findGarcons(sessionId:number){

    this.http.get<ClasseResponseDto[]>(
        this.baseUrl+"/session/"+sessionId+"/genre/GARCON"
    ).subscribe(data=>{

        this.classesSubject.next(data);

    });

}

findFilles(sessionId:number){

    this.http.get<ClasseResponseDto[]>(
        this.baseUrl+"/session/"+sessionId+"/genre/FILLE"
    ).subscribe(data=>{

        this.classesSubject.next(data);

    });

}



  public get currentClasse(): ClasseResponseDto {
    return this._currentClasse;
  }
  public set currentClasse(value: ClasseResponseDto) {
    this._currentClasse = value;
  }

   public get selectedClasse(): ClasseResponseDto {
    return this._selectedClasse;
  }
  public set selectedClasse(value: ClasseResponseDto) {
    this._selectedClasse = value;
  }
}
