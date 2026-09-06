import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common'; // 1. Import the directive
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { TypeClasse } from '../../models/type-classe.enum';
import { SessionService } from '../../services/session.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class HomeComponent implements OnInit {

  typesOuverts: TypeClasse[] = [];
  // Déclarez ces propriétés dans votre classe de composant
  showModal = false;
  messageModal = '';

  constructor(private router: Router, private sessionService: SessionService) { }


  ngOnInit(): void {

    /* this.sessionService
      .getConfigurationsSessionActive()
      .subscribe({

        next: data => {
          console.log("le type de classe ==== ", data);

          this.typesOuverts = data;
        }

      });

  } */
 this.sessionService
  .getConfigurationsSessionActive()
  .subscribe({

    next: data => {
      console.log("TYPES OUVERTS =", data);
      this.typesOuverts = data;
    },

    error: err => {
      console.error("ERREUR SESSION ACTIVE =", err);
      console.error("STATUS =", err.status);
      console.error("BODY =", err.error);
    }

  });
  }

  selectPath(path: string) {

    if (path === 'coran') {

      if (this.typesOuverts.includes(TypeClasse.CORAN)) {
        console.log("le path coran==", path);

        this.router.navigate(['/inscription/coran'],
          {
            queryParams: {
              type: 'CORAN'
            }
          });

      }
      else {

        /* alert("التسجيل في المدرسة القرآنية غير مفتوح حالياً"); */

        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'التسجيل في المدرسة القرآنية غير مفتوح حالياً',
          confirmButtonText: 'حسناً'
        });


      }

    }

    if (path === 'prep') {

      if (this.typesOuverts.includes(TypeClasse.PREPARATOIRE)) {

        this.router.navigate(['/inscription/prep'],
          {
            queryParams: {
              type: 'PREPARATOIRE'
            }
          });

      }
      else {

        /* alert("التسجيل في الأقسام التحضيرية غير مفتوح حالياً"); */
        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'التسجيل في الأقسام التحضيرية غير مفتوح حالياً',
          confirmButtonText: 'حسناً'
        });



      }

    }

  }






}




