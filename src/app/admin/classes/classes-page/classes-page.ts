import { Component } from '@angular/core';
import { ClasseForm } from "../classe-form/classe-form";
import { ClasseList } from "../classe-list/classe-list";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classes-page',
  imports: [ClasseForm, ClasseList, CommonModule],
  templateUrl: './classes-page.html',
  styleUrl: './classes-page.css',
})
export class ClassesPage {
    showForm = false;

  ouvrirFormulaire() {
    this.showForm = true;
  }

  fermerFormulaire() {
    this.showForm = false;
  }

}


