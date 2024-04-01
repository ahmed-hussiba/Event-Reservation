import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLoginPageComponent } from './second-login-page.component';

describe('SecondLoginPageComponent', () => {
  let component: SecondLoginPageComponent;
  let fixture: ComponentFixture<SecondLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondLoginPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
