import { Routes } from '@angular/router';
import { Dashboard } from './admin/dashboard/dashboard';
import { HomeComponent } from './public/home/home';
import { Inscription } from './public/inscription/inscription';
import { SuccessInscription } from './public/success-inscription/success-inscription';
import { SuiviInscription } from './public/suivi-inscription/suivi-inscription';
import { SessionList } from './admin/sessions/session-list/session-list';
import { ClasseList } from './admin/classes/classe-list/classe-list';
import { InscriptionList } from './admin/inscriptions/inscription-list/inscription-list';
import { InscriptionDetail } from './admin/inscriptions/inscription-detail/inscription-detail';
import { SessionsPage } from './admin/sessions/sessions-page/sessions-page';
import { ClassesPage } from './admin/classes/classes-page/classes-page';
import { InscriptionPage } from './admin/inscriptions/inscription-page/inscription-page';
import { LoginComponent } from './auth/login/login-component/login-component';
import { authGuard } from './auth/guard/auth-guard/auth-guard';
import { DashboardHome } from './admin/dashboard-home/dashboard-home';
import { ClasseEleves } from './admin/classes/classe-eleves/classe-eleves';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'inscription/:type', component: Inscription },
  { path: 'suivi', component: SuiviInscription },
  { path: 'success', component: SuccessInscription },  
  {
    path: 'admin',
    component: Dashboard,
    children: [


      { path: '', redirectTo: 'sessions', pathMatch: 'full' },

      {path: 'classes/:id/eleves', component: ClasseEleves},
      { path: 'sessions', component: SessionsPage },

      { path: 'classes', component: ClassesPage },

      { path: 'inscriptions', component: InscriptionPage },

      { path: 'inscriptions/:id', component: InscriptionDetail }



    ], canActivate: [authGuard]
  }


];
