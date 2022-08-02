import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http' 
import Dexie from 'dexie'; 
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DestinoViajesComponent } from './components/destino-viajes/destino-viajes.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DetailsDestinationComponent } from './components/details-destination/details-destination.component';
import { FormsDestinationTravelComponent } from './components/forms-destination-travel/forms-destination-travel.component';
import { DestinationTravelState, reducerDestinationTravel, initializeDestinationTravelState, DestinationTravelEffects, InitMyDataAction } from './models/destination-travel-state.model';
import { ActionReducerMap } from '@ngrx/store';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { DestinationTravel } from './models/destination-travel.model';
import { EspiameDirective } from './espiame.directive';
import { TrackearClickDirective } from './trackear-click.directive';

//app config
export interface AppConfig {
  apiEndpoint: string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
//fin de app config

//init routing
export const childrenRouteVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: VuelosMainComponentComponent},
  { path: 'mas-info', component: VuelosMasInfoComponentComponent},
  { path: ':id', component: VuelosDetalleComponentComponent},
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: DestinationListComponent},
  { path: 'destination/:id', component: DetailsDestinationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'protected', component: ProtectedComponent, canActivate: [ UsuarioLogueadoGuard]},
  { path: 'vuelos', component: VuelosComponentComponent, canActivate: [ UsuarioLogueadoGuard], children: childrenRouteVuelos}
];
//fin routing

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

//app init
export function init_app(appLoadService: AppLoadService): ()  => Promise<any> {
  return () => appLoadService.initializeDestinationTravelState();
}
 @Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}
  async initializeDestinationTravelState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}
//fin app init

//dexie db
@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destination: Dexie.Table<DestinationTravel, number>;
  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      destination: '++id, name, url',
    });
  }
}

export const db = new MyDatabase();
// fin dexie db

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajesComponent,
    DestinationListComponent,
    DetailsDestinationComponent,
    FormsDestinationTravelComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    EspiameDirective,
    TrackearClickDirective
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinationTravelEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    HttpClientModule,
    NgxMapboxGLModule,
    BrowserAnimationsModule 
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true},
    MyDatabase
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
