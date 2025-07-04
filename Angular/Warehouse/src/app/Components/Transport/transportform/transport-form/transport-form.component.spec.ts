import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportFormComponent } from './transport-form.component';

describe('TransportFormComponent', () => {
  let component: TransportFormComponent;
  let fixture: ComponentFixture<TransportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
