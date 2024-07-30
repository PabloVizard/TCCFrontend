import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlunosOrientadosComponent } from './editar-alunos-orientados.component';

describe('EditarAlunosOrientadosComponent', () => {
  let component: EditarAlunosOrientadosComponent;
  let fixture: ComponentFixture<EditarAlunosOrientadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAlunosOrientadosComponent]
    });
    fixture = TestBed.createComponent(EditarAlunosOrientadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
