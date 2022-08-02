
import {
    reducerDestinationTravel,
    DestinationTravelState,
    initializeDestinationTravelState,
    InitMyDataAction,
    NewDestinationAction
} from './destination-travel-state.model';

import { DestinationTravel } from './destination-travel.model';

describe('reducerDestinationTravel', () => {
    it('should reduce init data', () => {
        //setup
        const prevState: DestinationTravelState = initializeDestinationTravelState();
        const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
        //action
        const newState: DestinationTravelState = reducerDestinationTravel(prevState, action);
        //assertions
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].name).toEqual('destino 1');
    });

    it('should reduce new item added', () => {
        const prevState: DestinationTravelState = initializeDestinationTravelState();
        const action: NewDestinationAction = new NewDestinationAction(new DestinationTravel('barcelona', 'url'));
        const newState: DestinationTravelState = reducerDestinationTravel(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].name).toEqual('barcelona');
    });  
});