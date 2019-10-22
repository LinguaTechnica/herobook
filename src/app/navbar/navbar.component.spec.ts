import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroListComponent } from '../hero-list/hero-list.component';
import { AppComponent } from '../app.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ReactiveFormsModule, AppRoutingModule ],
      declarations: [
        NavbarComponent,
        AppComponent,
        SearchFormComponent,
        HeroListComponent,
        HeroDetailComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // FIXME - Issue #3: Known Angular issues: https://github.com/angular/angular/issues/25837
    router.initialNavigation();
  });

  it('should create', () => {
    const instance = new NavbarComponent();
    expect(instance).toBeTruthy('Possible issue: https://github.com/angular/angular/issues/25837');
  });

  it('should have nav brand logo', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('.brand-logo').innerText).toContain('Hero Book', 'Possible issue: https://github.com/angular/angular/issues/25837');
  });

  it('links should route to each component', fakeAsync(() => {
    const routes = ['heroes'];
    routes.map(route => {
      router.navigate([route]);
      tick();
      expect(location.path()).toEqual(`/${route}`, 'Possible issue: https://github.com/angular/angular/issues/25837');
    });
  }));
});
