import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarTaoDialogComponent } from './enviar-tao-dialog.component';

describe('EnviarTaoDialogComponent', () => {
  let component: EnviarTaoDialogComponent;
  let fixture: ComponentFixture<EnviarTaoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarTaoDialogComponent]
    });
    fixture = TestBed.createComponent(EnviarTaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
