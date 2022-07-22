import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { AppState } from "../app.module";
import { ChooseFavoriteAction, NewDestinationAction } from "./destination-travel-state.model";
import { DestinationTravel } from "./destination-travel.model";

@Injectable()
export class DestinationApiClient {

  
    constructor(private store: Store<AppState>) {

    }
  
    add(d: DestinationTravel) {
      this.store.dispatch(new NewDestinationAction(d));
    }

    select(d: DestinationTravel) {
      this.store.dispatch(new ChooseFavoriteAction(d));
    } 
  
  }