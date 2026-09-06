import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InscriptionDto } from '../../dto/inscription-request.dto';
import { NgModel } from '@angular/forms'
import { InscriptionService } from '../../services/inscription.service';
import { InscriptionResponseDto } from '../../dto/inscription-response.dto';
import { TypeClasse } from '../../models/type-classe.enum';
import { StatutInscription } from '../../models/statut-inscription.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription implements OnInit {

  type: string = ''; // 'coran' ou 'prepa'
  step: number = 1;
  isChild: boolean = false;
  inscriptionForm!: FormGroup;
  selectedProgram: any
  inscriptionData: InscriptionDto = new InscriptionDto()


  constructor(private route: ActivatedRoute,
    private inscriptionService: InscriptionService,
    private router: Router
  ) { }

  ngOnInit() {



    // 1. Récupérer le type via l'URL
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });


  }


    setAgeGroup(group: 'child' | 'adult') {

  this.isChild = group === 'child';


  this.step = 2;
}


  findAll() {
    return this.inscriptionService.findAll()
  }


  submit(form:NgForm) {
    
    if(form.invalid){
      form.control.markAllAsTouched();
      return;
    }

    if (this.type === 'coran') {
      this.inscriptionData.typeClasse = TypeClasse.CORAN;
    } else if (this.type === 'prep') {
      this.inscriptionData.typeClasse = TypeClasse.PREPARATOIRE;
    }

    

    this.inscriptionService.saveInscription(this.inscriptionData)
      .subscribe({

        next: (response) => {

    

          if (response.statut === StatutInscription.VALIDEE) {

            this.router.navigate(['/success'], {
              state: {
                inscription: response
              }
            });

          }

          else if (response.statut === StatutInscription.LISTE_ATTENTE) {


            this.router.navigate(['/success'], {
              state: {
                inscription: response
              }
            });

          }

        },

        error: (err) => {
          
        console.error('ERREUR INSCRIPTION =', err);
        console.error('STATUS =', err.status);
        console.error('ERROR =', err.error);

        // Message envoyé par Spring
        const message = err.error?.message;

        // --------------------------------------
        // AGE NON COMPATIBLE
        // --------------------------------------

        if (
          message &&
          message.includes('ne correspond à aucune classe')
        ) {

          Swal.fire({
            icon: 'error',
            title: 'عذراً',
            text: 'عذراً، سنّ الطفل غير مناسب لهذا القسم.',
            confirmButtonText: 'حسناً'
          });

          return;
        }


        // --------------------------------------
        // AUCUNE CLASSE DISPONIBLE
        // --------------------------------------

        if (
          message &&
          message.includes('Aucune classe disponible')
        ) {

          Swal.fire({
            icon: 'warning',
            title: 'تنبيه',
            text: 'لا يوجد قسم مناسب لهذا الجنس حالياً.',
            confirmButtonText: 'حسناً'
          });

          return;
        }


        // --------------------------------------
        // ÉLÈVE DÉJÀ INSCRIT
        // --------------------------------------

        if (
          message &&
          message.includes('déjà inscrit')
        ) {

          Swal.fire({
            icon: 'warning',
            title: 'تنبيه',
            text: 'هذا الطفل مسجل بالفعل في هذه الدورة.',
            confirmButtonText: 'حسناً'
          });

          return;
        }


        // --------------------------------------
        // AUTRE ERREUR
        // --------------------------------------

        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: message || 'حدث خطأ أثناء إرسال طلب التسجيل.',
          confirmButtonText: 'حسناً'
        });

      }



      });

  }

  inscriptionPrepa() {

  }
}