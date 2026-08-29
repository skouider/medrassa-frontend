import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { SessionOuvertureDTO } from '../../../dto/session-response.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
import { TypeClasse } from '../../../models/type-classe.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-session-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './session-form.html',
  styleUrl: './session-form.css',
})
export class SessionForm implements OnInit {

  /*  _session: SessionOuvertureDTO = new SessionOuvertureDTO(); */
  isFormOpen = false;
  TypeClasse = TypeClasse;
  private _selectedSessionId?: number;


  toggleFormulaire() {

    this.isFormOpen = !this.isFormOpen;
  }


  constructor(private sessionService: SessionService) {

  }

  ngOnInit(): void {





  }

  saveOrUpdate() {

    if (this.currentSession.id) {

      this.sessionService.editSession(this.currentSession.id);

    } else {

      this.sessionService.addSession();

    }

  }

  _selectedSession(s: SessionOuvertureDTO) {
    this._selectedSessionId = s.id
    this.sessionService.currentSession = { ...s }
    
  }

  ajouterSession() {

    this.sessionService.addSession()
  }

  loadSessions() {
    this.sessionService.loadSessions()
  }

  getSessionActive() {

    this.sessionService.getSessionActive()
  }

 

  ouvrirSession() {

    Swal.fire({
      title: 'فتح دورة التسجيل',
      text: 'هل تريد فتح دورة التسجيل المحددة؟ سيتم إغلاق أي دورة أخرى مفتوحة تلقائياً.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'نعم، افتحها',
      cancelButtonText: 'إلغاء'
    }).then((result) => {

      if (result.isConfirmed) {

        this.sessionService.ouvrirSession(this.currentSession.id!).subscribe({

          next: (data) => {

            this.currentSession = data;

            this.sessionService.loadSessions();

            Swal.fire({
              icon: 'success',
              title: 'تم بنجاح',
              text: 'تم فتح دورة التسجيل بنجاح.'
            });

          },

          error: (err) => {

            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: err.error.message
            });

          }

        });

      }

    });

  }
 
  fermerSession() {
    Swal.fire({
      title: 'إغلاق دورة التسجيل',
      text: 'هل تريد إغلاق دورة التسجيل؟ لن يتمكن المتقدمون من التسجيل بعد الآن.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، أغلقها',
      cancelButtonText: 'إلغاء'
    }).then((result) => {

      if (result.isConfirmed) {

        this.sessionService.fermerSession(this.currentSession.id!).subscribe({

          next: (data) => {

            this.currentSession = data;
            this.sessionService.loadSessions();

            Swal.fire({
              icon: 'success',
              title: 'تم بنجاح',
              text: 'تم إغلاق دورة التسجيل بنجاح.'
            });

          },

          error: (err) => {

            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: err.error.message
            });

          }

        });

      }

    });
  }

  changerStatus(id: number) {
    this.sessionService.ouvrirSession(id).subscribe(data => {
      console.log("data******", data.active);

      this.currentSession = data
    }, err => {
      console.log(err);

    })
  }

  toggleType(type: TypeClasse) {

    const index = this.typesSelectionnes.indexOf(type);

    if (index > -1) {
      this.typesSelectionnes.splice(index, 1);
    } else {
      this.typesSelectionnes.push(type);
    }

    console.log(this.typesSelectionnes);
  }

  public get currentSession(): SessionOuvertureDTO {
    return this.sessionService.currentSession;
  }

  public set currentSession(value: SessionOuvertureDTO) {
    this.sessionService.currentSession = value;
  }

  public get typesSelectionnes():TypeClasse[] {
    return this.sessionService.typesSelectionnes
  }
  public set typesSelectionnes(value: TypeClasse[]) {
    this.sessionService.typesSelectionnes = value
  }

 

}
