import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferDefinitionComponent} from './offer-definition.component';

describe('OfferDefinitionComponent', () => {
  let component: OfferDefinitionComponent;
  let fixture: ComponentFixture<OfferDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfferDefinitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
