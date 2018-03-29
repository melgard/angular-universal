import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostulantProcessComponent} from './postulant-process.component';

describe('PostulantProcessComponent', () => {
  let component: PostulantProcessComponent;
  let fixture: ComponentFixture<PostulantProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostulantProcessComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulantProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
