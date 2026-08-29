import { Component } from '@angular/core';
import { InscriptionList } from "../inscription-list/inscription-list";

import { InscriptionFormAdmin } from '../inscription-form-admin/inscription-form-admin';

@Component({
  selector: 'app-inscription-page',
  imports: [InscriptionList, InscriptionFormAdmin],
  templateUrl: './inscription-page.html',
  styleUrl: './inscription-page.css',
})
export class InscriptionPage {}
