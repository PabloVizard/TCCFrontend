import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarDocumentoComponent } from './gerar-documento.component';

describe('GerarDocumentoComponent', () => {
  let component: GerarDocumentoComponent;
  let fixture: ComponentFixture<GerarDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerarDocumentoComponent]
    });
    fixture = TestBed.createComponent(GerarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
