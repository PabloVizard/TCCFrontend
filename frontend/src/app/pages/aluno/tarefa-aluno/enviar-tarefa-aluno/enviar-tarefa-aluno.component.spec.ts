import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarTarefaAlunoComponent } from './enviar-tarefa-aluno.component';

describe('EnviarTarefaAlunoComponent', () => {
  let component: EnviarTarefaAlunoComponent;
  let fixture: ComponentFixture<EnviarTarefaAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarTarefaAlunoComponent]
    });
    fixture = TestBed.createComponent(EnviarTarefaAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
