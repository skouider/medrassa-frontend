import { Component, OnInit } from '@angular/core';
import { ClasseResponseDto } from '../../../dto/classe-response.dto';
import { Observable } from 'rxjs';
import { ClasseService } from '../../../services/classe.service';
import { CommonModule, NgForOf } from "@angular/common";
import { SessionService } from '../../../services/session.service';
import { SessionOuvertureDTO } from '../../../dto/session-response.dto';
import { TypeClasse } from '../../../models/type-classe.enum';
import { Genre } from '../../../models/genre.enum';
import { InscriptionService } from '../../../services/inscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classe-list',
  imports: [CommonModule],
  templateUrl: './classe-list.html',
  styleUrl: './classe-list.css',
})
export class ClasseList implements OnInit {
  classes$!: Observable<ClasseResponseDto[]>;
  sessionliste!: SessionOuvertureDTO[]
  _classes: ClasseResponseDto[] = []
  isOpen = false;
  sessionSelectionnee: SessionOuvertureDTO = new SessionOuvertureDTO()


  constructor(private classeService: ClasseService,
    private sessionService: SessionService,
    private inscriptionService: InscriptionService,
    private router: Router
  ) {
    this.classes$ = classeService.classes$
  }
  ngOnInit(): void {

    this.sessionService.findAll().subscribe(data => {
      this.sessionliste = data;


    })
  }

  loadAllClasses() {
    this.classeService.loadAllClasses()
  }


  _selectedClasse(c: ClasseResponseDto) {

    this.classeService.currentClasse = { ...c };

  }

  selectionnerSession(s: SessionOuvertureDTO) {
    this.sessionSelectionnee = s
    this.classeService.findClasseBySession(s.id!)

  }

  afficherCoran() {
    this.classeService.findClasseByType(
      TypeClasse.CORAN,
      this.sessionSelectionnee.id!
    );
  }

  afficherPrepa() {
    this.classeService.findClasseByType(
      TypeClasse.PREPARATOIRE,
      this.sessionSelectionnee.id!
    );
  }

  afficherGarcons() {
    this.classeService.findClasseByGenre(
      Genre.GARCON,
      this.sessionSelectionnee.id!
    );
  }

  afficherFilles() {
    this.classeService.findClasseByGenre(
      Genre.FILLE,
      this.sessionSelectionnee.id!
    );
  }

  voirEleves(c: ClasseResponseDto) {
    if (!c.id) {
      return;
    }
      
      
    this.router.navigate(['/admin/classes',c.id,'eleves']);

  }

  nouvelleClasse() {
    this.classeService.currentClasse = new ClasseResponseDto();
    console.log('current classe....', this.currentClasse);

  }

  public get currentClasse(): ClasseResponseDto {
    return this.classeService.currentClasse
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
