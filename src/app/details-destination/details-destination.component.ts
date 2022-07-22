import { Component, OnInit } from '@angular/core';
import { DestinationApiClient } from '../models/destination-api-client.model';
import { DestinationTravel } from '../models/destination-travel.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-destination',
  templateUrl: './details-destination.component.html',
  styleUrls: ['./details-destination.component.css']
})
export class DetailsDestinationComponent implements OnInit {
  destination: DestinationTravel;

  constructor(private route: ActivatedRoute, private destinationApiClient: DestinationApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this. destination = null;
    //this.destinationApiClient.getById(id);
  }

}
