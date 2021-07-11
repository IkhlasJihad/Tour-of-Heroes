import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../app/hero';
import { HeroService } from '../app/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private herosService: HeroService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait sometime before reading the input box
      debounceTime(300),
      // wait for a  completely new term
      distinctUntilChanged(),

      // when the term changes, switch to new search observable
      switchMap((term: string) => this.herosService.searchHeroes(term))
    );
  }
}
