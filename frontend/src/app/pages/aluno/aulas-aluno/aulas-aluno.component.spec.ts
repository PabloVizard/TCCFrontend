import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AulasAlunoComponent } from './aulas-aluno.component';


describe('AulasAlunoComponent', () => {
  let component: AulasAlunoComponent;
  let fixture: ComponentFixture<AulasAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AulasAlunoComponent]
    });
    fixture = TestBed.createComponent(AulasAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
