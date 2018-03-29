import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NombreAnimadoComponent} from './nombre-animado.component';

describe('NombreAnimadoComponent', () => {
  let component: NombreAnimadoComponent;
  let fixture: ComponentFixture<NombreAnimadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NombreAnimadoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreAnimadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
