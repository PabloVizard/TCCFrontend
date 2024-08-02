import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancasOrientadorComponent } from './bancas-orientador.component';

describe('BancasOrientadorComponent', () => {
  let component: BancasOrientadorComponent;
  let fixture: ComponentFixture<BancasOrientadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BancasOrientadorComponent]
    });
    fixture = TestBed.createComponent(BancasOrientadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
