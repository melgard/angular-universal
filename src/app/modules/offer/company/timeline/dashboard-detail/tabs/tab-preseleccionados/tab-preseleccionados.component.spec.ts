import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabPreseleccionadosComponent} from './tab-preseleccionados.component';

describe('TabPreseleccionadosComponent', () => {
  let component: TabPreseleccionadosComponent;
  let fixture: ComponentFixture<TabPreseleccionadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabPreseleccionadosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPreseleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
