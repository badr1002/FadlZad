import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiserComponent } from './regiser.component';

describe('RegiserComponent', () => {
  let component: RegiserComponent;
  let fixture: ComponentFixture<RegiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
