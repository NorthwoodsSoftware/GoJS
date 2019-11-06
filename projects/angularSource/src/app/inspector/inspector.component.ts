import { Component, Input, OnInit } from '@angular/core';
import * as go from 'src/srcTS/go-unminified';


@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent {

  public _selectedNode: go.Node;
  public data = {
    name: null,
    parent: null
  };

  @Input()
  public model: go.Model;

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node) {


    if (node && node != null) {
      this._selectedNode = node;
      this.data.name = this._selectedNode.data.name;
      this.data.parent = this._selectedNode.data.parent;
    } else {
      this._selectedNode = null;
    }
  }

  constructor() { }

  public onCommitForm() {
    this.model.startTransaction();
    this.model.set(this.selectedNode.data, 'name', this.data.name);
    this.model.set(this.selectedNode.data, 'parent', this.data.parent);
    this.model.commitTransaction();
  }

}
