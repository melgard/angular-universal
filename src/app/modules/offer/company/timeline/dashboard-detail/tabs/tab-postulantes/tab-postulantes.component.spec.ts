import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabPostulantesComponent} from './tab-postulantes.component';

describe('TabPostulantesComponent', () => {
  let component: TabPostulantesComponent;
  let fixture: ComponentFixture<TabPostulantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabPostulantesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPostulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
