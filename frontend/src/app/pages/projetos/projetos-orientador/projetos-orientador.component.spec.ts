import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosOrientadorComponent } from './projetos-orientador.component';

describe('ProjetosOrientadorComponent', () => {
  let component: ProjetosOrientadorComponent;
  let fixture: ComponentFixture<ProjetosOrientadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetosOrientadorComponent]
    });
    fixture = TestBed.createComponent(ProjetosOrientadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
