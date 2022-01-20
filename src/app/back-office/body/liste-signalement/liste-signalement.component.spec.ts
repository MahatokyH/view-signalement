import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSignalementComponent } from './liste-signalement.component';

describe('ListeSignalementComponent', () => {
  let component: ListeSignalementComponent;
  let fixture: ComponentFixture<ListeSignalementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSignalementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeSignalementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
