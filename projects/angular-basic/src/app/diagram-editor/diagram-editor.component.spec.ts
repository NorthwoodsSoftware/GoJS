import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramEditorComponent } from './diagram-editor.component';

describe('DiagramEditorComponent', () => {
  let component: DiagramEditorComponent;
  let fixture: ComponentFixture<DiagramEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
