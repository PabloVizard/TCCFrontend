import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosTarefaComponent } from './alunos-tarefa.component';

describe('AlunosTarefaComponent', () => {
  let component: AlunosTarefaComponent;
  let fixture: ComponentFixture<AlunosTarefaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunosTarefaComponent]
    });
    fixture = TestBed.createComponent(AlunosTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
