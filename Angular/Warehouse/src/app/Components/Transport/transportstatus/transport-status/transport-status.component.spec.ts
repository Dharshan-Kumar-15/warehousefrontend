import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportStatusComponent } from './transport-status.component';

describe('TransportStatusComponent', () => {
  let component: TransportStatusComponent;
  let fixture: ComponentFixture<TransportStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
