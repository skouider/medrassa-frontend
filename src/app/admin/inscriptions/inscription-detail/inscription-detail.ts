import { Component, OnInit, Output } from '@angular/core';
import { InscriptionService } from '../../../services/inscription.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { InscriptionResponseDto } from '../../../dto/inscription-response.dto';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-inscription-detail',
  imports: [CommonModule],
  templateUrl: './inscription-detail.html',
  styleUrl: './inscription-detail.css',
})
export class InscriptionDetail implements OnInit {

  @Output()
  close = new EventEmitter<void>();

  constructor(private inscriptionService: InscriptionService) {

  }



  ngOnInit(): void {

  }



  get inscription() {

    return this.inscriptionService.selectedInscription;



  }

  valider() {

    this.inscriptionService
      .valider(this.inscription.id!)
      .subscribe(data => {

        this.inscriptionService.selectedInscription = data;

        this.inscriptionService.notifyRefresh();

      });

  }

  refuser() {

  Swal.fire({

    title: 'تأكيد رفض التسجيل؟',

    text: 'سيتم رفض هذا التسجيل.',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonText: 'نعم، رفض التسجيل',

    cancelButtonText: 'إلغاء',

    confirmButtonColor: '#f0ad4e',

    cancelButtonColor: '#6c757d'

  }).then(result => {

    if (!result.isConfirmed) {
      return;
    }

    this.inscriptionService
      .refuser(this.inscription.id!)
      .subscribe(() => {

        Swal.fire(
          'تم بنجاح',
          'تم رفض التسجيل بنجاح.',
          'success'
        );

        this.inscriptionService.notifyRefresh();

      });

  });

}
     

 annuler() {

  Swal.fire({

    title: 'تأكيد إلغاء التسجيل؟',

    text: 'سيتم إلغاء هذا التسجيل.',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonText: 'نعم، إلغاء التسجيل',

    cancelButtonText: 'إلغاء',

    confirmButtonColor: '#f0ad4e',

    cancelButtonColor: '#6c757d'

  }).then(result => {

    if (!result.isConfirmed) {
      return;
    }

    this.inscriptionService
      .annuler(this.inscription.id!)
      .subscribe(() => {

        Swal.fire(
          'تم بنجاح',
          'تم إلغاء التسجيل بنجاح.',
          'success'
        );

        this.inscriptionService.notifyRefresh();

      });

  });

}

 supprimer() {

  Swal.fire({

    title: 'تأكيد الحذف',

    text: 'هل تريد حقًا حذف هذا التسجيل؟',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonText: 'نعم، احذف',

    cancelButtonText: 'إلغاء',

    confirmButtonColor: '#198754',

    cancelButtonColor: '#dc3545'

  }).then(result => {

    if (!result.isConfirmed) {
      return;
    }

    this.inscriptionService
      .delete(this.inscription.id!)
      .subscribe(() => {

        Swal.fire(
          'تم الحذف',
          'تم حذف التسجيل بنجاح.',
          'success'
        );

        this.inscriptionService.notifyRefresh();

        this.close.emit();

      });

  });

}


}
