import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPicComponent } from './editor-pic.component';

describe('EditorPicComponent', () => {
  let component: EditorPicComponent;
  let fixture: ComponentFixture<EditorPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
