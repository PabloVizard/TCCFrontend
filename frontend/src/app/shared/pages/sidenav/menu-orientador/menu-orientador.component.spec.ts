import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOrientadorComponent } from './menu-orientador.component';

describe('MenuOrientadorComponent', () => {
  let component: MenuOrientadorComponent;
  let fixture: ComponentFixture<MenuOrientadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuOrientadorComponent]
    });
    fixture = TestBed.createComponent(MenuOrientadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
