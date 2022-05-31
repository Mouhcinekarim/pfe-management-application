import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotreGroupeComponent } from './notre-groupe.component';

describe('NotreGroupeComponent', () => {
  let component: NotreGroupeComponent;
  let fixture: ComponentFixture<NotreGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotreGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotreGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
