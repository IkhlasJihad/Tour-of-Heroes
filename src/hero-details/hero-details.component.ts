import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../app/hero';
import { HeroService } from '../app/hero.service';
@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
      console.log(hero);
    });
  }
  goBack(): void {
    this.location.back();
  }
  save() {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
  ngOnInit() {}
}
