import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { VoteDownAction, VoteUpAction } from '../models/destination-travel-state.model';
import { DestinationTravel } from '../models/destination-travel.model';

@Component({
  selector: 'app-destino-viajes',
  templateUrl: './destino-viajes.component.html',
  styleUrls: ['./destino-viajes.component.css']
})
export class DestinoViajesComponent implements OnInit {
  @Input() destinations : DestinationTravel; 
  @Input() position : number;
  @HostBinding("attr.clas") cssClass = "col-md-4";
  @Output() clicked: EventEmitter<DestinationTravel>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  go() {
    this.clicked.emit(this.destinations);
    return false;

  }
  
  voteUp () {
    this.store.dispatch(new VoteUpAction(this.destinations));
    return false;
  }

  voteDown () {
    this.store.dispatch(new VoteDownAction(this.destinations));
    return false;
  }

}
