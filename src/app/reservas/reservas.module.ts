import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasListadoComponent } from './reservas-listado/reservas-listado.component';
import { ReservasDetallesComponent } from './reservas-detalles/reservas-detalles.component';
import { ReservasApiClientService } from './reservas-api-client.service';


@NgModule({
  declarations: [
    ReservasListadoComponent,
    ReservasDetallesComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule
  ],
  providers: [
    ReservasApiClientService
  ]

})
export class ReservasModule { }
