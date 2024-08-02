import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefasProfessorComponent } from './tarefas-professor.component';

describe('TarefasProfessorComponent', () => {
  let component: TarefasProfessorComponent;
  let fixture: ComponentFixture<TarefasProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarefasProfessorComponent]
    });
    fixture = TestBed.createComponent(TarefasProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
