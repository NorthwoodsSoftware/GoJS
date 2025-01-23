<script lang="ts">
  import go from 'gojs';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  interface Props {
    axis1?: 'X' | 'Y' | 'Z';
    axis2?: 'X' | 'Y' | 'Z';
    model?: go.GraphLinksModel;
    selection: go.Part | null;
  }

  let diagramDiv: HTMLDivElement;
  let myDiagram: go.Diagram;

  let { axis1 = 'X', axis2 = 'Y', model, selection = $bindable() }: Props = $props();
  onMount(() => {
    go.Diagram.licenseKey =
      '2b8644e0b7634dc702d90676423d6bbc5cf07e34cf960ef6580013f4bf586944779be17805db8ad2c2ff46ac1a7d938a8f913c29904c0133e53481d546e6d5feb33323b5440a44dda21136c5ccaa2ca1ae2870e0d2b676a1de678dedef';

    const coordToAxis = {
      X: 0,
      Y: 1,
      Z: 2
    };

    const node = new go.Node({ resizable: true, resizeObjectName: 'SHAPE' })
      .bindTwoWay(
        'location',
        'loc',
        (loc, d) => {
          const p = new go.Point(
            loc[coordToAxis[axis1]] - (axis1 === 'Z' ? d.data.size[2] : 0),
            loc[coordToAxis[axis2]] - (axis2 === 'Z' ? d.data.size[2] : 0)
          );
          return p;
        },
        (loc: go.Point, data) => {
          const newLoc = [...data.loc];
          newLoc[coordToAxis[axis1]] = loc.x + (axis1 === 'Z' ? data.size[2] : 0);
          newLoc[coordToAxis[axis2]] = loc.y + (axis2 === 'Z' ? data.size[2] : 0);
          return newLoc;
        }
      )
      .add(
        new go.Shape({ name: 'SHAPE' })
          .bindTwoWay(
            'desiredSize',
            'size',
            (size) => {
              return new go.Size(size[coordToAxis[axis1]], size[coordToAxis[axis2]]);
            },
            (size: go.Size, data) => {
              const newSize = [...data.size];
              newSize[coordToAxis[axis1]] = size.width;
              newSize[coordToAxis[axis2]] = size.height;
              return newSize;
            }
          )
          .bind('fill', 'color')
      );

    myDiagram = new go.Diagram(diagramDiv, {
      ChangedSelection: (e) => {
        selection = e.subject.first();
      },
      'animationManager.isEnabled': false,
      'undoManager.isEnabled': false,
      'layout.isInitial': false,
      'layout.isOngoing': false,
      nodeTemplate: node
    });

    myDiagram.grid = new go.Panel('Grid', {
      gridCellSize: new go.Size(10, 10),
      visible: true
    }).add(
      new go.Shape('LineH', { stroke: 'lightgray' }),
      new go.Shape('LineV', { stroke: 'lightgray' })
    );

    $effect(() => {
      if (model) myDiagram.model = model;
      if (selection) {
        myDiagram.select(myDiagram.findNodeForKey(selection.key));
      }
    });
  });
</script>

<div class="h-full w-full bg-green-100 p-[1px]">
  <span class="absolute z-20 bg-green-200 font-mono text-xs">{axis1}/{axis2}</span>
  <div bind:this={diagramDiv} class="z-10 h-full w-full select-none"></div>
</div>
