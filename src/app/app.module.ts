import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { GameService } from './shared/service/game.service';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';

import { environment } from '../environments/environment';
import { GameEffect } from './shared/store/game.effects';
import { GameReducer } from './shared/store/game.reducers';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, CardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({ gameState: GameReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([GameEffect]),
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
