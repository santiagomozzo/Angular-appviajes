import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { DestinationTravel } from "./destination-travel.model";


//Estado
export interface DestinationTravelState{
    items: DestinationTravel[];
    loading: boolean;
    favorito: DestinationTravel;
}

export const initializeDestinationTravelState = function() {
    return {
        items: [],
        loading: false,
        favorito: null
    }
}

//Acciones
export enum DestinationTravelActionTypes {
    NEW_DESTINATION = '[Destination Travel] New',
    CHOOSE_FAVORITE = '[Destination Travel] Favorite',
    VOTE_UP = '[Destination Travel] Vote Up',
    VOTE_DOWN = '[Destination Travel] Vote Down'
}

export class NewDestinationAction implements Action {
    type = DestinationTravelActionTypes.NEW_DESTINATION;
    constructor(public destination: DestinationTravel) {}
}

export class ChooseFavoriteAction implements Action {
    type = DestinationTravelActionTypes.CHOOSE_FAVORITE;
    constructor(public destination: DestinationTravel) {}
}

export class VoteUpAction implements Action {
    type = DestinationTravelActionTypes.VOTE_UP;
    constructor(public destination: DestinationTravel) {}
}

export class VoteDownAction implements Action {
    type = DestinationTravelActionTypes.VOTE_DOWN;
    constructor(public destination: DestinationTravel) {}
}

export type DestinationTravelActions = NewDestinationAction | ChooseFavoriteAction 
| VoteUpAction | VoteDownAction;

//Reducers
export function reducerDestinationTravel(
    state:DestinationTravelState,
    action:DestinationTravelActions,
 ) : DestinationTravelState {
    switch (action.type) {
        case DestinationTravelActionTypes.NEW_DESTINATION: {
            return {
                ...state,
                items: [...state.items, (action as NewDestinationAction).destination ]
            };
        }
        case DestinationTravelActionTypes.CHOOSE_FAVORITE: {
            state.items.forEach(x => x.setSelected(false));
            let fav:DestinationTravel = (action as NewDestinationAction).destination;
            fav.setSelected(true);
            return {
                ...state,
                favorito: fav
            };
        }
        case DestinationTravelActionTypes.VOTE_UP: {
            const d :DestinationTravel = (action as VoteUpAction).destination;
            d.voteUp();
            return {...state };
        }
        case DestinationTravelActionTypes.VOTE_DOWN: {
            const d :DestinationTravel = (action as VoteDownAction).destination;
            d.voteDown();
            return {...state };
        }
        

    }
    return state;
}

//Effects
@Injectable()
export class DestinationTravelEffects {
    @Effect()
    newAdded$: Observable<Action> = this.actions$.pipe(
        ofType(DestinationTravelActionTypes.NEW_DESTINATION),
        map((action:NewDestinationAction) => new ChooseFavoriteAction(action.destination))
    );

    constructor(private actions$: Actions) {}

}

