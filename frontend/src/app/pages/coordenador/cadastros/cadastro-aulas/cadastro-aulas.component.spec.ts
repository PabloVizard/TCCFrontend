import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAulasComponent } from './cadastro-aulas.component';

describe('CadastroAulasComponent', () => {
  let component: CadastroAulasComponent;
  let fixture: ComponentFixture<CadastroAulasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroAulasComponent]
    });
    fixture = TestBed.createComponent(CadastroAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
