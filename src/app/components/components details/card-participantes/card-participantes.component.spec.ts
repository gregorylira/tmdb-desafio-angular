import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardParticipantesComponent } from './card-participantes.component';

describe('CardParticipantesComponent', () => {
  let component: CardParticipantesComponent;
  let fixture: ComponentFixture<CardParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardParticipantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
