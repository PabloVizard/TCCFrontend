import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAulasComponent } from './editar-aulas.component';

describe('EditarAulasComponent', () => {
  let component: EditarAulasComponent;
  let fixture: ComponentFixture<EditarAulasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAulasComponent]
    });
    fixture = TestBed.createComponent(EditarAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
