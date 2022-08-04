import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashNavComponent } from './dash-nav.component';

describe('DashNavComponent', () => {
  let component: DashNavComponent;
  let fixture: ComponentFixture<DashNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
