import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../../services/classe.service';
import { ClasseResponseDto } from '../../../dto/classe-response.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Genre } from '../../../models/genre.enum';
import { TypeClasse } from '../../../models/type-classe.enum';
import { SessionService } from '../../../services/session.service';
import { SessionOuvertureDTO } from '../../../dto/session-response.dto';

@Component({
  selector: 'app-classe-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './classe-form.html',
  styleUrl: './classe-form.css',
})
export class ClasseForm implements OnInit {

  genre!: Genre
  type!: TypeClasse
  typeDisponibles:TypeClasse[] = []
  genres = Object.values(Genre);
  typeClasses = Object.values(TypeClasse);
  sessionListe :SessionOuvertureDTO[] =  []

  constructor(private classeService: ClasseService, private sessionService:SessionService) {
  }
  
  
  ngOnInit(): void {
      
    this.sessionService.findAll().subscribe(data=>{
      this.sessionListe = data;
      console.log("la session est ====",this.sessionListe);
    })
    
    
  }
  
  saveOrUpdate(){
  if(this.currentClasse.id){
    this.classeService.editClasse(this.currentClasse.id!)
  }else{
    this.classeService.addClasse()
  }
}

onSessionChange(){

  this.typeDisponibles = [];

  if(this.currentClasse.session == null){
    return;
  }

  this.typeDisponibles = this.currentClasse.session.configurations!;

  this.currentClasse.typeClasse = undefined;

}

/* generer le nom de la classe par les inputs */
genererNomClasse() {

  if (!this.currentClasse.typeClasse || !this.currentClasse.genre) {
    return;
  }

  let type = "";
  let genre = "";

  if (this.currentClasse.typeClasse == TypeClasse.CORAN) {
    type = "Coran";
  } else {
    type = "Préparatoire";
  }

  switch (this.currentClasse.genre) {

    case Genre.GARCON:
      genre = "Garçons";
      break;

    case Genre.FILLE:
      genre = "Filles";
      break;

    case Genre.MIXTE:
      genre = "Mixte";
      break;
  }

  this.currentClasse.nom = type + " - " + genre;
}

  saveClasse() {
    this.classeService.addClasse()
  }

  editClasse(id:number){
    this.classeService.editClasse(id);
  }

/*   _selectedClasse(c:ClasseResponseDto){
    console.log("classe selectionner",this.selectedClasse.id);
    
    this.classeService.currentClasse = {...c}

  } */
  
  public get currentClasse(): ClasseResponseDto {
    return this.classeService.currentClasse;
  }
  public set currentClasse(value: ClasseResponseDto) {
    this.classeService.currentClasse = value;
  }

  public get selectedClasse(): ClasseResponseDto {
    return this.classeService.selectedClasse;
  }
  public set selectedClasse(value: ClasseResponseDto) {
    this.classeService.selectedClasse = value;
  }

}
