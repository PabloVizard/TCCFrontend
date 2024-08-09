import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancaDefesaComponent } from './banca-defesa.component';

describe('BancaDefesaComponent', () => {
  let component: BancaDefesaComponent;
  let fixture: ComponentFixture<BancaDefesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BancaDefesaComponent]
    });
    fixture = TestBed.createComponent(BancaDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
