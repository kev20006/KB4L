import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenModalButtonComponent } from './open-modal-button.component';

describe('OpenModalButtonComponent', () => {
  let component: OpenModalButtonComponent;
  let fixture: ComponentFixture<OpenModalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenModalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenModalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
