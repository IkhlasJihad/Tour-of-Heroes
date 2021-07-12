import { NgModule } from '@angular/core';
import { HeroesComponent } from '../heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'details/:id', component: HeroDetailsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  DashboardComponent,
  HeroesComponent,
  HeroDetailsComponent
];
