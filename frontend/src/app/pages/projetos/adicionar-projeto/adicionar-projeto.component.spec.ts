import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProjetoComponent } from './adicionar-projeto.component';

describe('AdicionarProjetoComponent', () => {
  let component: AdicionarProjetoComponent;
  let fixture: ComponentFixture<AdicionarProjetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarProjetoComponent]
    });
    fixture = TestBed.createComponent(AdicionarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
