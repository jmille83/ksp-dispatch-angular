import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDetailDialogComponent } from './record-detail-dialog.component';

describe('RecordDetailDialogComponent', () => {
  let component: RecordDetailDialogComponent;
  let fixture: ComponentFixture<RecordDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
