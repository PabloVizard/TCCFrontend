import { ComponentFixture, TestBed } from '@angular/core/testing';

import {EditarBancasComponent} from './editar-bancas.component';

describe('EditarBancasComponent', () => {
  let component: EditarBancasComponent;
  let fixture: ComponentFixture<EditarBancasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarBancasComponent]
    });
    fixture = TestBed.createComponent(EditarBancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
