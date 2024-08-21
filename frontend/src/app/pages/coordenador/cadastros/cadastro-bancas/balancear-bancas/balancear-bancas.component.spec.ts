import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancearBancasComponent } from './balancear-bancas.component';

describe('BalancearBancasComponent', () => {
  let component: BalancearBancasComponent;
  let fixture: ComponentFixture<BalancearBancasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalancearBancasComponent]
    });
    fixture = TestBed.createComponent(BalancearBancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
