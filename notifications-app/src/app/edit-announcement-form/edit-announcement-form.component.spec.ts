import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnouncementFormComponent } from './edit-announcement-form.component';

describe('EditAnnouncementFormComponent', () => {
  let component: EditAnnouncementFormComponent;
  let fixture: ComponentFixture<EditAnnouncementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnnouncementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAnnouncementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
