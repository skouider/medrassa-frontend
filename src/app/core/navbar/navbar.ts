import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from '../../auth/services/token-service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    public tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  logout(): void {

    Swal.fire({
      title: 'تسجيل الخروج',
      text: 'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، تسجيل الخروج',
      cancelButtonText: 'إلغاء',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.authService.logout();

        this.router.navigate(['/login']);

      }

    });

  }

  isAdminPage(): boolean {
    return this.router.url.startsWith('/admin');
  }


}

