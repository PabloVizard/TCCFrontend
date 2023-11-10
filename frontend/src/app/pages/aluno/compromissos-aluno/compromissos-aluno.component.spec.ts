import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissosAlunoComponent } from './compromissos-aluno.component';

describe('CompromissosAlunoComponent', () => {
  let component: CompromissosAlunoComponent;
  let fixture: ComponentFixture<CompromissosAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompromissosAlunoComponent]
    });
    fixture = TestBed.createComponent(CompromissosAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
