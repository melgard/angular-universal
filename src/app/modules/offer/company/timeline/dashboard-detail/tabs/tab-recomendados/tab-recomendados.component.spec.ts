import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabRecomendadosComponent} from './tab-recomendados.component';

describe('TabRecomendadosComponent', () => {
  let component: TabRecomendadosComponent;
  let fixture: ComponentFixture<TabRecomendadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabRecomendadosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
