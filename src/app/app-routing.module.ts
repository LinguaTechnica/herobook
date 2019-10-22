import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';
import { SearchFormComponent } from './search-form/search-form.component';

const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'search', component: SearchFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
