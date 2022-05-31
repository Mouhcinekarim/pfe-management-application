import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichePfeComponent } from './affiche-pfe.component';

describe('AffichePfeComponent', () => {
  let component: AffichePfeComponent;
  let fixture: ComponentFixture<AffichePfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichePfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichePfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
