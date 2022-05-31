import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPfeComponent } from './list-pfe.component';

describe('ListPfeComponent', () => {
  let component: ListPfeComponent;
  let fixture: ComponentFixture<ListPfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
