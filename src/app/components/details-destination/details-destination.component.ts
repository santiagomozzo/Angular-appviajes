import { Component, OnInit } from '@angular/core';
import { DestinationApiClient } from '../../models/destination-api-client.model';
import { DestinationTravel } from '../../models/destination-travel.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-destination',
  templateUrl: './details-destination.component.html',
  styleUrls: ['./details-destination.component.css'],
  providers: [DestinationApiClient]

})
export class DetailsDestinationComponent implements OnInit {
  destination: DestinationTravel;

  constructor(private route: ActivatedRoute, private destinationApiClient: DestinationApiClient) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.destinationApiClient.getById(id);
  }

}
