import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewPhaseModalComponent} from './new-phase-modal.component';

describe('NewPhaseModalComponent', () => {
  let component: NewPhaseModalComponent;
  let fixture: ComponentFixture<NewPhaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewPhaseModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPhaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
