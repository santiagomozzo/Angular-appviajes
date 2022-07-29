import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDetallesComponent } from './reservas-detalles.component';

describe('ReservasDetallesComponent', () => {
  let component: ReservasDetallesComponent;
  let fixture: ComponentFixture<ReservasDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
