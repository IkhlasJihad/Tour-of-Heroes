import { Component, OnInit } from '@angular/core';
import { Hero } from '../app/hero';
import { HeroService } from '../app/hero.service';
import { MessageService } from '../app/message.service';
import { HEROES } from '../app/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  getHeroes(): void {
    // asynchronous approach using subscribe() which passes the emitted 'observable' array to the callback
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }
  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService
      .addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }
  delete(heroToDelete: Hero) {
    this.heroes = this.heroes.filter(h => h !== heroToDelete);
    this.heroService.deleteHero(heroToDelete.id).subscribe();
  }
  ngOnInit() {
    this.getHeroes();
  }
}
