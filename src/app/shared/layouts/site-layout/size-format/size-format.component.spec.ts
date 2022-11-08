import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeFormatComponent } from './size-format.component';

describe('SizeFormatComponent', () => {
  let component: SizeFormatComponent;
  let fixture: ComponentFixture<SizeFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
