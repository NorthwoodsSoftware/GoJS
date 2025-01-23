import go from 'gojs';
import { type Floorplan } from '../Floorplan';

export const TemplateColors: { [index: string]: string } = {
  wall1: '#adb7b3',
  wall1stroke: '#8a9490',
  wall2: '#e3d9cf',
  room: '#f4f2ee',
  roomSelected: '#c6bba7',
  furn1: '#ebe0d2',
  furn2: '#dbc0ac',
  furn3: '#c69c6c',
  furn4: '#a76b52',
  furn5: '#c69d32'
};

export const TemplateGeometries = {
  sofaMedium:
    'F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35',
  armChair:
    'F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30',
  diningTable:
    'F1 M 0 0 L 0 100 200 100 200 0 0 0 M 25 0 L 25 -10 75 -10 75 0 M 125 0 L 125 -10 175 -10 175 0 M 200 25 L 210 25 210 75 200 75 M 125 100 L 125 110 L 175 110 L 175 100 M 25 100 L 25 110 75 110 75 100 M 0 75 -10 75 -10 25 0 25',
  stove:
    'F1 M 0 0 L 0 100 100 100 100 0 0 0M 30 15 A 15 15 180 1 0 30.01 15M 30 20 A 10 10 180 1 0 30.01 20M 30 25 A 5 5 180 1 0 30.01 25M 70 15 A 15 15 180 1 0 70.01 15M 70 20 A 10 10 180 1 0 70.01 20M 70 25 A 5 5 180 1 0 70.01 25M 30 55 A 15 15 180 1 0 30.01 55M 30 60 A 10 10 180 1 0 30.01 60M 30 65 A 5 5 180 1 0 30.01 65M 70 55 A 15 15 180 1 0 70.01 55M 70 60 A 10 10 180 1 0 70.01 60M 70 65 A 5 5 180 1 0 70.01 65',
  toilet:
    'F1 M0 0 L25 0 25 10 0 10 0 0 M20 10 L20 15 5 15 5 10 20 10 M5 15 Q0 15 0 25 Q0 40 12.5 40 Q25 40 25 25 Q25 15 20 15',
  shower:
    'F1 M0 0 L40 0 40 60 0 60 0 0 M35 15 L35 55 5 55 5 15 Q5 5 20 5 Q35 5 35 15 M22.5 20 A2.5 2.5 180 1 1 22.5 19.99',
  doubleSink:
    'F1 M0 0 L75 0 75 40 0 40 0 0 M5 7.5 L35 7.5 35 35 5 35 5 7.5 M44 7.5 L70 7.5 70 35 40 35 40 9M15 21.25 A5 5 180 1 0 15 21.24 M50 21.25 A 5 5 180 1 0 50 21.24 M40.5 3.75 A3 3 180 1 1 40.5 3.74M40.5 3.75 L50.5 13.75 47.5 16.5 37.5 6.75 M32.5 3.75 A 1 1 180 1 1 32.5 3.74 M 27.5 4.25 L 27.5 3.25 30.5 3.25M 30.5 4.25 L 27.5 4.25 M44.5 3.75 A 1 1 180 1 1 44.5 3.74 M 44.35 3.25 L 47.5 3.25 47.5 4.25 M 44.35 4.25 L 47.5 4.25',
  sink: 'F1 M0 0 L40 0 40 40 0 40 0 0z M5 7.5 L18.5 7.5 M 21.5 7.5 L35 7.5 35 35 5 35 5 7.5 M 15 21.25 A 5 5 180 1 0 15 21.24M23 3.75 A 3 3 180 1 1 23 3.74 M21.5 6.25 L 21.5 12.5 18.5 12.5 18.5 6.25 M15 3.75 A 1 1 180 1 1 15 3.74M 10 4.25 L 10 3.25 13 3.25 M 13 4.25 L 10 4.25 M27 3.75 A 1 1 180 1 1 27 3.74 M 26.85 3.25 L 30 3.25 30 4.25 M 26.85 4.25 L 30 4.25',
  staircase:
    'F1 M0 0 L 0 100 250 100 250 0 0 0 M25 100 L 25 0 M 50 100 L 50 0 M 75 100 L 75 0M 100 100 L 100 0 M 125 100 L 125 0 M 150 100 L 150 0 M 175 100 L 175 0 M 200 100 L 200 0 M 225 100 L 225 0',
  bed: 'F1 M0 0 L40 0 40 60 0 60 0 0 M 7.5 2.5 L32.5 2.5 32.5 17.5 7.5 17.5 7.5 2.5 M0 20 L40 20 M0 25 L40 25'
};

// Context Menu -- referenced by Node, Diagram and Group Templates
export function makeContextMenu() {
  return new go.Adornment('Vertical').add(
    // Make Room Button
    go.GraphObject.build<go.Panel>('ContextMenuButton', {
      click(e: go.InputEvent) {
        const fp: Floorplan = e.diagram as Floorplan;
        const pt: go.Point = e.diagram.lastInput.documentPoint;
        fp.maybeAddRoomNode(pt, 'floor1.jpg');
      }
    }).add(new go.TextBlock('Make Room')),
    // Make group button
    go.GraphObject.build<go.Panel>('ContextMenuButton', {
      click(e: go.InputEvent, obj: go.GraphObject) {
        const part = obj.part;
        if (part !== null) {
          const fp: Floorplan = part.diagram as Floorplan;
          makeSelectionGroup(fp);
        }
      }
    })
      .bindObject('visible', 'visible', function (v, obj) {
        const floorplan = obj.part.diagram;
        if (floorplan.selection.count <= 1) {
          return false;
        }
        let flag = true;
        floorplan.selection.iterator.each(function (node: go.Part) {
          if (
            node.category === 'Wall' ||
            node.category === 'Window' ||
            node.category === 'Door' ||
            node.category === 'Room'
          ) {
            flag = false;
          }
        });
        return flag;
      })
      .add(new go.TextBlock('Make Group')),
    // Ungroup Selection Button
    go.GraphObject.build<go.Panel>(
      'ContextMenuButton',

      {
        click(e: go.InputEvent, obj: go.GraphObject) {
          const part = obj.part;
          if (part !== null) {
            const fp: Floorplan = part.diagram as Floorplan;
            ungroupSelection(fp);
          }
        }
      }
    )
      .bindObject('visible', '', function (v, obj) {
        const floorplan = obj.part.diagram;
        if (floorplan !== null) {
          const node = floorplan.selection.first();
          return (
            (node instanceof go.Node &&
              node.containingGroup != null &&
              node.containingGroup.category !== 'Wall') ||
            (node instanceof go.Group && node.category === '')
          );
        }
        return false;
      })
      .add(new go.TextBlock('Ungroup')),
    // Copy Button
    go.GraphObject.build<go.Panel>('ContextMenuButton', {
      click: function (e: go.InputEvent, obj: go.GraphObject) {
        const part = obj.part;
        if (part !== null && part.diagram !== null) {
          part.diagram.commandHandler.copySelection();
        }
      }
    })

      .bindObject('visible', '', function (v, obj) {
        if (obj.part.diagram !== null) {
          const sel: go.Iterable<go.Part> = obj.part.diagram.selection;
          let flag: boolean = sel.count > 0;
          sel.iterator.each(function (p: go.Part) {
            if (
              p.category === 'Wall' ||
              p.category === 'Window' ||
              p.category === 'Door' ||
              p.category === 'Room'
            ) {
              flag = false;
            }
          });
          return flag;
        }
        return false;
      })
      .add(new go.TextBlock('Copy')),
    // Cut Button
    go.GraphObject.build<go.Panel>('ContextMenuButton', {
      click(e: go.InputEvent, obj: go.GraphObject) {
        const part = obj.part;
        if (part !== null && part.diagram !== null) {
          part.diagram.commandHandler.cutSelection();
        }
      }
    })
      .bindObject('visible', '', function (v, obj) {
        if (obj.part.diagram !== null) {
          const sel: go.Iterable<go.Part> = obj.part.diagram.selection;
          let flag: boolean = sel.count > 0;
          sel.iterator.each(function (p: go.Part) {
            if (
              p.category === 'Wall' ||
              p.category === 'Window' ||
              p.category === 'Door' ||
              p.category === 'Room'
            ) {
              flag = false;
            }
          });
          return flag;
        }
        return false;
      })
      .add(new go.TextBlock('Cut')),
    // Delete Button
    go.GraphObject.build<go.Panel>('ContextMenuButton', {
      click(e: go.InputEvent, obj: go.GraphObject) {
        const part = obj.part;
        if (part !== null && part.diagram !== null) {
          part.diagram.commandHandler.deleteSelection();
        }
      }
    })
      .bindObject('visible', '', function (v, obj) {
        if (obj.part.diagram !== null) {
          return obj.part.diagram.selection.count > 0;
        }
        return false;
      })
      .add(new go.TextBlock('Delete')),
    // Paste Button
    go.GraphObject.build<go.Panel>('ContextMenuButton', {
      click(e: go.InputEvent, obj: go.GraphObject) {
        const part = obj.part;
        if (part !== null && part.diagram !== null) {
          part.diagram.commandHandler.pasteSelection(
            part.diagram.toolManager.contextMenuTool.mouseDownPoint
          );
        }
      }
    }).add(new go.TextBlock('Paste'))
  );
}

// Group Tool Tip
export function makeGroupToolTip() {
  return new go.Adornment('Auto').add(
    new go.Shape({ fill: '#FFFFCC' }),
    new go.TextBlock({ margin: 4 }).bindObject('text', '', function (text, obj) {
      const data = obj.part.adornedObject.data;
      const name = data.text;
      return (
        'Name: ' +
        name +
        '\nNotes: ' +
        data.notes +
        '\nMembers: ' +
        obj.part.adornedObject.memberParts.count
      );
    })
  );
}

/*
 * Dependencies for Context Menu:
 * Make Selection Group, Ungroup Selection, Clear Empty Groups
 */

// Make the selection a group
export function makeSelectionGroup(floorplan: Floorplan) {
  floorplan.startTransaction('group selection');
  // ungroup all selected nodes; then group them; if one of the selected nodes is a group, ungroup all its nodes
  const sel = floorplan.selection;
  const nodes: Array<go.Part> = [];
  sel.iterator.each(function (n) {
    if (n instanceof go.Group) {
      n.memberParts.iterator.each(function (part) {
        nodes.push(part);
      });
    } else {
      nodes.push(n);
    }
  });
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].isSelected = true;
  }
  ungroupSelection(floorplan);
  floorplan.commandHandler.groupSelection();
  const group = floorplan.selection.first(); // after grouping, the new group will be the only thing selected
  if (group !== null) {
    floorplan.model.setDataProperty(group.data, 'notes', '');
  }
  clearEmptyGroups(floorplan);
  // unselect / reselect group so data appears properly in Selection Info Window
  floorplan.clearSelection();
  floorplan.select(group);
  floorplan.commitTransaction('group selection');
}

// Ungroup selected nodes; if the selection is a group, ungroup all it's memberParts
export function ungroupSelection(floorplan: Floorplan) {
  floorplan.startTransaction('ungroup selection');
  // helper function to ungroup nodes
  function ungroupNode(node: go.Part) {
    const group = node.containingGroup;
    node.containingGroup = null;
    if (group !== null) {
      if (group.memberParts.count === 0) {
        floorplan.remove(group);
      } else if (group.memberParts.count === 1) {
        const mpf = group.memberParts.first();
        if (mpf !== null) {
          mpf.containingGroup = null;
        }
      }
    }
  }
  // ungroup any selected nodes; remember groups that are selected
  const sel = floorplan.selection;
  const groups: Array<go.Group> = [];
  sel.iterator.each(function (n) {
    if (!(n instanceof go.Group)) {
      ungroupNode(n);
    } else {
      groups.push(n);
    }
  });
  // go through selected groups, and ungroup their memberparts too
  const nodes: Array<go.Part> = [];
  for (let i = 0; i < groups.length; i++) {
    groups[i].memberParts.iterator.each(function (n) {
      nodes.push(n);
    });
  }
  for (let i = 0; i < nodes.length; i++) {
    ungroupNode(nodes[i]);
  }
  clearEmptyGroups(floorplan);
  floorplan.commitTransaction('ungroup selection');
}

// Clear all the groups that have no nodes
function clearEmptyGroups(floorplan: Floorplan) {
  const nodes = floorplan.nodes;
  const arr: Array<go.Part> = [];
  nodes.iterator.each(function (node) {
    if (node instanceof go.Group && node.memberParts.count === 0 && node.category !== 'Wall') {
      arr.push(node);
    }
  });
  for (let i: number = 0; i < arr.length; i++) {
    floorplan.remove(arr[i]);
  }
}
