import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersurveyLisComponent } from './usersurvey-lis.component';

describe('UsersurveyLisComponent', () => {
  let component: UsersurveyLisComponent;
  let fixture: ComponentFixture<UsersurveyLisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersurveyLisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersurveyLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
