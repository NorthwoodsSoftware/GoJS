import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Diagram for Building Circuit Schematics`,titleShort:`Circuit Designer`,indexDescription:`A diagram and palette of circuit componenets that allows for the creation of circuit schematics with manually shaped and routed links that save to a JSON model.`,screenshot:`circuit`,priority:.99,tags:[`palette`,`geometries`,`links`,`ports`,`groups`,`tools`],description:`Interactive circuit schematic implemented by GoJS in JavaScript for HTML.`},htmlContent:`<div class="sampleWrapper">\r
      <div style="width: 100%; height: fit-content; display: flex; flex: 2;">\r
        <div\r
          id="myPaletteDiv"\r
          style="border: solid 1px black; width: 300px; height: 700px; background: white;"></div>\r
        <div\r
          id="myDiagramDiv"\r
          style="border: solid 1px black; width: 100%; height: 700px; background: white;"></div>\r
      </div>\r
      <div\r
        id="menuDiv"\r
        style="display: flex; justify-content: space-between; margin: 10px 0px">\r
        <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: center; padding: .5rem;">\r
          <label for="pinNumInput" style="text-wrap: nowrap">Number of Pins: </label>\r
          <input\r
            id="pinNumInput"\r
            type="number"\r
            min="4"\r
            max="98"\r
            step="2"\r
            style="text-align: center; width: 100%" />\r
          <label for="ICNameInput" style="text-wrap: nowrap">Model Name: </label>\r
          <input id="ICNameInput" style="text-align: center; width: 100%" />\r
          <button onclick="addICHandler()" style="grid-column: 2;">Add Integrated Circuit</button>\r
        </div>\r
        <div style="display: flex; gap: .5em;">\r
          <button onclick="myDiagram.commandHandler.groupSelection()" style="height: fit-content;">\r
            Group Selected\r
          </button>\r
          <button onclick="myDiagram.commandHandler.ungroupSelection()" style="height: fit-content;">\r
            Ungroup Selected\r
          </button>\r
          <button id="markPortsButton" onclick="unusedPorts()" style="height: fit-content;">Mark Unused Ports</button>\r
          <button id="unmarkPortsButton" onclick="unmarkPorts()" style="display: none; height: fit-content;">Unmark Unused Ports</button>\r
        </div>\r
      </div>\r
      \r
      <div style="margin-block: .5em;">\r
        <button id="SaveButton" onclick="save()">Save</button>\r
        <button onclick="load()">Load</button>\r
        Diagram Model saved in JSON format:\r
      </div>\r
      <textarea id="mySavedModel" style="width: 100%; height: 200px">\r
{ "class": "GraphLinksModel",\r
  "linkFromPortIdProperty": "fromPort",\r
  "linkToPortIdProperty": "toPort",\r
  "nodeDataArray": [\r
{"key":-1,"category":"IC","name":"555","pinArrays":[[{"key":1,"side":"left"},{"key":2,"side":"left"},{"key":3,"side":"left"},{"key":4,"side":"left"}],[{"key":8,"side":"right"},{"key":7,"side":"right"},{"key":6,"side":"right"},{"key":5,"side":"right"}]],"orientation":"vertical","loc":"-294.5 -110","group":-77},\r
{"key":-2,"category":"IC","name":"SN76477","pinArrays":[[{"key":1,"side":"left"},{"key":2,"side":"left"},{"key":3,"side":"left"},{"key":4,"side":"left"},{"key":5,"side":"left"},{"key":6,"side":"left"},{"key":7,"side":"left"},{"key":8,"side":"left"},{"key":9,"side":"left"},{"key":10,"side":"left"},{"key":11,"side":"left"},{"key":12,"side":"left"},{"key":13,"side":"left"},{"key":14,"side":"left"}],[{"key":28,"side":"right"},{"key":27,"side":"right"},{"key":26,"side":"right"},{"key":25,"side":"right"},{"key":24,"side":"right"},{"key":23,"side":"right"},{"key":22,"side":"right"},{"key":21,"side":"right"},{"key":20,"side":"right"},{"key":19,"side":"right"},{"key":18,"side":"right"},{"key":17,"side":"right"},{"key":16,"side":"right"},{"key":15,"side":"right"}]],"orientation":"horizontal","loc":"90 -120"},\r
{"key":-3,"category":"part","partType":"resistor","toolTip":"Resistor","text":"100 k","orientation":"vertical","loc":"-514.5 -240","group":-77},\r
{"key":-4,"category":"junction","loc":"-514.5 -200","group":-77},\r
{"key":-5,"category":"part","partType":"resistor","toolTip":"Resistor","text":"100 k","orientation":"vertical","loc":"-514.5 -160","group":-77},\r
{"key":-6,"category":"junction","loc":"-514.5 -100","group":-77},\r
{"key":-7,"category":"part","partType":"capacitorPolarized","toolTip":"Polarized Capacitor","text":"220 pF","orientation":"vertical","loc":"-514.5 -50","group":-77},\r
{"key":-8,"category":"junction","loc":"-514.5 0","group":-77},\r
{"key":-9,"category":"junction","loc":"-424.5 -30","group":-77},\r
{"key":-10,"category":"part","partType":"pushSwitch","toolTip":"Push Switch","text":null,"strokeWidth":1,"orientation":"horizontal","loc":"-234.5 -290","group":-77},\r
{"key":-11,"category":"junction","loc":"-414.5 -270","group":-77},\r
{"key":-12,"category":"junction","loc":"-184.5 -250","group":-77},\r
{"key":-13,"category":"junction","loc":"-110 -250"},\r
{"key":-14,"category":"junction","loc":"-80 -290"},\r
{"key":-15,"category":"part","partType":"resistor","toolTip":"Resistor","text":"5 k","orientation":"verticalFlipped","loc":"-80 -320"},\r
{"key":-16,"category":"junction","loc":"-50 -360"},\r
{"key":-17,"category":"junction","loc":"-20 -360"},\r
{"key":-18,"category":"part","partType":"capacitorPolarized","toolTip":"Polarized Capacitor","text":".1 \\u03bcF","orientation":"verticalFlipped","loc":"100 -320"},\r
{"key":-19,"category":"junction","loc":"100 -360"},\r
{"key":-20,"category":"junction","loc":"150 -360"},\r
{"key":-21,"category":"part","partType":"potentiometer","toolTip":"Potentiometer","text":"1M","orientation":"verticalFlipped","loc":"150 -320"},\r
{"key":-22,"category":"part","partType":"resistor","toolTip":"Resistor","text":"100 k","orientation":"vertical","loc":"200 -320"},\r
{"key":-23,"category":"junction","loc":"160 -250"},\r
{"key":-24,"category":"part","partType":"resistor","toolTip":"Resistor","text":"47 k","orientation":"vertical","loc":"270 -320"},\r
{"key":-25,"category":"junction","loc":"270 -360"},\r
{"key":-26,"category":"part","partType":"capacitorPolarized","toolTip":"Polarized Capacitor","text":".1 \\u03bcF","orientation":"verticalFlipped","loc":"370 -320"},\r
{"key":-27,"category":"junction","loc":"370 -360"},\r
{"key":-28,"category":"junction","loc":"310 -250"},\r
{"key":-29,"category":"label","text":"5 V","loc":"330 -260"},\r
{"key":-30,"category":"junction","loc":"570 -320"},\r
{"key":-31,"category":"part","partType":"resistor","toolTip":"Resistor","text":"77 k","orientation":"horizontal","loc":"510 -320"},\r
{"key":-32,"category":"part","partType":"resistor","toolTip":"Resistor","text":"68 k","orientation":"horizontal","loc":"510 -280"},\r
{"key":-33,"category":"junction","loc":"450 -280"},\r
{"key":-35,"category":"junction","loc":"450 -250"},\r
{"key":-36,"category":"voltDiv","name":"7805","orientation":"verticalFlipped","loc":"450 -150"},\r
{"key":-37,"category":"junction","loc":"570 -150"},\r
{"key":-38,"category":"junction","loc":"450 0"},\r
{"key":-39,"category":"label","text":"9 V","loc":"430 -10"},\r
{"key":-40,"category":"part","partType":"bjtNPN","toolTip":"NPN Bipolar Junction Transistor","text":"2N3904","orientation":"vertical","loc":"450 60"},\r
{"key":-41,"category":"junction","loc":"390 60"},\r
{"key":-42,"category":"part","partType":"diodeStandard","toolTip":"Standard Diode","text":"1N4148","fill":"black","orientation":"vertical","loc":"390 120"},\r
{"key":-43,"category":"part","partType":"diodeStandard","toolTip":"Standard Diode","text":"1N4148","fill":"black","orientation":"vertical","loc":"390 200"},\r
{"key":-44,"category":"part","partType":"resistor","toolTip":"Resistor","text":"1.5\\nOhm","orientation":"vertical","loc":"510 120"},\r
{"key":-45,"category":"part","partType":"resistor","toolTip":"Resistor","text":"1.5\\nOhm","orientation":"vertical","loc":"510 200"},\r
{"key":-46,"category":"junction","loc":"510 160"},\r
{"key":-47,"category":"part","partType":"bjtPNP","toolTip":"PNP Bipolar Junction Transistor","text":"2N3906","orientation":"vertical","loc":"450 260"},\r
{"key":-48,"category":"junction","loc":"390 260"},\r
{"key":-49,"category":"junction","loc":"450 340"},\r
{"key":-50,"category":"part","partType":"resistor","toolTip":"Resistor","text":"10 k","orientation":"vertical","loc":"330 290"},\r
{"key":-51,"category":"junction","loc":"330 340"},\r
{"key":-52,"category":"part","partType":"resistor","toolTip":"Resistor","text":"330 k","orientation":"vertical","loc":"10 290"},\r
{"key":-53,"category":"part","partType":"resistor","toolTip":"Resistor","text":"47 k","orientation":"verticalFlipped","loc":"-20 290"},\r
{"key":-54,"category":"junction","loc":"10 340"},\r
{"key":-55,"category":"junction","loc":"-20 340"},\r
{"key":-56,"category":"junction","loc":"-110 20"},\r
{"key":-57,"category":"junction","loc":"-80 20"},\r
{"key":-58,"category":"junction","loc":"-140 20"},\r
{"key":-59,"category":"part","partType":"capacitorPolarized","toolTip":"Polarized Capacitor","text":"100 \\u03bcF","orientation":"vertical","loc":"90 290"},\r
{"key":-60,"category":"junction","loc":"90 340"},\r
{"key":-61,"category":"junction","loc":"230 340"},\r
{"key":-62,"category":"part","partType":"resistor","toolTip":"Resistor","text":"100 k","orientation":"vertical","loc":"260 290"},\r
{"key":-63,"category":"part","partType":"resistor","toolTip":"Resistor","text":"100 k","orientation":"verticalFlipped","loc":"230 290"},\r
{"key":-64,"category":"junction","loc":"260 340"},\r
{"key":-65,"category":"part","partType":"resistor","toolTip":"Resistor","text":"47 k","orientation":"vertical","loc":"320 90"},\r
{"key":-66,"category":"junction","loc":"170 340"},\r
{"key":-67,"category":"junction","isHollow":true,"loc":"680 0.13522086576601566","group":-76},\r
{"key":-68,"category":"junction","isHollow":true,"loc":"680 340.1352208657661","group":-76},\r
{"key":-69,"category":"label","text":"Plus\\n9 V\\nInput","loc":"710 0.13522086576601566","group":-76},\r
{"key":-70,"category":"label","text":"Minus","loc":"710 340.1352208657661","group":-76},\r
{"key":-71,"category":"part","partType":"speaker","toolTip":"Speaker","text":null,"strokeWidth":1,"orientation":"horizontal","loc":"690 180.135220865766","group":-76},\r
{"key":-72,"category":"junction","loc":"570 340"},\r
{"key":-73,"category":"junction","loc":"640 340"},\r
{"key":-74,"category":"label","text":"Speaker","loc":"700 120.13522086576603","group":-76},\r
{"key":-75,"category":"label","text":"Whistle","loc":"-284.5 -310","group":-77},\r
{"text":"555 Timer Section","color":"#029ffa10","isGroup":true,"key":-77},\r
{"text":"Sound/Input","color":"#02fa7610","isGroup":true,"key":-76}\r
],\r
  "linkDataArray": [\r
{"from":-4,"to":-3,"fromPort":"top","toPort":"out","points":[-514.5,-205,-514.5,-215,-514.5,-139.25,-514.5,-139.25,-514.5,-213.5,-514.5,-223.5]},\r
{"from":-4,"to":-5,"fromPort":"bottom","toPort":"in","points":[-514.5,-195,-514.5,-185,-514.5,-75.75,-514.5,-75.75,-514.5,-186.5,-514.5,-176.5]},\r
{"from":-5,"to":-6,"fromPort":"out","toPort":"top","points":[-514.5,-143.5,-514.5,-133.5,-514.5,-104.25,-514.5,-104.25,-514.5,-115,-514.5,-105]},\r
{"from":-6,"to":-7,"fromPort":"bottom","toPort":"in","points":[-514.5,-95,-514.5,-85,-514.5,-77.75,-514.5,-77.75,-514.5,-70.5,-514.5,-60.5]},\r
{"from":-7,"to":-8,"fromPort":"out","toPort":"top","points":[-514.5,-39.5,-514.5,-29.5,-514.5,-27.25,-514.5,-27.25,-514.5,-15,-514.5,-5]},\r
{"from":-8,"to":-1,"fromPort":"right","toPort":"1","points":[-509.5,0,-499.5,0,-453.80859375,0,-453.80859375,-160,-391,-160,-381,-160]},\r
{"from":-9,"to":-6,"fromPort":"left","toPort":"right","points":[-429.5,-30,-439.5,-30,-437.5546875,-30,-437.5546875,-100,-499.5,-100,-509.5,-100]},\r
{"from":-9,"to":-1,"fromPort":"top","toPort":"2","points":[-424.5,-35,-424.5,-45,-424.5,-130,-391,-130,-391,-130,-381,-130]},\r
{"from":-11,"to":-1,"fromPort":"bottom","toPort":"4","points":[-414.5,-265,-414.5,-255,-414.5,-70,-391,-70,-391,-70,-381,-70]},\r
{"from":-1,"to":-10,"fromPort":"3","toPort":"in","points":[-381,-100,-391,-100,-391,-226.6484375,-264.5,-226.6484375,-264.5,-290,-254.5,-290]},\r
{"from":-1,"to":-12,"fromPort":"8","toPort":"bottom","points":[-208,-160,-198,-160,-184.5,-160,-184.5,-235,-184.5,-235,-184.5,-245]},\r
{"from":-11,"to":-12,"fromPort":"right","toPort":"left","points":[-409.5,-270,-399.5,-270,-299.5,-270,-299.5,-250,-199.5,-250,-189.5,-250]},\r
{"from":-2,"to":-13,"fromPort":"28","toPort":"bottom","points":[-110,-206.5,-110,-216.5,-110,-225.75,-110,-225.75,-110,-235,-110,-245]},\r
{"from":-10,"to":-14,"fromPort":"out","toPort":"left","points":[-214.5,-290,-204.5,-290,-142.5,-290,-142.5,-290,-95,-290,-85,-290]},\r
{"from":-14,"to":-2,"fromPort":"bottom","toPort":"27","points":[-80,-285,-80,-275,-80,-240.75,-80,-240.75,-80,-216.5,-80,-206.5]},\r
{"from":-2,"to":-16,"fromPort":"26","toPort":"bottom","points":[-50,-206.5,-50,-216.5,-50,-275.75,-50,-275.75,-50,-345,-50,-355]},\r
{"from":-2,"to":-17,"fromPort":"25","toPort":"bottom","points":[-20,-206.5,-20,-216.5,-20,-275.75,-20,-275.75,-20,-345,-20,-355]},\r
{"from":-14,"to":-15,"fromPort":"top","toPort":"in","points":[-80,-295,-80,-305,-80,-305,-80,-293.5,-80,-293.5,-80,-303.5]},\r
{"from":-16,"to":-17,"fromPort":"right","toPort":"left","points":[-45,-360,-35,-360,-35,-360,-35,-360,-35,-360,-25,-360]},\r
{"from":-2,"to":-18,"fromPort":"21","toPort":"in","points":[100,-206.5,100,-216.5,100,-258,100,-258,100,-299.5,100,-309.5]},\r
{"from":-19,"to":-18,"fromPort":"bottom","toPort":"out","points":[100,-355,100,-345,100,-345,100,-340.5,100,-340.5,100,-330.5]},\r
{"from":-15,"to":-16,"fromPort":"out","toPort":"left","points":[-80,-336.5,-80,-346.5,-80,-360,-72.5,-360,-65,-360,-55,-360]},\r
{"from":-17,"to":-19,"fromPort":"right","toPort":"left","points":[-15,-360,-5,-360,40,-360,40,-360,85,-360,95,-360]},\r
{"from":-21,"to":-20,"fromPort":"out","toPort":"bottom","points":[150,-336.5,150,-346.5,150,-346.5,150,-345,150,-345,150,-355]},\r
{"from":-19,"to":-20,"fromPort":"right","toPort":"left","points":[105,-360,115,-360,125,-360,125,-360,135,-360,145,-360]},\r
{"from":-21,"to":-21,"fromPort":"in","toPort":"wiper","points":[150,-303.5,150,-293.5,150,-290.5,178.15,-290.5,178.15,-320,168.15,-320]},\r
{"from":-22,"to":-21,"fromPort":"in","toPort":"wiper","points":[200,-336.5,200,-346.5,178.1875,-346.5,178.1875,-320,178.15,-320,168.15,-320]},\r
{"from":-22,"to":-2,"fromPort":"out","toPort":"20","points":[200,-303.5,200,-293.5,200,-276.515625,130,-276.515625,130,-216.5,130,-206.5]},\r
{"from":-2,"to":-23,"fromPort":"19","toPort":"bottom","points":[160,-206.5,160,-216.5,160,-225.75,160,-225.75,160,-235,160,-245]},\r
{"from":-13,"to":-23,"fromPort":"right","toPort":"left","points":[-105,-250,-95,-250,25,-250,25,-250,145,-250,155,-250]},\r
{"from":-11,"to":-3,"fromPort":"left","toPort":"in","points":[-419.5,-270,-429.5,-270,-514.5,-270,-514.5,-266.5,-514.5,-266.5,-514.5,-256.5]},\r
{"from":-2,"to":-24,"fromPort":"18","toPort":"out","points":[190,-206.5,190,-216.5,190,-267.45703125,270,-267.45703125,270,-293.5,270,-303.5]},\r
{"from":-24,"to":-25,"fromPort":"in","toPort":"bottom","points":[270,-336.5,270,-346.5,270,-346.5,270,-345,270,-345,270,-355]},\r
{"from":-20,"to":-25,"fromPort":"right","toPort":"left","points":[155,-360,165,-360,210,-360,210,-360,255,-360,265,-360]},\r
{"from":-25,"to":-27,"fromPort":"right","toPort":"left","points":[275,-360,285,-360,330,-360,330,-360,355,-360,365,-360]},\r
{"from":-26,"to":-27,"fromPort":"out","toPort":"bottom","points":[370,-330.5,370,-340.5,370,-342.75,370,-342.75,370,-345,370,-355]},\r
{"from":-23,"to":-28,"fromPort":"right","toPort":"left","points":[165,-250,175,-250,240,-250,240,-250,295,-250,305,-250]},\r
{"from":-31,"to":-30,"fromPort":"out","toPort":"left","points":[526.5,-320,536.5,-320,545.75,-320,545.75,-320,555,-320,565,-320]},\r
{"from":-33,"to":-32,"fromPort":"right","toPort":"in","points":[455,-280,465,-280,474.25,-280,474.25,-280,483.5,-280,493.5,-280]},\r
{"from":-2,"to":-33,"fromPort":"16","toPort":"left","points":[250,-206.5,250,-216.5,250,-234.421875,404.3203125,-234.421875,404.3203125,-280,435,-280,445,-280]},\r
{"from":-2,"to":-26,"fromPort":"17","toPort":"in","points":[220,-206.5,220,-216.5,220,-222.6640625,370,-222.6640625,370,-299.5,370,-309.5]},\r
{"from":-28,"to":-35,"fromPort":"right","toPort":"left","points":[315,-250,325,-250,405,-250,405,-250,435,-250,445,-250]},\r
{"from":-32,"to":-35,"fromPort":"out","toPort":"right","points":[526.5,-280,536.5,-280,536.5,-250,500.75,-250,465,-250,455,-250]},\r
{"from":-30,"to":-37,"fromPort":"bottom","toPort":"top","points":[570,-315,570,-305,570,-240,570,-240,570,-165,570,-155]},\r
{"from":-36,"to":-37,"fromPort":"ground","toPort":"left","points":[469,-150,479,-150,517,-150,517,-150,555,-150,565,-150]},\r
{"from":-35,"to":-36,"fromPort":"bottom","toPort":"out","points":[450,-245,450,-235,450,-209.5,450,-209.5,450,-184,450,-174]},\r
{"from":-31,"to":-33,"fromPort":"in","toPort":"top","points":[493.5,-320,483.5,-320,450,-320,450,-307.5,450,-295,450,-285]},\r
{"from":-36,"to":-38,"fromPort":"in","toPort":"top","points":[450,-126,450,-116,450,-65.5,450,-65.5,450,-15,450,-5]},\r
{"from":-2,"to":-38,"fromPort":"14","toPort":"left","points":[280,-33.5,280,-23.5,280,0,435,0,435,0,445,0]},\r
{"from":-38,"to":-40,"fromPort":"bottom","toPort":"collector","points":[450,5,450,15,450,24.25,450,24.25,450,33.5,450,43.5]},\r
{"from":-41,"to":-40,"fromPort":"right","toPort":"base","points":[395,60,405,60,417.75,60,417.75,60,420.5,60,430.5,60]},\r
{"from":-2,"to":-41,"fromPort":"13","toPort":"top","points":[250,-33.5,250,-23.5,250,20.625,390,20.625,390,45,390,55]},\r
{"from":-41,"to":-42,"fromPort":"bottom","toPort":"in","points":[390,65,390,75,390,87.25,390,87.25,390,99.5,390,109.5]},\r
{"from":-40,"to":-44,"fromPort":"emitter","toPort":"in","points":[450,76.5,450,86.5,450,90,510,90,510,93.5,510,103.5]},\r
{"from":-44,"to":-46,"fromPort":"out","toPort":"top","points":[510,136.5,510,146.5,510,146.5,510,145,510,145,510,155]},\r
{"from":-45,"to":-46,"fromPort":"in","toPort":"bottom","points":[510,183.5,510,173.5,510,173.5,510,175,510,175,510,165]},\r
{"from":-42,"to":-43,"fromPort":"out","toPort":"in","points":[390,130.5,390,140.5,390,160,390,160,390,179.5,390,189.5]},\r
{"from":-45,"to":-47,"fromPort":"out","toPort":"collector","points":[510,216.5,510,226.5,510,235,450,235,450,233.5,450,243.5]},\r
{"from":-43,"to":-48,"fromPort":"out","toPort":"top","points":[390,210.5,390,220.5,390,237.75,390,237.75,390,245,390,255]},\r
{"from":-48,"to":-47,"fromPort":"right","toPort":"base","points":[395,260,405,260,412.75,260,412.75,260,420.5,260,430.5,260]},\r
{"from":-47,"to":-49,"fromPort":"emitter","toPort":"top","points":[450,276.5,450,286.5,450,310.75,450,310.75,450,325,450,335]},\r
{"from":-51,"to":-49,"fromPort":"right","toPort":"left","points":[335,340,345,340,385,340,385,340,435,340,445,340]},\r
{"from":-50,"to":-51,"fromPort":"out","toPort":"top","points":[330,306.5,330,316.5,330,316.5,330,325,330,325,330,335]},\r
{"from":-2,"to":-53,"fromPort":"4","toPort":"out","points":[-20,-33.5,-20,-23.5,-20,115,-20,115,-20,263.5,-20,273.5]},\r
{"from":-2,"to":-52,"fromPort":"5","toPort":"in","points":[10,-33.5,10,-23.5,10,115,10,115,10,263.5,10,273.5]},\r
{"from":-52,"to":-54,"fromPort":"out","toPort":"top","points":[10,306.5,10,316.5,10,320.75,10,320.75,10,325,10,335]},\r
{"from":-53,"to":-55,"fromPort":"in","toPort":"top","points":[-20,306.5,-20,316.5,-20,320.75,-20,320.75,-20,325,-20,335]},\r
{"from":-9,"to":-1,"fromPort":"right","toPort":"6","points":[-419.5,-30,-409.5,-30,-198,-30,-198,-65,-198,-100,-208,-100]},\r
{"from":-1,"to":-4,"fromPort":"7","toPort":"right","points":[-208,-130,-198,-130,-198,-200,-348.75,-200,-499.5,-200,-509.5,-200]},\r
{"from":-12,"to":-13,"fromPort":"right","toPort":"left","points":[-179.5,-250,-169.5,-250,-140,-250,-140,-250,-125,-250,-115,-250]},\r
{"from":-2,"to":-56,"fromPort":"1","toPort":"top","points":[-110,-33.5,-110,-23.5,-110,-9.25,-110,-9.25,-110,5,-110,15]},\r
{"from":-2,"to":-57,"fromPort":"2","toPort":"top","points":[-80,-33.5,-80,-23.5,-80,-9.25,-80,-9.25,-80,5,-80,15]},\r
{"from":-57,"to":-2,"fromPort":"right","toPort":"3","points":[-75,20,-65,20,-50,20,-50,-1.75,-50,-23.5,-50,-33.5]},\r
{"from":-58,"to":-56,"fromPort":"right","toPort":"left","points":[-135,20,-125,20,-125,20,-125,20,-125,20,-115,20]},\r
{"from":-56,"to":-57,"fromPort":"right","toPort":"left","points":[-105,20,-95,20,-95,20,-95,20,-95,20,-85,20]},\r
{"from":-8,"to":-58,"fromPort":"bottom","toPort":"left","points":[-514.5,5,-514.5,15,-514.5,20,-155,20,-155,20,-145,20]},\r
{"from":-58,"to":-55,"fromPort":"bottom","toPort":"left","points":[-140,25,-140,35,-140,340,-87.5,340,-35,340,-25,340]},\r
{"from":-59,"to":-2,"fromPort":"in","toPort":"6","points":[90,279.5,90,269.5,90,123,40,123,40,-23.5,40,-33.5]},\r
{"from":-54,"to":-60,"fromPort":"right","toPort":"left","points":[15,340,25,340,50,340,50,340,75,340,85,340]},\r
{"from":-59,"to":-60,"fromPort":"out","toPort":"top","points":[90,300.5,90,310.5,90,317.75,90,317.75,90,325,90,335]},\r
{"from":-63,"to":-61,"fromPort":"in","toPort":"top","points":[230,306.5,230,316.5,230,320.75,230,320.75,230,325,230,335]},\r
{"from":-2,"to":-63,"fromPort":"10","toPort":"out","points":[160,-33.5,160,-23.5,160,122.42968377976197,230,122.42968377976197,230,263.5,230,273.5]},\r
{"from":-2,"to":-62,"fromPort":"11","toPort":"in","points":[190,-33.5,190,-23.5,190,96.93006463913697,260,96.93006463913697,260,263.5,260,273.5]},\r
{"from":-62,"to":-64,"fromPort":"out","toPort":"top","points":[260,306.5,260,316.5,260,320.75,260,320.75,260,325,260,335]},\r
{"from":-2,"to":-65,"fromPort":"12","toPort":"in","points":[220,-33.5,220,-23.5,220,50.79302362351197,320,50.79302362351197,320,63.5,320,73.5]},\r
{"from":-2,"to":-66,"fromPort":"9","toPort":"top","points":[130,-33.5,130,-23.5,130,150.75,170,150.75,170,325,170,335]},\r
{"from":-66,"to":-61,"fromPort":"right","toPort":"left","points":[175,340,185,340,175,340,175,340,215,340,225,340]},\r
{"from":-60,"to":-66,"fromPort":"right","toPort":"left","points":[95,340,105,340,100,340,100,340,155,340,165,340]},\r
{"from":-55,"to":-54,"fromPort":"right","toPort":"left","points":[-15,340,-5,340,-5,340,-5,340,-5,340,5,340]},\r
{"from":-61,"to":-64,"fromPort":"right","toPort":"left","points":[235,340,245,340,235,340,235,340,245,340,255,340]},\r
{"from":-64,"to":-51,"fromPort":"right","toPort":"left","points":[265,340,275,340,310,340,310,340,315,340,325,340]},\r
{"from":-48,"to":-50,"fromPort":"left","toPort":"in","points":[385,260,375,260,330,260,330,261.75,330,263.5,330,273.5]},\r
{"from":-38,"to":-67,"fromPort":"right","toPort":"left","points":[455,0,465,0,640,0,640,0.13522086576601566,665,0.13522086576601566,675,0.13522086576601566]},\r
{"from":-46,"to":-71,"fromPort":"right","toPort":"in","points":[515,160,525,160,626,160,626,160.135220865766,667,160.135220865766,677,160.135220865766]},\r
{"from":-37,"to":-72,"fromPort":"bottom","toPort":"top","points":[570,-145,570,-135,570,95,570,95,570,325,570,335]},\r
{"from":-49,"to":-72,"fromPort":"right","toPort":"left","points":[455,340,465,340,510,340,510,340,555,340,565,340]},\r
{"from":-72,"to":-73,"fromPort":"right","toPort":"left","points":[575,340,585,340,620,340,620,340,625,340,635,340]},\r
{"from":-65,"to":-46,"fromPort":"out","toPort":"left","points":[320,106.5,320,116.5,320,160,495,160,495,160,505,160]},\r
{"from":-27,"to":-30,"fromPort":"right","toPort":"top","points":[375,-360,385,-360,570,-360,570,-347.5,570,-335,570,-325]},\r
{"from":-73,"to":-71,"fromPort":"top","toPort":"out","points":[640,335,640,325,640,190.135220865766,653.5,190.135220865766,667,190.135220865766,677,190.135220865766]},\r
{"from":-73,"to":-68,"fromPort":"right","toPort":"left","points":[645,340,655,340,660,340,660,340.1352208657661,665,340.1352208657661,675,340.1352208657661]}\r
]}\r
      </textarea>\r
    </div>`,jsCode:`// Size of the grid snapping cells\r
  const CELLSIZE = 10;\r
\r
  function init() {\r
    myDiagram =\r
      new go.Diagram('myDiagramDiv', {\r
        'undoManager.isEnabled': true,\r
        // Lets links be reshaped and moved around\r
        linkReshapingTool: new OrthogonalLinkReshapingTool(),\r
        // enables the grid snapping tool for dragging nodes, default is 10x10\r
        'draggingTool.isGridSnapEnabled': true,\r
        'draggingTool.gridSnapCellSize': new go.Size(CELLSIZE, CELLSIZE),\r
        // allow Ctrl-G to call groupSelection()\r
        'commandHandler.archetypeGroupData': { text: 'Group', color: '#029ffa10', isGroup: true },\r
        'toolManager.hoverDelay': 3000,\r
        click: e => {\r
          e.diagram.commit(d => d.clearHighlighteds(), 'no highlighteds');\r
        },\r
        ExternalObjectsDropped: e => {\r
          // handle drops from the Palette\r
          if (markingPorts) {\r
            var newnode = e.diagram.selection.first();\r
            markNode(newnode);\r
          }\r
        },\r
        initialAutoScale: go.AutoScale.Uniform\r
      }\r
    );\r
\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) { if (idx < 0) document.title += '*'; }\r
      else { if (idx >= 0) document.title = document.title.slice(0, idx); }\r
    });\r
\r
    // Enables the polyline linking tool\r
    myDiagram.toolManager.linkingTool = new PolylineLinkingTool();\r
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Routing.Orthogonal;\r
\r
    // Checks if node is still in the diagram, adds it to the set\r
    function stillExists(nodeKey, theSet) {\r
      if (myDiagram.findNodeForKey(nodeKey)) {\r
        theSet.add(nodeKey);\r
      }\r
    }\r
\r
    // Listens for changes to the link data array to update port markings if marks unused ports is on\r
    myDiagram.addModelChangedListener(e => {\r
      if (!markingPorts) return; // Don't run if not marking unused ports\r
      if (myDiagram.skipsUndoManager) return; // We mark ports in skipped transactions - don't run for those either\r
      if (e.isTransactionFinished) {\r
        const nodesToUpdate = new Set();\r
        const tx = e.object;\r
        if (tx instanceof go.Transaction) {\r
          tx.changes.each(c => {\r
            // If a relink occurs, add involved nodes to the set\r
            if (c.modelChange === 'linkFromKey' || c.modelChange === 'linkToKey') {\r
              stillExists(c.oldValue, nodesToUpdate);\r
              stillExists(c.newValue, nodesToUpdate);\r
              stillExists(c.object.from, nodesToUpdate);\r
              stillExists(c.object.to, nodesToUpdate);\r
            }\r
            // Handles relinks between the same two nodes or between a node and itself\r
            if (c.modelChange === 'linkFromPortId' || c.modelChange === 'linkToPortId') {\r
              stillExists(c.object.from, nodesToUpdate);\r
              stillExists(c.object.to, nodesToUpdate);\r
            }\r
            if (c.modelChange === 'linkDataArray') {\r
              // If a link is added or removed, add its from and to node keys to the set\r
              if (c.oldValue) {\r
                stillExists(c.oldValue['from'], nodesToUpdate);\r
                stillExists(c.oldValue['to'], nodesToUpdate);\r
              }\r
              if (c.newValue) {\r
                stillExists(c.newValue['from'], nodesToUpdate);\r
                stillExists(c.newValue['to'], nodesToUpdate);\r
              }\r
            }\r
          });\r
        }\r
        for (x of nodesToUpdate) {\r
          const n = myDiagram.findNodeForKey(x);\r
          markNode(n);\r
        }\r
      }\r
    });\r
\r
    myPalette =\r
      new go.Palette('myPaletteDiv', {\r
        'animationManager.isEnabled': false,\r
        'toolManager.hoverDelay': 600,\r
        layout: new go.GridLayout({ wrappingColumn: 2 })\r
      }\r
    );\r
\r
    // Don't show context menus in the palette\r
    myPalette.toolManager.contextMenuTool.isEnabled = false;\r
\r
    // A helper function for defining tooltips for buttons\r
    function makeToolTip(str) {\r
      return go.GraphObject.build('ToolTip')\r
        .add(new go.TextBlock(str));\r
    }\r
\r
    // Returns a simple context menu button with a given function and text\r
    function createContextMenuButton(text, func) {\r
      return go.GraphObject.build('ContextMenuButton', {\r
            // Passes the node instead of the adornment\r
            click: (e, button) => func(e, button.part.adornedObject),\r
            'ButtonBorder.fill': 'white',\r
            "_buttonFillOver": '#1E90FF20',\r
          })\r
          .add(new go.TextBlock(text))\r
    }\r
\r
    // Context menus for different nodes\r
    const ICContextMenu = go.GraphObject.build('ContextMenu')\r
      .add(\r
        createContextMenuButton('Rotate Node', flipHV),\r
        createContextMenuButton('Swap Pins', swapPins)\r
      );\r
\r
    const switchContextMenu = go.GraphObject.build('ContextMenu')\r
      .add(\r
        createContextMenuButton('Rotate Node', flipHV),\r
        createContextMenuButton('Open Switch', openSwitch)\r
      );\r
\r
    const nodeContextMenu = go.GraphObject.build('ContextMenu')\r
      .add(\r
        createContextMenuButton('Rotate Node', flipCircle)\r
      )\r
\r
    const groupContextMenu = go.GraphObject.build('ContextMenu')\r
      .add(\r
        createContextMenuButton('Change Group Color', changeColor),\r
        createContextMenuButton('Ungroup', (e, obj) => e.diagram.commandHandler.ungroupSelection())\r
      );\r
\r
    // Template for integrated circuit pins, serve as the ports for each IC\r
    const pinTemplate =\r
      new go.Panel('Auto', {\r
          // Allows user selection and link drawing\r
          fromLinkable: true,\r
          toLinkable: true,\r
          click: (e, pin) => highlightLinksFromPin(e, pin),\r
          mouseEnter: (e, port) => lightPort(e, port),\r
          mouseLeave: (e, port) => unlightPort(e, port),\r
          cursor: 'pointer'\r
        })\r
        .bind('portId', 'key', v => String(v))\r
        .bind('fromSpot', 'side', v => (v === 'left' ? go.Spot.Left : go.Spot.Right))\r
        .bind('toSpot', 'side', v => (v === 'left' ? go.Spot.Left : go.Spot.Right))\r
        .add(\r
          new go.Shape('Rectangle', {\r
              name: 'SHAPE',\r
              width: 25,\r
              height: 20,\r
              stroke: 'black',\r
              strokeWidth: 1,\r
              fill: 'white',\r
              margin: new go.Margin(4.5, 0)\r
            }),\r
          new go.TextBlock({ font: '12px sans-serif' })\r
            .bind('angle', '', (dataObj, textBlock) => textBlock.part.data.orientation === 'horizontal' ? 90 : 0)\r
            .bind('text', 'key')\r
        );\r
\r
    // Template for the whole IC, stores pins in vertical panels on sides of main shape\r
    function createIntegratedCircuitNodeTemplate() {\r
      return new go.Node('Auto', {\r
          locationSpot: new go.Spot(0.5, 0.5, 0, 5),\r
          toolTip: makeToolTip('Integrated Circuit'),\r
          cursor: 'pointer',\r
          contextMenu: ICContextMenu\r
        })\r
        .bind('angle', 'orientation', v => (v === 'horizontal' ? -90 : 0))\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Horizontal')\r
            .add(\r
              new go.Panel('Vertical', {\r
                  itemTemplate: pinTemplate\r
                })\r
                .bind('itemArray', 'pinArrays', v => v[0]),\r
              new go.Panel('Spot')\r
                .add(\r
                  new go.Shape({\r
                      stroke: 'black',\r
                      fill: 'white',\r
                      width: 120,\r
                      click: (e, node) => highlightLinksFromIC(e, node),\r
                      doubleClick: flipHV\r
                    })\r
                    // Sets height of the rectangle part based on the number of nodes on one side\r
                    .bind('geometryString', 'pinArrays',\r
                      v =>\r
                        'F M 0 0 H 8 A 1 4 0 0 0 12 0 H 20 V' + // added F at beginning to fill shape\r
                        String(v[0].length * 30 + 16) + // height + margin per pin, plus fixed end height\r
                        'H 0 V 0'\r
                    ),\r
                  new go.Shape('Circle', {\r
                      stroke: 'black',\r
                      fill: 'transparent',\r
                      width: 8,\r
                      alignment: new go.Spot(0, 0, 12, 10)\r
                    }),\r
                  new go.TextBlock({\r
                      alignment: go.Spot.Center,\r
                      editable: true\r
                    })\r
                    .bindTwoWay('text', 'name')\r
                    .bind('angle', 'orientation', v => (v === 'horizontal' ? 90 : 0))\r
                ),\r
              new go.Panel('Vertical', { itemTemplate: pinTemplate })\r
                .bind('itemArray', 'pinArrays', v => v[1])\r
            )\r
        );\r
    }\r
\r
    // Creates separate template for palette that is scaled down\r
    const integratedCircuitNodeTemplate = createIntegratedCircuitNodeTemplate();\r
    const paletteICNodeTemplate = createIntegratedCircuitNodeTemplate();\r
    paletteICNodeTemplate.scale = 0.4;\r
    paletteICNodeTemplate.locationSpot = new go.Spot(0.2, 0.2);\r
\r
    const commonPortProperties = {\r
      fill: 'transparent',\r
      stroke: 'transparent',\r
      desiredSize: new go.Size(10, 10),\r
      cursor: 'pointer',\r
      fromLinkable: true,\r
      toLinkable: true,\r
      mouseEnter: (e, port) => lightPort(e, port),\r
      mouseLeave: (e, port) => unlightPort(e, port)\r
    }\r
\r
    // Creates circle ports\r
    function createCirclePort(align, linkSpot, id) {\r
      return new go.Shape('Circle', commonPortProperties)\r
        .set({\r
          fromSpot: linkSpot,\r
          toSpot: linkSpot,\r
          alignment: align,\r
          portId: id\r
        })\r
    }\r
\r
    // Item array template for ports\r
    const circlePortTemplate =\r
      new go.Panel()\r
        .bind('alignment', 'align')\r
        .add(\r
          new go.Shape('Circle', commonPortProperties)\r
            .bind('fromSpot', 'linkSpot') // Required\r
            .bind('toSpot', 'linkSpot')\r
            .bind('portId', 'id') // Required\r
            .bind('toLinkableSelfNode', 'linksSelf')\r
            .bind('fromLinkableSelfNode', 'linksSelf')\r
            .bind('stroke')\r
            .bind('fill')\r
        );\r
\r
    // Template for creating parts with a text block and a geometry string\r
    // Has partType property that automatically sets geometry, size, and ports\r
    // Bindings for additional optional parameters like text, tool tips, stroke, etc.\r
    const partNodeTemplate =\r
      new go.Node('Auto', {\r
          locationObjectName: 'MAIN',\r
          locationSpot: go.Spot.Center,\r
          toolTip: makeToolTip('Part'),\r
          click: (e, node) => highlightLinks(e, node),\r
          doubleClick: flipCircle,\r
          contextMenu: nodeContextMenu,\r
          cursor: 'pointer',\r
          background: 'transparent'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bind('toolTip', 'toolTip', str => makeToolTip(str))\r
        .bind('locationSpot', 'partType',\r
          type => !!partLocSpots[type] ? partLocSpots[type] : go.Spot.Center) // Adjusts spot on grid if needed\r
        .add(\r
          new go.Panel('Vertical')\r
            .bind('angle', 'orientation', v => getAngle(v))\r
            .add(\r
              new go.TextBlock({\r
                  textAlign: 'center',\r
                  editable: true,\r
                  margin: 4\r
                })\r
                .bindTwoWay('text')\r
                .bind('visible', 'text', text => text ? true : false)\r
                .bind('angle', 'orientation', v => getTextAngle(v)),\r
              new go.Panel('Spot', { itemTemplate: circlePortTemplate })\r
                .bind('itemArray', 'partType', type => partPorts[type]) // Required\r
                .add(\r
                  new go.Panel('Spot')\r
                    .add(\r
                      new go.Shape({\r
                          name: 'MAIN',\r
                          stroke: 'black',\r
                          fill: 'transparent',\r
                          strokeWidth: 2\r
                        })\r
                        .bind('geometryString', 'partType', type => partGeometries[type])\r
                        .bind('desiredSize', 'partType', type => !!partSizes[type] ? partSizes[type] : null)\r
                        .bind('strokeWidth')\r
                        .bind('fill'),\r
                      new go.Shape({\r
                          visible: false,\r
                          strokeWidth: 1\r
                        })\r
                        .bind('geometryString', 'partType',\r
                          type => !!partGeometries2[type] ? partGeometries2[type] : '')\r
                        .bind('alignment', 'partType',\r
                          type => !!secondGeometryAlignments[type] ? secondGeometryAlignments[type] : go.Spot.Center)\r
                        .bind('visible', 'partType',\r
                          type => !!partGeometries2[type])\r
                      )\r
                  )\r
            )\r
        );\r
\r
    // Data for part geometry strings\r
    const partGeometries = {\r
      resistor: 'M 0 3 L 3 3 L 4 1 L 6 5 L 8 1 L 10 5 L 12 1 L 14 5 L 15 3 L 18 3',\r
      potentiometer: 'M 0 3 L 3 3 L 4 1 L 6 5 L 8 1 L 10 5 L 12 1 L 14 5 L 15 3 L 18 3 M 7 8 L 9 6 L 11 8 M 9 12 V 6',\r
      capacitor: 'M 0 2 L 2 2 M 2 0 L 2 4 M 4 2 L 6 2 M 4 0 L 4 4',\r
      capacitorPolarized: 'M 0 2 L 2 2 M 2 0 L 2 4 M 4 2 L 6 2 M 5 0 A 1 2 0 0 0 5 4',\r
      diodeStandard: 'F M 0 2 L 2 2 M 2 0 L 5 2 L 2 4 M 5 2 L 7 2 M 2 0 L 2 4 M 5 0 L 5 4',\r
      diodeZener: 'F M 0 2 L 2 2 M 2 0 L 5 2 L 2 4 M 5 2 L 7 2 M 2 0 L 2 4 z M 5 2 A 1 10 0 0 0 6 2 M 5 2 A 1 10 0 0 0 4 2',\r
      diodeSchottky: 'F M 0 2 L 2 2 M 2 0 L 5 2 L 2 4 M 5 2 L 7 2 M 2 0 L 2 4 z M 5 2 L 5 3 L 6 4 M 5 2 V 1 L 4 0',\r
      ground: 'M 4 0 L 4 4 M 0 4 H 8 M 1.5 6 H 7 M 2.7 8 H 5.6',\r
      pChannelMOSFET: 'X M 6 6 L 6 30 H 0 M 9 6 V 12 M 9 15 V 21 M 9 24 V 30 M 9 9 H 24 V 0 M 9 18 H 24 M 9 27 H 24 V 36 X F M 24 18 L 18 15 V 21 L 24 18',\r
      nChannelMOSFET: 'X M 6 6 L 6 30 H 0 M 9 6 V 12 M 9 15 V 21 M 9 24 V 30 M 9 9 H 24 V 0 M 9 18 H 24 M 9 27 H 24 V 36 X F M 9 18 L 15 15 V 21 L 9 18',\r
      bjtNPN: 'M 18 21 L 18 9 M 28.5 9 L 7.5 9 M 12 9 L 6 0 L 0 0 M 24 9 L 30 0 L 36 0 M 30 0 L 30 0 L 25.5 1.5 L 30 4.5 L 30 0 M 12 9',\r
      bjtPNP: 'M 12 14 L 12 6 M 19 6 L 5 6 M 8 6 L 4 0 L 0 0 M 16 6 L 20 0 L 24 0 M 20 0 L 20 0 L 20 0 M 8 6 L 8 3 L 5 5 L 8 6',\r
      speaker: 'F M 6 18 H 18 V 48 H 6 V 18 M 6 18 M 18 18 L 30 0 V 66 L 18 48 M 6 17.5 H 0 M 6 18.5 H 0 M 6 47.5 H 0 M 6 48.5 H 0',\r
      pushSwitch: 'F M 0 7.5 H 40 M 16 7.5 V 0 H 24 V 7.5 M 0 8.5 H 40'\r
    };\r
    // Spots for grid alignment\r
    const partLocSpots = {\r
      pushSwitch: new go.Spot(0.5, 1, 0, 8),\r
      potentiometer: new go.Spot(0.5, 0.5, 0, -7.65),\r
      pChannelMOSFET: new go.Spot(1, 0.5, -11, 2),\r
      nChannelMOSFET: new go.Spot(1, 0.5, -11, 2),\r
      bjtNPN: new go.Spot(0.5, 0.5, 0, -10.5),\r
      bjtPNP: new go.Spot(0.5, 0.5, 0, -10.5),\r
      speaker: new go.Spot(0.5, 0.5, 0, 5)\r
    }\r
    // Optional second shape geometries and alignments\r
    const partGeometries2 = {\r
      bjtNPN: 'M 21 3 A 1 1 0 0 0 21 33 A 1 1 0 0 0 21 3',\r
      bjtPNP: 'M 21 3 A 1 1 0 0 0 21 33 A 1 1 0 0 0 21 3'\r
    }\r
    const secondGeometryAlignments = {\r
      bjtNPN: new go.Spot(0.5, 0.5, 0, -10.5),\r
      bjtPNP: new go.Spot(0.5, 0.5, 0, -10.5)\r
    }\r
    // Data for desiredSize property of each part\r
    const partSizes = {\r
      resistor: new go.Size(36, 8),\r
      potentiometer: new go.Size(36, 24),\r
      capacitor: new go.Size(24, 16),\r
      capacitorPolarized: new go.Size(24, 16),\r
      diodeStandard: new go.Size(24, 16),\r
      diodeZener: new go.Size(24, 16),\r
      diodeSchottky: new go.Size(24, 16),\r
      ground: new go.Size(20, 20),\r
      pChannelMOSFET: new go.Size(24, 36),\r
      nChannelMOSFET: new go.Size(24, 36),\r
      bjtNPN: new go.Size(36, 21),\r
      bjtPNP: new go.Size(36, 21),\r
      speaker: new go.Size(30, 66),\r
      pushSwitch: new go.Size(40, 6.5)\r
    };\r
    // Data for item arrays of ports on each part\r
    const partPorts = {\r
      resistor: [\r
        { align: new go.Spot(0, 0.5, 3, 0), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in' },\r
        { align: new go.Spot(1, 0.5, -3, 0), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'out' }\r
      ],\r
      capacitor: [\r
        { align: new go.Spot(0, 0.5, 3, 0), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in' },\r
        { align: new go.Spot(1, 0.5, -3, 0), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'out' }\r
      ],\r
      capacitorPolarized: [\r
        { align: new go.Spot(0, 0.5, 3, 0), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in' },\r
        { align: new go.Spot(1, 0.5, -3, 0), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'out' }\r
      ],\r
      diodeStandard: [\r
        { align: new go.Spot(0, 0.5, 3, 0), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in' },\r
        { align: new go.Spot(1, 0.5, -3, 0), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'out' }\r
      ],\r
      diodeZener: [\r
        { align: new go.Spot(0, 0.5, 3, 0), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in' },\r
        { align: new go.Spot(1, 0.5, -3, 0), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'out' }\r
      ],\r
      diodeSchottky: [\r
        { align: new go.Spot(0, 0.5, 3, 0), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in' },\r
        { align: new go.Spot(1, 0.5, -3, 0), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'out' }\r
      ],\r
      ground: [\r
        { align: new go.Spot(0.5, 0, 0, 3), linkSpot: new go.Spot(0.5, 0, 0, 5), id: '' }\r
      ],\r
      pChannelMOSFET: [\r
        { align: new go.Spot(0, 0.8, 0, 0.5), linkSpot: new go.Spot(0, 0.5, 7, 0), id: 'gate' },\r
        { align: new go.Spot(1, 0, -1, 0), linkSpot: new go.Spot(0.5, 0, 0, 7), id: 'drain' },\r
        { align: new go.Spot(1, 1, -1, 0), linkSpot: new go.Spot(0.5, 1, 0, -7), id: 'source' }\r
      ],\r
      nChannelMOSFET: [\r
        { align: new go.Spot(0, 0.8, 0, 0.5), linkSpot: new go.Spot(0, 0.5, 7, 0), id: 'gate' },\r
        { align: new go.Spot(1, 0, -1, 0), linkSpot: new go.Spot(0.5, 0, 0, 7), id: 'drain' },\r
        { align: new go.Spot(1, 1, -1, 0), linkSpot: new go.Spot(0.5, 1, 0, -7), id: 'source' }\r
      ],\r
      speaker: [\r
        { align: new go.Spot(0, 0.5, 3, -15), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in' },\r
        { align: new go.Spot(0, 0.5, 3, 15), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'out' }\r
      ],\r
      potentiometer: [\r
        { align: new go.Spot(0, 0.5, 3, -7.65), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'in', linksSelf: true },\r
        { align: new go.Spot(1, 0.5, -3, -7.65), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'out', linksSelf: true },\r
        { align: new go.Spot(.5, 1, 0, -3), linkSpot: new go.Spot(0.5, 1, 0, -5), id: 'wiper', linksSelf: true }\r
      ],\r
      bjtNPN: [\r
        { align: new go.Spot(0.5, 1, 0, -3), linkSpot: new go.Spot(0.5, 1, 0, -5), id: 'base' },\r
        { align: new go.Spot(0, 0.5, 3, -3.25), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'collector' },\r
        { align: new go.Spot(1, 0.5, -3, -3.25), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'emitter' }\r
      ],\r
      bjtPNP: [\r
        { align: new go.Spot(0.5, 1, 0, -3), linkSpot: new go.Spot(0.5, 1, 0, -5), id: 'base' },\r
        { align: new go.Spot(0, 0.5, 3, -3.25), linkSpot: new go.Spot(0, 0.5, 5, 0), id: 'collector' },\r
        { align: new go.Spot(1, 0.5, -3, -3.25), linkSpot: new go.Spot(1, 0.5, -5, 0), id: 'emitter' }\r
      ],\r
      pushSwitch: [\r
        { align: new go.Spot(0, 1, 5, 8), linkSpot: new go.Spot(0, 0.5, 1, 0), stroke: 'black', fill: 'white', id: 'in' },\r
        { align: new go.Spot(1, 1, -5, 8), linkSpot: new go.Spot(1, 0.5, -1, 0), stroke: 'black', fill: 'white', id: 'out' }\r
      ]\r
    };\r
\r
    // Node for adding wire junctions\r
    const junctionNodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          toolTip: makeToolTip('Junction'),\r
          click: (e, node) => highlightLinks(e, node),\r
          cursor: 'pointer'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              // Transparent outer circle for easier selection and port location\r
              new go.Shape('Circle', {\r
                width: 40,\r
                fill: 'transparent',\r
                stroke: null\r
              }),\r
              // Visible inner circle\r
              new go.Shape('Circle', {\r
                  fill: 'black',\r
                  width: 10,\r
                  alignment: go.Spot.Center\r
                })\r
                .bind('fill', 'isHollow', v => (v ? 'white' : 'black')),\r
              // Ports on all sides for easier routing\r
              createCirclePort(new go.Spot(0.5, 0, 0, 10), new go.Spot(0.5, 0, 0, 11), 'top'),\r
              createCirclePort(new go.Spot(0.5, 1, 0, -10), new go.Spot(0.5, 1, 0, -11), 'bottom'),\r
              createCirclePort(new go.Spot(0, 0.5, 10, 0), new go.Spot(0, 0.5, 11, 0), 'left'),\r
              createCirclePort(new go.Spot(1, 0.5, -10, 0), new go.Spot(1, 0.5, -11, 0), 'right')\r
            )\r
        );\r
\r
    // Template for a simple switch, see Logic Circuit sample\r
    const switchNodeTemplate =\r
      new go.Node('Spot', {\r
          locationObjectName: 'MAIN',\r
          locationSpot: go.Spot.Center,\r
          toolTip: makeToolTip('Switch'),\r
          click: (e, node) => highlightLinks(e, node),\r
          doubleClick: openSwitch,\r
          contextMenu: switchContextMenu,\r
          cursor: 'pointer'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bind('angle', 'orientation', v => (v === 'horizontal' ? 0 : 90))\r
        .add(\r
          // Expands clickable region for opening switch\r
          new go.Shape({\r
              fill: 'transparent',\r
              stroke: null,\r
              width: 40,\r
              height: 40\r
            }),\r
          // Transparent shape in place of closed switch to anchor on grid when opened\r
          new go.Shape({\r
              name: 'MAIN',\r
              desiredSize: new go.Size(40, 40),\r
              stroke: null,\r
              fill: 'transparent',\r
              width: 40,\r
              height: 2,\r
              position: new go.Point(40, 0)\r
            }),\r
          new go.Panel('Horizontal', {\r
              // This prevents the ports from moving when the shape rotates\r
              minSize: new go.Size(42, 42)\r
            })\r
            .add(\r
              new go.Panel('Spot', { isClipping: true })\r
                .add(\r
                  new go.Shape({ fill: 'blue', strokeWidth: 0 }),\r
                  new go.Panel({\r
                      alignment: go.Spot.Left,\r
                      alignmentFocus: go.Spot.Center,\r
                      angle: 359.99 // Rotate counter clock wise\r
                    })\r
                    .add(\r
                      new go.Shape({ width: 1, height: 1 }),\r
                      new go.Shape({\r
                          desiredSize: new go.Size(40, 40),\r
                          strokeWidth: 0,\r
                          fill: 'black',\r
                          width: 40,\r
                          height: 2,\r
                          position: new go.Point(40, 0)\r
                        })\r
                    )\r
                    .bind('angle', 'isOpen', isOpen => (!isOpen ? 359.99 : 359.99 - 30))\r
                )\r
            ),\r
          // Ports\r
          createCirclePort(new go.Spot(1, 0.5), new go.Spot(1, 0.5, -1, 0), 'out')\r
            .set({ fill: 'white', stroke: 'black' }),\r
          createCirclePort(new go.Spot(0, 0.5), new go.Spot(0, 0.5, 1, 0), 'in')\r
            .set({ fill: 'white', stroke: 'black' })\r
        );\r
\r
    // Node for simple user created labels\r
    const labelNodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          toolTip: makeToolTip('Label'),\r
          click: (e, node) => highlightLinks(e, node),\r
          cursor: 'pointer'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.TextBlock('Label', {\r
              editable: true,\r
              textAlign: 'center',\r
              verticalAlignment: go.Spot.Center,\r
              alignment: go.Spot.Center,\r
              minSize: new go.Size(40, 30),\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    // Node for a voltage divider chip\r
    const voltDivNodeTemplate =\r
      new go.Node('Spot', {\r
          locationObjectName: 'MAIN',\r
          locationSpot: go.Spot.Center,\r
          toolTip: makeToolTip('Voltage Divider'),\r
          click: (e, node) => highlightLinks(e, node),\r
          contextMenu: nodeContextMenu,\r
          cursor: 'pointer'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bind('angle', 'orientation', v => getAngle(v))\r
        .add(\r
          new go.Shape('Rectangle', {\r
              fill: 'transparent',\r
              stroke: 'black',\r
              desiredSize: new go.Size(40, 30),\r
              doubleClick: flipCircle\r
            }),\r
          new go.TextBlock({\r
              alignment: go.Spot.Center,\r
              editable: true\r
            })\r
            .bindTwoWay('text', 'name')\r
            .bind('angle', 'orientation', v => getTextAngle(v)),\r
          // Anchors node on grid\r
          new go.Shape('Rectangle', {\r
              name: 'MAIN',\r
              fill: null,\r
              stroke: null,\r
              desiredSize: new go.Size(46, 2),\r
              alignment: go.Spot.Center\r
            }),\r
          // Ports, rectangles are visible, transparent circles are the actual ports\r
          new go.Shape('Rectangle', {\r
              fill: 'black',\r
              stroke: null,\r
              desiredSize: new go.Size(6, 2),\r
              alignment: new go.Spot(0, 0.5, -3, 0)\r
            }),\r
          createCirclePort(new go.Spot(0, 0.5, -3, 0), new go.Spot(0, 0.5, 5, 0), 'in'),\r
          new go.Shape('Rectangle', {\r
              fill: 'black',\r
              stroke: null,\r
              desiredSize: new go.Size(6, 2),\r
              alignment: new go.Spot(1, 0.5, 3, 0)\r
            }),\r
          createCirclePort(new go.Spot(1, 0.5, 3, 0), new go.Spot(1, 0.5, -5, 0), 'out'),\r
          new go.Shape('Rectangle', {\r
              fill: 'black',\r
              stroke: null,\r
              desiredSize: new go.Size(2, 6),\r
              alignment: new go.Spot(0.5, 1, 0, 3)\r
            }),\r
          createCirclePort(new go.Spot(0.5, 1, 0, 3), new go.Spot(0.5, 1, 0, -5), 'ground')\r
        );\r
\r
    // Adds node templates to a template map for the diagram and palette\r
    const nodeTemplateMap = new go.Map();\r
    nodeTemplateMap.add('IC', integratedCircuitNodeTemplate);\r
    nodeTemplateMap.add('junction', junctionNodeTemplate);\r
    nodeTemplateMap.add('switch', switchNodeTemplate);\r
    nodeTemplateMap.add('label', labelNodeTemplate);\r
    nodeTemplateMap.add('voltDiv', voltDivNodeTemplate);\r
    // General part template\r
    nodeTemplateMap.add('part', partNodeTemplate);\r
    myDiagram.nodeTemplateMap = nodeTemplateMap;\r
    myPalette.nodeTemplateMap = nodeTemplateMap.copy();\r
    // Changes to the scaled down/centered versions\r
    myPalette.nodeTemplateMap.delete('IC');\r
    myPalette.nodeTemplateMap.add('IC', paletteICNodeTemplate);\r
\r
    // Link template for drawing wires\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          reshapable: true,\r
          resegmentable: true,\r
          routing: go.Routing.Orthogonal,\r
          adjusting: go.LinkAdjusting.End,\r
          corner: 3,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          selectionAdorned: false,\r
          cursor: 'pointer'\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          new go.Shape({ name: 'SHAPE', strokeWidth: 2, stroke: 'black' })\r
            // Color for link highlighting\r
            .bindObject('stroke', 'isHighlighted', h => (h ? '#42b6f5AA' : 'black'))\r
            .bindObject('strokeWidth', 'isHighlighted', h => (h ? 4 : 2))\r
        );\r
\r
    // Template for created groups\r
    myDiagram.groupTemplate =\r
      new go.Group('Auto', {\r
          ungroupable: true,\r
          contextMenu: groupContextMenu,\r
          dragComputation: groupDragComputation\r
        })\r
        .add(\r
          new go.Panel('Vertical')\r
            .add(\r
              new go.TextBlock({\r
                  font: '14px sans-serif',\r
                  editable: true,\r
                  margin: 4\r
                })\r
                .bindTwoWay('text'),\r
              new go.Panel('Auto')\r
                .add(\r
                  new go.Shape('Rectangle', {\r
                      selectable: false, // Allows nodes and links in a group to still be selected\r
                      fill: '#029ffa10',\r
                      stroke: 'black',\r
                      strokeWidth: 0.5,\r
                      strokeDashArray: [10, 5],\r
                      doubleClick: changeColor\r
                    })\r
                    .bind('fill', 'color'),\r
                  new go.Placeholder({ padding: 5 })\r
                )\r
            )\r
        );\r
\r
    // Customizes selection adornment\r
    myDiagram.nodeSelectionAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', {\r
                  fill: null,\r
                  stroke: '#42b6f5AA',\r
                  strokeWidth: 3,\r
                  strokeDashArray: [6, 8]\r
                }),\r
              new go.Placeholder({ padding: 3 }),\r
            )\r
        );\r
    myDiagram.groupSelectionAdornmentTemplate = myDiagram.nodeSelectionAdornmentTemplate;\r
    myPalette.nodeSelectionAdornmentTemplate = myDiagram.groupSelectionAdornmentTemplate;\r
\r
    // Starting elements in the palette\r
    myPalette.model.nodeDataArray = [\r
      { key: 'label', category: 'label', text: 'Label' },\r
      { key: 'junction', category: 'junction' },\r
      { key: 'openPoint', category: 'junction', isHollow: true },\r
      { key: 'ground', category: 'part', partType: 'ground', toolTip: 'Ground', text: null, orientation: 'horizontal' },\r
      { key: 'switch', category: 'switch', isOpen: false, orientation: 'horizontal' },\r
      { key: 'pushSwitch', category: 'part', partType: 'pushSwitch', toolTip: 'Push Switch', text: null, strokeWidth: 1, orientation: 'horizontal' },\r
      { key: 'resistor', category: 'part', partType: 'resistor', toolTip: 'Resistor', text: '4.7 k', orientation: 'horizontal'},\r
      { key: 'potentiometer', category: 'part', partType: 'potentiometer', toolTip: 'Potentiometer', text: '1M', orientation: 'horizontal' },\r
      { key: 'capacitor', category: 'part', partType: 'capacitor', toolTip: 'Capacitor', text: '47 μF', orientation: 'horizontal' },\r
      { key: 'polarizedCapacitor', category: 'part', partType: 'capacitorPolarized', toolTip: 'Polarized Capacitor', text: '100 μF', orientation: 'horizontal' },\r
      { key: 'standardDiode', category: 'part', partType: 'diodeStandard', toolTip: 'Standard Diode', text: '1N4001', fill: 'black', orientation: 'horizontal' },\r
      { key: 'zenerDiode', category: 'part', partType: 'diodeZener', toolTip: 'Zener Diode', text: '1N4001', fill: 'black', orientation: 'horizontal' },\r
      { key: 'schottkyDiode', category: 'part', partType: 'diodeSchottky', toolTip: 'Schottky Diode', text: '1N4001', fill: 'black', orientation: 'horizontal' },\r
      { key: 'P-ChannelMOSFET', category: 'part', partType: 'pChannelMOSFET', toolTip: 'P-Channel MOSFET', text: null, fill: 'black', orientation: 'horizontal' },\r
      { key: 'N-ChannelMOSFET', category: 'part', partType: 'nChannelMOSFET', toolTip: 'N-Channel MOSFET', text: null, fill: 'black', orientation: 'horizontal' },\r
      { key: 'voltageDivider', category: 'voltDiv', name: '7805', orientation: 'horizontal' },\r
      { key: 'bjtNPN', category: 'part', partType: 'bjtNPN', toolTip: 'NPN Bipolar Junction Transistor', text: '2N3904', orientation: 'horizontal' },\r
      { key: 'bjtPNP', category: 'part', partType: 'bjtPNP', toolTip: 'PNP Bipolar Junction Transistor', text: '2N3906', orientation: 'horizontal' },\r
      { key: 'speaker', category: 'part', partType: 'speaker', toolTip: 'Speaker', text: null, strokeWidth: 1, orientation: 'horizontal'}\r
    ];\r
\r
    // Add primary IC's to palette\r
    addICtoPalette(8, '555');\r
    addICtoPalette(28, 'SN76477');\r
\r
    // Starting diagram\r
    myDiagram.model = new go.GraphLinksModel({\r
      linkFromPortIdProperty: 'fromPort',\r
      linkToPortIdProperty: 'toPort'\r
    });\r
\r
    load();\r
  } // end init\r
\r
  // Keeps track of number of ICs in the panel\r
  var numICinPalette = 0;\r
\r
  function addICtoPalette(num, ICname) {\r
    leftPinArr = [];\r
    rightPinArr = [];\r
\r
    for (let i = 0; i < num / 2; i++) {\r
      leftPinArr.push({ key: i + 1, side: 'left' });\r
      rightPinArr.push({ key: num - i, side: 'right' });\r
    }\r
\r
    numICinPalette++;\r
\r
    myPalette.model.addNodeData({\r
      key: 'IC' + String(numICinPalette),\r
      category: 'IC',\r
      name: ICname,\r
      pinArrays: [leftPinArr, rightPinArr],\r
      orientation: 'vertical'\r
    });\r
  }\r
\r
  // Handles button input and adding IC's\r
  function addICHandler() {\r
    let num = Number(document.getElementById('pinNumInput').value);\r
    let name = document.getElementById('ICNameInput').value;\r
    if (Number.isFinite(num) && num > 3 && num < 99 && num % 2 === 0) {\r
      addICtoPalette(num, name);\r
      document.getElementById('pinNumInput').value = '';\r
      document.getElementById('ICNameInput').value = '';\r
    } else {\r
      alert('Enter an even number of pins between 4 and 98');\r
    }\r
  }\r
\r
  // Swaps the pins on an IC from one side to the other\r
  function swapPins(e, obj) {\r
    if (e.diagram instanceof go.Palette) return;\r
    e.diagram.commit(() => {\r
      while (obj.part && obj.part !== obj) obj = obj.part;\r
      const newArrays = [obj.data.pinArrays[1], obj.data.pinArrays[0]];\r
      myDiagram.model.set(obj.data, 'pinArrays', newArrays)\r
    })\r
  }\r
\r
  // Flips node orientation back and forth between horizontal and vertical on double click\r
  function flipHV(e, obj) {\r
    if (e.diagram instanceof go.Palette) return;\r
    e.diagram.commit(() => {\r
      while (obj.part && obj.part !== obj) obj = obj.part; // Moves up the tree until it finds the node\r
      const flip = obj.data.orientation === 'horizontal' ? 'vertical' : 'horizontal';\r
      myDiagram.model.set(obj.data, 'orientation', flip);\r
    })\r
  }\r
\r
  // Rotates node 90 degrees on double click\r
  const orientationArray = ['horizontal', 'vertical', 'horizontalFlipped', 'verticalFlipped'];\r
  function flipCircle(e, obj) {\r
    if (e.diagram instanceof go.Palette) return;\r
    e.diagram.commit(() => {\r
      while (obj.part && obj.part !== obj) obj = obj.part;\r
      let index = orientationArray.indexOf(obj.data.orientation);\r
      let next = orientationArray[(index+1) % 4];\r
      myDiagram.model.set(obj.data, 'orientation', next);\r
    });\r
  }\r
\r
  // Returns the angle for a given string orientation\r
  const angleMap = {\r
    'horizontal': 0,\r
    'vertical': 90,\r
    'horizontalFlipped': 180,\r
    'verticalFlipped': 270\r
  };\r
  function getAngle(orientation) {\r
    return angleMap[orientation];\r
  }\r
\r
  // Gets angles to keep text blocks upright\r
  const textAngleMap = {\r
    'horizontal': 0,\r
    'vertical': -90,\r
    'horizontalFlipped': 180,\r
    'verticalFlipped': 90\r
  };\r
  function getTextAngle(orientation) {\r
    return textAngleMap[orientation];\r
  }\r
\r
  // Opens switch\r
  function openSwitch(e, obj) {\r
    if (e.diagram instanceof go.Palette) return;\r
    e.diagram.commit(() => {\r
      while (obj.part && obj.part !== obj) obj = obj.part;\r
      const isOpen = !obj.data.isOpen;\r
      myDiagram.model.set(obj.data, 'isOpen', isOpen);\r
    })\r
  }\r
\r
  // Finds links connected to the selected node and highlights them\r
  function highlightLinks(e, node, pid) {\r
    myDiagram.commit(() => {\r
      myDiagram.clearHighlighteds();\r
      if (pid) { // Case for selection of a single IC pin\r
        node.findLinksConnected(pid).each(l => (l.isHighlighted = true));\r
      } else {\r
        node.findLinksConnected().each(l => (l.isHighlighted = true));\r
      }\r
    }, null)\r
  }\r
\r
  // Finds links out of a single pin\r
  function highlightLinksFromPin(e, pin) {\r
    const pid = pin.portId; // Saves portId\r
    while (pin.part && pin.part !== pin) pin = pin.part; // Finds parent node\r
    highlightLinks(e, pin, pid);\r
  }\r
\r
  // Finds links out of the whole IC\r
  function highlightLinksFromIC(e, node) {\r
    while (node.part && node.part !== node) node = node.part; // Finds parent node\r
    highlightLinks(e, node);\r
  }\r
\r
  // Global flag for checking if unused ports are to be highlighted\r
  var markingPorts = false;\r
\r
  // Loops through nodes in the diagram and highlights ports that have no links connected to them\r
  function unusedPorts() {\r
    myDiagram.nodes.each(node => {\r
      if (node.category !== 'junction') { // Ignores junctions\r
        markNode(node);\r
      }\r
    });\r
    document.getElementById('markPortsButton').style.display = 'none';\r
    document.getElementById('unmarkPortsButton').style.display = '';\r
    markingPorts = true;\r
  }\r
\r
  function markNode(node) {\r
    if (node.category === 'junction') return;\r
    node.ports.each(port => markPort(node, port));\r
  }\r
\r
  function markPort(node, port) {\r
    // The second argument to commit() is null to skip the undo manager\r
    myDiagram.commit(() => {\r
      const isIC = node.category === 'IC';\r
      const isSwitch = node.category === 'switch' || node.data.partType === 'pushSwitch';\r
      const shape = isIC ? port.findObject('SHAPE') : port;\r
\r
      if (node.findLinksConnected(port.portId).count === 0 && node.category !== 'junction') {\r
        shape.stroke = 'red';\r
      } else {\r
        shape.stroke = isIC || isSwitch ? 'black' : 'transparent';\r
      }\r
      shape.fill = isIC || isSwitch ? 'white' : 'transparent'; // For un-lighting\r
    }, null)\r
  }\r
\r
  // Does the opposite of above\r
  function unmarkPorts() {\r
    myDiagram.nodes.each(node => {\r
      if (node.category !== 'junction') {\r
        unmarkNode(node);\r
      }\r
    });\r
    document.getElementById('markPortsButton').style.display = '';\r
    document.getElementById('unmarkPortsButton').style.display = 'none';\r
    markingPorts = false;\r
  }\r
\r
  function unmarkNode(node) {\r
    node.ports.each(port => unmarkPort(node, port));\r
  }\r
\r
  function unmarkPort(node, port) {\r
    myDiagram.commit(() => {\r
      const shape = node.category === 'IC' ? port.findObject('SHAPE') : port;\r
      const isICorSwitch = node.category === 'IC' ||\r
        node.category === 'switch' || node.data.partType === 'pushSwitch';\r
\r
      if (isICorSwitch) {\r
        shape.stroke = 'black';\r
        shape.fill = 'white'; // for un-lighting\r
      } else {\r
        shape.stroke = 'transparent';\r
        shape.fill = 'transparent';\r
      }\r
    }, null)\r
  }\r
\r
  // Highlights ports when hovered over\r
  function lightPort(e, port) {\r
    if (port.diagram instanceof go.Palette) return; // Doesn't light palette ports\r
    e.diagram.commit(() => {\r
      if (port instanceof go.Panel) { // Finds port through panel if needed pin\r
        port.findObject('SHAPE').stroke = '#1E90FF';\r
        port.findObject('SHAPE').fill = '#1E90FF20';\r
      } else {\r
        port.stroke = '#1E90FF';\r
        port.fill = '#1E90FF20';\r
      }\r
    }, null)\r
  }\r
\r
  function unlightPort(e, port) {\r
    if (port.diagram instanceof go.Palette) return;\r
      let node = port;\r
      while (node.part && node.part !== node) node = node.part;\r
      if (markingPorts) {\r
        markPort(node, port);\r
      } else {\r
        unmarkPort(node, port);\r
      }\r
  }\r
\r
  // Changes color of groups\r
  const colorArray = ['#029ffa10', '#02fa7610', '#f2fa0210', '#fa1f0210', '#ffffff10'];\r
  function changeColor(e, node) {\r
    while (node.part && node.part !== node) node = node.part;\r
    let index = colorArray.indexOf(node.data.color);\r
    let color = colorArray[(index+1) % colorArray.length];\r
    e.diagram.commit(() => {myDiagram.model.set(node.data, 'color', color)});\r
  }\r
\r
  // Accounts for groups not locking to the grid when created\r
  function groupDragComputation(part, pt, gridpt) {\r
    const loc = part.location;\r
    const bounds = part.naturalBounds;\r
    const offx = loc.x % CELLSIZE;\r
    const offy = loc.y % CELLSIZE;\r
    return new go.Point(gridpt.x + offx, gridpt.y + offy);\r
  }\r
\r
  // Save a model to and load a model from JSON text, displayed below the Diagram\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  document.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/OrthogonalLinkReshapingTool.js`,`../extensions/PolylineLinkingTool.js`],descriptionHtml:`<p>\r
          This GoJS diagram shows an interactive circuit schematic designer. The sample shown\r
          is an application circuit of a steam train sound with a whistle using the\r
          Texas Instruments SN76477 sound chip (see\r
          <a href="https://en.wikipedia.org/wiki/Texas_Instruments_SN76477">Wikipedia</a>\r
          for more information). The chip was used primarily for arcade game sound\r
          effects, and it is shown here used with a 555 Timer and a speaker to\r
          create a steam train sound effect for circuit production.\r
        </p>\r
        <p>\r
          This sample allows users to construct descriptive circuit schematics using integrated\r
          circuits with between 4 and 98 pins and a variety of standard circuit components\r
          of various types. Users can add customized integrated circuits with the menu\r
          below the diagram, group components using <a>Group</a> (double click to change colors),\r
          and mark ports that are unused. Users can also edit the text on the components to change\r
          their names or values. Developing new parts uses a reusable <a>Diagram.nodeTemplate</a>\r
          with text and one, or optionally two, geometries that takes data from a partType binding\r
          in the model data and constructs a part node. It has several optional bindings for\r
          further customization as well.\r
        </p>\r
        <p>\r
          A <a>Palette</a> to the left of the diagram allows the user to drag and drop new\r
          circuit component nodes. Click and drag between the ports on each node to draw new\r
          links, and double click the nodes to rotate them (or right click them to use the\r
          <a>GraphObject.contextMenu</a>). The switch can also be opened by right clicking it.\r
          Selecting any of the nodes or individual pins on the integrated circuits\r
          will highlight links going into and out of that node's ports with the\r
          <a>Node.findLinksConnected</a> method.\r
        </p>\r
        <p>\r
          The wire paths are created manually by either dragging between ports or clicking along\r
          the desired path with the\r
          <a href="../extensions/PolylineLinkingTool.js">PolylineLinkingTool.js</a> extension.\r
          They can be reshaped and adjusted with <a>LinkReshapingTool</a> and the\r
          <a href="../extensions/OrthogonalLinkReshapingTool.js">OrthogonalLinkReshapingTool.js</a>\r
          extension. The paths are saved in the JSON model by saving the <a>Link.points</a>\r
          along each wire. Hover over any component to see a description with\r
          <a>GraphObject.toolTip</a>.\r
        </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`palette`,`geometries`,`links`,`ports`,`groups`,`tools`];var g=y();l(`1g9lh21`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};