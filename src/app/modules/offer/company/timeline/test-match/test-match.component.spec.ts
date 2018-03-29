import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestMatchComponent} from './test-match.component';

describe('TestMatchComponent', () => {
  let component: TestMatchComponent;
  let fixture: ComponentFixture<TestMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestMatchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
