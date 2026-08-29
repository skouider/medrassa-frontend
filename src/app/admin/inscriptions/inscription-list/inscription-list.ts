/* import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InscriptionDto } from '../../../dto/inscription-request.dto';
import { InscriptionService } from '../../../services/inscription.service';
import { CommonModule, NgForOf } from "@angular/common";
import { InscriptionResponseDto } from '../../../dto/inscription-response.dto';
import { InscriptionDetail } from "../inscription-detail/inscription-detail";
import { ClasseResponseDto } from '../../../dto/classe-response.dto';
import { ClasseService } from '../../../services/classe.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-inscription-list',
  imports: [CommonModule, InscriptionDetail, FormsModule],
  templateUrl: './inscription-list.html',
  styleUrl: './inscription-list.css',
})
export class InscriptionList implements OnInit {

  
  inscriptions$!: Observable<InscriptionResponseDto[]>;
  inscriptionSelectionnee: InscriptionResponseDto = new InscriptionResponseDto()
  showInscriptionDetail: boolean = false;
  classes!: ClasseResponseDto[];
  keyword = '';
  page: number = 0;
  size: number = 10;

  constructor(private inscriptionService: InscriptionService,
    private classeService: ClasseService
  ) {
    this.inscriptions$ = inscriptionService.inscriptions$
  }
  ngOnInit(): void {
    this.loadInscriptions()
    this.inscriptionService.refresh$.subscribe(() => {

      this.loadInscriptions();

    });


    this.classeService.findAll().subscribe(data => {
      this.classes = data
      console.log("classes ===", this.classes);
    })

  }

  loadInscriptions() {
    this.inscriptionService.loadInscriptions(this.page, this.size)
  }

  _selectedInscription(i: InscriptionResponseDto) {

    const dto = new InscriptionDto();

    dto.id = i.id;
    dto.nom = i.nom!;
    dto.prenom = i.prenom!;
    dto.dateNaissance = i.dateNaissance!;
    dto.telephone = i.telephone!;
    dto.adresse = i.adresse!;
    dto.nomTuteur = i.nomTuteur!;
    dto.classeId = i.classe?.id!;
    this.inscriptionService.currentInscription = dto;
  }

  findByClasse(classe: ClasseResponseDto) {
      

    this.inscriptionService.findByClasse(classe.id!).subscribe(data=>{
      console.log(data);
            this.inscriptions$ = new Observable(subscriber => {
        subscriber.next(data);
        subscriber.complete();
      });
    })


  }

  

rechercher() {
        console.log('Keyword :', this.keyword);


    this.inscriptionService.keyword = this.keyword
    this.inscriptionService.search()
    

}


  showDetail(i: InscriptionResponseDto) {

    if (
      this.showInscriptionDetail &&
      this.inscriptionService.selectedInscription.id === i.id
    ) {
      this.showInscriptionDetail = false;
    } else {
      this.inscriptionSelectionnee = i;
      this.inscriptionService.selectedInscription = i;
      this.showInscriptionDetail = true;
    }
  }

  next() {

    this.page++;

    this.loadInscriptions();

  }
  previous() {

    if (this.page > 0) {

      this.page--;

      this.loadInscriptions();

    }

  }
  goToPage(page: number) {

    this.page = page;

    this.loadInscriptions();
  }
  get totalPages(): number {
    return this.inscriptionService.totalPages;
  }

  get totalElements(): number {
    return this.inscriptionService.totalElements;
  }

  fermerDetail() {

  this.showInscriptionDetail = false;

}

}
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InscriptionDto } from '../../../dto/inscription-request.dto';
import { InscriptionResponseDto } from '../../../dto/inscription-response.dto';
import { ClasseResponseDto } from '../../../dto/classe-response.dto';

import { InscriptionService } from '../../../services/inscription.service';
import { ClasseService } from '../../../services/classe.service';

import { InscriptionDetail } from '../inscription-detail/inscription-detail';


@Component({
  selector: 'app-inscription-list',

  imports: [
    CommonModule,
    FormsModule,
    InscriptionDetail
  ],

  templateUrl: './inscription-list.html',
  styleUrl: './inscription-list.css',
})
export class InscriptionList implements OnInit {


  // =========================================================
  // DONNEES
  // =========================================================

  inscriptions$!: Observable<InscriptionResponseDto[]>;

  inscriptionSelectionnee =
    new InscriptionResponseDto();

  showInscriptionDetail = false;

  classes: ClasseResponseDto[] = [];

  keyword = '';


  // =========================================================
  // PAGINATION
  // =========================================================

  page = 0;

  size = 10;


  constructor(
    private inscriptionService: InscriptionService,
    private classeService: ClasseService
  ) {

    /*
     * IMPORTANT :
     * On garde TOUJOURS le même Observable.
     */
    this.inscriptions$ =
      this.inscriptionService.inscriptions$;

  }


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    // Charger les inscriptions
    this.loadInscriptions();


    // Lorsqu'une autre partie de l'application
    // demande un rafraîchissement
    this.inscriptionService.refresh$
      .subscribe(() => {

        this.loadInscriptions();

      });


    // Charger les classes
    this.classeService.findAll()
      .subscribe({

        next: (data) => {

          this.classes = data;

          console.log(
            'Classes :',
            this.classes
          );

        },

        error: (err) => {

          console.error(
            'Erreur chargement classes :',
            err
          );

        }

      });

  }


  // =========================================================
  // CHARGER LES INSCRIPTIONS
  // =========================================================

  loadInscriptions(): void {

    /*
     * Lorsque l'on clique sur "الكل",
     * on revient à la première page.
     */
    this.page = 0;

    this.inscriptionService.loadInscriptions(
      this.page,
      this.size
    );

  }


  // =========================================================
  // SELECTION D'UNE INSCRIPTION
  // =========================================================

  _selectedInscription(
    i: InscriptionResponseDto
  ): void {

    const dto = new InscriptionDto();

    dto.id = i.id;
    dto.nom = i.nom!;
    dto.prenom = i.prenom!;
    dto.dateNaissance = i.dateNaissance!;
    dto.telephone = i.telephone!;
    dto.adresse = i.adresse!;
    dto.nomTuteur = i.nomTuteur!;
    dto.classeId = i.classe?.id!;

    this.inscriptionService.currentInscription = dto;

  }


  // =========================================================
  // FILTRER PAR CLASSE
  // =========================================================

  findByClasse(
    classe: ClasseResponseDto
  ): void {

    console.log(
      'Classe sélectionnée :',
      classe.nom
    );

    console.log(
      'ID :',
      classe.id
    );


    this.inscriptionService
      .findByClasse(classe.id!)
      .subscribe({

        next: (data) => {

          console.log(
            'Inscriptions de la classe :',
            data
          );


          /*
           * NE PAS FAIRE :
           *
           * this.inscriptions$ = new Observable(...)
           *
           * On met simplement les données dans
           * le BehaviorSubject du service.
           */
          this.inscriptionService
            .setInscriptions(data);

        },

        error: (err) => {

          console.error(
            'Erreur filtre classe :',
            err
          );

        }

      });

  }


  // =========================================================
  // RECHERCHER
  // =========================================================

  rechercher(): void {

    console.log(
      'Mot recherché :',
      this.keyword
    );


    this.inscriptionService.keyword =
      this.keyword;


    this.inscriptionService.search();

  }


  // =========================================================
  // AFFICHER / CACHER DETAIL
  // =========================================================

  showDetail(
    i: InscriptionResponseDto
  ): void {

    if (
      this.showInscriptionDetail &&
      this.inscriptionService
        .selectedInscription.id === i.id
    ) {

      this.showInscriptionDetail = false;

    } else {

      this.inscriptionSelectionnee = i;

      this.inscriptionService
        .selectedInscription = i;

      this.showInscriptionDetail = true;

    }

  }


  // =========================================================
  // PAGE SUIVANTE
  // =========================================================

  next(): void {

    if (
      this.page + 1 <
      this.inscriptionService.totalPages
    ) {

      this.page++;

      this.inscriptionService
        .loadInscriptions(
          this.page,
          this.size
        );

    }

  }


  // =========================================================
  // PAGE PRECEDENTE
  // =========================================================

  previous(): void {

    if (this.page > 0) {

      this.page--;

      this.inscriptionService
        .loadInscriptions(
          this.page,
          this.size
        );

    }

  }


  // =========================================================
  // ALLER A UNE PAGE
  // =========================================================

  goToPage(page: number): void {

    this.page = page;

    this.inscriptionService
      .loadInscriptions(
        this.page,
        this.size
      );

  }


  // =========================================================
  // TOTAL PAGES
  // =========================================================

  get totalPages(): number {

    return this.inscriptionService.totalPages;

  }


  // =========================================================
  // TOTAL INSCRIPTIONS
  // =========================================================

  get totalElements(): number {

    return this.inscriptionService.totalElements;

  }


  // =========================================================
  // FERMER DETAIL
  // =========================================================

  fermerDetail(): void {

    this.showInscriptionDetail = false;

  }

}