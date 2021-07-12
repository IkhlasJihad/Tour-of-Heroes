import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  // GET heroes from the remote server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('heroes fetched')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  // GET hero by id
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`hero with id= ${id} fetched.`)),
      this.handleError(`getHero id=${id}`)
    );
  }
  // GET: search for a given terms
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x =>
        x.length
          ? this.log(`heroes matching "${term}" found`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  // PUT: update hero on the server
  updateHero(hero: Hero) {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`hero '${hero}' updated.`)),
      this.handleError<any>(`updateHero`)
    );
  }

  // POST: add new hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  // DELETE: delete a hero with a given id
  deleteHero(id: number) {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`hero with id='${id}' deleted.`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  }
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(error.message);

      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // keep the app running.
      return of(result as T);
    };
  }
}
