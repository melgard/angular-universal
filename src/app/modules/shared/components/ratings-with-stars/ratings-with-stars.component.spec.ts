import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RatingsWithStarsComponent} from './ratings-with-stars.component';

describe('RatingsWithStarsComponent', () => {
  let component: RatingsWithStarsComponent;
  let fixture: ComponentFixture<RatingsWithStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsWithStarsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsWithStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
