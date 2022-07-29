import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDestinationTravelComponent } from './forms-destination-travel.component';

describe('FormsDestinationTravelComponent', () => {
  let component: FormsDestinationTravelComponent;
  let fixture: ComponentFixture<FormsDestinationTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsDestinationTravelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsDestinationTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
