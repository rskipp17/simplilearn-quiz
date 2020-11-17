import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { TestingPageComponent } from './testing-page/testing-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent},
  { path: 'questions', component: TestingPageComponent },
  { path: 'results', component: ResultPageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
