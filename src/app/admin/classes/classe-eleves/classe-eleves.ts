import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InscriptionService } from '../../../services/inscription.service';
import { InscriptionResponseDto } from '../../../dto/inscription-response.dto';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-classe-eleves',
  imports: [CommonModule, RouterLink],
  templateUrl: './classe-eleves.html',
  styleUrl: './classe-eleves.css',
})
export class ClasseEleves implements OnInit {

  classeId!: number;

  eleves$!: Observable<InscriptionResponseDto[]>;


  constructor(
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService
  ) { }

  ngOnInit(): void {
    this.classeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Classe ID =', this.classeId);

    this.eleves$ = this.inscriptionService.findByClasse(
      this.classeId
    );

  }


}

  /* chargerEleves(): void {

    this.inscriptionService
      .findByClasse(this.classeId)
      .subscribe(data => {
        console.log("data eleves===", data);
        console.log('NOMBRE :', data.length);

        this.eleves$ = data;

        console.log(
          'Élèves de la classe :',
          this.eleves
        );


      }, err => {
        console.log(err);

      });

  } */

