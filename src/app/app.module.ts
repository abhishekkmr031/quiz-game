import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxWheelModule } from 'ngx-wheel';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { StartGameComponent } from './start-game/start-game.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ContentComponent, StartGameComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, NgxWheelModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
