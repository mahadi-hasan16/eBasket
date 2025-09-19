import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersDialog } from './filters-dialog';

describe('FiltersDialog', () => {
  let component: FiltersDialog;
  let fixture: ComponentFixture<FiltersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
