import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmcComponent } from './kmc.component';

describe('KmcComponent', () => {
  let component: KmcComponent;
  let fixture: ComponentFixture<KmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
