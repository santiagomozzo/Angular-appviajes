import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DestinoViajesComponent } from './destino-viajes/destino-viajes.component';
import { DestinationListComponent } from './destination-list/destination-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajesComponent,
    DestinationListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
