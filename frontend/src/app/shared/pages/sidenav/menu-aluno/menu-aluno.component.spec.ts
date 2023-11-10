import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAlunoComponent } from './menu-aluno.component';

describe('MenuAlunoComponent', () => {
  let component: MenuAlunoComponent;
  let fixture: ComponentFixture<MenuAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAlunoComponent]
    });
    fixture = TestBed.createComponent(MenuAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
