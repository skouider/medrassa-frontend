import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InscriptionDto } from '../../dto/inscription-request.dto';
import { NgModel } from '@angular/forms'
import { InscriptionService } from '../../services/inscription.service';
import { InscriptionResponseDto } from '../../dto/inscription-response.dto';
import { TypeClasse } from '../../models/type-classe.enum';
import { StatutInscription } from '../../models/statut-inscription.enum';

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

/*   setAgeGroup(group: string) {
    this.isChild = (group === 'child');
    this.step = 2;

    // Si c'est Prepa + Enfant, on rend certains champs obligatoires
    if (this.type === 'prepa' && this.isChild) {
      this.inscriptionForm.get('niveauScolaire')?.setValidators([Validators.required]);
    }
  } */

    setAgeGroup(group: 'child' | 'adult') {

  this.isChild = group === 'child';

  console.log('===== GROUPE SELECTIONNE =====');
  console.log('Groupe :', group);
  console.log('Enfant :', this.isChild);

  this.step = 2;
}


  findAll() {
    return this.inscriptionService.findAll()
  }


  submit() {
    

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
          console.error('ERREUR :', err);

          alert(err.error.message);

        }

      });

  }

  inscriptionPrepa() {

  }
}