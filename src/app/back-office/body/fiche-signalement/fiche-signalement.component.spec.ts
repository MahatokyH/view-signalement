import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSignalementComponent } from './fiche-signalement.component';

describe('FicheSignalementComponent', () => {
  let component: FicheSignalementComponent;
  let fixture: ComponentFixture<FicheSignalementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheSignalementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSignalementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
