import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Planogram Editor: Drag and Drop sodas onto Vending Machine`,titleShort:`Vending Planogram`,indexDescription:`Drag and drop sodas from the Palette onto the vending machine. Use tools to edit the vending machine as well.`,screenshot:`vendingPlanogram`,priority:1,tags:[`groups`,`palette`,`html`,`commands`,`animation`,`buttons`,`geometries`,`itemarrays`,`tables`,`tools`],description:`An editor for defining planograms: visual displays of merchandise.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
        <div\r
        style="\r
            width: 135px;\r
            margin-right: 2px;\r
            background-color: whitesmoke;\r
            border: solid 1px black;\r
        "\r
        >\r
        <div class="tabs" id="tabs">\r
            <div class="tab">\r
            <input type="radio" id="rd1" name="rd" checked="true" />\r
            <label class="tab-label" for="rd1">Sodas</label>\r
            <div class="tab-content">\r
                <div\r
                id="sodaPalette"\r
                style="\r
                    width: 140px;\r
                    height: 300px;\r
                    background-color: whitesmoke;\r
                "\r
                ></div>\r
            </div>\r
            </div>\r
            <div class="tab">\r
            <input type="radio" id="rd4" name="rd" />\r
            <label class="tab-label" for="rd4">Vending Machines</label>\r
            <div class="tab-content">\r
                <div\r
                id="vendingMachinePaletteDiv"\r
                style="\r
                    width: 140px;\r
                    height: 200px;\r
                    background-color: whitesmoke;\r
                "\r
                ></div>\r
            </div>\r
            </div>\r
            <!-- all settings -->\r
            <div\r
            style="display: flex; align-items: center; flex-direction: column"\r
            >\r
            <div class="checkbox-wrapper">\r
                <input type="checkbox" id="showHideButtonsCheckbox" />\r
                <label for="showHideButtonsCheckbox" onclick="toggleEditMode();">\r
                <span class="slider-text">EDIT</span>\r
                </label>\r
            </div>\r
            <div class="checkbox-wrapper">\r
                <input type="checkbox" id="settings.allowDuplicatesCheckbox" />\r
                <label\r
                for="settings.allowDuplicatesCheckbox"\r
                onclick="toggleAllowDuplicates();"\r
                >\r
                <span class="slider-text">DUPLICATES</span>\r
                </label>\r
            </div>\r
            </div>\r
        </div>\r
        </div>\r
        <div\r
        id="myDiagramDiv"\r
        style="\r
            flex-grow: 1;\r
            height: 700px;\r
            border: solid 1px black;\r
            background-color: #f9f5e9;\r
        "\r
        ></div>\r
    </div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px"></textarea>\r
    <!-- everything down here is for the HTMLInfo class. these aren't visible at first but will be visible in the diagram when you click a button that needs a pop up. -->\r
    <!-- they can't start out in the diagram cause then they get auto deleted -->\r
    <!-- height custom input -->\r
    <div class="html-info" id="height-input-div">\r
        <input />\r
        <div class="arrows">\r
            <div class="arrow up" onclick="changeHeightInput(10)">▲</div>\r
            <div class="arrow down" onclick="changeHeightInput(-10)">▼</div>\r
        </div>\r
    </div>\r
    <!-- add row custom input -->\r
    <div class="html-info" id="add-row-input-div">\r
        <div class="arrow up">▲</div>\r
        <div>\r
        <input id="row-input" />\r
        <p>row(s)</p>\r
        <input id="height-input" />\r
        <p>px tall</p>\r
        </div>\r
        <div class="arrow down">▼</div>\r
    </div>\r
    <button class="html-info" id="fill-shelf-button" onclick="fillShelf()">\r
        Fill Shelf\r
    </button>`,jsCode:`/***********************************************************************\r
       *                          GLOBAL VARIABLES                           *\r
       ***********************************************************************/\r
      const settings = {\r
        colors: {\r
          exterior: "#6B7B6B",\r
          dark: "#4A594A",\r
          interior: "#E6F0E6",\r
          stroke: "#2F3C2F",\r
          keypad: "#B8BCA5",\r
          highlight: "#FDFDFD",\r
          shadow: "#4A594A",\r
          palettes: {\r
            green: {\r
              fillColor: "#8FA99E",\r
              labelColor: "#C3D4CA",\r
              stroke: "#4B6257",\r
            },\r
            blue: {\r
              fillColor: "#A3BDD9",\r
              labelColor: "#DCE8F7",\r
              stroke: "#607B9E",\r
            },\r
            beige: {\r
              fillColor: "#E8DCC1",\r
              labelColor: "#F5F0E3",\r
              stroke: "#8C7E56",\r
            },\r
          },\r
        },\r
\r
        paletteXSpacing: 45,\r
        paletteYSpacing: 85,\r
        defaultShelfHeight: 70,\r
\r
        // if allowTopLevel is false, that means you can't drag sodas onto the diagram background\r
        allowTopLevel: false,\r
\r
        // settings the user can change:\r
        editMode: true,\r
        allowDuplicates: true,\r
\r
        // r is rounding on some things\r
        r: 10,\r
      };\r
\r
      const sodaCategories = ["can", "bottle"];\r
\r
      // will be defined in init()\r
      let myDiagram;\r
      let palette;\r
      let vendingMachinePalette;\r
\r
      // when you right click a soda (fill shelf button pops up) it stores the data\r
      // fillShelf() uses the data - to know:\r
      // 1. what type of soda to fill the shelf with\r
      // 2. what group & shelf to fill\r
      let sodaRightClickedData;\r
\r
      /***********************************************************************\r
       *                       CUSTOM INPUT EDITOR                           *\r
       ***********************************************************************/\r
\r
      // Create an HTMLInfo and dynamically create some HTML to show/hide\r
      const customEditor = new go.HTMLInfo();\r
\r
      // the onclick functions on the arrows for the height input use this\r
      function changeHeightInput(change) {\r
        inputDiv = document.getElementById("height-input-div");\r
        inputBox = inputDiv.querySelector("input");\r
        inputBox.value = Math.max(\r
          parseInt(inputBox.value) + change,\r
          settings.defaultShelfHeight - 20\r
        );\r
      }\r
\r
      function placeInput(div, pos, divWidth, divHeight) {\r
        div.style.left = \`\${pos.x - divWidth / 2}px\`;\r
        div.style.top = \`\${pos.y - divHeight / 2}px\`;\r
      }\r
\r
      function handleAddShelfInput(textBlock, diagram, tool, pos, inputDiv) {\r
        const rowInput = document.getElementById("row-input");\r
        const heightInput = document.getElementById("height-input");\r
\r
        function addRow(itemArray, shelfNum, groupKey) {\r
          let numRows = parseInt(rowInput.value);\r
          let height = parseInt(heightInput.value);\r
          if (height < settings.defaultShelfHeight - 20) {\r
            height = settings.defaultShelfHeight - 20;\r
          }\r
          if (isNaN(height)) height = settings.defaultShelfHeight;\r
          if (isNaN(numRows)) numRows = 1;\r
\r
          myDiagram.startTransaction("Add row(s)");\r
          for (let i = 0; i < numRows; i++) {\r
            // insert a new shelf at the specified index\r
            myDiagram.model.insertArrayItem(itemArray, shelfNum, {\r
              height: height,\r
            });\r
          }\r
\r
          for (const soda of allSodas()) {\r
            if (soda.group === groupKey && soda.shelf >= shelfNum) {\r
              myDiagram.model.set(\r
                soda,\r
                "shelf",\r
                soda.shelf + numRows\r
              );\r
            }\r
          }\r
          // we need this to update locations before transaction is finished\r
          myDiagram.findNodeForKey(groupKey).ensureBounds();\r
          updateInvisibleCells();\r
          updateHighlights();\r
          myDiagram.updateAllTargetBindings();\r
          myDiagram.commitTransaction("Add row(s)");\r
        }\r
\r
        rowInput.value = "1";\r
        heightInput.value = "70";\r
\r
        const shelfData = getDataFromGraphObject(textBlock);\r
        const groupData = findGroupData(shelfData);\r
        const shelfNum = groupData.itemArray.indexOf(shelfData);\r
        const groupKey = groupData.key;\r
        // add row above\r
        inputDiv.querySelector(".arrow.up").onclick = () => {\r
          addRow(groupData.itemArray, shelfNum, groupKey);\r
          customEditor.hide(diagram, tool);\r
        };\r
        // add row below\r
        inputDiv.querySelector(".arrow.down").onclick = () => {\r
          addRow(groupData.itemArray, shelfNum + 1, groupKey);\r
          customEditor.hide(diagram, tool);\r
        };\r
\r
        placeInput(inputDiv, pos, 142, 72);\r
      }\r
\r
      function handleChangeShelfHeightInput(\r
        textBlock,\r
        diagram,\r
        tool,\r
        pos,\r
        inputDiv,\r
        inputBox\r
      ) {\r
        inputBox.value = textBlock.text;\r
\r
        // Do a few different things when a user presses a key\r
        inputBox.addEventListener(\r
          "keydown",\r
          e => {\r
            if (e.isComposing) return;\r
            const key = e.key;\r
            if (key === "Enter") {\r
              // Accept on Enter\r
              customEditor.hide(diagram, tool);\r
              return;\r
            } else if (key === "Tab") {\r
              // Accept on Tab\r
              customEditor.hide(diagram, tool);\r
              e.preventDefault();\r
              return false;\r
            } else if (key === "Escape") {\r
              // Cancel on Esc\r
              tool.doCancel();\r
            }\r
          },\r
          false\r
        );\r
\r
        placeInput(inputDiv, pos, 40, 30);\r
      }\r
\r
      function handleFillShelfButton(pos, button) {\r
        const mousePoint = myDiagram.lastInput.viewPoint;\r
        placeInput(button, mousePoint, 0, 0);\r
      }\r
\r
      customEditor.show = (textBlock, diagram, tool) => {\r
        customEditor._textBlockName = textBlock.name; // for use later in valueFunction\r
\r
        const loc = textBlock.getDocumentPoint(go.Spot.TopLeft);\r
        const pos = diagram.transformDocToView(loc);\r
\r
        let div;\r
        let inputBox;\r
        if (textBlock.name === "ADD_SHELF_PLACEHOLDER_TEXT") {\r
          div = document.getElementById("add-row-input-div");\r
          handleAddShelfInput(textBlock, diagram, tool, pos, div);\r
        } else if (textBlock.name === "FILL_SHELF_PLACEHOLDER_TEXT") {\r
          div = document.getElementById("fill-shelf-button");\r
          handleFillShelfButton(pos, div);\r
        } else {\r
          div = document.getElementById("height-input-div");\r
          inputBox = div.querySelector("input");\r
          handleChangeShelfHeightInput(\r
            textBlock,\r
            diagram,\r
            tool,\r
            pos,\r
            div,\r
            inputBox\r
          );\r
        }\r
\r
        div.style.position = "absolute";\r
        div.style.zIndex = 100; // place it in front of the Diagram\r
\r
        diagram.div.appendChild(div);\r
        div.style.display = "flex"; // show the input div\r
        if (inputBox) {\r
          inputBox.focus();\r
        } else {\r
          div.focus();\r
        }\r
      };\r
\r
      customEditor.hide = (diagram, tool) => {\r
        let div;\r
        if (tool.textBlock.name === "ADD_SHELF_PLACEHOLDER_TEXT") {\r
          div = document.getElementById("add-row-input-div");\r
        } else if (tool.textBlock.name === "FILL_SHELF_PLACEHOLDER_TEXT") {\r
          div = document.getElementById("fill-shelf-button");\r
        } else {\r
          div = document.getElementById("height-input-div");\r
\r
          const inputBox = div.querySelector("input");\r
          diagram.startTransaction("change shelf height");\r
          tool.textBlock.text = inputBox.value;\r
          diagram.layoutDiagram(true); // force layout to redo\r
          updateInvisibleCells();\r
          updateHighlights();\r
          diagram.updateAllTargetBindings();\r
          diagram.commitTransaction("change shelf height");\r
        }\r
\r
        if (diagram.div.contains(div)) {\r
          div.style.display = "none"; // hide the input div\r
        }\r
      };\r
\r
      // This is necessary for HTMLInfo instances that are used as text editors\r
      customEditor.valueFunction = () => {\r
        if (customEditor._textBlockName !== "ADD_SHELF_PLACEHOLDER_TEXT" &&\r
            customEditor._textBlockName !== "FILL_SHELF_PLACEHOLDER_TEXT") {\r
          return document\r
            .getElementById("height-input-div")\r
            .querySelector("input").value;\r
        } else {\r
          return "";\r
        }\r
      };\r
\r
      /***********************************************************************\r
       *                       CUSTOM SHAPE (SODA)                           *\r
       ***********************************************************************/\r
      go.Shape.defineFigureGenerator("Soda", (shape, w, h) => {\r
        const geo = new go.Geometry();\r
        const mid = w / 2;\r
        const capWidth = w / 8;\r
        const capX = [mid - capWidth, mid + capWidth];\r
        const capY = h / 10;\r
        const bottomStartY = h / 4;\r
        // corner radius\r
        const r =\r
          shape && shape.parameter1 ? Math.min(shape.parameter1, 18) : 8;\r
        // start x, start y, filled\r
        // top left corner of cap\r
        const fig = new go.PathFigure(capX[0], 0, true);\r
        geo.add(fig);\r
        // top right corner of cap\r
        fig.add(new go.PathSegment(go.SegmentType.Line, capX[1], 0));\r
        // point between neck and cap (right)\r
        fig.add(new go.PathSegment(go.SegmentType.Line, capX[1], capY));\r
        // right side, soda bottle neck\r
        fig.add(\r
          new go.PathSegment(\r
            go.SegmentType.QuadraticBezier,\r
            w,\r
            bottomStartY + r,\r
            w,\r
            bottomStartY - r / 4\r
          )\r
        );\r
        // bottom right corner\r
        fig.add(\r
          new go.PathSegment(\r
            go.SegmentType.Arc,\r
            0,\r
            90, // start angle and sweep angle (from center point)\r
            w - r,\r
            h - r, // center x and center y\r
            r,\r
            r // radius x and radius y\r
          )\r
        );\r
        // bottom left corner\r
        fig.add(\r
          new go.PathSegment(\r
            go.SegmentType.Arc,\r
            90,\r
            90, // start angle and sweep angle (from center point)\r
            r,\r
            h - r, // center x and center y\r
            r,\r
            r // radius x and radius y\r
          )\r
        );\r
        // left side, soda bottle neck\r
        fig.add(new go.PathSegment(go.SegmentType.Line, 0, bottomStartY + r));\r
        fig.add(\r
          new go.PathSegment(\r
            go.SegmentType.QuadraticBezier,\r
            capX[0],\r
            capY,\r
            0,\r
            bottomStartY - r / 4\r
          ).close()\r
        );\r
        const capLineFig = new go.PathFigure(capX[0], capY, false);\r
        capLineFig.add(new go.PathSegment(go.SegmentType.Line, capX[1], capY));\r
        geo.add(capLineFig);\r
        return geo;\r
      });\r
\r
      /***********************************************************************\r
       *                           HANDLE EVENTS                             *\r
       ***********************************************************************/\r
\r
      // handles item being dropped onto the vending machine\r
      function handleVendingMouseDrop(e, grp) {\r
        let cancelled = false;\r
        grp.diagram.selection.each(node => {\r
          if (cancelled) return;\r
          if (node instanceof go.Group) {\r
            animateDrop(new go.Set().add(node));\r
            return;\r
          }\r
          const closestCell = getClosestCell(node);\r
          if (closestCell === null) {\r
            grp.diagram.currentTool.doCancel();\r
            cancelled = true;\r
            return;\r
          }\r
\r
          myDiagram.startTransaction("drop object");\r
          // reset invisible cell back to being invisible\r
          closestCell.findObject("SHAPE").fill = "transparent";\r
\r
          // set shelf location\r
          myDiagram.model.set(\r
            node.data,\r
            "shelf",\r
            closestCell.data.shelf\r
          );\r
          myDiagram.model.set(\r
            node.data,\r
            "coil",\r
            closestCell.data.coil\r
          );\r
\r
          // update visual\r
          myDiagram.updateAllTargetBindings();\r
\r
          var ok = grp.addMembers([node], true);\r
          if (!ok) {\r
            grp.diagram.currentTool.doCancel();\r
            return;\r
          }\r
          if (node.data.isFromPalette) {\r
            handleItemFromPalette(node.data);\r
          }\r
\r
          myDiagram.commitTransaction("drop object");\r
        });\r
      }\r
\r
      /***********************************************************************\r
       *                FUNCTIONS FOR MAKING THE TEMPLATES                   *\r
       ***********************************************************************/\r
\r
      // =================== REUSABLE FUNCTIONS ===================\r
\r
      function buttonStyle(obj) {\r
        return obj\r
          .set({\r
            width: 12,\r
            height: 12,\r
          })\r
          .attach({ "ButtonBorder.strokeWidth": 0 });\r
      }\r
\r
      // use to make a button\r
      function button(symbol, click, margin) {\r
        const btn = go.GraphObject.build("Button", {\r
          click: click,\r
        })\r
          .apply(buttonStyle)\r
          .add(\r
            new go.Shape(symbol, {\r
              strokeWidth: 2,\r
              stroke: settings.colors.stroke,\r
            })\r
          );\r
        if (margin) {\r
          btn.margin = margin;\r
        }\r
        return btn;\r
      }\r
\r
      function getStrokeColor(color) {\r
        return settings.colors.palettes[color].stroke;\r
      }\r
\r
      function sodaStyle(template) {\r
        template\r
          .findObject("MAIN_SHAPE")\r
          .set({\r
            width: 35,\r
            fill: settings.colors.dark,\r
            strokeWidth: 2,\r
            stroke: settings.colors.stroke,\r
          })\r
          .bind(\r
            "fill",\r
            "color",\r
            color => settings.colors.palettes[color].fillColor\r
          )\r
          .bind("stroke", "color", getStrokeColor);\r
        template\r
          .findObject("LABEL_SHAPE")\r
          .set({\r
            fill: settings.colors.exterior,\r
            strokeWidth: 2,\r
            stroke: settings.colors.stroke,\r
          })\r
          .bind(\r
            "fill",\r
            "color",\r
            color => settings.colors.palettes[color].labelColor\r
          )\r
          .bind("stroke", "color", getStrokeColor);\r
        template\r
          .findObject("LABEL_TEXT")\r
          .set({\r
            stroke: settings.colors.stroke,\r
          })\r
          .bind("stroke", "color", getStrokeColor);\r
        template.findObject("HIGHLIGHT").set({\r
          name: "HIGHLIGHT",\r
          width: 15,\r
          strokeWidth: 0,\r
          alignment: go.Spot.Left,\r
          opacity: 0.4,\r
          fill: "white",\r
        });\r
        template\r
          .findObject("DUPLICATE_OUTLINE")\r
          .set({\r
            fill: null,\r
            stroke: "red",\r
            strokeWidth: 2,\r
            width: 35,\r
            visible: false,\r
          })\r
          .bind("visible", "", data => {\r
            return (\r
              (data.duplicate && !settings.allowDuplicates) ||\r
              data.toDelete === true\r
            );\r
          })\r
          .bind("stroke", "toDelete", toDelete => {\r
            return toDelete ? "blue" : "red";\r
          });\r
\r
        return template\r
          .add(new go.TextBlock({ name: "FILL_SHELF_PLACEHOLDER_TEXT" }))\r
          .set({\r
            // handle right click\r
            contextClick: (e, obj) => {\r
              const tb = obj.findObject("FILL_SHELF_PLACEHOLDER_TEXT");\r
              e.diagram.commandHandler.editTextBlock(tb);\r
              sodaRightClickedData = obj.data;\r
            },\r
            locationSpot: go.Spot.Center,\r
            zOrder: 3,\r
            // it must be in the foreground or you can't click on sodas because of the invisible cells being in front\r
            mouseDrop: (e, node) => {\r
              handleVendingMouseDrop(e, node.containingGroup);\r
            },\r
          })\r
          .bindObject("zOrder", "", obj => {\r
            if (obj.isSelected) {\r
              return highestZOrder() * 4 + 4;\r
            }\r
            const data = obj.data;\r
            const groupData = myDiagram.model.findNodeDataForKey(data.group);\r
            if (!groupData) return 0;\r
            const zOrder = groupData.zOrder;\r
            return zOrder * 4 + 2;\r
\r
            /* each group has a block of 4 z-orders for nodes related to the group\r
             * +0: vending machine\r
             * +1: invisible cells\r
             * +2: soda\r
             * +3: highlight\r
             */\r
          })\r
          .bind("location", "", data => {\r
            let node = myDiagram.findNodeForKey(data.key);\r
            if (!node) node = palette.findNodeForKey(data.key);\r
            const height = node.actualBounds.height;\r
\r
            if (data.paletteLocation) {\r
              const { x, y } = go.Point.parse(data.paletteLocation);\r
              return new go.Point(x, y - height / 2);\r
            }\r
\r
            const { group, shelf, coil } = data;\r
            if (\r
              group === undefined ||\r
              shelf === undefined ||\r
              coil === undefined\r
            ) {\r
              // default\r
              const soda = myDiagram.findNodeForKey(data.key);\r
              // it will return 0,0 for items in palette i hope that's fine\r
              if (soda) {\r
                return soda.location;\r
              } else {\r
                return new go.Point(0, 0);\r
              }\r
            }\r
            const ivc = myDiagram.findNodeForKey(\r
              "IVC " + group + " " + shelf + " " + coil\r
            );\r
            if (ivc) {\r
              const { x, y } = ivc.location;\r
              return new go.Point(x, y - height / 2);\r
            } else {\r
              return new go.Point(0, 0);\r
            }\r
          });\r
      }\r
\r
      function makeCornerDecoration(args) {\r
        // set defaults (what they pass in will override what I'm writing here)\r
        args = {\r
          alignment: "TopLeft",\r
          margin: [0],\r
          strokeWidth: 5,\r
          r: 5,\r
          width: 10,\r
          height: 10,\r
          horizontalDotSpacing: 10,\r
          horizontalDotWidth: 0,\r
          verticalDotSpacing: 10,\r
          verticalDotWidth: 0,\r
          stroke: settings.colors.highlight,\r
          opacity: 0.7,\r
          ...args,\r
        };\r
        const r = args.r;\r
        const isRight = args.alignment.includes("Right") ? 1 : -1;\r
        const isTop = args.alignment.includes("Top") ? 1 : -1;\r
        let geom = "";\r
        if (args.horizontalDotWidth > 0) {\r
          geom = \`M\${args.horizontalDotSpacing + args.horizontalDotWidth} 0 l\${\r
            isRight * args.horizontalDotWidth\r
          } 0 m\${isRight * args.horizontalDotSpacing} 0\`;\r
        } else {\r
          geom = "M0 0";\r
        }\r
        const sweepFlag = isRight === isTop ? 1 : 0;\r
        const arcEndX = isRight * r;\r
        const arcEndY = isTop * r;\r
        geom += \`l\${\r
          isRight * args.width\r
        } 0 a\${r} \${r} 0 0 \${sweepFlag} \${arcEndX} \${arcEndY} l0 \${\r
          isTop * args.height\r
        }\`;\r
        if (args.verticalDotWidth > 0) {\r
          geom += \`m0 \${isTop * args.verticalDotSpacing} l0 \${\r
            isTop * args.verticalDotWidth\r
          }\`;\r
        }\r
        return new go.Shape({\r
          alignment: go.Spot[args.alignment],\r
          geometryString: geom,\r
          margin: new go.Margin(...args.margin),\r
          strokeWidth: args.strokeWidth,\r
          strokeCap: "round",\r
          stroke: args.stroke,\r
          opacity: args.opacity,\r
        });\r
      }\r
\r
      // =================== ONE TIME USE ===================\r
\r
      const modelTemplate = new go.GraphLinksModel([\r
        {\r
          key: 1,\r
          vendingMachineWidth: 4,\r
          isGroup: true,\r
          itemArray: [{}, { height: 100 }, {}, {}, {}],\r
          zOrder: 1,\r
        },\r
        {\r
          key: 3,\r
          category: "bottle",\r
          shelf: 1,\r
          coil: 1,\r
          group: 1,\r
          color: "green",\r
          duplicate: true,\r
        },\r
        {\r
          key: 4,\r
          category: "can",\r
          shelf: 0,\r
          coil: 3,\r
          group: 1,\r
          color: "green",\r
          duplicate: true,\r
        },\r
        {\r
          key: 5,\r
          category: "bottle",\r
          shelf: 1,\r
          coil: 3,\r
          group: 1,\r
          color: "green",\r
          duplicate: true,\r
        },\r
        {\r
          key: 6,\r
          category: "can",\r
          color: "beige",\r
          shelf: 3,\r
          coil: 2,\r
          group: 1,\r
          duplicate: true,\r
        },\r
        {\r
          key: 2,\r
          isGroup: true,\r
          vendingMachineWidth: 3,\r
          itemArray: [{}, { height: 70 }, {}],\r
          position: "320 0",\r
          zOrder: 2,\r
        },\r
        {\r
          key: 7,\r
          category: "can",\r
          color: "blue",\r
          shelf: 0,\r
          coil: 0,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 8,\r
          category: "can",\r
          color: "blue",\r
          shelf: 0,\r
          coil: 2,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 9,\r
          category: "can",\r
          color: "blue",\r
          shelf: 0,\r
          coil: 1,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 10,\r
          category: "can",\r
          color: "beige",\r
          shelf: 1,\r
          coil: 0,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 11,\r
          category: "can",\r
          color: "beige",\r
          shelf: 1,\r
          coil: 1,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 12,\r
          category: "can",\r
          color: "beige",\r
          shelf: 1,\r
          coil: 2,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 13,\r
          category: "can",\r
          color: "green",\r
          shelf: 2,\r
          coil: 0,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 14,\r
          category: "can",\r
          color: "green",\r
          shelf: 2,\r
          coil: 2,\r
          group: 2,\r
          duplicate: true,\r
        },\r
        {\r
          key: 15,\r
          category: "can",\r
          color: "green",\r
          shelf: 2,\r
          coil: 1,\r
          group: 2,\r
          duplicate: true,\r
        },\r
      ]);\r
\r
      // the button on that shelves that displays their heights\r
      // when you click it the HTML pops up to change their heights\r
      function numberInput() {\r
        return go.GraphObject.build("Button", {\r
          height: 12,\r
          margin: new go.Margin(0, 0, 0, 30),\r
          "ButtonBorder.strokeWidth": 0,\r
          click: (e, obj) => {\r
            const tb = obj.findObject("TEXT");\r
            e.diagram.commandHandler.editTextBlock(tb);\r
          },\r
        })\r
        .add(\r
          new go.TextBlock({\r
            name: "TEXT",\r
            text: settings.defaultShelfHeight,\r
            font: "8px sans-serif",\r
            strokeWidth: 2,\r
            stroke: settings.colors.stroke,\r
          })\r
          .bindTwoWay("text", "height", undefined, t =>\r
            Math.max(parseInt(t), settings.defaultShelfHeight - 20)\r
          )\r
        );\r
      }\r
\r
      function addShelfButton() {\r
        return new go.Panel("Auto", {\r
          click: (e, obj) => {\r
            const tb = obj.findObject("ADD_SHELF_PLACEHOLDER_TEXT");\r
            e.diagram.commandHandler.editTextBlock(tb);\r
          },\r
        })\r
        .add(\r
          go.GraphObject.build("Button", {\r
            margin: new go.Margin(0, 3, 0, 0),\r
          })\r
            .apply(buttonStyle)\r
            .add(\r
              new go.Shape("PlusLine", {\r
                strokeWidth: 2,\r
                stroke: settings.colors.stroke,\r
              })\r
            ),\r
          new go.TextBlock({\r
            name: "ADD_SHELF_PLACEHOLDER_TEXT",\r
          })\r
        );\r
      }\r
\r
      function removeShelfButton() {\r
        return button("MinusLine", (e, btn) => {\r
          const { itemArray, groupKey, shelfNum } = getButtonClickedInfo(btn);\r
\r
          const affectedSodas = [];\r
          for (const soda of allSodas()) {\r
            if (soda.group === groupKey && soda.shelf >= shelfNum) {\r
              affectedSodas.push(soda);\r
            }\r
          }\r
\r
          myDiagram.startTransaction("show modal");\r
          let sodaDeleteCount = 0;\r
          for (const soda of affectedSodas) {\r
            if (soda.shelf === shelfNum) {\r
              sodaDeleteCount++;\r
              myDiagram.model.set(soda, "toDelete", true);\r
            }\r
          }\r
          if (sodaDeleteCount > 0) {\r
            showModal(\r
              sodaDeleteCount,\r
              () => {\r
                removeShelf(affectedSodas, shelfNum, itemArray, groupKey);\r
              },\r
              btn\r
            );\r
            myDiagram.commitTransaction("show modal");\r
          } else {\r
            myDiagram.commitTransaction("show modal");\r
            removeShelf(affectedSodas, shelfNum, itemArray, groupKey);\r
          }\r
        })\r
        .bind("visible", "", data => {\r
          nodeData = findGroupData(data);\r
          return nodeData.itemArray.length > 1;\r
        });\r
      }\r
\r
      // number buttons are just visual decoration on the controls btw\r
      // they are not clickable\r
      function makeNumberButtons() {\r
        const r = 2;\r
        const panel = new go.Panel("Table", {\r
          width: 46,\r
          height: 67,\r
        });\r
        for (let i = 0; i < 12; i++) {\r
          panel.add(\r
            new go.Panel("Auto", {\r
              row: Math.floor(i / 3),\r
              column: i % 3,\r
            })\r
            .add(\r
              // invisible rectangle to make it the right size\r
              new go.Shape("RoundedRectangle", {\r
                fill: null,\r
                stroke: null,\r
                width: 14,\r
                height: 14,\r
              }),\r
              new go.TextBlock({\r
                text: i < 9 ? i + 1 : ["*", "0", "#"][i - 9],\r
                // the 900 makes text thicker\r
                font: "900 8px sans-serif",\r
                stroke: settings.colors.stroke,\r
              }),\r
              // shadow for aesthetics\r
              makeCornerDecoration({\r
                height: 7 - r,\r
                width: 7 - r,\r
                alignment: "BottomRight",\r
                stroke: settings.colors.dark,\r
                strokeWidth: 1.5,\r
                opacity: 0.8,\r
                r: r,\r
              }),\r
              makeCornerDecoration({\r
                alignment: "TopLeft",\r
                strokeWidth: 1.5,\r
                height: 2,\r
                width: 2,\r
                r: r,\r
              })\r
            )\r
          );\r
        }\r
        return panel;\r
      }\r
\r
      function leftAddAndDeleteButtons() {\r
        return new go.Panel("Vertical", {\r
          // extra space between buttons and window\r
          margin: new go.Margin(0, 3, 0, 0),\r
        })\r
        .add(\r
          button("PlusLine", (e, btn) => {\r
            myDiagram.startTransaction("add column");\r
            // add 1 to vendingMachineWidth\r
            const data = getDataFromGraphObject(btn);\r
            myDiagram.model.set(\r
              data,\r
              "vendingMachineWidth",\r
              data.vendingMachineWidth + 1\r
            );\r
\r
            myDiagram.layoutDiagram(true); // force layout to redo\r
            // update invisibleCells' positions\r
            updateInvisibleCells();\r
            myDiagram.commitTransaction("add column");\r
          })\r
          .bind("visible", "", () => settings.editMode),\r
          button(\r
            "MinusLine",\r
            (e, btn) => {\r
              // subtract 1 from vendingMachineWidth\r
              const data = getDataFromGraphObject(btn);\r
              const newVendingMachineWidth = data.vendingMachineWidth - 1;\r
              const affectedSodas = allSodas().filter(\r
                soda =>\r
                  soda.group === data.key && soda.coil >= newVendingMachineWidth\r
              );\r
\r
              myDiagram.startTransaction("show modal");\r
              for (const soda of affectedSodas) {\r
                myDiagram.model.set(soda, "toDelete", true);\r
              }\r
\r
              if (affectedSodas.length > 0) {\r
                showModal(\r
                  affectedSodas.length,\r
                  () => {\r
                    removeColumn(affectedSodas, data, newVendingMachineWidth);\r
                  },\r
                  btn\r
                );\r
                myDiagram.commitTransaction("show modal");\r
              } else {\r
                myDiagram.commitTransaction("show modal");\r
                removeColumn(affectedSodas, data, newVendingMachineWidth);\r
              }\r
            },\r
            // space between add and delete button\r
            new go.Margin(3, 0, 0, 0)\r
          )\r
          .bind(\r
            "visible",\r
            "vendingMachineWidth",\r
            count => count > 3 && settings.editMode\r
          )\r
        );\r
      }\r
\r
      function spacerForWhenButtonsArentThere() {\r
        return new go.Shape({\r
          width: 11,\r
          opacity: 0,\r
        })\r
        .bind("visible", "", () => !settings.editMode);\r
      }\r
\r
      function shelfTop() {\r
        return new go.Panel("Horizontal", {\r
          height: settings.defaultShelfHeight - 20,\r
          itemTemplate: new go.Panel("Horizontal", {\r
            height: 37,\r
            alignment: go.Spot.Bottom,\r
          })\r
          .add(\r
            new go.Shape({\r
              fill: "transparent",\r
              name: "COIL",\r
              // somewhat vertically stretched half circle\r
              geometryString: "M0 0 a20 20 0 0 1 40 0",\r
              height: 12,\r
              margin: new go.Margin(0, 5),\r
              width: 25,\r
              strokeWidth: 2,\r
              stroke: settings.colors.stroke,\r
              alignment: go.Spot.Bottom,\r
            }),\r
            new go.Shape("MinusLine", {\r
              // height means width because the angle being 90 flips it\r
              height: 2,\r
              margin: new go.Margin(0, 1.5),\r
              angle: 90,\r
              strokeWidth: 2,\r
              stroke: settings.colors.stroke,\r
            })\r
            .bind("visible", "lineVisible")\r
          ),\r
          itemArray: [{}, {}],\r
        })\r
          .bind("margin", "height", h => new go.Margin(h - 70, 0, 0, 0))\r
          .bind("itemArray", "", data => {\r
            // find group\r
            const nodeData = findGroupData(data);\r
            if (nodeData) {\r
              array = Array(nodeData.vendingMachineWidth)\r
                .fill(null)\r
                .map(() => ({ lineVisible: true }));\r
              array[nodeData.vendingMachineWidth - 1] = {\r
                lineVisible: false,\r
              };\r
              return array;\r
            } else {\r
              return [];\r
            }\r
          });\r
      }\r
\r
      // I made this way more complicated than it should have to be because it wasn't arranged right otherwise\r
      function shelfLabels() {\r
        return new go.Panel("Horizontal", {\r
          alignment: go.Spot.Left,\r
          itemTemplate: new go.Panel("Horizontal", {})\r
            .add(\r
              new go.Panel("Auto", {})\r
                .add(\r
                  // invisible shape to force size\r
                  new go.Shape("Rectangle", {\r
                    width: 36,\r
                    opacity: 0,\r
                  }),\r
                  // label\r
                  new go.Panel("Auto")\r
                    .add(\r
                      new go.Shape("RoundedRectangle", {\r
                        height: 10,\r
                        width: 20,\r
                        fill: "white",\r
                        stroke: null,\r
                      }),\r
\r
                      // labels (A1, A2, etc)\r
                      new go.TextBlock({\r
                          // the 900 makes text thicker\r
                          font: "900 8px sans-serif",\r
                          stroke: settings.colors.exterior,\r
                        })\r
                        .bind("text", "", data => {\r
                          return data.letter + "" + data.i;\r
                        })\r
                    )\r
                ),\r
              new go.Shape("Rectangle", {\r
                // height means width because the angle being 90 flips it\r
                width: 6,\r
                opacity: 0,\r
              })\r
              .bind("visible", "lineVisible")\r
            ),\r
          itemArray: [{}, {}],\r
        })\r
          .bind("itemArray", "", data => {\r
            // find group\r
            const nodeData = findGroupData(data);\r
            if (nodeData) {\r
              const row = nodeData.itemArray.indexOf(data);\r
              const letter = String.fromCharCode(65 + row);\r
\r
              array = Array(nodeData.vendingMachineWidth)\r
                .fill(null)\r
                .map((_, i) => ({\r
                  i: i + 1,\r
                  lineVisible: true,\r
                  letter: letter,\r
                }));\r
              array[nodeData.vendingMachineWidth - 1].lineVisible = false;\r
              return array;\r
            } else {\r
              return [];\r
            }\r
          })\r
          .bind("visible", "", () => !settings.editMode);\r
      }\r
\r
      function shelfBottom() {\r
        return new go.Panel("Auto", {\r
          stretch: go.Stretch.Horizontal,\r
          height: 20,\r
        })\r
        .add(\r
          new go.Shape("Rectangle", {\r
            fill: settings.colors.exterior,\r
            stroke: settings.colors.stroke,\r
            strokeWidth: 2,\r
            alignment: go.Spot.Center,\r
            height: 18,\r
          }),\r
          // shelf + and - buttons\r
          new go.Panel("Horizontal")\r
            .add(addShelfButton(), removeShelfButton(), numberInput())\r
            .bind("visible", "", () => settings.editMode),\r
          shelfLabels()\r
        );\r
      }\r
\r
      function interior() {\r
        return new go.Panel("Horizontal", {\r
          stretch: go.Stretch.Horizontal,\r
          column: 0,\r
          margin: new go.Margin(20, 5),\r
        })\r
        .add(\r
          leftAddAndDeleteButtons(),\r
          spacerForWhenButtonsArentThere(),\r
          // WINDOW\r
          new go.Panel("Auto", {\r
            name: "HIGHLIGHT GOES HERE",\r
          })\r
          .add(\r
            // window background\r
            new go.Shape("RoundedRectangle", {\r
              name: "WINDOW",\r
              fill: settings.colors.interior,\r
              stroke: null,\r
              strokeWidth: 2,\r
            }),\r
            // shelves\r
            new go.Panel("Vertical", {\r
              name: "SHELVESLIST",\r
              itemTemplate: new go.Panel("Vertical", {\r
                margin: new go.Margin(5, 0),\r
                opacity: 0.8,\r
              })\r
                .bind("height", "height")\r
                .add(shelfTop(), shelfBottom()),\r
            })\r
            .bind("itemArray")\r
          )\r
        );\r
      }\r
\r
      function controls() {\r
        const r2 = settings.r - 5;\r
        return new go.Panel("Auto", {\r
          column: 1,\r
          width: 70,\r
          height: 180,\r
          margin: new go.Margin(0, 10),\r
        })\r
        .add(\r
          // dark background\r
          new go.Shape("RoundedRectangle", {\r
            stroke: settings.colors.stroke,\r
            strokeWidth: 2,\r
            fill: settings.colors.dark,\r
          }),\r
          new go.Panel("Vertical", {})\r
            .add(\r
              // screen\r
              new go.Panel("Auto")\r
                .add(\r
                  new go.Shape("RoundedRectangle", {\r
                    stroke: settings.colors.stroke,\r
                    strokeWidth: 2,\r
                    fill: settings.colors.keypad,\r
                    height: 45,\r
                    width: 50,\r
                    margin: new go.Margin(2),\r
                  }),\r
                  // highlight for aesthetics\r
                  makeCornerDecoration({\r
                    alignment: "TopLeft",\r
                    margin: [3],\r
                    r: r2,\r
                  })\r
                ),\r
              // arrow\r
              new go.Shape("TriangleDown", {\r
                stroke: null,\r
                strokeWidth: 2,\r
                fill: "#e9cf86",\r
                width: 15,\r
                height: 5,\r
                alignment: go.Spot.Center,\r
                margin: new go.Margin(2),\r
              }),\r
              // card slot\r
              new go.Panel("Auto", {\r
                margin: new go.Margin(2),\r
                height: 10,\r
                width: 50,\r
              })\r
              .add(\r
                new go.Shape("RoundedRectangle", {\r
                  stroke: settings.colors.stroke,\r
                  strokeWidth: 2,\r
                  fill: settings.colors.keypad,\r
                }),\r
                new go.Shape("MinusLine", {\r
                  width: 30,\r
                  stroke: settings.colors.dark,\r
                  strokeWidth: 2,\r
                  fill: settings.colors.keypad,\r
                })\r
              ),\r
              // keypad\r
              new go.Panel("Auto")\r
                .add(\r
                  new go.Shape("RoundedRectangle", {\r
                    stroke: settings.colors.stroke,\r
                    strokeWidth: 2,\r
                    fill: settings.colors.keypad,\r
                    height: 70,\r
                    width: 50,\r
                    margin: new go.Margin(2),\r
                  }),\r
                  makeNumberButtons()\r
                )\r
            )\r
          );\r
      }\r
\r
      function vendingFeet() {\r
        return new go.Panel("Table", {\r
            stretch: go.Stretch.Horizontal,\r
            height: 20,\r
          })\r
          .add(\r
            new go.Shape("RoundedBottomRectangle", {\r
              column: 0,\r
              width: 30,\r
              height: 18,\r
              stroke: settings.colors.stroke,\r
              strokeWidth: 2,\r
              fill: settings.colors.exterior,\r
              alignment: go.Spot.Left,\r
            }),\r
            new go.Shape("RoundedBottomRectangle", {\r
              column: 1,\r
              width: 30,\r
              height: 18,\r
              stroke: settings.colors.stroke,\r
              strokeWidth: 2,\r
              fill: settings.colors.exterior,\r
              alignment: go.Spot.Right,\r
            })\r
          );\r
      }\r
\r
      function vendingTemplate() {\r
        return (\r
          new go.Group("Vertical", {\r
            location: new go.Point(0, 0),\r
            locationSpot: go.Spot.BottomLeft,\r
            mouseDrop: handleVendingMouseDrop,\r
            zOrder: 0,\r
          })\r
            .bind("zOrder", "zOrder", zOrder => zOrder * 4)\r
            /* each group has a block of 4 z-orders for nodes related to the group\r
             * +0: vending machine\r
             * +1: invisible cells\r
             * +2: soda\r
             * +3: highlight\r
             */\r
\r
            .add(\r
              new go.Panel("Auto", {})\r
                .add(\r
                  new go.Shape("RoundedTopRectangle", {\r
                    fill: settings.colors.exterior,\r
                    strokeWidth: 2,\r
                    stroke: settings.colors.stroke,\r
                    parameter1: settings.r,\r
                  }),\r
                  new go.Panel("Table", {\r
                    stretch: go.Stretch.Fill,\r
                  })\r
                  .add(\r
                    // main part of vending machine\r
                    new go.Panel("Table", {\r
                        row: 0,\r
                        stretch: go.Stretch.Fill,\r
                      })\r
                      .add(interior(), controls()),\r
                    // dividing line\r
                    new go.Shape("MinusLine", {\r
                      row: 1,\r
                      height: 5,\r
                      stretch: go.Stretch.Horizontal,\r
                      strokeWidth: 2,\r
                      stroke: settings.colors.stroke,\r
                    }),\r
                    // pick up box\r
                    new go.Panel("Auto", {\r
                      row: 2,\r
                      margin: new go.Margin(20),\r
                      height: 50,\r
                      stretch: go.Stretch.Horizontal,\r
                    })\r
                    .add(\r
                      new go.Shape("RoundedRectangle", {\r
                        fill: settings.colors.dark,\r
                        strokeWidth: 2,\r
                        stroke: settings.colors.stroke,\r
                      }),\r
                      // highlights for aesthetics\r
                      new go.Shape({\r
                        alignment: go.Spot.TopLeft,\r
                        geometryString: \`M0 0 l5 0 m-20 0 l-50 0 a\${settings.r} \${\r
                          settings.r\r
                        } 0 0 0 \${-settings.r} \${settings.r} l0 20\`,\r
                        margin: new go.Margin(3),\r
                        strokeCap: "round",\r
                        stroke: settings.colors.highlight,\r
                        strokeWidth: 7,\r
                        opacity: 0.2,\r
                      })\r
                    )\r
                  ),\r
                  // highlights for aesthetics\r
                  makeCornerDecoration({\r
                    alignment: "TopLeft",\r
                    r: settings.r,\r
                    height: 50,\r
                    width: 50,\r
                    margin: [3],\r
                    horizontalDotWidth: 5,\r
                    horizontalDotSpacing: 20,\r
                    strokeWidth: 10,\r
                  }),\r
                  // highlights for aesthetics\r
                  makeCornerDecoration({\r
                    alignment: "TopRight",\r
                    r: settings.r,\r
                    height: 50,\r
                    width: 50,\r
                    margin: [3],\r
                    verticalDotWidth: 10,\r
                    verticalDotSpacing: 20,\r
                    strokeWidth: 10,\r
                  }),\r
                  // shadows for aesthetics\r
                  new go.Shape({\r
                    alignment: go.Spot.BottomRight,\r
                    margin: new go.Margin(6, 2),\r
                    strokeCap: "round",\r
                    stroke: settings.colors.shadow,\r
                    strokeWidth: 10,\r
                    opacity: 0.4,\r
                  })\r
                  .bind(\r
                    "geometryString",\r
                    "vendingMachineWidth",\r
                    vendingMachineWidth =>\r
                      \`M0 0 l0 50 a\${settings.r} \${\r
                        settings.r\r
                      } 0 0 1 \${-settings.r} \${settings.r} l\${\r
                        -45 * vendingMachineWidth\r
                      } 0\`\r
                  )\r
                ),\r
                vendingFeet()\r
              )\r
              .bindTwoWay(\r
                "location",\r
                "position",\r
                go.Point.parse,\r
                go.Point.stringify\r
              )\r
          );\r
      }\r
\r
      function vendingPaletteTemplate() {\r
        return new go.Group("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", {\r
            fill: settings.colors.exterior,\r
            strokeWidth: 2,\r
            stroke: settings.colors.stroke,\r
          }),\r
          new go.Panel("Vertical")\r
          .add(\r
            new go.Panel("Horizontal")\r
              .add(\r
                new go.Shape("RoundedRectangle", {\r
                  fill: settings.colors.interior,\r
                  strokeWidth: 2,\r
                  stroke: settings.colors.stroke,\r
                  height: 100,\r
                  width: 80,\r
                  margin: 2,\r
                }),\r
                new go.Shape("RoundedRectangle", {\r
                  fill: settings.colors.dark,\r
                  strokeWidth: 2,\r
                  stroke: settings.colors.stroke,\r
                  width: 30,\r
                  height: 50,\r
                  margin: 2,\r
                })\r
              ),\r
            new go.Shape("MinusLine", {\r
              height: 2,\r
              strokeWidth: 2,\r
              stroke: settings.colors.stroke,\r
              margin: new go.Margin(2, 0),\r
              width: 110,\r
            }),\r
            new go.Shape("RoundedRectangle", {\r
              fill: settings.colors.dark,\r
              strokeWidth: 2,\r
              stroke: settings.colors.stroke,\r
              height: 20,\r
              margin: 2,\r
            })\r
          )\r
        );\r
      }\r
\r
      function highlightTemplate() {\r
        return new go.Node("Auto", {\r
          pickable: false,\r
        })\r
          .add(\r
            makeCornerDecoration({\r
              width: 50,\r
              height: 50,\r
              horizontalDotSpacing: 20,\r
              horizontalDotWidth: 5,\r
              r: settings.r,\r
              strokeWidth: 10,\r
              opacity: 0.7,\r
              margin: [6],\r
            })\r
          )\r
          .bind("zOrder", "", data => {\r
            const groupData = myDiagram.model.findNodeDataForKey(data.group);\r
            const zOrder = groupData.zOrder;\r
            return zOrder * 4 + 3;\r
\r
            /* each group has a block of 4 z-orders for nodes related to the group\r
             * +0: vending machine\r
             * +1: invisible cells\r
             * +2: soda\r
             * +3: highlight\r
             */\r
          });\r
      }\r
\r
      function invisibleCellTemplate() {\r
        return new go.Node("Auto", {\r
          pickable: false,\r
          locationSpot: go.Spot.BottomCenter,\r
          selectable: false,\r
          zOrder: 1,\r
          mouseDrop: (e, node) => {\r
            // if you drop an item on an invisible cell, it just runs the mouseDrop function for the vending machine it's in\r
            // that way the invisible cells don't get in the way\r
            node.containingGroup.mouseDrop(e, node.containingGroup);\r
          },\r
        })\r
          .bind("zOrder", "", data => {\r
            const groupData = myDiagram.model.findNodeDataForKey(data.group);\r
            const zOrder = groupData.zOrder;\r
            return zOrder * 4 + 1;\r
\r
            /* each group has a block of 4 z-orders for nodes related to the group\r
             * +0: vending machine\r
             * +1: invisible cells\r
             * +2: soda\r
             * +3: highlight\r
             */\r
          })\r
          .add(\r
            new go.Shape("Rectangle", {\r
              name: "SHAPE",\r
              fill: "transparent",\r
              stroke: null,\r
              opacity: 0.25,\r
            })\r
              .bindTwoWay("height")\r
              .bindTwoWay("width")\r
          )\r
          .bindTwoWay(\r
            "location",\r
            "position",\r
            go.Point.parse,\r
            go.Point.stringify\r
          );\r
      }\r
\r
      // =================== SODA TEMPLATES ===================\r
\r
      const sodaCanTemplate = new go.Node("Auto", {})\r
        .add(\r
          new go.Panel("Auto")\r
            .add(\r
              // main can body\r
              new go.Shape("RoundedRectangle", {\r
                name: "MAIN_SHAPE",\r
                height: 50,\r
                parameter1: 4,\r
              }),\r
\r
              // label\r
              new go.Panel("Auto", {\r
                  width: 30,\r
                  height: 20,\r
                  alignment: go.Spot.Center,\r
                })\r
                .add(\r
                  new go.Shape("RoundedRectangle", {\r
                    name: "LABEL_SHAPE",\r
                    parameter1: 3,\r
                  }),\r
                  new go.TextBlock("SODA", {\r
                    name: "LABEL_TEXT",\r
                    font: "900 8px sans-serif",\r
                  })\r
                )\r
            ),\r
\r
          // duplicate indicator outline (hidden unless duplicate)\r
          // also used (when it's blue) to show which items you're about to delete\r
          new go.Shape("Rectangle", {\r
            name: "DUPLICATE_OUTLINE",\r
            height: 50,\r
          }),\r
          new go.Shape("RoundedRectangle", {\r
            name: "HIGHLIGHT",\r
            height: 48,\r
            margin: new go.Margin(0, 0, 0, 2),\r
          })\r
        )\r
        .apply(sodaStyle);\r
\r
      const sodaBottleTemplate = new go.Node("Auto", {})\r
        .add(\r
          new go.Panel("Spot")\r
            .add(\r
              new go.Shape("Soda", {\r
                name: "MAIN_SHAPE",\r
                height: 75,\r
              }),\r
              // label\r
              new go.Panel("Auto", {\r
                  // adding strokeWidth to width so they align\r
                  height: 25,\r
                  width: 37,\r
                  alignment: new go.Spot(0, 0.4),\r
                  alignmentFocus: go.Spot.TopLeft,\r
                })\r
                .add(\r
                  new go.Shape("Rectangle", {\r
                    name: "LABEL_SHAPE",\r
                  }),\r
                  new go.TextBlock("SODA", {\r
                    name: "LABEL_TEXT",\r
                    font: "900 10px sans-serif",\r
                  })\r
                )\r
            ),\r
          // highlight\r
          new go.Shape("RoundedRectangle", {\r
            name: "HIGHLIGHT",\r
            height: 55,\r
            margin: new go.Margin(15, 0, 0, 2),\r
          }),\r
          // duplicate indicator outline (hidden unless duplicate)\r
          // also used (when it's blue) to show which items you're about to delete\r
          new go.Shape("Rectangle", {\r
            name: "DUPLICATE_OUTLINE",\r
            height: 75,\r
          })\r
        )\r
        .apply(sodaStyle);\r
\r
      // =================== MODAL TEMPLATES ===================\r
\r
      // transparent shape that will fill the whole screen so the user can't do anything until they answer the pop up\r
      function modalBackgroundTemplate() {\r
        return new go.Node("Auto", {\r
          layerName: "Foreground",\r
          locationSpot: go.Spot.Center,\r
          movable: false,\r
          zOrder: 1, // goes behind modal which has z order 2\r
        })\r
          .add(\r
            new go.Shape({\r
              fill: settings.colors.interior,\r
              opacity: 0.2,\r
            })\r
              .bind("height", "viewportHeight")\r
              .bind("width", "viewportWidth")\r
          )\r
          .bind("visible");\r
      }\r
\r
      function modalButton(text, margin, name) {\r
        const btn = go.GraphObject.build("Button", {\r
            "ButtonBorder.strokeWidth": 0,\r
            "ButtonBorder.fill": settings.colors.palettes.beige.labelColor,\r
            click: () => {\r
              hideModal();\r
            },\r
          })\r
          .add(\r
            new go.TextBlock(text, {\r
              stroke: settings.colors.stroke,\r
            })\r
          );\r
        if (margin) {\r
          btn.margin = margin;\r
        }\r
        if (name) {\r
          btn.name = name;\r
        }\r
        return btn;\r
      }\r
\r
      function modalTemplate() {\r
        return new go.Node("Auto", {\r
          layerName: "Foreground",\r
          zOrder: 2, // goes in front of bg which has z order 1\r
          locationSpot: go.Spot.TopLeft,\r
          selectionAdorned: false,\r
        })\r
          .add(\r
            new go.Shape("RoundedRectangle", {\r
              fill: settings.colors.palettes.beige.fillColor,\r
              strokeWidth: 2,\r
              stroke: settings.colors.stroke,\r
            }),\r
            new go.Panel("Vertical", {\r
                margin: 10,\r
              })\r
              .add(\r
                // "This will delete x items. Are you sure?"\r
                new go.TextBlock({\r
                  name: "TEXT",\r
                  font: "15px sans-serif",\r
                  margin: new go.Margin(0, 0, 5, 0),\r
                  stroke: settings.colors.stroke,\r
                })\r
                .bind("text"),\r
                new go.Panel("Horizontal")\r
                  .add(\r
                    modalButton("Yes", new go.Margin(0, 5, 0, 0), "YES"),\r
                    modalButton("No")\r
                  )\r
              )\r
          )\r
          .bind("visible");\r
      }\r
\r
      /***********************************************************************\r
       *                        HELPFUL FUNCTIONS                            *\r
       ***********************************************************************/\r
\r
      // returns a list of all soda data in diagram model\r
      function allSodas() {\r
        return myDiagram.model.nodeDataArray.filter(node =>\r
          sodaCategories.includes(node.category)\r
        );\r
      }\r
\r
      // returns a list of all group NODES in diagram model\r
      function allGroups() {\r
        const groups = [];\r
        myDiagram.nodes.each(node => {\r
          if (node instanceof go.Group) {\r
            groups.push(node);\r
          }\r
        });\r
        return groups;\r
      }\r
\r
      // return data of soda at given spot\r
      // or returns false if there's nothing at that location\r
      // used in getClosestCell()\r
      function sodaAt(group, shelf, coil) {\r
        for (const soda of allSodas()) {\r
          if (\r
            soda.group === group &&\r
            soda.shelf === shelf &&\r
            soda.coil === coil\r
          ) {\r
            return soda;\r
          }\r
        }\r
        return false;\r
      }\r
\r
      // runs the filterFunction on all sodas and then runs the actionFunction on each soda that passes the filter\r
      function editSoda(filterFunction, actionFunction) {\r
        const filteredSodas = allSodas().filter(filterFunction);\r
        for (const nodeData of filteredSodas) {\r
          actionFunction(nodeData);\r
        }\r
      }\r
\r
      function highestZOrder() {\r
        let maxZOrder = 0;\r
        myDiagram.model.nodeDataArray.forEach(data => {\r
          if (data.isGroup && data.zOrder && data.zOrder > maxZOrder) {\r
            maxZOrder = data.zOrder;\r
          }\r
        });\r
        return maxZOrder;\r
      }\r
\r
      // used in removeShelfButton()\r
      function getButtonClickedInfo(btn) {\r
        // find first panel with data\r
        let dataPanel = btn.panel;\r
        while (!dataPanel.data) {\r
          dataPanel = dataPanel.panel;\r
        }\r
\r
        // return info about it\r
        const { itemArray, key } = btn.part.data;\r
        const data = dataPanel.data;\r
        return {\r
          itemArray: itemArray,\r
          groupKey: key,\r
          shelfNum: itemArray.indexOf(data),\r
        };\r
      }\r
\r
      // give an array in the itemArray of the group and it returns the data of the surrounding group\r
      function findGroupData(data) {\r
        function findGroupDataInModel(diagram) {\r
          return diagram.model.nodeDataArray.find(\r
            nodeData => nodeData.isGroup && nodeData.itemArray.includes(data)\r
          );\r
        }\r
\r
        let result = findGroupDataInModel(myDiagram);\r
        if (!result) {\r
          result = findGroupDataInModel(vendingMachinePalette);\r
        }\r
        return result;\r
      }\r
\r
      function getDataFromGraphObject(button) {\r
        let panel = button.panel;\r
        while (!panel.data) {\r
          panel = panel.panel;\r
        }\r
        return panel.data;\r
      }\r
\r
      function topMostGroupKey(location) {\r
        // get top most-group\r
        const topGroup = myDiagram.findObjectAt(\r
          location,\r
          obj => obj.part,\r
          obj => obj.part instanceof go.Group\r
        );\r
        return topGroup ? topGroup.data.key : null;\r
      }\r
\r
      // helper function for getClosestCell()\r
      function findIntersectingCells(node, groupKey) {\r
        const nodeBounds = node.getDocumentBounds();\r
        const intersectingCells = [];\r
        const invisibleCells = myDiagram.findNodesByExample({\r
          category: "InvisibleCell",\r
          group: groupKey,\r
        });\r
        invisibleCells.each(cell => {\r
          const cellBounds = cell.getDocumentBounds();\r
          // if node is touching cell\r
          if (nodeBounds.intersectsRect(cellBounds)) {\r
            // if node is the right size to fit in cell\r
            if (\r
              nodeBounds.height <= cellBounds.height &&\r
              nodeBounds.width <= cellBounds.width\r
            ) {\r
              const { group, shelf, coil } = cell.data;\r
              // now as long as there's no soda already there, add it to the list\r
              const sodaAlreadyThere = sodaAt(group, shelf, coil);\r
              if (sodaAlreadyThere.key === node.data.key || !sodaAlreadyThere) {\r
                intersectingCells.push(cell);\r
              }\r
            }\r
          }\r
        });\r
        return intersectingCells;\r
      }\r
\r
      // helper function for getClosestCell()\r
      function cellClosestToMouse(cells) {\r
        const mousePt = myDiagram.lastInput.documentPoint;\r
        closestDist = Infinity;\r
        closestCell = null;\r
        for (const cell of cells) {\r
          const bounds = cell.getDocumentBounds();\r
          const bottomLeft = new go.Point(bounds.x, bounds.y + bounds.height);\r
          const dist = mousePt.distanceSquaredPoint(bottomLeft);\r
          if (dist < closestDist) {\r
            closestDist = dist;\r
            closestCell = cell;\r
          }\r
        }\r
        return closestCell;\r
      }\r
\r
      // give a node (and a groupKey, if you already know the topmost group it should be in)\r
      // returns the closest cell that the node can fit into.\r
      // (or null if the node isn't touching any cells)\r
      function getClosestCell(node, groupKey) {\r
        if (!groupKey) {\r
          groupKey = topMostGroupKey(node.location);\r
          if (!groupKey) return null;\r
        }\r
\r
        const intersectingCells = findIntersectingCells(node, groupKey);\r
\r
        if (intersectingCells.length > 1) {\r
          return cellClosestToMouse(intersectingCells);\r
        } else if (intersectingCells.length === 1) {\r
          return intersectingCells[0];\r
        } else {\r
          return null;\r
        }\r
      }\r
\r
      // =================== DEAL WITH DUPLICATE SODAS ===================\r
\r
      // Marks in model data whether for all sodas of this type, whether they are duplicates or not\r
      function handleDuplicates(type) {\r
        const sodas = allSodas().filter(\r
          soda => soda.color + soda.category === type\r
        );\r
        const isDuplicate = sodas.length > 1;\r
        for (const soda of sodas) {\r
          myDiagram.model.set(soda, "duplicate", isDuplicate);\r
        }\r
        if (!settings.allowDuplicates) findAndRemovePaletteDuplicates();\r
      }\r
\r
      function handleAllDuplicates() {\r
        const types = [];\r
        for (soda of allSodas()) {\r
          const type = soda.color + soda.category;\r
          if (!types.includes(type)) {\r
            types.push(type);\r
          }\r
        }\r
        for (type of types) {\r
          handleDuplicates(type);\r
        }\r
        if (!settings.allowDuplicates) findAndRemovePaletteDuplicates();\r
      }\r
\r
      // finds all duplicate sodas in the palette and removes them\r
      // but only if allowDuplicates is false\r
      // regardless of whether it's false or not, if it's from the palette we set it as not from the palette anymore\r
      function handleItemFromPalette(data) {\r
        myDiagram.model.set(data, "isFromPalette", undefined);\r
        myDiagram.model.set(data, "paletteLocation", undefined);\r
        if (!settings.allowDuplicates) {\r
          palette.model.removeNodeData(\r
            palette.model.findNodeDataForKey(data.type)\r
          );\r
        }\r
        handleDuplicates(data.type);\r
        if (!settings.allowDuplicates) findAndRemovePaletteDuplicates();\r
      }\r
\r
      // =================== FUNCTIONS TO EDIT THE MODEL ===================\r
\r
      // vending machine falling animation when you drop it somewhere\r
      function animateDrop(nodes) {\r
        myDiagram.startTransaction("drop vending machine");\r
        const animation = new go.Animation();\r
        animation.duration = 400;\r
        nodes.each(selected => {\r
          if (selected instanceof go.Group) {\r
            animation.add(\r
              selected,\r
              "location",\r
              selected.location,\r
              new go.Point(selected.location.x, 0)\r
            );\r
            // make it animate all items in the group too\r
            selected.memberParts.each(member => {\r
              animation.add(\r
                member,\r
                "location",\r
                member.location,\r
                new go.Point(\r
                  member.location.x,\r
                  member.location.y - selected.location.y\r
                )\r
              );\r
            });\r
            const highlight = myDiagram.findNodeForKey(\r
              "highlight " + selected.key\r
            );\r
            if (highlight) {\r
              animation.add(\r
                highlight,\r
                "location",\r
                highlight.location,\r
                new go.Point(\r
                  highlight.location.x,\r
                  highlight.location.y - selected.location.y\r
                )\r
              );\r
            }\r
            setTimeout(() => {\r
              myDiagram.model.set(\r
                selected.data,\r
                "position",\r
                selected.location.x + " 0"\r
              );\r
            }, animation.duration);\r
          }\r
        });\r
        animation.start();\r
\r
        setTimeout(() => {\r
          remakeAllInvisibleCells();\r
          updateHighlights();\r
          myDiagram.commitTransaction("drop vending machine");\r
        }, animation.duration);\r
      }\r
\r
      function fillShelf() {\r
        const fillSoda = sodaRightClickedData;\r
        myDiagram.startTransaction("fill shelf");\r
        const shelfNum = fillSoda.shelf;\r
        const groupKey = fillSoda.group;\r
        const vendingMachineWidth =\r
          myDiagram.model.findNodeDataForKey(groupKey).vendingMachineWidth;\r
\r
        // delete former sodas\r
        editSoda(\r
          soda =>\r
            soda.shelf === shelfNum &&\r
            soda.group === groupKey &&\r
            soda !== fillSoda,\r
          soda => {\r
            myDiagram.model.removeNodeData(soda);\r
          }\r
        );\r
\r
        // fill with new sodas\r
        for (let i = 0; i < vendingMachineWidth; i++) {\r
          if (i !== fillSoda.coil) {\r
            const data = Object.assign({}, fillSoda);\r
            data.coil = i;\r
            myDiagram.model.addNodeData(data);\r
          }\r
        }\r
        handleDuplicates(fillSoda.color + fillSoda.category);\r
        myDiagram.commitTransaction("fill shelf");\r
      }\r
\r
      function removeShelf(affectedSodas, shelfNum, itemArray, groupKey) {\r
        myDiagram.startTransaction("Delete row");\r
        for (const soda of affectedSodas) {\r
          if (soda.shelf === shelfNum) {\r
            const type = soda.type;\r
            myDiagram.model.removeNodeData(soda);\r
            handleDuplicates(type);\r
            if (!settings.allowDuplicates) findAndRemovePaletteDuplicates();\r
          } else {\r
            myDiagram.model.set(soda, "shelf", soda.shelf - 1);\r
          }\r
        }\r
\r
        handleAllDuplicates();\r
        myDiagram.model.removeArrayItem(itemArray, shelfNum);\r
        // we need this to update locations before transaction is finished\r
        myDiagram.findNodeForKey(groupKey).ensureBounds();\r
        updateInvisibleCells();\r
        updateHighlights();\r
        myDiagram.updateAllTargetBindings();\r
        myDiagram.commitTransaction("Delete row");\r
      }\r
\r
      function removeColumn(affectedSodas, data, newVendingMachineWidth) {\r
        myDiagram.startTransaction("delete column");\r
        myDiagram.model.set(\r
          data,\r
          "vendingMachineWidth",\r
          newVendingMachineWidth\r
        );\r
\r
        // get rid of items that were on deleted shelf\r
        for (const soda of affectedSodas) {\r
          myDiagram.model.removeNodeData(soda);\r
        }\r
\r
        handleAllDuplicates();\r
\r
        // update invisibleCells' positions\r
        updateInvisibleCells();\r
        myDiagram.commitTransaction("delete column");\r
      }\r
\r
      // =================== MODAL ===================\r
\r
      function makeModal() {\r
        myDiagram.model.addNodeData({\r
          key: "modal",\r
          category: "modal",\r
          visible: false,\r
        });\r
        myDiagram.model.addNodeData({\r
          key: "modalBg",\r
          category: "modalBg",\r
          visible: false,\r
        });\r
      }\r
\r
      function showModal(sodaDeleteCount, deleteFunction, button) {\r
        let modalData = myDiagram.model.findNodeDataForKey("modal");\r
        if (!modalData) {\r
          makeModal();\r
          modalData = myDiagram.model.findNodeDataForKey("modal");\r
        }\r
        modalNode = myDiagram.findNodeForKey("modal");\r
\r
        let modalBgData = myDiagram.model.findNodeDataForKey("modalBg");\r
        modalBgNode = myDiagram.findNodeForKey("modalBg");\r
\r
        const center = myDiagram.viewportBounds.center;\r
        myDiagram.model.set(modalData, "visible", true);\r
        myDiagram.model.set(modalBgData, "visible", true);\r
        myDiagram.model.set(\r
          modalBgData,\r
          "viewportHeight",\r
          myDiagram.viewportBounds.height\r
        );\r
        myDiagram.model.set(\r
          modalBgData,\r
          "viewportWidth",\r
          myDiagram.viewportBounds.width\r
        );\r
        myDiagram.model.set(\r
          modalData,\r
          "text",\r
          \`This will delete \${sodaDeleteCount} \${\r
            sodaDeleteCount === 1 ? "item" : "items"\r
          }. Are you sure?\`\r
        );\r
\r
        // position modal so it doesn't go off screen\r
        modalNode.updateTargetBindings();\r
        modalNode.ensureBounds(); // <--- force GoJS to measure now\r
        const modalBounds = modalNode.measuredBounds;\r
        const { width, height } = modalBounds;\r
        modalNode.location = button.getDocumentBounds().center;\r
        const rightEdgeX =\r
          myDiagram.viewportBounds.center.x +\r
          myDiagram.viewportBounds.width / 2;\r
        const bottomEdgeY =\r
          myDiagram.viewportBounds.center.y +\r
          myDiagram.viewportBounds.height / 2;\r
        const modalRightEdge = modalNode.location.x + modalBounds.width;\r
        if (modalRightEdge > rightEdgeX) {\r
          modalNode.location = new go.Point(\r
            modalNode.location.x - (modalRightEdge - rightEdgeX),\r
            modalNode.location.y\r
          );\r
        }\r
        const modalBottomEdge = modalNode.location.y + modalBounds.height;\r
        if (modalBottomEdge > bottomEdgeY) {\r
          modalNode.location = new go.Point(\r
            modalNode.location.x,\r
            modalNode.location.y - (modalBottomEdge - bottomEdgeY)\r
          );\r
        }\r
\r
        modalBgNode.location = center;\r
        modalNode.findObject("YES").click = () => {\r
          deleteFunction();\r
          hideModal();\r
        };\r
        myDiagram.select(modalNode);\r
      }\r
\r
      function hideModal() {\r
        myDiagram.startTransaction("hide modal");\r
\r
        // get rid of all the highlights on the toDelete sodas\r
        editSoda(\r
          soda => soda.toDelete,\r
          soda => {\r
            myDiagram.model.set(soda, "toDelete", false);\r
          }\r
        );\r
\r
        const modal = myDiagram.model.findNodeDataForKey("modal");\r
        const modalBg = myDiagram.model.findNodeDataForKey("modalBg");\r
\r
        myDiagram.model.set(modal, "visible", false);\r
        myDiagram.model.set(modalBg, "visible", false);\r
        myDiagram.commitTransaction("hide modal");\r
      }\r
\r
      /***********************************************************************\r
       *                    DIAGRAM SETUP/EDIT FUNCTIONS                     *\r
       ***********************************************************************/\r
\r
      function initPalette() {\r
        palette.model = new go.GraphLinksModel([]);\r
        let x = 0;\r
        let y = 0;\r
        for (const key in settings.colors.palettes) {\r
          x = 0;\r
          for (const style of ["can", "bottle"]) {\r
            palette.model.addNodeData({\r
              key: key + style,\r
              type: key + style,\r
              category: style,\r
              isFromPalette: true,\r
              paletteLocation: x + " " + y,\r
              color: key,\r
            });\r
            x += settings.paletteXSpacing;\r
          }\r
          y += settings.paletteYSpacing;\r
        }\r
      }\r
\r
      function findAndRemovePaletteDuplicates() {\r
        const typesInDiagram = new Set();\r
        for (soda of allSodas()) {\r
          const type = soda.color + soda.category;\r
          typesInDiagram.add(type);\r
        }\r
        const allPossibleTypes = new Set();\r
        for (key in settings.colors.palettes) {\r
          allPossibleTypes.add(key + "can");\r
          allPossibleTypes.add(key + "bottle");\r
        }\r
        const typesInPalette = allPossibleTypes.difference(typesInDiagram);\r
        allPossibleTypes.forEach(type => {\r
          const paletteSoda = palette.model.findNodeDataForKey(type);\r
          if (paletteSoda && !typesInPalette.has(type)) {\r
            palette.model.removeNodeData(paletteSoda);\r
          }\r
          if (!paletteSoda && typesInPalette.has(type)) {\r
            const match = type.match(/(.*)(bottle|can)/);\r
            const color = match[1];\r
            const canOrBottle = match[2];\r
            const x = ["can", "bottle"].indexOf(canOrBottle);\r
            const y = Object.keys(settings.colors.palettes).indexOf(color);\r
            palette.model.addNodeData({\r
              key: color + canOrBottle,\r
              category: canOrBottle,\r
              color: color,\r
              isFromPalette: true,\r
              paletteLocation:\r
                x * settings.paletteXSpacing +\r
                " " +\r
                y * settings.paletteYSpacing,\r
            });\r
          }\r
        });\r
      }\r
\r
      /***********************************************************************\r
       *                          EVENT FUNCTIONS                            *\r
       ***********************************************************************/\r
\r
      function handleDiagramMouseDrop(e) {\r
        resetAllInvisibleCells();\r
        if (settings.allowTopLevel) {\r
          // when the selection is dropped in the diagram's background,\r
          // make sure the selected Parts no longer belong to any Group\r
          if (\r
            !e.diagram.commandHandler.addTopLevelParts(\r
              e.diagram.selection,\r
              true\r
            )\r
          ) {\r
            e.diagram.currentTool.doCancel();\r
          }\r
        } else {\r
          // disallow dropping any regular nodes onto the background, but allow dropping vending machines,\r
          // including any selected member nodes\r
          if (\r
            !e.diagram.selection.all(p => {\r
              return (\r
                p instanceof go.Group ||\r
                (!p.isTopLevel && p.containingGroup.isSelected)\r
              );\r
            })\r
          ) {\r
            e.diagram.currentTool.doCancel();\r
          }\r
        }\r
\r
        // if you drop a vending machine somewhere it'll animate it going back to y=0\r
        // you can just give the animateDrop function all the dragged parts\r
        // it skips non-vending-machines\r
        let draggingParts = e.diagram.currentTool.draggingParts;\r
        if (draggingParts) {\r
          animateDrop(draggingParts);\r
        }\r
      }\r
\r
      // handles dropping a vending machine into the diagram from the palette\r
      function handleExternalObjectDropped(node) {\r
        if (node instanceof go.Group) {\r
          // Remakes itemArray on drop\r
          // Otherwise, all vending machines from palette share the reference to the same one\r
          // So adding a shelf to one affects all the others (that are from the palette)\r
          // Fix: remake it so each machine gets its own new itemArray\r
          node.data.itemArray = Array(node.data.itemArray.length)\r
            .fill(null)\r
            .map(() => ({}));\r
\r
          myDiagram.model.set(\r
            node.data,\r
            "zOrder",\r
            highestZOrder() + 1\r
          );\r
          updateHighlights();\r
          animateDrop(new go.Set().add(node));\r
        }\r
        if (node.data.isFromPalette) {\r
          handleItemFromPalette(node.data);\r
        }\r
      }\r
\r
      /***********************************************************************\r
       *                    INVISIBLE CELLS FUNCTIONS                        *\r
       ***********************************************************************/\r
\r
      function populateWithInvisibleCells() {\r
        for (grp of allGroups()) {\r
          let shelfnum = 0;\r
          const shelves = grp.findObject("SHELVESLIST");\r
          let prevMarginBottom = 0;\r
          shelves.elements.each(verticalShelf => {\r
            // whole shelf\r
            const coils = verticalShelf.elt(0);\r
            const shelfHeight =\r
              coils.height +\r
              coils.margin.top +\r
              verticalShelf.margin.top +\r
              prevMarginBottom;\r
            prevMarginBottom = verticalShelf.margin.bottom;\r
            let coilnum = 0;\r
            for (const panel of coils.elements) {\r
              // found a coil\r
              coil = panel.elements.first();\r
              if (coil.name === "COIL") {\r
                // found a coil\r
                const bounds = coil.getDocumentBounds();\r
                // bottom center of coil\r
                // i just add 10 for the margin, then an extra 4 to the width to make it fill up the whole space. since the divider lines have a margin of 1.5 on each side so you should add 3 but 4 makes it look nicer\r
                const coilWidth = bounds.width + 14;\r
                myDiagram.model.addNodeData({\r
                  // IVC for In-Visible-Cell\r
                  key: "IVC " + grp.key + " " + shelfnum + " " + coilnum,\r
                  shelf: shelfnum,\r
                  coil: coilnum,\r
                  group: grp.data.key,\r
                  category: "InvisibleCell",\r
                  position:\r
                    bounds.x +\r
                    bounds.width / 2 +\r
                    " " +\r
                    (bounds.y + bounds.height),\r
                  width: coilWidth,\r
                  height: shelfHeight,\r
                });\r
                coilnum++;\r
              }\r
            }\r
            shelfnum++;\r
          });\r
        }\r
      }\r
\r
      function updateHighlights() {\r
        for (grp of allGroups()) {\r
          let highlight = myDiagram.findNodeForKey("highlight " + grp.key);\r
          if (!highlight) {\r
            myDiagram.model.addNodeData({\r
              key: "highlight " + grp.key,\r
              category: "highlight",\r
              group: grp.key,\r
            });\r
            highlight = myDiagram.findNodeForKey("highlight " + grp.key);\r
          }\r
          const loc = grp.findObject("HIGHLIGHT GOES HERE").getDocumentBounds();\r
          highlight.location = new go.Point(loc.x, loc.y);\r
        }\r
      }\r
\r
      function resetAllInvisibleCells() {\r
        myDiagram.nodes.each(node => {\r
          if (node.data.category === "InvisibleCell") {\r
            node.findObject("SHAPE").fill = "transparent";\r
          }\r
        });\r
      }\r
\r
      function updateInvisibleCells() {\r
        const allCells = myDiagram.model.nodeDataArray.filter(\r
          data => data.category === "InvisibleCell"\r
        );\r
        for (cell of allCells) {\r
          myDiagram.model.removeNodeData(cell);\r
        }\r
        populateWithInvisibleCells();\r
        // btw this function won't make a visible change unless you do myDiagram.updateAllTargetBindings(); after calling it\r
      }\r
\r
      function remakeAllInvisibleCells() {\r
        // definitely not efficient\r
        myDiagram.nodes.each(node => {\r
          if (node.data.category === "InvisibleCell") {\r
            myDiagram.model.removeNodeData(node.data);\r
          }\r
        });\r
        populateWithInvisibleCells();\r
      }\r
\r
      /***********************************************************************\r
       *                                  INIT                               *\r
       ***********************************************************************/\r
      function init() {\r
        // just making sure the checkboxes shows the right thing\r
        document.getElementById("showHideButtonsCheckbox").checked =\r
          settings.editMode;\r
        document.getElementById("settings.allowDuplicatesCheckbox").checked =\r
          settings.allowDuplicates;\r
\r
        myDiagram = new go.Diagram(\r
          "myDiagramDiv", // create a Diagram for the HTML div element\r
          {\r
            "undoManager.isEnabled": true,\r
            "animationManager.initialAnimationStyle": go.AnimationStyle.None,\r
          }\r
        );\r
\r
        myDiagram.addDiagramListener("Modified", e => {\r
          const button = document.getElementById("SaveButton");\r
          if (button) button.disabled = !myDiagram.isModified;\r
          const idx = document.title.indexOf("*");\r
          if (myDiagram.isModified) {\r
            if (idx < 0) document.title += "*";\r
          } else {\r
            if (idx >= 0) document.title = document.title.slice(0, idx);\r
          }\r
        });\r
\r
        // =================== OVERRIDING TOOLS ===================\r
\r
        // this makes it so when you drag a soda it will highlight where it can drop\r
        myDiagram.toolManager.draggingTool.doDragOver = function () {\r
          // calling super function\r
          go.DraggingTool.prototype.doDragOver.call(this);\r
\r
          resetAllInvisibleCells();\r
\r
          let draggingGroup = false;\r
          this.draggingParts.each(selected => {\r
            if (draggingGroup) return;\r
\r
            const topGroup = topMostGroupKey(selected.location);\r
            if (!topGroup) {\r
              if (!settings.allowTopLevel) {\r
                myDiagram.currentCursor = "not-allowed";\r
              } else {\r
                myDiagram.currentCursor = "";\r
              }\r
              return;\r
            }\r
\r
            if (\r
              selected.data.isGroup ||\r
              selected.data.category === "InvisibleCell"\r
            ) {\r
              draggingGroup = true;\r
              myDiagram.currentCursor = "";\r
              resetAllInvisibleCells();\r
              updateHighlights();\r
              return;\r
            }\r
            const closestCell = getClosestCell(selected, topGroup);\r
            if (closestCell === null) {\r
              myDiagram.currentCursor = "not-allowed";\r
            } else {\r
              closestCell.findObject("SHAPE").fill = settings.colors.stroke;\r
            }\r
          });\r
        };\r
\r
        myDiagram.toolManager.draggingTool.doActivate = function () {\r
          go.DraggingTool.prototype.doActivate.call(this);\r
          this._lastDraggedParts = this.draggingParts;\r
          this.draggingParts.each(selected => {\r
            if (selected.data.isGroup) {\r
              const z = highestZOrder();\r
              if (z !== selected.data.zOrder) {\r
                // if the group is not the highest zOrder, set it to the highest zOrder + 1\r
                myDiagram.model.set(selected.data, "zOrder", z + 1);\r
              }\r
            }\r
\r
            myDiagram.updateAllTargetBindings();\r
          });\r
        };\r
\r
        // when you delete an item it updates if there are still duplicates - so the red highlight will go away if you deleted a duplicate item\r
        myDiagram.commandHandler.deleteSelection = function () {\r
          myDiagram.startTransaction("delete");\r
          myDiagram.selection.each(node => {\r
            if (node instanceof go.Group) {\r
              myDiagram.model.removeNodeData(\r
                myDiagram.model.findNodeDataForKey("highlight " + node.key)\r
              );\r
            }\r
          });\r
          go.CommandHandler.prototype.deleteSelection.call(this);\r
          handleAllDuplicates();\r
          myDiagram.updateAllTargetBindings();\r
          myDiagram.commitTransaction("delete");\r
        };\r
\r
        // Set the HTMLInfo:\r
        myDiagram.toolManager.textEditingTool.defaultTextEditor = customEditor;\r
\r
        // =================== TEMPLATES ===================\r
\r
        myDiagram.groupTemplate = vendingTemplate();\r
        myDiagram.nodeTemplateMap.add("can", sodaCanTemplate);\r
        myDiagram.nodeTemplateMap.add("bottle", sodaBottleTemplate);\r
        myDiagram.nodeTemplateMap.add("modal", modalTemplate());\r
        myDiagram.nodeTemplateMap.add("modalBg", modalBackgroundTemplate());\r
        myDiagram.nodeTemplateMap.add("highlight", highlightTemplate());\r
\r
        myDiagram.model = modelTemplate;\r
\r
        /***********************************************************************\r
         * INVISIBLE CELL NODES – used only for drop logic\r
         *\r
         * These are invisible "helper" nodes positioned over the vending\r
         * machine coils. They don't show up in the diagram (fill: transparent)\r
         * Except when you are dragging a soda over them -\r
         * - then they will highlight to show where it will drop.\r
         * They're not saved to the JSON when you click the Save button.\r
         *\r
         * Why we use them:\r
         * - They define valid drop zones for soda items\r
         * - They let us highlight valid slots when dragging sodas\r
         * - They have position/size info to help calculate placement\r
         *\r
         * Each InvisibleCell is generated dynamically by\r
         * populateWithInvisibleCells(), based on current shelves.\r
         ***********************************************************************/\r
        myDiagram.nodeTemplateMap.add("InvisibleCell", invisibleCellTemplate());\r
\r
        myDiagram.addDiagramListener("InitialLayoutCompleted", () => {\r
          populateWithInvisibleCells();\r
          updateHighlights();\r
          myDiagram.updateAllTargetBindings();\r
        });\r
\r
        // otherwise the cells go back to being highlighted when you undo\r
        myDiagram.addModelChangedListener(e => {\r
          if (e.propertyName === "FinishedUndo") {\r
            resetAllInvisibleCells();\r
          }\r
        });\r
\r
        palette = new go.Palette("sodaPalette", {\r
          // share the templates with the main Diagram\r
          nodeTemplateMap: myDiagram.nodeTemplateMap,\r
        });\r
        // without this not-a-layout, sodas appear in the order they were added instead of the order I put them in\r
        class NotALayout extends go.Layout {\r
          // does nothing, I just don't want a layout\r
        }\r
        palette.layout = new NotALayout();\r
        initPalette();\r
\r
        // initialize the Palette\r
        vendingMachinePalette = new go.Palette("vendingMachinePaletteDiv", {});\r
        vendingMachinePalette.groupTemplate = vendingPaletteTemplate();\r
        vendingMachinePalette.model = new go.GraphLinksModel([\r
          {\r
            key: 3,\r
            isGroup: true,\r
            vendingMachineWidth: 4,\r
            // five rows when you pull the vending machine out of the palette\r
            itemArray: [{}, { height: 100 }, {}, {}, {}],\r
          },\r
        ]);\r
\r
        myDiagram.mouseDrop = handleDiagramMouseDrop;\r
\r
        // handles dropping a vending machine into the diagram from the palette\r
        myDiagram.addDiagramListener("ExternalObjectsDropped", e => {\r
          handleExternalObjectDropped(e.subject.first());\r
        });\r
\r
        handleAllDuplicates();\r
        if (!settings.allowDuplicates) findAndRemovePaletteDuplicates();\r
        save();\r
      } // end of init function\r
      document.addEventListener("DOMContentLoaded", init);\r
\r
      // save model but without the invisible cells\r
      function save() {\r
        const noCellsModel = new go.GraphLinksModel(\r
          myDiagram.model.nodeDataArray.filter(\r
            data =>\r
              data.category !== "InvisibleCell" &&\r
              data.category !== "modal" &&\r
              data.category !== "modalBg" &&\r
              data.category !== "highlight"\r
          )\r
        );\r
        noCellsModel.nodeDataArray.forEach(data => {\r
          // remove the dragging property from the saved model\r
          delete data.duplicate;\r
        });\r
        document.getElementById("mySavedModel").value = noCellsModel.toJson();\r
        myDiagram.isModified = false;\r
      }\r
\r
      // load the model and add invisible cells back\r
      function load() {\r
        myDiagram.model = go.Model.fromJson(\r
          document.getElementById("mySavedModel").value\r
        );\r
\r
        myDiagram.startTransaction("load");\r
\r
        handleAllDuplicates();\r
        myDiagram.layoutDiagram(true);\r
        populateWithInvisibleCells();\r
        updateHighlights();\r
        myDiagram.updateAllTargetBindings();\r
        myDiagram.commitTransaction("load");\r
      }\r
\r
      function toggleEditMode() {\r
        // the transaction doesn't actually save it when you undo cause settings.editMode is a global var\r
        myDiagram.startTransaction("toggle edit mode");\r
        settings.editMode = settings.editMode ? false : true;\r
        myDiagram.updateAllTargetBindings();\r
\r
        myDiagram.commitTransaction("toggle edit mode");\r
      }\r
\r
      function toggleAllowDuplicates() {\r
        myDiagram.startTransaction("toggle allow duplicates");\r
        settings.allowDuplicates = settings.allowDuplicates ? false : true;\r
        handleAllDuplicates();\r
        if (settings.allowDuplicates) {\r
          initPalette();\r
        } else {\r
          findAndRemovePaletteDuplicates();\r
        }\r
        myDiagram.updateAllTargetBindings();\r
        myDiagram.commitTransaction("toggle allow duplicates");\r
      }`,cssCode:`:root {\r
        --light: rgba(235, 243, 235, 1);\r
        --dark: rgba(89, 99, 89, 1);\r
        --medium: rgba(197, 206, 197, 1);\r
\r
        --stroke: #2f3c2f;\r
      }\r
\r
      .html-info {\r
        display: none; /* hide by default */\r
      }\r
\r
      #height-input-div {\r
        padding: 6px;\r
        border-radius: 6px;\r
        font: 600 15px sans-serif;\r
        outline: none;\r
        background: var(--light);\r
        border: 2px solid var(--dark);\r
        color: var(--dark);\r
      }\r
\r
      #height-input-div input {\r
        outline: none; /* no outline when focused */\r
        border: none;\r
        background: var(--light);\r
        width: 40px;\r
      }\r
\r
        #height-input-div .arrows {\r
            display: flex;\r
            flex-direction: column;\r
            gap: 3px;\r
        }\r
\r
      #height-input-div .arrow {\r
        width: 16px;\r
      }\r
\r
      .arrow {\r
        right: 8px;\r
        height: 16px;\r
        cursor: pointer;\r
        display: flex;\r
        justify-content: center; /* center text content (the arrow) horizontally */\r
        align-items: center; /* center text content (the arrow) vertically */\r
        background-color: var(--medium);\r
        border-radius: 3px;\r
        font-size: 12px;\r
        color: var(--dark);\r
        user-select: none; /* no highlight or anything when selected */\r
      }\r
\r
      #add-row-input-div {\r
        flex-direction: column;\r
        gap: 5px;\r
        padding: 6px;\r
        border-radius: 6px;\r
        font: 600 15px sans-serif;\r
        outline: none;\r
        background: var(--light);\r
        border: 2px solid var(--dark);\r
        color: var(--dark);\r
        user-select: none; /* no highlight or anything when selected */\r
      }\r
\r
      #add-row-input-div div {\r
        display: flex;\r
        gap: 4px;\r
        width: 130px;\r
        height: 18px;\r
      }\r
\r
      #add-row-input-div input {\r
        width: 20px;\r
        font-size: 10px;\r
        border: none;\r
        border-radius: 3px;\r
        color: var(--dark);\r
        padding: 4px;\r
        background-color: var(--medium);\r
      }\r
\r
      #add-row-input-div p {\r
        width: 40px;\r
        font-size: 10px;\r
        color: var(--dark);\r
      }\r
\r
      #fill-shelf-button {\r
        border: 2px solid var(--stroke);\r
        border-radius: 3px;\r
        background-color: var(--light);\r
        color: var(--stroke);\r
      }\r
\r
      input::selection {\r
        background-color: #6b7b6b;\r
        color: white;\r
      }\r
\r
      /* This CSS is used to create the accordion for the Palettes */\r
      input[type="radio"] {\r
        position: absolute;\r
        opacity: 0;\r
        z-index: -1;\r
      }\r
\r
      input[type="radio"]:checked + .tab-label {\r
        background: #1a252f;\r
        font-size: 25px;\r
      }\r
      input[type="radio"]:checked + .tab-label::after {\r
        transform: rotate(90deg);\r
      }\r
      input[type="radio"]:checked ~ .tab-content {\r
        max-height: 100vh;\r
      }\r
\r
      /* Accordion styles */\r
      .tabs {\r
        overflow: hidden;\r
      }\r
\r
      .tab {\r
        width: 100%;\r
        color: white;\r
        overflow: hidden;\r
      }\r
      .tab-label {\r
        font-family: sans-serif;\r
        display: flex;\r
        justify-content: space-between;\r
        padding: 0.5em;\r
        background: #1f4963;\r
        cursor: pointer;\r
      }\r
      .tab-label:hover {\r
        background: #627f91;\r
      }\r
      .tab-label::after {\r
        content: "❯";\r
        width: 1em;\r
        height: 1em;\r
        text-align: center;\r
        transition: all 0.35s;\r
      }\r
      .tab-content {\r
        max-height: 0;\r
        color: #2c3e50;\r
        background: white;\r
      }\r
      .tab-close {\r
        display: flex;\r
        justify-content: flex-end;\r
        padding: 1em;\r
        font-size: 0.75em;\r
        background: #2c3e50;\r
        cursor: pointer;\r
      }\r
      .tab-close:hover {\r
        background: #1a252f;\r
      }\r
\r
      .checkbox-wrapper input[type="checkbox"] {\r
        height: 0;\r
        width: 0;\r
        visibility: hidden;\r
      }\r
\r
      .checkbox-wrapper label {\r
        cursor: pointer;\r
        width: 130px;\r
        height: 25px;\r
        background: grey;\r
        display: flex;\r
        align-items: center;\r
        justify-content: center;\r
        border-radius: 100px;\r
        position: relative;\r
        color: white;\r
        font-size: 12px;\r
      }\r
\r
      .checkbox-wrapper label:after {\r
        content: "";\r
        position: absolute;\r
        top: 2.5px;\r
        left: 2.5px;\r
        width: 25px;\r
        height: 20px;\r
        background: #fff;\r
        border-radius: 90px;\r
        transition: 0.3s;\r
      }\r
\r
      .checkbox-wrapper input:checked + label {\r
        background: #7e9c8f;\r
      }\r
\r
      .checkbox-wrapper input:checked + label:after {\r
        left: calc(100% - 2.5%);\r
        transform: translateX(-100%);\r
      }\r
\r
      .checkbox-wrapper .slider-text {\r
        font-family: sans-serif;\r
        text-decoration: line-through;\r
        display: inline-block; /* so transform works */\r
        transform: translateX(10px);\r
        transition: transform 0.3s, text-decoration 0.3s;\r
      }\r
\r
      /* when checked: remove strikethrough and shift left */\r
      .checkbox-wrapper input:checked + label .slider-text {\r
        text-decoration: none;\r
        transform: translateX(-10px);\r
      }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
        A <em>planogram</em> is a visual representation of a store's products or\r
        services, often used as a tool to maximize sales. GoJS can be used to build planogramming software for display (such as inventory monitoring)\r
        or interactive control and shelf layout.\r
    </p>\r
    <p>\r
        <strong>How it works:</strong>\r
        Use the <a>Palette</a> on the left to drag and drop sodas (cans and\r
        bottles) onto vending machines in the main diagram area. Sodas are\r
        implemented as <a>Node</a>s, while vending machines are <a>Group</a>s.\r
        When you drag a soda over a vending machine, valid drop zones are\r
        highlighted using invisible helper nodes (they then become visible to show\r
        the highlight), making sodas snap into the available slots.\r
    </p>\r
    <p>\r
        <strong>Edit Mode & Duplicates:</strong>\r
        Use the HTML toggles under the palette to turn on and off\r
        <b>Edit Mode</b> and <b>Allow Duplicate Sodas</b>.\r
    </p>\r
    <ul>\r
        <li>\r
        When Edit Mode is enabled: allows the user to click buttons to adjust\r
        the vending machine size (add and delete columns and rows) as well as\r
        change the heights of rows.\r
        </li>\r
        <li>\r
        When Duplicates are disabled: Dragging a soda out of the palette will\r
        delete it from the palette, and the palette only shows the types of\r
        sodas that don't already exist in the diagram. Sodas that appear more\r
        than once in the diagram get highlighted in red. This sort of feature\r
        would be useful for planogramming applications where you want to ensure\r
        each item is unique.\r
        </li>\r
    </ul>\r
    <p>\r
        <strong>HTML Interaction:</strong>\r
        The controls and popups in this sample use custom HTML editors. Clicking\r
        shelf height buttons or add shelf buttons opens HTML input dialogs for\r
        editing. Right clicking on a soda shows an HTML button allowing you to\r
        fill the entire row with that particular type of soda.\r
    </p>\r
    <p>\r
        This sample uses\r
        <a href="../intro/geometry">geometry path strings</a>\r
        to create the shapes of the highlights on the corners of parts of the\r
        vending machine. It also uses\r
        <a href="../intro/itemArrays">itemArray Panels</a> to display a\r
        variable number of rows (shelves) in each vending machine, and another\r
        itemArray Panel in each shelf to display a variable number of columns.\r
    </p>\r
    <p>\r
        This sample uses <a>Animation</a> to make\r
        the vending machines fall back down to the ground when you move them.\r
    </p>\r
    <p>\r
        See also Northwoods Software's planogramming services:\r
        <a href="https://goplanogram.com" target="_blank">GoPlanogram</a>.\r
    </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`groups`,`palette`,`html`,`commands`,`animation`,`buttons`,`geometries`,`itemarrays`,`tables`,`tools`];var g=y();l(`1i0hub1`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};