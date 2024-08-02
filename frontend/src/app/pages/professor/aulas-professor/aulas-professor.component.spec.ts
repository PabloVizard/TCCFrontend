import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasProfessorComponent } from './aulas-professor.component';

describe('AulasProfessorComponent', () => {
  let component: AulasProfessorComponent;
  let fixture: ComponentFixture<AulasProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AulasProfessorComponent]
    });
    fixture = TestBed.createComponent(AulasProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
