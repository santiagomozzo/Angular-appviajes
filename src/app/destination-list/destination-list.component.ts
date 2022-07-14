import { Component, OnInit } from '@angular/core';
import { DestinationTravel } from '../models/destination-travel.models';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {
  destination: DestinationTravel[];
  constructor() { 
    this.destination = [];
  }

  ngOnInit(): void {
  }

  save(name: string, url: string):boolean {
    this.destination.push(new DestinationTravel(name, url));
    return false;

  }

}
