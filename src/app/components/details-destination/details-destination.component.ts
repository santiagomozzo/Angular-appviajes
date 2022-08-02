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
  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubsercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A',
      }
    }] 
  };

  constructor(private route: ActivatedRoute, private destinationApiClient: DestinationApiClient) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.destinationApiClient.getById(id);
  }

}
