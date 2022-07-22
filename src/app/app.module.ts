import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';

import { AppComponent } from './app.component';
import { DestinoViajesComponent } from './destino-viajes/destino-viajes.component';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DetailsDestinationComponent } from './details-destination/details-destination.component';
import { FormsDestinationTravelComponent } from './forms-destination-travel/forms-destination-travel.component';
import { DestinationApiClient } from './models/destination-api-client.model';
import { DestinationTravelState, reducerDestinationTravel, initializeDestinationTravelState, DestinationTravelEffects } from './models/destination-travel-state.model';
import { ActionReducerMap } from '@ngrx/store';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: DestinationListComponent},
  {path: 'destination', component: DetailsDestinationComponent}
];

//redux init
export interface AppState {
  destination: DestinationTravelState;
}

const reducers: ActionReducerMap<AppState> = {
  destination: reducerDestinationTravel
};

let reducersInitialState = {
  destination: initializeDestinationTravelState()
}
//reduc fin init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajesComponent,
    DestinationListComponent,
    DetailsDestinationComponent,
    FormsDestinationTravelComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinationTravelEffects])
  ],
  providers: [
    DestinationApiClient 
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
