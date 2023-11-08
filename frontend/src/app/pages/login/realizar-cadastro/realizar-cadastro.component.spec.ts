import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarCadastroComponent } from './realizar-cadastro.component';

describe('RealizarCadastroComponent', () => {
  let component: RealizarCadastroComponent;
  let fixture: ComponentFixture<RealizarCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealizarCadastroComponent]
    });
    fixture = TestBed.createComponent(RealizarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
