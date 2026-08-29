import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common'; // 1. Import the directive



export class Home {
 
   selection = {
    program: '',   // 'quran' ou 'prep'
    ageGroup: '',  // 'adult' ou 'child'
    gender: ''
  };

  /**
   * Cette méthode change l'étape et enregistre le choix
   * @param nextStep Le numéro de l'étape suivante
   * @param key La clé à modifier (program ou ageGroup)
   * @param value La valeur du choix
   */
  goToStep(nextStep: number, key: string, value: string) {
    // 1. On enregistre le choix dans notre objet selection
    if (key === 'program') {
      this.selection.program = value;
    } else if (key === 'ageGroup') {
      this.selection.ageGroup = value;
    }

    // 2. On change l'étape pour que le *ngIf dans le HTML s'active
    this.step = nextStep;
    
    // Pour déboguer, vous pouvez voir le changement dans la console (F12)
    console.log('Étape actuelle:', this.step);
    console.log('Sélection actuelle:', this.selection);
  }

  // Optionnel : Méthode pour revenir en arrière
  goBack(previousStep: number) {
    this.step = previousStep;
  }

step: number = 1;

}
