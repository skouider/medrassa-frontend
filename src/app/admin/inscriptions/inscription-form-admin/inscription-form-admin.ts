import { Component, OnInit } from '@angular/core';
import { InscriptionService } from '../../../services/inscription.service';
import { InscriptionDto } from '../../../dto/inscription-request.dto';
import { FormsModule } from "@angular/forms";
import { SessionService } from '../../../services/session.service';
import { SessionOuvertureDTO } from '../../../dto/session-response.dto';
import { CommonModule } from '@angular/common';
import { ClasseService } from '../../../services/classe.service';
import { ClasseResponseDto } from '../../../dto/classe-response.dto';
import { Genre } from '../../../models/genre.enum';
import { Observable } from 'rxjs';
import { InscriptionList } from '../inscription-list/inscription-list';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-form-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './inscription-form-admin.html',
  styleUrl: './inscription-form-admin.css',
})
export class InscriptionFormAdmin implements OnInit {



  _currentInscription: InscriptionDto = new InscriptionDto();
  listSession!: SessionOuvertureDTO[]
  listeClasse!: ClasseResponseDto[]
  sessionSelectionnee!: SessionOuvertureDTO;
  classeSelectionnee: ClasseResponseDto = new ClasseResponseDto;
  listGenre!: Genre

  constructor(private inscriptionService: InscriptionService,
    private sessionService: SessionService,
    private classeService: ClasseService
  ) {

  }

  ngOnInit(): void {
    this.sessionService.findAll().subscribe(data => {
      console.log("data $$$", data);

      this.listSession = data
      console.log("all sessions++++", this.listSession);
    })

    this.classeService.findAll().subscribe(data => {

      this.listeClasse = data;

    });

  }

  onSessionChange() {
    console.log("session===", this.sessionSelectionnee);
    this.classeService.findClasseBySession(this.sessionSelectionnee.id!);
  }

  saveOrUpdate() {
    if (this.currentInscription.id) {
      this.admiEditInscription()
    } else {
      this.admiSaveInscription()
    }
  }

  admiSaveInscription() {
    this.currentInscription.classeId = this.classeSelectionnee.id!


    this.inscriptionService.saveInscriptionAdmin(this.sessionSelectionnee.id!,
      this.currentInscription).subscribe(data => {


        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Inscription enregistrée avec succès.',
          timer: 1800,
          showConfirmButton: false
        });
        this._currentInscription = new InscriptionDto()
        this.inscriptionService.notifyRefresh()
      }, err => {
        console.log(err.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err.error.message
        });

      })
  }

  admiEditInscription() {
    this.currentInscription.classeId = this.classeSelectionnee.id!
    console.log("inscription selectionneee", this.currentInscription.id);


    this.inscriptionService.editInscriptionAdmin(this.currentInscription.id,
      this.currentInscription).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Modification effectuée',
          timer: 1800,
          showConfirmButton: false
        });

        this._currentInscription = new InscriptionDto()
        this.inscriptionService.notifyRefresh()
      }, err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err.error.message
        });
      })
  }

  nouvelleInscription() {

    this.currentInscription = new InscriptionDto();

    this.classeSelectionnee = new ClasseResponseDto();

    this.sessionSelectionnee = new SessionOuvertureDTO();

  }

  public get currentInscription(): InscriptionDto {
    return this.inscriptionService.currentInscription;
  }
  public set currentInscription(value: InscriptionDto) {
    this.inscriptionService.currentInscription = value;
  }


}
