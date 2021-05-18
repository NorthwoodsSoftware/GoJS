(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../release/go", "./GoCloudStorageManager", "./GoDropBox", "./GoGoogleDrive", "./GoLocalStorage", "./GoOneDrive"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var go = require("../../release/go");
    var GoCloudStorageManager_1 = require("./GoCloudStorageManager");
    var GoDropBox_1 = require("./GoDropBox");
    var GoGoogleDrive_1 = require("./GoGoogleDrive");
    var GoLocalStorage_1 = require("./GoLocalStorage");
    var GoOneDrive_1 = require("./GoOneDrive");
    /**
     * Sample function to demonstrate how one might set up their GoCloudStorage classes with a manager
     * Used in the storage/index.html sample app
     * @hidden
     */
    function init() {
        window.updateCurrentStorageSpan = function () {
            storageManager.selectStorageService().then(function (storage) {
                document.getElementById('currentStorageSpan').innerHTML = storage.serviceName;
            });
        };
        var isAutoSavingCheckbox = document.getElementById('isAutoSavingCheckbox');
        isAutoSavingCheckbox.addEventListener('change', function () {
            storageManager.storages.iterator.each(function (storage) {
                storage.isAutoSaving = isAutoSavingCheckbox.checked;
            });
        });
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, 'myDiagramDiv', {
            initialContentAlignment: go.Spot.Center,
            'undoManager.isEnabled': true // enable undo & redo
        });
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', // the Shape will go around the TextBlock
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, 
            // Shape.fill is bound to Node.data.color
            new go.Binding('fill', 'color')), $(go.TextBlock, { margin: 8 }, // some room around the text
            new go.Binding('text', 'key')));
        // create the model data that will be represented by Nodes and Links
        myDiagram.model = new go.GraphLinksModel([
            { key: 'Alpha', color: 'lightblue' },
            { key: 'Beta', color: 'orange' },
            { key: 'Gamma', color: 'lightgreen' },
            { key: 'Delta', color: 'pink' }
        ], [
            { from: 'Alpha', to: 'Beta' },
            { from: 'Alpha', to: 'Gamma' },
            { from: 'Beta', to: 'Beta' },
            { from: 'Gamma', to: 'Delta' },
            { from: 'Delta', to: 'Alpha' }
        ]);
        var myDiagram2 = $(go.Diagram, 'myDiagramDiv2', {
            initialContentAlignment: go.Spot.Center,
            'undoManager.isEnabled': true // enable undo & redo
        });
        myDiagram2.nodeTemplate = myDiagram.nodeTemplate.copy();
        // create the model data that will be represented by Nodes and Links
        myDiagram2.model = new go.GraphLinksModel([
            { key: 'Alpha', color: 'lightblue' },
            { key: 'Beta', color: 'orange' },
            { key: 'Gamma', color: 'lightgreen' },
            { key: 'Delta', color: 'pink' }
        ], [
            { from: 'Alpha', to: 'Beta' },
            { from: 'Alpha', to: 'Gamma' },
            { from: 'Beta', to: 'Beta' },
            { from: 'Gamma', to: 'Delta' },
            { from: 'Delta', to: 'Alpha' }
        ]);
        var defaultModel = myDiagram.model.toJson();
        // update the title on page to reflect newly loaded diagram title TODO
        var updateTitle = function () {
            var currentFile = document.getElementById('currentFile');
            if (storageManager.currentStorage.currentDiagramFile.path !== null) {
                var storage = storageManager.currentStorage;
                if (storage.currentDiagramFile.path) {
                    currentFile.innerHTML = storage.currentDiagramFile.path;
                }
                else
                    currentFile.innerHTML = storage.currentDiagramFile.name;
            }
            else {
                currentFile.innerHTML = 'Untitled';
            }
        };
        /**
         * Promise handler for core functions
         * @param { String } action Accepted values: Load, Delete, New, Save
         *
         */
        window.handlePromise = function (action) {
            // tslint:disable-next-line:no-shadowed-variable
            function handleFileData(action, fileData) {
                var words = [];
                switch (action) {
                    case 'Load':
                        words = ['Loaded', 'from'];
                        break;
                    case 'Delete':
                        words = ['Deleted', 'from'];
                        break;
                    case 'New':
                        words = ['Created', 'at'];
                        break;
                    case 'Save':
                        words = ['Saved', 'to'];
                        break;
                    case 'SaveAs':
                        words = ['Saved', 'to'];
                        break;
                }
                var storageServiceName = storageManager.currentStorage.serviceName;
                if (fileData.id && fileData.name && fileData.path) {
                    storageManager.showMessage(words[0] + ' ' + fileData.name + ' (file ID ' + fileData.id + ') ' +
                        words[1] + ' path ' + fileData.path + ' in ' + storageServiceName, 1.5);
                    // tslint:disable-next-line:no-console
                }
                else
                    console.log(fileData); // may have an explanation for why fileData isn't complete
                updateTitle();
            }
            switch (action) {
                case 'Load':
                    storageManager.load().then(function (fileData) {
                        handleFileData(action, fileData);
                    });
                    break;
                case 'Delete':
                    storageManager.remove().then(function (fileData) {
                        handleFileData(action, fileData);
                    });
                    break;
                case 'New':
                    storageManager.create(true).then(function (fileData) {
                        handleFileData(action, fileData);
                    });
                    break;
                case 'SaveAs':
                    storageManager.save().then(function (fileData) {
                        handleFileData(action, fileData);
                    });
                    break;
                case 'Save':
                    storageManager.save(false).then(function (fileData) {
                        handleFileData(action, fileData);
                    });
                    break;
            }
        };
        var diagrams = [myDiagram, myDiagram2];
        var gls = new GoLocalStorage_1.GoLocalStorage(diagrams, defaultModel);
        var god = new GoOneDrive_1.GoOneDrive(diagrams, 'f9b171a6-a12e-48c1-b86c-814ed40fcdd1', defaultModel);
        var ggd = new GoGoogleDrive_1.GoGoogleDrive(diagrams, '16225373139-n24vtg7konuetna3ofbmfcaj2infhgmg.apps.googleusercontent.com', 'AIzaSyDBj43lBLpYMMVKw4aN_pvuRg7_XMVGf18', defaultModel);
        var gdb = new GoDropBox_1.GoDropBox(diagrams, '3sm2ko6q7u1gbix', defaultModel);
        var storages = [gls, god, ggd, gdb];
        var storageManager = new GoCloudStorageManager_1.GoCloudStorageManager(storages, './goCloudStorageIcons/');
        document.getElementById('currentStorageSpan').innerHTML = storageManager.currentStorage.serviceName;
        // uncomment this if you want to immediately prompt user to load a diagram file from GoLocalStorage
        // gls.loadWithUI();
    }
    exports.init = init;
});
