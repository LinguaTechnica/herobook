import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../heroes.service';
import { Hero } from '../hero';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  heroes: Hero[];
  searchForm: FormGroup;
  results: Hero[];

  constructor(private fb: FormBuilder,
              private heroService: HeroesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: ['', Validators.required]
    });
    this.heroService.all().subscribe(heroes => this.heroes = heroes.results );
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {q: "A-bomb"}
      });
  }

  getResults() {
    if (this.searchForm.valid) {
      const query = this.searchForm.controls.query.value;
      this.results = this.find(query);
      // TODO - Issue #1 : Good refactor opportunity below, changes parent and child components.
      // this.router.navigate(['/search'], { queryParams: { q: query } } );
    } else {
      console.log('Invalid form!');
    }
  }

  find(query) {
    return this.heroes.filter(hero => {
      return hero.name === query;
    });
  }


}
