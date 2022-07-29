import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasListadoComponent } from './reservas-listado/reservas-listado.component';
import { ReservasDetallesComponent } from './reservas-detalles/reservas-detalles.component';

const routes: Routes = [
  { path: 'reservas', component: ReservasListadoComponent},
  { path: 'reservas/:id', component: ReservasDetallesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReservasRoutingModule { }
