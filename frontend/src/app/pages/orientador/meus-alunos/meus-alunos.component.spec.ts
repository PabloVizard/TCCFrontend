import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusAlunosComponent } from './meus-alunos.component';

describe('MeusAlunosComponent', () => {
  let component: MeusAlunosComponent;
  let fixture: ComponentFixture<MeusAlunosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusAlunosComponent]
    });
    fixture = TestBed.createComponent(MeusAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
