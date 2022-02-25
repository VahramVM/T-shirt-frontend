import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDesignComponent } from './side-design.component';

describe('SideDesignComponent', () => {
  let component: SideDesignComponent;
  let fixture: ComponentFixture<SideDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
