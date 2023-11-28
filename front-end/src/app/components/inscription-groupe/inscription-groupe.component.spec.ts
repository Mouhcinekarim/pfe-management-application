import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionGroupeComponent } from './inscription-groupe.component';

describe('InscriptionGroupeComponent', () => {
  let component: InscriptionGroupeComponent;
  let fixture: ComponentFixture<InscriptionGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
