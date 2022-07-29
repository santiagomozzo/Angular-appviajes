import { forwardRef, Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, ConnectableObservable, Subject } from "rxjs";
import { AppConfig, AppState, APP_CONFIG, db } from "../app.module";
import { ChooseFavoriteAction, NewDestinationAction } from "./destination-travel-state.model";
import { DestinationTravel } from "./destination-travel.model";
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";

@Injectable()
export class DestinationApiClient {
  destination: DestinationTravel[] = []; 

  
    constructor(
      private store: Store<AppState>, 
      @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
      private http: HttpClient
    ) {
      this.store
        .select(state => state.destination)
        .subscribe((data) => {
          console.log('destinos sub store');
          console.log(data);
          this.destination = data.items
        });
      this.store
        .subscribe((data) => {
          console.log('all store');
          console.log(data);
        });
    }
  
    add(d: DestinationTravel) {
      const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad'});
      const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.name }, { headers: headers });
      this.http.request(req).subscribe((data: HttpResponse<{}>) => {
        if (data.status === 200) {
          this.store.dispatch(new NewDestinationAction(d));
          const myDb = db;
          myDb.destination.add(d);
          console.log('todos los destinos de la db!');
          myDb.destination.toArray().then(destination => console.log(destination));
        }
      });
      
    }

    getById(id: string): DestinationTravel {
      return this.destination.filter(function(d) { return d.id.toString() === id; })[0];
    }  
    getAll():DestinationTravel[] {
      return this.destination
    }

    select(d: DestinationTravel) {
      this.store.dispatch(new ChooseFavoriteAction(d));
    } 

  
}