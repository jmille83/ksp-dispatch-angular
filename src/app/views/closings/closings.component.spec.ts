import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingsComponent } from './closings.component';

describe('ClosingsComponent', () => {
  let component: ClosingsComponent;
  let fixture: ComponentFixture<ClosingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
