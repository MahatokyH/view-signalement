import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRegionComponent } from './liste-region.component';

describe('ListeRegionComponent', () => {
  let component: ListeRegionComponent;
  let fixture: ComponentFixture<ListeRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
