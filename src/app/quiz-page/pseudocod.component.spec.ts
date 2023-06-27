import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudocodComponent } from './pseudocod.component';

describe('PseudocodComponent', () => {
  let component: PseudocodComponent;
  let fixture: ComponentFixture<PseudocodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PseudocodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PseudocodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
