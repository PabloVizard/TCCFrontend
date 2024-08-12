import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBancasComponent } from './cadastro-bancas.component';

describe('CadastroBancasComponent', () => {
  let component: CadastroBancasComponent;
  let fixture: ComponentFixture<CadastroBancasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroBancasComponent]
    });
    fixture = TestBed.createComponent(CadastroBancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
