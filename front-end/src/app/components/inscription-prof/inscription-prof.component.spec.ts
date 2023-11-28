import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionProfComponent } from './inscription-prof.component';

describe('InscriptionProfComponent', () => {
  let component: InscriptionProfComponent;
  let fixture: ComponentFixture<InscriptionProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
