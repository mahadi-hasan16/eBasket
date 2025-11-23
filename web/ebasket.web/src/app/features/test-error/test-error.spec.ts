import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestError } from './test-error';

describe('TestError', () => {
  let component: TestError;
  let fixture: ComponentFixture<TestError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
