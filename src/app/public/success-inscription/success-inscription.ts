import { Component, OnInit } from '@angular/core';
import { InscriptionResponseDto } from '../../dto/inscription-response.dto';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-success-inscription',
  imports: [CommonModule],
  templateUrl: './success-inscription.html',
  styleUrl: './success-inscription.css',
})
export class SuccessInscription implements OnInit {

  inscription: InscriptionResponseDto = new InscriptionResponseDto();

  constructor(private router: Router) {}

  ngOnInit(): void {

    
   this.inscription = history.state.inscription

  }

}