import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTestComponent } from './login-test.component';

describe('LoginTestComponent', () => {
  let component: LoginTestComponent;
  let fixture: ComponentFixture<LoginTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
