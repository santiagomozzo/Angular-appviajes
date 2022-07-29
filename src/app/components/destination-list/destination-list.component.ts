import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.module';
import { ChooseFavoriteAction, NewDestinationAction } from '../../models/destination-travel-state.model';
import { DestinationTravel } from '../../models/destination-travel.model';
import { DestinationApiClient } from './../../models/destination-api-client.model';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css'],
  providers: [DestinationApiClient]
})
export class DestinationListComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinationTravel>
  updates: string[];
  all;

  constructor(private destinationApiClient: DestinationApiClient, private store: Store<AppState>) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destination.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('has been chosen to ' + d.name);
        }
      });
    this.all = store.select(state => state.destination.items).subscribe(items => this.all = items);  
  }

  ngOnInit(): void {
  }

  add(d: DestinationTravel) {
    this.destinationApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  selected(e: DestinationTravel) {
    this.destinationApiClient.select(e);
  }

  getAll() {


  }

}
