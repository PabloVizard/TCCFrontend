import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemInformacoesComponent } from './sem-informacoes.component';

describe('SemInformacoesComponent', () => {
  let component: SemInformacoesComponent;
  let fixture: ComponentFixture<SemInformacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemInformacoesComponent]
    });
    fixture = TestBed.createComponent(SemInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
