import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosFaltaComponent } from './alunos-falta.component';

describe('AlunosFaltaComponent', () => {
  let component: AlunosFaltaComponent;
  let fixture: ComponentFixture<AlunosFaltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunosFaltaComponent]
    });
    fixture = TestBed.createComponent(AlunosFaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
