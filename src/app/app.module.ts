import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { MessageComponent } from '../message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CommonModule } from '@angular/common';
import { InMemoryDataService } from './in-memory-data.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailsComponent,
    DashboardComponent,
    MessageComponent
  ],
  bootstrap: [AppComponent],
  providers: [HeroService, MessageService, InMemoryDataService]
})
export class AppModule {}
