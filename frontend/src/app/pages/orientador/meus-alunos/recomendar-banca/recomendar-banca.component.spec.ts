import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendarBancaComponent } from './recomendar-banca.component';

describe('RecomendarBancaComponent', () => {
  let component: RecomendarBancaComponent;
  let fixture: ComponentFixture<RecomendarBancaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendarBancaComponent]
    });
    fixture = TestBed.createComponent(RecomendarBancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
