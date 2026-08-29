import { Component, OnInit, signal } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {

  loginRequest:LoginRequest = {
    email:'',
    password:''
  }

  errorMessage= signal('')

constructor(private authService:AuthService, private router:Router){

}

  ngOnInit(): void {
    
  }

  login(): void {

    console.log("premier click");
    
    this.authService.login(this.loginRequest).subscribe({

      next: response => {
        console.log("success");
        
        console.log(response);

        
         this.router.navigate(['/admin']);

      },

      error: err => {
        console.log("erreur");
        console.log(err);
        
        this.errorMessage.set("Email ou mot de passe incorrect.");

      }

    });

  }



  
}
