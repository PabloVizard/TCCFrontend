import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTurmasComponent } from './cadastro-turmas.component';

describe('CadastroTurmasComponent', () => {
  let component: CadastroTurmasComponent;
  let fixture: ComponentFixture<CadastroTurmasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroTurmasComponent]
    });
    fixture = TestBed.createComponent(CadastroTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
