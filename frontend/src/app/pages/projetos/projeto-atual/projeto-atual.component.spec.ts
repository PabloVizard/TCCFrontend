import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoAtualComponent } from './projeto-atual.component';

describe('ProjetoAtualComponent', () => {
  let component: ProjetoAtualComponent;
  let fixture: ComponentFixture<ProjetoAtualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetoAtualComponent]
    });
    fixture = TestBed.createComponent(ProjetoAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
