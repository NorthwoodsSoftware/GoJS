import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Family Tree Diagram, Japanese`,indexDescription:`Shows a standard family tree.`,screenshot:`familytreejp`,priority:2,tags:[`tables`,`treelayout`,`tooltips`,`legend`],description:`A family tree diagram showing Japanese royalty.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      // create a TreeLayout for the family tree\r
      layout: new go.TreeLayout({ angle: 90, nodeSpacing: 5 })\r
    });\r
\r
    const bluegrad = new go.Brush('Linear', { 0: 'rgb(60, 204, 254)', 1: 'rgb(70, 172, 254)' });\r
    const pinkgrad = new go.Brush('Linear', { 0: 'rgb(255, 192, 203)', 1: 'rgb(255, 142, 203)' });\r
\r
    // Set up a Part as a legend, and place it directly on the diagram\r
    myDiagram.add(\r
      new go.Part('Table', {\r
          layerName: 'ViewportBackground',\r
          alignment: new go.Spot(0, 0, 20, 20)\r
        })\r
        .add(\r
          new go.TextBlock('Key', { row: 0, font: 'bold 10pt Helvetica, Arial, sans-serif' }), // end row 0\r
          new go.Panel('Horizontal', { row: 1, alignment: go.Spot.Left })\r
            .add(\r
              new go.Shape('Rectangle', { desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5 }),\r
              new go.TextBlock('Males', { font: 'bold 8pt Helvetica, bold Arial, sans-serif' })\r
            ), // end row 1\r
          new go.Panel('Horizontal', { row: 2, alignment: go.Spot.Left })\r
            .add(\r
              new go.Shape('Rectangle', { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),\r
              new go.TextBlock('Females', { font: 'bold 8pt Helvetica, bold Arial, sans-serif' })\r
            ) // end row 2\r
        )\r
      );\r
\r
    // get tooltip text from the object's data\r
    function tooltipTextConverter(person) {\r
      let str = '';\r
      str += 'Born: ' + person.birthYear;\r
      if (person.deathYear !== undefined) str += '\\nDied: ' + person.deathYear;\r
      if (person.reign !== undefined) str += '\\nReign: ' + person.reign;\r
      return str;\r
    }\r
\r
    // define tooltips for nodes\r
    const tooltiptemplate = go.GraphObject.build('ToolTip', {\r
        'Border.fill':'whitesmoke',\r
        'Border.stroke': 'black'\r
      })\r
      .add(\r
        new go.TextBlock({\r
            font: 'bold 8pt Helvetica, bold Arial, sans-serif',\r
            wrap: go.Wrap.Fit,\r
            margin: 5\r
          })\r
          .bind('text', '', tooltipTextConverter)\r
      );\r
\r
    // define Converters to be used for Bindings\r
    function genderBrushConverter(gender) {\r
      if (gender === 'M') return bluegrad;\r
      if (gender === 'F') return pinkgrad;\r
      return 'orange';\r
    }\r
\r
    // replace the default Node template in the nodeTemplateMap\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          deletable: false,\r
          toolTip: tooltiptemplate\r
        })\r
        .bind('text', 'name')\r
        .add(\r
          new go.Shape('Rectangle', {\r
              fill: 'orange',\r
              stroke: 'black',\r
              stretch: go.Stretch.Fill,\r
              alignment: go.Spot.Center\r
            })\r
            .bind('fill', 'gender', genderBrushConverter),\r
          new go.Panel('Vertical')\r
            .add(\r
              new go.TextBlock({\r
                  font: 'bold 8pt Helvetica, bold Arial, sans-serif',\r
                  alignment: go.Spot.Center,\r
                  margin: 6\r
                })\r
                .bind('text', 'name'),\r
              new go.TextBlock()\r
                .bind('text', 'kanjiName')\r
            )\r
        );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({ // the whole link panel\r
          routing: go.Routing.Orthogonal,\r
          corner: 5, selectable: false\r
        })\r
        .add(\r
          new go.Shape()\r
        ); // the default black link shape\r
\r
    // here's the family data\r
    const nodeDataArray = [\r
      {\r
        key: 0,\r
        name: 'Osahito',\r
        gender: 'M',\r
        fullTitle: 'Emperor Kōmei',\r
        kanjiName: '統仁 孝明天皇',\r
        posthumousName: 'Komei',\r
        birthYear: '1831',\r
        deathYear: '1867'\r
      },\r
      {\r
        key: 1,\r
        parent: 0,\r
        name: 'Matsuhito',\r
        gender: 'M',\r
        fullTitle: 'Emperor Meiji',\r
        kanjiName: '睦仁 明治天皇',\r
        posthumousName: 'Meiji',\r
        birthYear: '1852',\r
        deathYear: '1912'\r
      },\r
      {\r
        key: 2,\r
        parent: 1,\r
        name: 'Toshiko',\r
        gender: 'F',\r
        fullTitle: 'Princess Yasu-no-Miya Toshiko',\r
        birthYear: '1896',\r
        deathYear: '1978',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 3,\r
        parent: 2,\r
        name: 'Higashikuni Morihiro',\r
        gender: 'M',\r
        fullTitle: 'Prince Higashikuni Morihiro',\r
        kanjiName: '東久邇宮 盛厚王',\r
        birthYear: '1916',\r
        deathYear: '1969',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 4, parent: 3, name: 'See spouse for descendants' },\r
      { key: 5, parent: 2, name: 'Moromasa', gender: 'M', fullTitle: 'Prince Moromasa', kanjiName: '師正王', birthYear: '1917', deathYear: '1923' },\r
      {\r
        key: 6,\r
        parent: 2,\r
        name: 'Akitsune',\r
        gender: 'M',\r
        fullTitle: 'Prince Akitsune',\r
        kanjiName: '彰常王',\r
        birthYear: '1920',\r
        deathYear: '2006',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 7,\r
        parent: 2,\r
        name: 'Toshihiko',\r
        gender: 'M',\r
        fullTitle: 'Prince Toshihiko',\r
        kanjiName: '俊彦王',\r
        birthYear: '1929',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 8,\r
        parent: 1,\r
        name: 'Yoshihito',\r
        gender: 'M',\r
        fullTitle: 'Emperor Taishō',\r
        kanjiName: '嘉仁 大正天皇,',\r
        posthumousName: 'Taisho',\r
        birthYear: '1879',\r
        deathYear: '1926'\r
      },\r
      {\r
        key: 9,\r
        parent: 8,\r
        name: 'Hirohito',\r
        gender: 'M',\r
        fullTitle: 'Emperor Showa',\r
        kanjiName: '裕仁 昭和天皇',\r
        posthumousName: 'Showa',\r
        birthYear: '1901',\r
        deathYear: '1989'\r
      },\r
      {\r
        key: 10,\r
        parent: 9,\r
        name: 'Higashikuni Shigeko',\r
        gender: 'F',\r
        spouse: 'Higashikuni Morihiro',\r
        spouseKanji: '東久邇宮 盛厚王',\r
        fullTitle: 'Princess Shigeko Higashikuni',\r
        kanjiName: '東久邇成子',\r
        birthYear: '1925',\r
        deathYear: '1961',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 11,\r
        parent: 10,\r
        name: 'Higashikuni Nobuhiko',\r
        gender: 'M',\r
        fullTitle: 'Prince Higashikuni Nobuhiko',\r
        kanjiName: '東久邇宮 信彦王',\r
        birthYear: '1945',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 12, parent: 11, name: 'Higashikuni Yukihiko', gender: 'M', fullTitle: 'No Title', birthYear: '1974' },\r
      {\r
        key: 13,\r
        parent: 10,\r
        name: 'Higashikuni Fumiko',\r
        gender: 'F',\r
        fullTitle: 'Princess Higashikuni Fumiko',\r
        kanjiName: '文子女王',\r
        birthYear: '1946',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 14, parent: 10, name: 'Higashikuni Naohiko', gender: 'M', fullTitle: 'No Title', kanjiName: '東久邇真彦', birthYear: '1948' },\r
      { key: 15, parent: 14, name: 'Higashikuni Teruhiko', gender: 'M', fullTitle: 'No Title' },\r
      { key: 16, parent: 14, name: 'Higashikuni Matsuhiko', gender: 'M', fullTitle: 'No Title' },\r
      { key: 17, parent: 10, name: 'Higashikuni Hidehiko', gender: 'M', fullTitle: 'No Title', kanjiName: '東久邇基博', birthYear: '1949' },\r
      { key: 18, parent: 10, name: 'Higashikuni Yuko', gender: 'F', fullTitle: 'No Title', kanjiName: '東久邇優子', birthYear: '1950' },\r
      { key: 19, parent: 9, name: 'Sachiko', gender: 'F', fullTitle: 'Princess Sachiko', kanjiName: '久宮祐子', birthYear: '1927', deathYear: '1928' },\r
      {\r
        key: 20,\r
        parent: 9,\r
        name: 'Kazuko Takatsukasa',\r
        gender: 'F',\r
        fullTitle: 'Kazuko, Princess Taka',\r
        kanjiName: '鷹司 和子',\r
        birthYear: '1929',\r
        deathYear: '1989',\r
        statusChange: 'In 1950, lost imperial family status by marrying a commoner'\r
      },\r
      {\r
        key: 21,\r
        parent: 9,\r
        name: 'Atsuko Ikeda',\r
        gender: 'F',\r
        fullTitle: 'Atsuko, Princess Yori',\r
        kanjiName: '池田厚子',\r
        birthYear: '1931',\r
        statusChange: 'In 1952, lost imperial family status by marrying a commoner'\r
      },\r
      {\r
        key: 22,\r
        parent: 9,\r
        name: 'Akihito',\r
        gender: 'M',\r
        fullTitle: 'Reigning Emperor of Japan; Tennō',\r
        kanjiName: '明仁 今上天皇',\r
        posthumousName: 'Heisei',\r
        birthYear: '1933'\r
      },\r
      {\r
        key: 23,\r
        parent: 22,\r
        name: 'Naruhito',\r
        gender: 'M',\r
        fullTitle: 'Naruhito, Crown Prince of Japan',\r
        kanjiName: '皇太子徳仁親王',\r
        orderInSuccession: '1',\r
        birthYear: '1960'\r
      },\r
      { key: 24, parent: 23, name: 'Aiko', gender: 'F', fullTitle: 'Aiko, Princess Toshi', kanjiName: '敬宮愛子内親王', birthYear: '2001' },\r
      {\r
        key: 25,\r
        parent: 22,\r
        name: 'Fumihito',\r
        gender: 'M',\r
        fullTitle: 'Fumihito, Prince Akishino',\r
        kanjiName: '秋篠宮文仁親王',\r
        orderInSuccession: '2',\r
        birthYear: '1965'\r
      },\r
      { key: 26, parent: 25, name: 'Mako', gender: 'F', fullTitle: 'Princess Mako of Akishino', kanjiName: '眞子内親王', birthYear: '1991' },\r
      { key: 27, parent: 25, name: 'Kako', gender: 'F', fullTitle: 'Princess Kako of Akishino', kanjiName: '佳子内親王', birthYear: '1994' },\r
      {\r
        key: 28,\r
        parent: 25,\r
        name: 'Hisahito',\r
        gender: 'M',\r
        fullTitle: 'Prince Hisahito of Akishino',\r
        kanjiName: '悠仁親王',\r
        orderInSuccession: '3',\r
        birthYear: '2006'\r
      },\r
      {\r
        key: 29,\r
        parent: 22,\r
        name: 'Sayako Kuroda',\r
        gender: 'F',\r
        fullTitle: 'Princess Sayako of Japan',\r
        kanjiName: '黒田清子',\r
        birthYear: '1969',\r
        statusChange: 'In 2005, lost imperial family status by marrying a commoner'\r
      },\r
      {\r
        key: 30,\r
        parent: 9,\r
        name: 'Masahito',\r
        gender: 'M',\r
        fullTitle: 'Masahito, Prince Hitachi',\r
        kanjiName: '常陸宮正仁親王',\r
        orderInSuccession: '4',\r
        birthYear: '1935'\r
      },\r
      {\r
        key: 31,\r
        parent: 9,\r
        name: 'Takako Shimazu',\r
        gender: 'F',\r
        fullTitle: 'Princess Takako',\r
        kanjiName: '島津貴子',\r
        birthYear: '1939',\r
        statusChange: 'In 1960, lost imperial family status by marrying a commoner'\r
      },\r
      { key: 32, parent: 31, name: 'Yorihisa Shimazu', gender: 'M', fullTitle: 'No Title', birthYear: '1962' },\r
      {\r
        key: 33,\r
        parent: 8,\r
        name: 'Yasuhito',\r
        gender: 'M',\r
        fullTitle: 'Yasuhito, Prince Chichibu of Japan',\r
        kanjiName: '秩父宮 雍仁',\r
        birthYear: '1902',\r
        deathYear: '1953'\r
      },\r
      {\r
        key: 34,\r
        parent: 8,\r
        name: 'Nobuhito',\r
        gender: 'M',\r
        fullTitle: 'Nobuhito, Prince Takamatsu',\r
        kanjiName: '高松宮宣仁親王',\r
        birthYear: '1905',\r
        deathYear: '1987'\r
      },\r
      {\r
        key: 35,\r
        parent: 8,\r
        name: 'Takahito',\r
        gender: 'M',\r
        fullTitle: 'Takahito, Prince Mikasa',\r
        kanjiName: '三笠宮崇仁親王',\r
        orderInSuccession: '5',\r
        birthYear: '1915'\r
      },\r
      {\r
        key: 36,\r
        parent: 35,\r
        name: 'Yasuko Konoe',\r
        gender: 'F',\r
        fullTitle: 'Princess Yasuko of Mikasa',\r
        kanjiName: '甯子内親王',\r
        birthYear: '1944',\r
        statusChange: 'In 1966, lost imperial family stutus by marrying a commoner'\r
      },\r
      { key: 37, parent: 36, name: 'Tadahiro', gender: 'M', fullTitle: 'None' },\r
      {\r
        key: 38,\r
        parent: 35,\r
        name: 'Tomihito',\r
        gender: 'M',\r
        fullTitle: 'Prince Tomohito of Mikasa',\r
        kanjiName: '三笠宮寬仁',\r
        orderInSuccession: '6',\r
        birthYear: '1946'\r
      },\r
      { key: 39, parent: 38, name: 'Akiko', gender: 'F', fullTitle: 'Princess Akiko of Mikasa', kanjiName: '彬子女王', birthYear: '1981' },\r
      { key: 40, parent: 38, name: 'Yoko', gender: 'F', fullTitle: 'Princess Yoko of Mikasa', kanjiName: '瑶子女王', birthYear: '1983' },\r
      {\r
        key: 41,\r
        parent: 35,\r
        name: 'Yoshihito',\r
        gender: 'M',\r
        fullTitle: 'Yoshihito, Prince Katsura',\r
        kanjiName: '桂宮 宜仁親王',\r
        orderInSuccession: '7',\r
        birthYear: '1948'\r
      },\r
      {\r
        key: 42,\r
        parent: 35,\r
        name: 'Masako Sen',\r
        gender: 'F',\r
        fullTitle: 'Princess Masako of Mikasa',\r
        kanjiName: '容子内親王',\r
        birthYear: '1951',\r
        statusChange: 'In 1983, lost imperial family status by marrying a commoner'\r
      },\r
      { key: 43, parent: 42, name: 'Akifumi', gender: 'M', fullTitle: 'No Title' },\r
      { key: 44, parent: 42, name: 'Takafumi', gender: 'M', fullTitle: 'No Title' },\r
      { key: 45, parent: 42, name: 'Makiko', gender: 'F', fullTitle: 'No Title' },\r
      {\r
        key: 46,\r
        parent: 35,\r
        name: 'Norihito',\r
        gender: 'M',\r
        fullTitle: 'Norihito, Prince Takamado',\r
        kanjiName: '高円宮憲仁親王',\r
        birthYear: '1954',\r
        deathYear: '2002'\r
      },\r
      { key: 47, parent: 46, name: 'Tsuguko', gender: 'F', fullTitle: 'Princess Tsuguko of Takamado', kanjiName: '承子女王', birthYear: '1986' },\r
      { key: 48, parent: 46, name: 'Noriko', gender: 'F', fullTitle: 'Princess Noriko of Takamado', kanjiName: '典子女王', birthYear: '1988' },\r
      { key: 49, parent: 46, name: 'Ayako', gender: 'F', fullTitle: 'Princess Ayako of Takamado', kanjiName: '絢子女王', birthYear: '1990' },\r
      { key: 50, parent: 1, name: 'Masako', gender: 'F', fullTitle: 'Princess Masako of Tsune', birthYear: '1888', deathYear: '1940' },\r
      {\r
        key: 51,\r
        parent: 50,\r
        name: 'Takeda Tsuneyoshi',\r
        gender: 'M',\r
        fullTitle: 'Prince Takeda Tsunehisa',\r
        kanjiName: '竹田宮恒徳王',\r
        birthYear: '1909',\r
        deathYear: '1992',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 52,\r
        parent: 51,\r
        name: 'Takeda Tsunetada',\r
        gender: 'M',\r
        fullTitle: 'Prince Takeda Tsunetada',\r
        kanjiName: '竹田恒正王',\r
        birthYear: '1940',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 53, parent: 52, name: 'Takeda Tsunetaka', gender: 'M', fullTitle: 'No Title', birthYear: '1967' },\r
      { key: 54, parent: 52, name: 'Takeda Hiroko', gender: 'M', fullTitle: 'No Title', birthYear: '1971' },\r
      {\r
        key: 55,\r
        parent: 51,\r
        name: 'Takeda Motoko',\r
        gender: 'F',\r
        fullTitle: 'Princess Takeda Motoko',\r
        kanjiName: '素子女王',\r
        birthYear: '1942',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 56,\r
        parent: 51,\r
        name: 'Takeda Tsunekazu',\r
        gender: 'M',\r
        fullTitle: 'No Title',\r
        kanjiName: '竹田恒和王',\r
        birthYear: '1944',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 57,\r
        parent: 51,\r
        name: 'Takeda Noriko',\r
        gender: 'F',\r
        fullTitle: 'Princess Takeda Noriko',\r
        kanjiName: '紀子女王',\r
        birthYear: '1943',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 58,\r
        parent: 51,\r
        name: 'Tsuneharu Takeda',\r
        gender: 'M',\r
        fullTitle: 'Prince Tsuneharu Takeda',\r
        kanjiName: '竹田恒治王',\r
        birthYear: '1945',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 59,\r
        parent: 50,\r
        name: 'Takeda Ayako',\r
        gender: 'F',\r
        fullTitle: 'Princess Tsune-no-Miya Takeda Ayako',\r
        kanjiName: '禮子女王',\r
        birthYear: '1911',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 60, parent: 1, name: 'Fusako', gender: 'F', fullTitle: 'Princess Fusako of Kane', birthYear: '1890', deathYear: '1974' },\r
      {\r
        key: 61,\r
        parent: 60,\r
        name: 'Kitashirakawa Nagahisa',\r
        gender: 'M',\r
        fullTitle: 'Prince Kitashirakawa Nagahisa',\r
        kanjiName: '北白川宮永久王',\r
        birthYear: '1910',\r
        deathYear: '1940'\r
      },\r
      {\r
        key: 62,\r
        parent: 61,\r
        name: 'Kitashirakawa Michihisa',\r
        gender: 'M',\r
        fullTitle: 'Prince Kitashirakawa Michihisa',\r
        birthYear: '1937',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 63, parent: 62, name: 'Kitashirakawa Naoko', gender: 'F', fullTitle: 'No Title', birthYear: '1969' },\r
      { key: 64, parent: 62, name: 'Kitashirakawa Nobuko', gender: 'F', fullTitle: 'No Title', birthYear: '1971' },\r
      { key: 65, parent: 62, name: 'Kitashirakawa Akiko', gender: 'F', fullTitle: 'No Title', birthYear: '1973' },\r
      {\r
        key: 66,\r
        parent: 61,\r
        name: 'Hatsuko',\r
        gender: 'F',\r
        fullTitle: 'Princess Hatsuko',\r
        birthYear: '1939',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 67,\r
        parent: 60,\r
        name: 'Kitashirakawa Mineko',\r
        gender: 'F',\r
        fullTitle: 'Princess Kitashirakawa Mineko',\r
        kanjiName: '美年子女王',\r
        birthYear: '1910',\r
        deathYear: '1970',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 68,\r
        parent: 60,\r
        name: 'Kitashirakawa Sawako',\r
        gender: 'F',\r
        fullTitle: 'Princess Kitashirakawa Sawako',\r
        kanjiName: '佐和子女王',\r
        birthYear: '1913',\r
        deathYear: '2001',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 69,\r
        parent: 60,\r
        name: 'Kitashirakawa Taeko',\r
        gender: 'F',\r
        fullTitle: 'Princess Kitashirakawa Taeko',\r
        kanjiName: '多惠子女王',\r
        birthYear: '1920',\r
        deathYear: '1954',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 70, parent: 1, name: 'Nobuko', gender: 'F', fullTitle: 'Princess Fumi-no-Miya Nobuko', birthYear: '1891', deathYear: '1933' },\r
      {\r
        key: 71,\r
        parent: 70,\r
        name: 'Asaka Kikuko',\r
        gender: 'F',\r
        fullTitle: 'Princess Asaka Kikuko',\r
        kanjiName: '紀久子',\r
        birthYear: '1911',\r
        deathYear: '1989',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      {\r
        key: 72,\r
        parent: 70,\r
        name: 'Asaka Takahiko',\r
        gender: 'M',\r
        fullTitle: 'Prince Asaka Takahiko',\r
        kanjiName: '朝香 孚彦',\r
        birthYear: '1913',\r
        deathYear: '1994',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 73, parent: 72, name: 'Fukuko', gender: 'F', fullTitle: 'No Title' },\r
      { key: 74, parent: 72, name: 'Minoko', gender: 'F', fullTitle: 'No Title' },\r
      { key: 75, parent: 72, name: 'Tomohiko', gender: 'M', fullTitle: 'No Title' },\r
      {\r
        key: 76,\r
        parent: 70,\r
        name: 'Asaka Tadahito',\r
        gender: 'M',\r
        fullTitle: 'Prince Asaka Tadahito',\r
        kanjiName: '朝香正彦',\r
        birthYear: '1914',\r
        deathYear: '1944'\r
      },\r
      {\r
        key: 77,\r
        parent: 70,\r
        name: 'Asaka Kiyoko',\r
        gender: 'F',\r
        fullTitle: 'Princess Asaka Kiyoko',\r
        kanjiName: '湛子',\r
        birthYear: '1919',\r
        statusChange: 'In 1947, lost imperial family status due to American abrogation of Japanese nobility'\r
      },\r
      { key: 78, parent: 1, name: 'Ten Other Children Not Surviving Infancy' },\r
      { key: 79, parent: 0, name: 'Five Other Children Not Surviving Infancy' }\r
    ];\r
\r
    // create the model for the family tree\r
    myDiagram.model = new go.TreeModel(nodeDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>For a variation of this tree, see the <a href="familyTree">British family tree sample</a>.</p>\r
  <p>For a more complex family tree see the <a href="genogram">genogram sample</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`,`tooltips`,`legend`];var g=y();l(`qdzk8z`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};