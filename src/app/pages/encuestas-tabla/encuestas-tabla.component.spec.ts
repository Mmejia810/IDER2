import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasTablaComponent } from './encuestas-tabla.component';

describe('EncuestasTablaComponent', () => {
  let component: EncuestasTablaComponent;
  let fixture: ComponentFixture<EncuestasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncuestasTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
