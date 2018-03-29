import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabAdquiridosComponent} from './tab-adquiridos.component';

describe('TabAdquiridosComponent', () => {
  let component: TabAdquiridosComponent;
  let fixture: ComponentFixture<TabAdquiridosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabAdquiridosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdquiridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
