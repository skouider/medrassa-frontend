import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./public/home/home";
import { Navbar } from "./core/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [ Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projet_coran');
}
