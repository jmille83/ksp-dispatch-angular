import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordEditTimeDialogComponent } from './record-edit-time-dialog.component';

describe('RecordEditTimeDialogComponent', () => {
  let component: RecordEditTimeDialogComponent;
  let fixture: ComponentFixture<RecordEditTimeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordEditTimeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordEditTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
