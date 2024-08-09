import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfessoresOrientadoresComponent } from './editar-professores-orientadores.component';

describe('EditarProfessoresOrientadoresComponent', () => {
  let component: EditarProfessoresOrientadoresComponent;
  let fixture: ComponentFixture<EditarProfessoresOrientadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProfessoresOrientadoresComponent]
    });
    fixture = TestBed.createComponent(EditarProfessoresOrientadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
