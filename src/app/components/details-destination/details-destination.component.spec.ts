import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDestinationComponent } from './details-destination.component';

describe('DetailsDestinationComponent', () => {
  let component: DetailsDestinationComponent;
  let fixture: ComponentFixture<DetailsDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
