import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProfessoresOrientadoresComponent } from './cadastro-professores-orientadores.component';

describe('CadastroProfessoresOrientadoresComponent', () => {
  let component: CadastroProfessoresOrientadoresComponent;
  let fixture: ComponentFixture<CadastroProfessoresOrientadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroProfessoresOrientadoresComponent]
    });
    fixture = TestBed.createComponent(CadastroProfessoresOrientadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
