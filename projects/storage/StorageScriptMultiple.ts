import * as go from '../../release/go';
import { GoCloudStorage } from './GoCloudStorage';
import { DiagramFile } from './GoCloudStorage';
import { GoCloudStorageManager } from './GoCloudStorageManager';
import { GoDropBox } from './GoDropBox';
import { GoGoogleDrive } from './GoGoogleDrive';
import { GoLocalStorage } from './GoLocalStorage';
import { GoOneDrive } from './GoOneDrive';

/**
 * @hidden
 */
declare global {
  interface Window {
    handlePromise: Function;
  }
}

/**
 * Sample function to demonstrate how one might set up their GoCloudStorage classes with a manager
 * Used in the storage/index.html sample app
 * @hidden
 */
export function init() {

  (window as any).updateCurrentStorageSpan = function() {
    storageManager.selectStorageService().then(function(storage: GoCloudStorage) {
      document.getElementById('currentStorageSpan').innerHTML = storage.serviceName;
    });
  };

  const isAutoSavingCheckbox = document.getElementById('isAutoSavingCheckbox') as HTMLInputElement;
  isAutoSavingCheckbox.addEventListener('change', function() {
    storageManager.storages.iterator.each(function(storage) {
      storage.isAutoSaving = isAutoSavingCheckbox.checked;
    });
  });

  const $ = go.GraphObject.make;
  const myDiagram = new go.Diagram('myDiagramDiv', {
    initialContentAlignment: go.Spot.Center,  // center the content
    'undoManager.isEnabled': true  // enable undo & redo
  });

  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8 },  // some room around the text
        new go.Binding('text', 'key'))
    );

  // create the model data that will be represented by Nodes and Links
  myDiagram.model = new go.GraphLinksModel(
    [
      { key: 'Alpha', color: 'lightblue' },
      { key: 'Beta', color: 'orange' },
      { key: 'Gamma', color: 'lightgreen' },
      { key: 'Delta', color: 'pink' }
    ],
    [
      { from: 'Alpha', to: 'Beta' },
      { from: 'Alpha', to: 'Gamma' },
      { from: 'Beta', to: 'Beta' },
      { from: 'Gamma', to: 'Delta' },
      { from: 'Delta', to: 'Alpha' }
    ]);

  const myDiagram2 = new go.Diagram('myDiagramDiv2', {
    initialContentAlignment: go.Spot.Center,  // center the content
    'undoManager.isEnabled': true  // enable undo & redo
  });

  myDiagram2.nodeTemplate = myDiagram.nodeTemplate.copy();

  // create the model data that will be represented by Nodes and Links
  myDiagram2.model = new go.GraphLinksModel(
    [
      { key: 'Alpha', color: 'lightblue' },
      { key: 'Beta', color: 'orange' },
      { key: 'Gamma', color: 'lightgreen' },
      { key: 'Delta', color: 'pink' }
    ],
    [
      { from: 'Alpha', to: 'Beta' },
      { from: 'Alpha', to: 'Gamma' },
      { from: 'Beta', to: 'Beta' },
      { from: 'Gamma', to: 'Delta' },
      { from: 'Delta', to: 'Alpha' }
    ]);

  const defaultModel = myDiagram.model.toJson();

  // update the title on page to reflect newly loaded diagram title TODO
  const updateTitle = function() {
    const currentFile = document.getElementById('currentFile') as HTMLElement;
    if (storageManager.currentStorage.currentDiagramFile.path !== null) {
      const storage = storageManager.currentStorage;
      if (storage.currentDiagramFile.path) {
        currentFile.innerHTML = storage.currentDiagramFile.path;
      } else currentFile.innerHTML = storage.currentDiagramFile.name;
    } else {
      currentFile.innerHTML = 'Untitled';
    }
  };

  /**
   * Promise handler for core functions
   * @param { String } action Accepted values: Load, Delete, New, Save
   *
   */
  (window as any).handlePromise = function(action) {
    // tslint:disable-next-line:no-shadowed-variable
    function handleFileData(action: string, fileData: DiagramFile | any) {
      let words = [];
      switch (action) {
        case 'Load': words = ['Loaded', 'from']; break;
        case 'Delete': words = ['Deleted', 'from']; break;
        case 'New': words = ['Created', 'at']; break;
        case 'Save': words = ['Saved', 'to']; break;
        case 'SaveAs': words = ['Saved', 'to']; break;
      }
      const storageServiceName = storageManager.currentStorage.serviceName;
      if (fileData.id && fileData.name && fileData.path) {
        storageManager.showMessage(words[0] + ' ' + fileData.name + ' (file ID ' + fileData.id + ') ' +
          words[1] + ' path ' + fileData.path + ' in ' + storageServiceName, 1.5);
        // tslint:disable-next-line:no-console
      } else console.log(fileData); // may have an explanation for why fileData isn't complete
      updateTitle();
    }

    switch (action) {
      case 'Load': storageManager.load().then(function(fileData) {
        handleFileData(action, fileData);
      }); break;
      case 'Delete': storageManager.remove().then(function(fileData) {
        handleFileData(action, fileData);
      }); break;
      case 'New': storageManager.create(true).then(function(fileData) {
        handleFileData(action, fileData);
      }); break;
      case 'SaveAs': storageManager.save().then(function(fileData) {
        handleFileData(action, fileData);
      }); break;
      case 'Save': storageManager.save(false).then(function(fileData) {
        handleFileData(action, fileData);
      }); break;
    }
  };

  const diagrams = [myDiagram, myDiagram2];
  const gls = new GoLocalStorage(diagrams, defaultModel);
  const god = new GoOneDrive(diagrams, 'f9b171a6-a12e-48c1-b86c-814ed40fcdd1', defaultModel);
  const ggd = new GoGoogleDrive(diagrams, '16225373139-n24vtg7konuetna3ofbmfcaj2infhgmg.apps.googleusercontent.com', 'AIzaSyDBj43lBLpYMMVKw4aN_pvuRg7_XMVGf18', defaultModel);
  const gdb = new GoDropBox(diagrams, '3sm2ko6q7u1gbix', defaultModel);
  const storages = [gls, god, ggd, gdb];

  const storageManager = new GoCloudStorageManager(storages, './goCloudStorageIcons/');
  document.getElementById('currentStorageSpan').innerHTML = storageManager.currentStorage.serviceName;

  // uncomment this if you want to immediately prompt user to load a diagram file from GoLocalStorage
  // gls.loadWithUI();

}
