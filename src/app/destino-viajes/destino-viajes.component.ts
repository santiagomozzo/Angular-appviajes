import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinationTravel } from '../models/destination-travel.models';

@Component({
  selector: 'app-destino-viajes',
  templateUrl: './destino-viajes.component.html',
  styleUrls: ['./destino-viajes.component.css']
})
export class DestinoViajesComponent implements OnInit {
  @Input() destinations : DestinationTravel; 
  @HostBinding("attr.clas") cssClass = "col-md-4";

  constructor() {}

  ngOnInit(): void {
  }

}
