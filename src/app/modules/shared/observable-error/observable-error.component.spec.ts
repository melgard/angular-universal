import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObservableErrorComponent} from './observable-error.component';

describe('ObservableErrorComponent', () => {
  let component: ObservableErrorComponent;
  let fixture: ComponentFixture<ObservableErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObservableErrorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
