/*! Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved. */
var gcs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(1);
var GoCloudStorage = (function () {
    function GoCloudStorage(managedDiagrams, defaultModel, clientId, iconsRelativeDirectory) {
        if (managedDiagrams instanceof go.Diagram)
            managedDiagrams = [managedDiagrams];
        this._managedDiagrams = managedDiagrams;
        this._currentDiagramFile = { name: null, id: null, path: null };
        this._isAutoSaving = true;
        if (clientId)
            this._clientId = clientId;
        else
            clientId = null;
        if (defaultModel) {
            var firstChar = defaultModel.trim().charAt(0);
            if (defaultModel && firstChar === '{')
                this._defaultModel = defaultModel;
            if (firstChar !== '{' && !iconsRelativeDirectory)
                this._iconsRelativeDirectory = defaultModel;
            else
                this._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : '../goCloudStorageIcons/';
        }
        else {
            this._defaultModel = null;
            this._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : '../goCloudStorageIcons/';
        }
        var lastChar = this._iconsRelativeDirectory.charAt(this._iconsRelativeDirectory.length - 1);
        if (lastChar !== '/') {
            this._iconsRelativeDirectory += '/';
        }
        var menu = document.createElement('div');
        menu.className = 'goCustomFilepicker';
        menu.style.visibility = 'hidden';
        document.getElementsByTagName('body')[0].appendChild(menu);
        this._ui = menu;
        this._deferredPromise = { promise: this.makeDeferredPromise() };
        function addAutoSave(d) {
            d.addModelChangedListener(function (e) {
                if (e.isTransactionFinished && storage.isAutoSaving && e.oldValue !== '') {
                    if (storage.currentDiagramFile.name) {
                        storage.save();
                    }
                }
            });
        }
        var d = this.managedDiagrams;
        var storage = this;
        if (d instanceof go.Diagram) {
            addAutoSave(d);
        }
        else {
            for (var i = 0; i < d.length; i++) {
                addAutoSave(d[i]);
            }
        }
    }
    Object.defineProperty(GoCloudStorage.prototype, "managedDiagrams", {
        get: function () { return this._managedDiagrams; },
        set: function (value) { this._managedDiagrams = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "defaultModel", {
        get: function () { return this._defaultModel; },
        set: function (value) { this._defaultModel = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "iconsRelativeDirectory", {
        get: function () { return this._iconsRelativeDirectory; },
        set: function (value) { this._iconsRelativeDirectory = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "clientId", {
        get: function () { return this._clientId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "currentDiagramFile", {
        get: function () { return this._currentDiagramFile; },
        set: function (value) { this._currentDiagramFile = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "isAutoSaving", {
        get: function () { return this._isAutoSaving; },
        set: function (value) { this._isAutoSaving = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "serviceName", {
        get: function () { return this._serviceName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "className", {
        get: function () { return this._className; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "ui", {
        get: function () { return this._ui; },
        enumerable: true,
        configurable: true
    });
    GoCloudStorage.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        return new Promise(function (resolve, reject) {
            reject('authorize not implemented');
        });
    };
    GoCloudStorage.prototype.makeDeferredPromise = function () {
        var res;
        var rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        promise.resolve = res;
        promise.reject = rej;
        return promise;
    };
    GoCloudStorage.prototype.getUserInfo = function () {
        return new Promise(function (resolve, reject) {
            reject('getUserInfo not implemented');
        });
    };
    GoCloudStorage.prototype.hideUI = function (isActionCanceled) {
        if (isActionCanceled === void 0) { isActionCanceled = false; }
        var storage = this;
        storage.ui.style.visibility = 'hidden';
        if (isActionCanceled) {
            var action = document.getElementById('actionButton').innerHTML;
            storage._deferredPromise.promise.resolve(action + ' canceled by user');
            storage._deferredPromise.promise = storage.makeDeferredPromise();
        }
    };
    GoCloudStorage.prototype.checkFileExists = function (path) {
        return new Promise(function (resolve, reject) {
            reject('checkFileExists not implemented');
        });
    };
    GoCloudStorage.prototype.getFile = function (path) {
        return new Promise(function (resolve, reject) {
            throw Error('getFile not implemented');
        });
    };
    GoCloudStorage.prototype.showUI = function (action) {
        return new Promise(function (resolve, reject) {
            throw Error('showUI not implemented');
        });
    };
    GoCloudStorage.prototype.create = function (path, saveBefore) {
        if (saveBefore === void 0) { saveBefore = false; }
        var storage = this;
        function makeNewDiagram(d) {
            if (storage.defaultModel)
                d.model = go.Model.fromJson(JSON.parse(storage.defaultModel));
            else
                d.model = new go.GraphLinksModel();
        }
        return new Promise(function (resolve, reject) {
            if (saveBefore) {
                storage.promptUserToSaveBeforeNew().then(function (resp) {
                    if (resp) {
                        storage.saveWithUI().then(function (diagramFile) {
                            storage.currentDiagramFile = { name: null, id: null, path: null };
                            if (storage.managedDiagrams instanceof go.Diagram) {
                                makeNewDiagram(storage.managedDiagrams);
                            }
                            else {
                                for (var i = 0; i < storage.managedDiagrams.length; i++) {
                                    makeNewDiagram(storage.managedDiagrams[i]);
                                }
                            }
                            if (storage.isAutoSaving) {
                                if (path) {
                                    resolve(storage.save(path));
                                }
                                else
                                    resolve(storage.saveWithUI());
                            }
                            else
                                resolve('New diagram created.');
                        });
                    }
                    else {
                        storage.currentDiagramFile = { name: null, id: null, path: null };
                        if (storage.managedDiagrams instanceof go.Diagram) {
                            makeNewDiagram(storage.managedDiagrams);
                        }
                        else {
                            for (var i = 0; i < storage.managedDiagrams.length; i++) {
                                makeNewDiagram(storage.managedDiagrams[i]);
                            }
                        }
                        if (storage.isAutoSaving) {
                            if (path) {
                                resolve(storage.save(path));
                            }
                            else
                                resolve(storage.saveWithUI());
                        }
                        else
                            resolve('New diagram created.');
                    }
                });
            }
            if (!saveBefore) {
                storage.currentDiagramFile = { name: null, id: null, path: null };
                if (storage.managedDiagrams instanceof go.Diagram) {
                    makeNewDiagram(storage.managedDiagrams);
                }
                else {
                    for (var i = 0; i < storage.managedDiagrams.length; i++) {
                        makeNewDiagram(storage.managedDiagrams[i]);
                    }
                }
                if (storage.isAutoSaving) {
                    if (path) {
                        resolve(storage.save(path));
                    }
                    else
                        resolve(storage.saveWithUI());
                }
                else
                    resolve('New diagram created.');
            }
        });
    };
    GoCloudStorage.prototype.promptUserToSaveBeforeNew = function () {
        return new Promise(function (resolve, reject) {
            var d = document.getElementById('gcs-save-before-new');
            if (d) {
                document.body.removeChild(d);
            }
            var div = document.createElement('div');
            div.id = 'gcs-save-before-new';
            var p = document.createElement('p');
            p.innerText = 'Save current diagram(s) before creating a new file?';
            var yb = document.createElement('button');
            yb.innerText = 'Yes';
            var nb = document.createElement('button');
            nb.innerText = 'No';
            yb.onclick = function () {
                document.body.removeChild(div);
                resolve(true);
            };
            nb.onclick = function () {
                document.body.removeChild(div);
                resolve(false);
            };
            nb.style['float'] = 'right';
            div.style['font-family'] = 'Arial, Helvetica, sans-serif';
            div.style['width'] = '400px';
            div.style['top'] = '25%';
            div.style['left'] = '40%';
            div.style['position'] = 'absolute';
            div.style['border'] = '1px solid black';
            div.style['padding'] = '10px';
            div.style['box-shadow'] = '10px 10px 5px #888888';
            div.style['background'] = 'white';
            div.style['z-index'] = '100';
            div.appendChild(p);
            div.appendChild(yb);
            div.appendChild(nb);
            document.body.appendChild(div);
        });
    };
    GoCloudStorage.prototype.makeSaveFile = function () {
        var item = '{\n';
        var storage = this;
        if (storage.managedDiagrams.length === 0)
            return;
        for (var i = 0; i < storage.managedDiagrams.length; i++) {
            var diagram = storage.managedDiagrams[i];
            var div = diagram.div.id;
            var _model = diagram.model.toJson();
            item += '"' + div + '"' + ': ' + diagram.model.toJson();
            if (i + 1 !== storage.managedDiagrams.length)
                item += ',\n';
        }
        item += '\n}';
        return item;
    };
    GoCloudStorage.prototype.loadFromFileContents = function (fileContents) {
        var models = JSON.parse(fileContents);
        for (var divId in models) {
            var model = models[divId];
            var div = document.getElementById(divId);
            var diagram = go.Diagram.fromDiv(div);
            if (diagram) {
                diagram.model = go.Model.fromJson(JSON.stringify(model));
            }
            else {
                throw Error('No Diagram on page is associated with a div with id ' + divId);
            }
        }
    };
    GoCloudStorage.prototype.saveWithUI = function () {
        return new Promise(function (resolve, reject) {
            reject('saveWithUI not implemented');
        });
    };
    GoCloudStorage.prototype.save = function (path) {
        return new Promise(function (resolve, reject) {
            reject('save not implemented');
        });
    };
    GoCloudStorage.prototype.load = function (path) {
        return new Promise(function (resolve, reject) {
            reject('load not implemented');
        });
    };
    GoCloudStorage.prototype.loadWithUI = function () {
        return new Promise(function (resolve, reject) {
            reject('loadWithUI not implemented');
        });
    };
    GoCloudStorage.prototype.remove = function (path) {
        return new Promise(function (resolve, reject) {
            reject('remove not implemented');
        });
    };
    GoCloudStorage.prototype.removeWithUI = function () {
        return new Promise(function (resolve, reject) {
            reject('removeWithUI not implemented');
        });
    };
    return GoCloudStorage;
}());
exports.GoCloudStorage = GoCloudStorage;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = go;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    GoLocalStorage: __webpack_require__(3).GoLocalStorage,
    GoDropBox: __webpack_require__(4).GoDropBox,
    GoGoogleDrive: __webpack_require__(5).GoGoogleDrive,
    GoOneDrive: __webpack_require__(6).GoOneDrive,
    GoNetCore: __webpack_require__(7).GoNetCore,
    GoCloudStorageManager: __webpack_require__(8).GoCloudStorageManager
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(0);
var GoLocalStorage = (function (_super) {
    __extends(GoLocalStorage, _super);
    function GoLocalStorage(managedDiagrams, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel, null, iconsRelativeDirectory) || this;
        try {
            _this._localStorage = window.localStorage;
        }
        catch (e) {
            throw new Error('Cannot access localStorage. Make sure your browser supports localStorage.' +
                'If so, and this issue persists, try unblocking third-party cookies and site data in your browser settings');
        }
        _this.ui.id = 'goLocalStorageCustomFilepicker';
        _this._serviceName = 'Local Storage';
        _this._className = 'GoLocalStorage';
        return _this;
    }
    Object.defineProperty(GoLocalStorage.prototype, "localStorage", {
        get: function () { return this._localStorage; },
        enumerable: true,
        configurable: true
    });
    GoLocalStorage.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        var storage = this;
        return new Promise(function (resolve, reject) {
            try {
                storage.localStorage.setItem('item', 'item');
                storage.localStorage.removeItem('item');
                resolve(true);
            }
            catch (e) {
                resolve(false);
            }
        });
    };
    GoLocalStorage.prototype.showUI = function (action, numAdditionalFiles) {
        var storage = this;
        var ui = storage.ui;
        var spacestring = 'qwe45qw34';
        if (!numAdditionalFiles)
            numAdditionalFiles = 0;
        var maxFilesToShow = GoLocalStorage._MIN_FILES_IN_UI + numAdditionalFiles;
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "localStorage.png'></img>";
        var title = action + ' Diagram File';
        ui.innerHTML += '<strong>' + title + '</strong><hr></hr>';
        ui.style.visibility = 'visible';
        var filesDiv = document.createElement('div');
        filesDiv.id = 'fileOptions';
        var savedDiagrams = [];
        var numFilesToCheck = GoLocalStorage._MIN_FILES_IN_UI + numAdditionalFiles;
        var numFilesChecked = 0;
        var hasCheckedAllFiles = false;
        if (storage.localStorage.length !== 0) {
            for (var key in storage.localStorage) {
                if (savedDiagrams.length < maxFilesToShow) {
                    numFilesChecked++;
                    var fileContent = storage.localStorage.getItem(key);
                    if (fileContent && (fileContent.indexOf('GraphLinksModel') !== -1 || fileContent.indexOf('TreeModel') !== -1)) {
                        var file = { key: key, model: fileContent };
                        savedDiagrams.push(file);
                    }
                    if (numFilesChecked === storage.localStorage.length)
                        hasCheckedAllFiles = true;
                }
            }
        }
        else
            hasCheckedAllFiles = true;
        if (savedDiagrams.length !== 0) {
            for (var i = 0; i < savedDiagrams.length; i++) {
                var kvp = savedDiagrams[i];
                var file = kvp['key'];
                var fileId = file.replace(/ /g, spacestring);
                if (action !== 'Save') {
                    filesDiv.innerHTML +=
                        "<div class='fileOption'>" +
                            '<input id=' + fileId + " type='radio' name='localStorageFile' />" +
                            '<label id =' + fileId + '-label' + " for='" + fileId + "'>" + file + '</label>' +
                            '</div>';
                }
                else {
                    filesDiv.innerHTML +=
                        "<div class='fileOption'>" +
                            '<label id =' + fileId + '-label' + " for='" + fileId + "'>" + file + '</label>' +
                            '</div>';
                }
            }
        }
        if (!hasCheckedAllFiles) {
            var num_1 = numAdditionalFiles + 50;
            filesDiv.innerHTML += "<p>There may be more diagram files not shown. <a id='localStorageLoadMoreFiles'>Click here</a> to try loading more.</p>";
            document.getElementById('localStorageLoadMoreFiles').onclick = function () {
                storage.showUI(action, num_1);
            };
        }
        ui.appendChild(filesDiv);
        if (storage.currentDiagramFile.id) {
            var str = storage.currentDiagramFile.id.replace(/ /g, spacestring);
            var el = document.getElementById(str + '-label');
            if (el)
                el.style.fontStyle = 'italic';
        }
        if (action === 'Save') {
            var userInputDiv = document.createElement('div');
            userInputDiv.id = 'userInputDiv';
            userInputDiv.innerHTML += '<span>Save Diagram As </span><input id="userInput" placeholder="Enter filename"></input>';
            ui.appendChild(userInputDiv);
        }
        var submitDiv = document.createElement('div');
        submitDiv.id = 'submitDiv';
        var actionButton = document.createElement('button');
        actionButton.textContent = action;
        actionButton.id = 'actionButton';
        actionButton.onclick = function () {
            storage.processUIResult(action);
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);
        var cancelDiv = document.createElement('div');
        var cancelButton = document.createElement('button');
        cancelButton.id = 'cancelButton';
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = function () {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);
        return storage._deferredPromise['promise'];
    };
    GoLocalStorage.prototype.processUIResult = function (action) {
        var storage = this;
        function getSelectedFile() {
            var radios = document.getElementsByName('localStorageFile');
            var selectedFile = null;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    selectedFile = radios[i].id.replace(/qwe45qw34/g, ' ');
                }
            }
            if (selectedFile)
                return selectedFile;
            else
                return null;
        }
        var file = getSelectedFile();
        switch (action) {
            case 'Save': {
                var name_1 = document.getElementById('userInput').value;
                if (name_1) {
                    name_1 += '.diagram';
                    storage.save(name_1);
                }
                else {
                }
                break;
            }
            case 'Load': {
                storage.load(file);
                break;
            }
            case 'Delete': {
                storage.remove(file);
                break;
            }
        }
        storage.hideUI();
    };
    GoLocalStorage.prototype.getFile = function (path) {
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new Promise(function (resolve, reject) {
            var fileContent = (!!window.localStorage.getItem(path)) ? window.localStorage.getItem(path) : null;
            var file = { name: path, content: fileContent, path: path, id: path };
            resolve(file);
        });
    };
    GoLocalStorage.prototype.checkFileExists = function (path) {
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new Promise(function (resolve, reject) {
            var fileExists = !!(window.localStorage.getItem(path));
            resolve(fileExists);
        });
    };
    GoLocalStorage.prototype.saveWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            resolve(storage.showUI('Save'));
        });
    };
    GoLocalStorage.prototype.save = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                if (path.indexOf('.diagram') === -1)
                    path += '.diagram';
                var item = storage.makeSaveFile();
                storage.localStorage.setItem(path, item);
                var savedFile = { name: path, id: path, path: path };
                storage.currentDiagramFile = savedFile;
                resolve(savedFile);
                storage._deferredPromise['promise'].resolve(savedFile);
                storage._deferredPromise['promise'] = storage.makeDeferredPromise();
            }
            else if (storage.currentDiagramFile.path) {
                var saveName = storage.currentDiagramFile['path'];
                var savedFile = { name: saveName, path: saveName, id: saveName };
                var item = storage.makeSaveFile();
                storage.localStorage.setItem(saveName, item);
                resolve(saveName);
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoLocalStorage.prototype.loadWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            resolve(storage.showUI('Load'));
        }).catch(function (e) {
            throw Error(e);
        });
    };
    GoLocalStorage.prototype.load = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                var fileContents = storage.localStorage.getItem(path);
                if (fileContents) {
                    storage.loadFromFileContents(fileContents);
                    var loadedFile = { name: path, id: path, path: path };
                    storage.currentDiagramFile = loadedFile;
                    resolve(loadedFile);
                    storage._deferredPromise.promise.resolve(loadedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();
                }
                else
                    throw Error('Cannot load file from local storage with path ' + path);
            }
            else
                throw Error('Cannot load file from local storage with path ' + path);
        }).catch(function (e) {
            throw Error(e);
        });
    };
    GoLocalStorage.prototype.removeWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            resolve(storage.showUI('Delete'));
        });
    };
    GoLocalStorage.prototype.remove = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                var deletedFile = { name: path, path: path, id: path };
                if (storage.currentDiagramFile && path === storage.currentDiagramFile['name'])
                    storage.currentDiagramFile = { name: null, path: null, id: null };
                storage.localStorage.removeItem(path);
                resolve(deletedFile);
                storage._deferredPromise['promise'].resolve(deletedFile);
                storage._deferredPromise['promise'] = storage.makeDeferredPromise();
            }
            else
                throw Error('Cannot delete file from local storage with path ' + path);
        });
    };
    GoLocalStorage._MIN_FILES_IN_UI = 100;
    return GoLocalStorage;
}(gcs.GoCloudStorage));
exports.GoLocalStorage = GoLocalStorage;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(0);
var GoDropBox = (function (_super) {
    __extends(GoDropBox, _super);
    function GoDropBox(managedDiagrams, clientId, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel, clientId, iconsRelativeDirectory) || this;
        if (window['Dropbox']) {
            var Dropbox = window['Dropbox'];
            _this._dropbox = new Dropbox({ clientId: clientId });
        }
        _this.menuPath = '';
        _this.ui.id = 'goDropBoxCustomFilepicker';
        _this._serviceName = 'Dropbox';
        _this._className = 'GoDropBox';
        _this._options = {
            success: function (files) {
                alert("Here's the file link: " + files[0].link);
            },
            cancel: function () {
            },
            linkType: 'direct',
            multiselect: false,
            extensions: ['.pdf', '.doc', '.docx', '.diagram'],
            folderselect: false
        };
        return _this;
    }
    Object.defineProperty(GoDropBox.prototype, "dropbox", {
        get: function () { return this._dropbox; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoDropBox.prototype, "menuPath", {
        get: function () { return this._menuPath; },
        set: function (value) { this._menuPath = value; },
        enumerable: true,
        configurable: true
    });
    GoDropBox.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (refreshToken) {
                storage.maybeSaveAppState();
                var authUrl = storage.dropbox.getAuthenticationUrl(window.location.href);
                window.location.href = authUrl;
                resolve(false);
            }
            else if (!storage.dropbox.getAccessToken()) {
                if (storage.getAccessTokenFromUrl()) {
                    storage.dropbox.setAccessToken(storage.getAccessTokenFromUrl());
                    resolve(true);
                }
                else {
                    storage.maybeSaveAppState();
                    var authUrl = storage.dropbox.getAuthenticationUrl(window.location.href);
                    window.location.href = authUrl;
                    resolve(false);
                }
            }
            storage.maybeLoadAppState();
            resolve(true);
        });
    };
    GoDropBox.prototype.getAccessTokenFromUrl = function () {
        var accessToken = window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.indexOf('&'));
        return !!accessToken ? accessToken : null;
    };
    GoDropBox.prototype.maybeSaveAppState = function () {
        var storage = this;
        try {
            var item = storage.makeSaveFile();
            window.localStorage.setItem('gdb-' + storage.clientId, item);
        }
        catch (e) {
            throw new Error('Local storage not supported; diagrams model data will not be preserved during Dropboc authentication.');
        }
    };
    GoDropBox.prototype.maybeLoadAppState = function () {
        var storage = this;
        try {
            var fileContents = window.localStorage.getItem('gdb-' + storage.clientId);
            storage.loadFromFileContents(fileContents);
            localStorage.removeItem('gdb-' + storage.clientId);
        }
        catch (e) { }
    };
    GoDropBox.prototype.signOut = function () {
        var storage = this;
        var dbx = storage.dropbox;
        storage.maybeSaveAppState();
        dbx.setAccessToken(null);
        dbx.authTokenRevoke();
    };
    GoDropBox.prototype.getUserInfo = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (!storage.dropbox.getAccessToken() && window.location.hash.indexOf('access_token') === -1) {
                storage.authorize(true);
            }
            else if (!storage.dropbox.getAccessToken() && window.location.hash.indexOf('access_token') === 1) {
                storage.authorize(false);
            }
            storage.dropbox.usersGetCurrentAccount(null).then(function (userData) {
                resolve(userData);
            }).catch(function (e) {
                if (e.status === 400) {
                    storage.authorize(true);
                }
            });
        });
    };
    GoDropBox.prototype.showUI = function () {
        var storage = this;
        var ui = storage.ui;
        ui.innerHTML = '';
        ui.style.visibility = 'visible';
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "dropBox.png'></img><strong>Save Diagram As</strong><hr></hr>";
        var userInputDiv = document.createElement('div');
        userInputDiv.id = 'userInputDiv';
        userInputDiv.innerHTML += '<input id="gdb-userInput" placeholder="Enter filename"></input>';
        ui.appendChild(userInputDiv);
        var submitDiv = document.createElement('div');
        submitDiv.id = 'submitDiv';
        var actionButton = document.createElement('button');
        actionButton.id = 'actionButton';
        actionButton.textContent = 'Save';
        actionButton.onclick = function () {
            var input = (document.getElementById('gdb-userInput'));
            var val = input.value;
            if (val !== '' && val !== undefined && val != null) {
                ui.style.visibility = 'hidden';
                storage.saveWithUI(val);
            }
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);
        var cancelDiv = document.createElement('div');
        cancelDiv.id = 'cancelDiv';
        var cancelButton = document.createElement('button');
        cancelButton.id = 'cancelButton';
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = function () {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);
        return storage._deferredPromise.promise;
    };
    GoDropBox.prototype.hideUI = function (isActionCanceled) {
        var storage = this;
        storage.menuPath = '';
        _super.prototype.hideUI.call(this, isActionCanceled);
    };
    GoDropBox.prototype.processUIResult = function (action) {
        var storage = this;
        function getSelectedFilepath() {
            var radios = document.getElementsByName('dropBoxFile');
            var selectedFile = null;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    selectedFile = radios[i].getAttribute('data');
                }
            }
            return selectedFile;
        }
        var filePath = getSelectedFilepath();
        switch (action) {
            case 'Save': {
                if (storage.menuPath || storage.menuPath === '') {
                    var name_1 = document.getElementById('userInput').value;
                    if (name_1) {
                        if (name_1.indexOf('.diagram') === -1)
                            name_1 += '.diagram';
                        storage.save(storage.menuPath + '/' + name_1);
                    }
                    else {
                        console.log('Proposed file name is not valid');
                    }
                }
                break;
            }
            case 'Load': {
                storage.load(filePath);
                break;
            }
            case 'Delete': {
                storage.remove(filePath);
                break;
            }
        }
        storage.hideUI();
    };
    GoDropBox.prototype.checkFileExists = function (path) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new Promise(function (resolve, reject) {
            storage.dropbox.filesGetMetadata({ path: path }).then(function (resp) {
                if (resp)
                    resolve(true);
            }).catch(function (err) {
                resolve(false);
            });
        });
    };
    GoDropBox.prototype.getFile = function (path) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return storage.dropbox.filesGetMetadata({ path: path }).then(function (resp) {
            if (resp)
                return resp;
        }).catch(function (err) {
            return null;
        });
    };
    GoDropBox.prototype.saveWithUI = function (filename) {
        var storage = this;
        if (filename === undefined || filename == null) {
            return new Promise(function (resolve, reject) {
                resolve(storage.showUI());
            });
        }
        else {
            if (filename.length < 8) {
                filename += '.diagram';
            }
            else {
                var lastEight = filename.substring(filename.length - 8, filename.length);
                if (lastEight !== '.diagram') {
                    filename += '.diagram';
                }
            }
            return new Promise(function (resolve, reject) {
                storage._options.success = function (resp) {
                    var a = 3;
                    var savedFile = null;
                    storage.dropbox.filesListFolder({
                        path: '',
                        recursive: true
                    }).then(function (r) {
                        var files = r.entries;
                        var possibleFiles = [];
                        var latestestDate = new Date(-8400000);
                        var latestFile = null;
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            var dateModified = new Date(file.server_modified);
                            if (dateModified != null && dateModified !== undefined && dateModified instanceof Date) {
                                if (dateModified > latestestDate) {
                                    dateModified = latestestDate;
                                    latestFile = file;
                                }
                            }
                        }
                        var savedFile = { name: latestFile.name, path: latestFile.path_lower, id: latestFile.id };
                        storage.currentDiagramFile = savedFile;
                        resolve(savedFile);
                        storage._deferredPromise.promise.resolve(savedFile);
                        storage._deferredPromise.promise = storage.makeDeferredPromise();
                    });
                };
                function makeTextFile(text) {
                    var data = new Blob([text], { type: 'text/plain' });
                    var uri = '';
                    uri = window.URL.createObjectURL(data);
                    return uri;
                }
                var dataURI = 'data:text/html,' + encodeURIComponent(storage.makeSaveFile());
                var Dropbox = window['Dropbox'];
                Dropbox.save(dataURI, filename, storage._options);
            });
        }
    };
    GoDropBox.prototype.save = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                storage.dropbox.filesUpload({
                    contents: storage.makeSaveFile(),
                    path: path,
                    autorename: true,
                    mode: { '.tag': 'add' },
                    mute: false
                }).then(function (resp) {
                    var savedFile = { name: resp.name, id: resp.id, path: resp.path_lower };
                    storage.currentDiagramFile = savedFile;
                    resolve(savedFile);
                    storage._deferredPromise.promise.resolve(savedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();
                }).catch(function (e) {
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            }
            else if (storage.currentDiagramFile.path) {
                path = storage.currentDiagramFile.path;
                storage.dropbox.filesUpload({
                    contents: storage.makeSaveFile(),
                    path: path,
                    autorename: false,
                    mode: { '.tag': 'overwrite' },
                    mute: true
                }).then(function (resp) {
                    var savedFile = { name: resp.name, id: resp.id, path: resp.path_lower };
                    resolve(savedFile);
                }).catch(function (e) {
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoDropBox.prototype.loadWithUI = function () {
        var storage = this;
        storage._options.success = function (r) {
            var file = r[0];
            storage.dropbox.filesGetMetadata({ path: file.id }).then(function (resp) {
                var path = resp.path_display;
                storage.load(path);
            });
        };
        var Dropbox = window['Dropbox'];
        Dropbox.choose(storage._options);
        return storage._deferredPromise.promise;
    };
    GoDropBox.prototype.load = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                storage.dropbox.filesGetTemporaryLink({ path: path }).then(function (resp) {
                    var link = resp.link;
                    storage.currentDiagramFile.name = resp.metadata.name;
                    storage.currentDiagramFile.id = resp.metadata.id;
                    storage.currentDiagramFile.path = path;
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', link, true);
                    xhr.setRequestHeader('Authorization', 'Bearer ' + storage.dropbox.getAccessToken());
                    xhr.onload = function () {
                        if (xhr.readyState === 4 && (xhr.status === 200)) {
                            storage.loadFromFileContents(xhr.response);
                            var loadedFile = { name: resp.metadata.name, id: resp.metadata.id, path: resp.metadata.path_lower };
                            resolve(loadedFile);
                            storage._deferredPromise.promise.resolve(loadedFile);
                            storage._deferredPromise.promise = storage.makeDeferredPromise();
                        }
                        else {
                            throw Error('Cannot load file from Dropbox with path ' + path);
                        }
                    };
                    xhr.send();
                }).catch(function (e) {
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            }
            else
                throw Error('Cannot load file from Dropbox with path ' + path);
        });
    };
    GoDropBox.prototype.removeWithUI = function () {
        var storage = this;
        storage._options.success = function (r) {
            var file = r[0];
            storage.dropbox.filesGetMetadata({ path: file.id }).then(function (resp) {
                var path = resp.path_display;
                storage.remove(path);
            });
        };
        var Dropbox = window['Dropbox'];
        Dropbox.choose(storage._options);
        return storage._deferredPromise.promise;
    };
    GoDropBox.prototype.remove = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                storage.dropbox.filesDelete({ path: path }).then(function (resp) {
                    if (storage.currentDiagramFile && storage.currentDiagramFile['id'] === resp['id'])
                        storage.currentDiagramFile = { name: null, path: null, id: null };
                    var deletedFile = { name: resp.name, id: resp['id'], path: resp.path_lower };
                    resolve(deletedFile);
                    storage._deferredPromise.promise.resolve(deletedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();
                }).catch(function (e) {
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            }
            else
                throw Error('Cannot delete file from Dropbox with path ' + path);
        });
    };
    return GoDropBox;
}(gcs.GoCloudStorage));
exports.GoDropBox = GoDropBox;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(0);
var GoGoogleDrive = (function (_super) {
    __extends(GoGoogleDrive, _super);
    function GoGoogleDrive(managedDiagrams, clientId, pickerApiKey, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel, clientId, iconsRelativeDirectory) || this;
        _this._scope = 'https://www.googleapis.com/auth/drive';
        _this._pickerApiKey = pickerApiKey;
        _this._oauthToken = null;
        _this._gapiClient = null;
        _this._gapiPicker = null;
        _this.ui.id = 'goGoogleDriveSavePrompt';
        _this._serviceName = 'Google Drive';
        _this._className = 'GoGoogleDrive';
        return _this;
    }
    Object.defineProperty(GoGoogleDrive.prototype, "pickerApiKey", {
        get: function () { return this._pickerApiKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoGoogleDrive.prototype, "scope", {
        get: function () { return this._scope; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoGoogleDrive.prototype, "gapiClient", {
        get: function () { return this._gapiClient; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoGoogleDrive.prototype, "gapiPicker", {
        get: function () { return this._gapiPicker; },
        enumerable: true,
        configurable: true
    });
    GoGoogleDrive.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        var storage = this;
        var gapi = null;
        if (window['gapi'])
            gapi = window['gapi'];
        else
            return;
        if (refreshToken) {
            var href = document.location.href;
            document.location.href = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=' + href;
        }
        return new Promise(function (resolve, reject) {
            function auth() {
                gapi.auth.authorize({
                    'client_id': storage.clientId,
                    'scope': storage.scope,
                    'immediate': false
                }, function (authResult) {
                    if (authResult && !authResult.error) {
                        storage._oauthToken = authResult.access_token;
                    }
                    storage._gapiClient = gapi.client;
                    if (window['google'])
                        storage._gapiPicker = window['google']['picker'];
                    resolve(true);
                });
            }
            gapi.load('client:auth', auth);
            gapi.load('picker', {});
        });
    };
    GoGoogleDrive.prototype.createPicker = function (cb) {
        var storage = this;
        if (storage._oauthToken) {
            var appId = storage.clientId.substring(0, this.clientId.indexOf('-'));
            var view = new storage.gapiPicker.View(storage.gapiPicker.ViewId.DOCS);
            view.setMimeTypes('application/json');
            view.setQuery('*.diagram');
            var picker = new storage.gapiPicker.PickerBuilder()
                .enableFeature(storage.gapiPicker.Feature.NAV_HIDDEN)
                .enableFeature(storage.gapiPicker.Feature.MULTISELECT_ENABLED)
                .setAppId(appId)
                .setOrigin(window.location.protocol + '//' + window.location.host)
                .setOAuthToken(storage._oauthToken)
                .addView(view)
                .setDeveloperKey(storage.pickerApiKey)
                .setCallback(function (args) {
                cb(args);
            })
                .build();
            picker.setVisible(true);
        }
    };
    GoGoogleDrive.prototype.getUserInfo = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var request = storage.gapiClient.request({
                'path': '/drive/v3/about',
                'method': 'GET',
                'params': { 'fields': 'user' },
                callback: function (resp) {
                    if (resp)
                        resolve(resp.user);
                    else
                        reject(resp);
                }
            });
        });
    };
    GoGoogleDrive.prototype.getFile = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var req = storage.gapiClient.request({
                path: '/drive/v3/files/' + path,
                method: 'GET',
                callback: function (resp) {
                    if (!resp.error) {
                        resolve(resp);
                    }
                    else {
                        reject(resp.error);
                    }
                }
            });
        });
    };
    GoGoogleDrive.prototype.checkFileExists = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var req = storage.gapiClient.request({
                path: '/drive/v3/files/' + path,
                method: 'GET',
                callback: function (resp) {
                    var bool = (!!resp);
                    resolve(bool);
                }
            });
        });
    };
    GoGoogleDrive.prototype.showUI = function () {
        var storage = this;
        var ui = storage.ui;
        ui.innerHTML = '';
        ui.style.visibility = 'visible';
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "googleDrive.jpg'></img><strong>Save Diagram As</strong><hr></hr>";
        var userInputDiv = document.createElement('div');
        userInputDiv.id = 'userInputDiv';
        userInputDiv.innerHTML += '<input id="userInput" placeholder="Enter filename"></input>';
        ui.appendChild(userInputDiv);
        var submitDiv = document.createElement('div');
        submitDiv.id = 'submitDiv';
        var actionButton = document.createElement('button');
        actionButton.id = 'actionButton';
        actionButton.textContent = 'Save';
        actionButton.onclick = function () {
            storage.saveWithUI();
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);
        var cancelDiv = document.createElement('div');
        cancelDiv.id = 'cancelDiv';
        var cancelButton = document.createElement('button');
        cancelButton.id = 'cancelButton';
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = function () {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);
        return storage._deferredPromise.promise;
    };
    GoGoogleDrive.prototype.saveWithUI = function () {
        var storage = this;
        var ui = storage.ui;
        return new Promise(function (resolve, reject) {
            if (ui.style.visibility === 'hidden') {
                resolve(storage.showUI());
            }
            else {
                var saveName = document.getElementById('userInput').value;
                storage.save(saveName);
                resolve(storage.hideUI());
            }
        });
    };
    GoGoogleDrive.prototype.save = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                if (path.indexOf('.diagram') === -1)
                    path += '.diagram';
                var overwrite_1 = false;
                var overwriteFile_1 = null;
                var request = storage.gapiClient.request({
                    'path': '/drive/v3/files',
                    'method': 'GET',
                    'params': { 'q': 'trashed=false and name contains ".diagram" and mimeType = "application/json"' },
                    callback: function (resp) {
                        var savedDiagrams = resp.files;
                        if (savedDiagrams) {
                            for (var i = 0; i < savedDiagrams.length; i++) {
                                if (savedDiagrams[i]['name'] === path) {
                                    overwrite_1 = true;
                                    overwriteFile_1 = savedDiagrams[i];
                                }
                            }
                        }
                        var boundary = '-------314159265358979323846';
                        var delimiter = '\r\n--' + boundary + '\r\n';
                        var closeDelim = '\r\n--' + boundary + '--';
                        var contentType = 'application/json';
                        var metadata = {
                            'name': path,
                            'mimeType': contentType
                        };
                        var data = storage.makeSaveFile();
                        var multipartRequestBody = delimiter +
                            'Content-Type: application/json\r\n\r\n' +
                            JSON.stringify(metadata) +
                            delimiter +
                            'Content-Type: ' + contentType + '\r\n\r\n' +
                            data +
                            closeDelim;
                        var req = storage.gapiClient.request({
                            'path': '/upload/drive/v3/files',
                            'method': 'POST',
                            'params': { 'uploadType': 'multipart' },
                            'headers': {
                                'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                            },
                            'body': multipartRequestBody
                        });
                        req.execute(function (response) {
                            var savedFile = { name: response.name, id: response.id, path: response.name };
                            storage.currentDiagramFile = savedFile;
                            resolve(savedFile);
                            storage._deferredPromise.promise.resolve(savedFile);
                            storage._deferredPromise.promise = storage.makeDeferredPromise();
                        });
                    }
                });
            }
            else if (storage.currentDiagramFile.path) {
                var fileId = storage.currentDiagramFile.id;
                var saveFile = storage.makeSaveFile();
                storage.gapiClient.request({
                    path: '/upload/drive/v3/files/' + fileId,
                    method: 'PATCH',
                    params: { uploadType: 'media' },
                    body: saveFile,
                    callback: function (resp) {
                        if (!resp.error) {
                            var savedFile = { name: resp.name, id: resp.id, path: resp.name };
                            resolve(savedFile);
                        }
                        else if (resp.error.code === 401) {
                            storage.authorize(true);
                        }
                    }
                });
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoGoogleDrive.prototype.loadWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var loadFunction = function (data) {
                if (data.action === 'picked') {
                    var file_1 = data.docs[0];
                    storage.gapiClient.request({
                        'path': '/drive/v3/files/' + file_1.id + '?alt=media',
                        'method': 'GET',
                        callback: function (modelData) {
                            if (file_1.name.indexOf('.diagram') !== -1) {
                                var loadedFile = { name: file_1.name, path: file_1.name, id: file_1.id };
                                resolve(storage.load(file_1.id));
                                storage.currentDiagramFile = loadedFile;
                            }
                        }
                    });
                }
            };
            storage.createPicker(loadFunction);
        });
    };
    GoGoogleDrive.prototype.load = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            storage.getFile(path).then(function (file) {
                storage.gapiClient.request({
                    'path': '/drive/v3/files/' + file.id + '?alt=media',
                    'method': 'GET',
                    callback: function (modelData) {
                        if (modelData) {
                            if (file.name.indexOf('.diagram') !== -1) {
                                storage.loadFromFileContents(JSON.stringify(modelData));
                                var loadedFile = { name: file['name'], path: file['name'], id: file['id'] };
                                storage.currentDiagramFile = loadedFile;
                                resolve(loadedFile);
                            }
                        }
                    }
                });
            }).catch(function (e) {
                reject(e.message);
            });
        });
    };
    GoGoogleDrive.prototype.removeWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var deleteFunction = function (data) {
                if (data['action'] === 'picked') {
                    var file = data['docs'][0];
                    resolve(storage.remove(file.id));
                }
            };
            storage.createPicker(deleteFunction);
        });
    };
    GoGoogleDrive.prototype.remove = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            storage.getFile(path).then(function (deletedFile) {
                storage.gapiClient.request({
                    'path': 'drive/v3/files/' + path,
                    'method': 'DELETE',
                    callback: function () {
                        if (storage.currentDiagramFile && path === storage.currentDiagramFile.id)
                            storage.currentDiagramFile = { name: null, path: null, id: null };
                        deletedFile['path'] = deletedFile['name'];
                        resolve(deletedFile);
                    }
                });
            }).catch(function (e) {
                reject(e.message);
            });
        });
    };
    return GoGoogleDrive;
}(gcs.GoCloudStorage));
exports.GoGoogleDrive = GoGoogleDrive;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(0);
var GoOneDrive = (function (_super) {
    __extends(GoOneDrive, _super);
    function GoOneDrive(managedDiagrams, clientId, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel, clientId, iconsRelativeDirectory) || this;
        _this._oauthToken = null;
        _this.ui.id = 'goOneDriveSavePrompt';
        if (window['OneDrive']) {
            _this._oneDriveFilepicker = window['OneDrive'];
        }
        _this.authorize(false);
        _this._serviceName = 'Microsoft OneDrive';
        _this._className = 'GoOneDrive';
        return _this;
    }
    Object.defineProperty(GoOneDrive.prototype, "oauthToken", {
        get: function () { return this._oauthToken; },
        set: function (value) { this._oauthToken = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoOneDrive.prototype, "oneDriveFilepicker", {
        get: function () { return this._oneDriveFilepicker; },
        enumerable: true,
        configurable: true
    });
    GoOneDrive.prototype.authorize = function (refreshToken) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (!refreshToken && window.location.hash.indexOf('access_token') !== -1) {
                var accessToken = window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.indexOf('&'));
                storage.oauthToken = accessToken;
                resolve(true);
            }
            else if (refreshToken) {
                var authUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' + storage.clientId +
                    '&scope=files.readwrite.all&response_type=token&redirect_uri=' + window.location.href + '';
                window.location.href = authUrl;
                resolve(true);
            }
        });
    };
    GoOneDrive.prototype.getUserInfo = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            if (!storage.oauthToken) {
                if (window.location.hash.indexOf('access_token') === -1) {
                    reject('No acessToken in current uri');
                    storage.authorize(true);
                }
                else {
                    reject('oauthToken not set');
                    storage.authorize(false);
                }
            }
            else {
                xhr.open('GET', 'https://graph.microsoft.com/v1.0/me');
                xhr.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else if (xhr.status === 401) {
                        storage.authorize(true);
                        reject(xhr.response);
                    }
                };
                xhr.send();
            }
        });
    };
    GoOneDrive.prototype.checkFileExists = function (path) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://graph.microsoft.com/v1.0' + path, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
            xhr.onreadystatechange = function () {
                var bool;
                var err;
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        bool = true;
                    }
                    else if (xhr.status === 401) {
                        storage.authorize(true);
                    }
                    else if (xhr.status === 404) {
                        bool = false;
                    }
                    else {
                        err = xhr.response;
                    }
                    resolve(bool);
                    if (err)
                        reject(err);
                }
            };
            xhr.send();
        });
    };
    GoOneDrive.prototype.getFile = function (path, token) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://graph.microsoft.com/v1.0' + path, true);
            var t = (token) ? token : storage.oauthToken;
            xhr.setRequestHeader('Authorization', 'Bearer ' + t);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var file = JSON.parse(xhr.response);
                        resolve(file);
                    }
                    else if (xhr.status === 401) {
                        storage.authorize(true);
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.send();
        });
    };
    GoOneDrive.prototype.showUI = function () {
        var storage = this;
        var ui = storage.ui;
        ui.innerHTML = '';
        ui.style.visibility = 'visible';
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "oneDrive.png'></img><strong>Save Diagram As</strong><hr></hr>";
        var userInputDiv = document.createElement('div');
        userInputDiv.id = 'userInputDiv';
        userInputDiv.innerHTML += '<input id="userInput" placeholder="Enter filename"></input>';
        ui.appendChild(userInputDiv);
        var submitDiv = document.createElement('div');
        submitDiv.id = 'submitDiv';
        var actionButton = document.createElement('button');
        actionButton.id = 'actionButton';
        actionButton.textContent = 'Save';
        actionButton.onclick = function () {
            storage.saveWithUI();
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);
        var cancelDiv = document.createElement('div');
        cancelDiv.id = 'cancelDiv';
        var cancelButton = document.createElement('button');
        cancelButton.id = 'cancelButton';
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = function () {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);
        return storage._deferredPromise.promise;
    };
    GoOneDrive.prototype.saveWithUI = function () {
        var storage = this;
        var ui = storage.ui;
        return new Promise(function (resolve, reject) {
            if (ui.style.visibility === 'hidden') {
                resolve(storage.showUI());
            }
            else {
                var saveName_1 = document.getElementById('userInput').value;
                if (saveName_1 && saveName_1.indexOf('.diagram') === -1)
                    saveName_1 += '.diagram';
                var odOptions = {
                    clientId: storage.clientId,
                    action: 'query',
                    openInNewWindow: true,
                    success: function (selection) {
                        var folder = selection.value[0];
                        var token = selection.accessToken;
                        storage.currentDiagramFile = {
                            id: null,
                            name: saveName_1,
                            token: token,
                            parentReference: {
                                driveId: folder['parentReference']['driveId'],
                                id: folder['id']
                            },
                            path: 'placeholder'
                        };
                        storage.hideUI();
                        storage.save();
                    }
                };
                if (saveName_1 && saveName_1 !== '' && saveName_1 !== undefined)
                    storage.oneDriveFilepicker.save(odOptions);
                else
                    reject('Cannot save file to OneDrive with save name ' + saveName_1);
            }
        });
    };
    GoOneDrive.prototype.save = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                var xhr_1 = new XMLHttpRequest();
                if (path.indexOf('.diagram') === -1)
                    path += '.diagram';
                var bodyContent = storage.makeSaveFile();
                xhr_1.open('PUT', 'https://graph.microsoft.com/v1.0' + path + ':/content', true);
                xhr_1.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
                xhr_1.setRequestHeader('Content-Type', 'application/json');
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState === 4) {
                        if (xhr_1.status >= 200 && xhr_1.status < 300) {
                            var file = JSON.parse(xhr_1.response);
                            var savedFile = {
                                name: file['name'], id: file['id'],
                                path: file['parentReference']['path'] + '/' + file['name'], parentReference: file['parentReference']
                            };
                            resolve(savedFile);
                        }
                        else if (xhr_1.status === 401) {
                            storage.authorize(true);
                        }
                        else {
                            throw Error(xhr_1.response);
                        }
                    }
                };
                xhr_1.send(bodyContent);
            }
            else if (storage.currentDiagramFile.path) {
                var token_1 = storage.currentDiagramFile.token;
                var url = storage.generateGraphUrl(storage.currentDiagramFile, true, true);
                var bodyContent = storage.makeSaveFile();
                var t = (!token_1) ? storage.oauthToken : storage.currentDiagramFile.token;
                var xhr_2 = new XMLHttpRequest();
                xhr_2.open('PUT', url, true);
                xhr_2.setRequestHeader('Authorization', 'Bearer ' + t);
                xhr_2.onload = function () {
                    if (xhr_2.readyState === 4 && (xhr_2.status === 200 || xhr_2.status === 201)) {
                        var file = JSON.parse(xhr_2.response);
                        var savedFile = {
                            name: file['name'], id: file['id'],
                            path: file['parentReference']['path'] + '/' + file['name'], token: token_1, parentReference: file['parentReference']
                        };
                        storage.currentDiagramFile = savedFile;
                        resolve(savedFile);
                        storage._deferredPromise.promise.resolve(savedFile);
                        storage._deferredPromise.promise = storage.makeDeferredPromise();
                    }
                    else {
                        reject(xhr_2.response);
                    }
                };
                xhr_2.send(bodyContent);
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoOneDrive.prototype.loadWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var odOptions = {
                clientId: storage.clientId,
                action: 'share',
                multiSelect: false,
                advanced: {
                    filter: '.diagram'
                },
                success: function (files) {
                    var file = files['value'][0];
                    var token = files['accessToken'];
                    var filePath = file['parentReference']['path'] + '/' + file['name'];
                    resolve(storage.load(filePath, token));
                }
            };
            storage.oneDriveFilepicker.open(odOptions);
        });
    };
    GoOneDrive.prototype.load = function (path, token) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                var t = (token) ? token : storage.oauthToken;
                storage.getFile(path, t).then(function (file) {
                    var downloadLink = file['@microsoft.graph.downloadUrl'];
                    var downloadxhr = new XMLHttpRequest();
                    downloadxhr.open('GET', downloadLink, true);
                    downloadxhr.onreadystatechange = function () {
                        if (downloadxhr.readyState === 4) {
                            if (downloadxhr.status === 200) {
                                storage.loadFromFileContents(downloadxhr.response);
                                var loadedFile = {
                                    name: file['name'], id: file['id'], path: file['parentReference']['path'] + '/' + file['name'], token: token,
                                    parentReference: { id: file['parentReference']['id'], driveId: file['parentReference']['driveId'] }
                                };
                                storage.currentDiagramFile = loadedFile;
                                resolve(loadedFile);
                            }
                        }
                    };
                    downloadxhr.send();
                });
            }
            else
                reject('Cannot load file from OneDrive with path ' + path);
        });
    };
    GoOneDrive.prototype.removeWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var odOptions = {
                clientId: storage.clientId,
                action: 'share',
                openInNewWindow: true,
                success: function (files) {
                    if (files) {
                        var file = files['value'][0];
                        var token_2 = files['accessToken'];
                        var filePath_1 = file['parentReference']['path'] + '/' + file['name'];
                        resolve(new Promise(function (res, rej) {
                            res(storage.remove(filePath_1, token_2));
                        }));
                    }
                }
            };
            storage.oneDriveFilepicker.open(odOptions);
        });
    };
    GoOneDrive.prototype.remove = function (path, token) {
        var storage = this;
        var t = (token) ? token : storage.oauthToken;
        return new Promise(function (resolve, reject) {
            storage.getFile(path, t).then(function (file) {
                var deletedFile = { name: file['name'], id: file['id'], path: file['parentReference']['path'] + '/' + file['name'] };
                var xhr = new XMLHttpRequest();
                xhr.open('DELETE', 'https://graph.microsoft.com/v1.0' + path, true);
                xhr.setRequestHeader('Authorization', 'Bearer' + t);
                xhr.onload = function () {
                    if (xhr.readyState === 4 && xhr.status === 204) {
                        if (storage.currentDiagramFile && path === storage.currentDiagramFile.path)
                            storage.currentDiagramFile = { id: null, path: null, name: null };
                        resolve(deletedFile);
                    }
                    else if (xhr.status === 401) {
                        storage.authorize(true);
                    }
                    else {
                        reject(xhr.response);
                    }
                };
                xhr.send();
            }).catch(function (err) {
                throw Error(err);
            });
        });
    };
    GoOneDrive.prototype.generateGraphUrl = function (driveItem, targetParentFolder, itemRelativeApiPath) {
        var url = 'https://graph.microsoft.com/v1.0/';
        if (targetParentFolder)
            url += 'drives/' + driveItem['parentReference']['driveId'] + '/items/' + driveItem['parentReference']['id'] + '/children/' + driveItem['name'];
        else
            url += 'drives/' + driveItem['parentReference']['driveId'] + '/items/' + driveItem['id'];
        if (itemRelativeApiPath)
            url += '/content';
        return url;
    };
    return GoOneDrive;
}(gcs.GoCloudStorage));
exports.GoOneDrive = GoOneDrive;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(0);
var GoNetCore = (function (_super) {
    __extends(GoNetCore, _super);
    function GoNetCore(managedDiagrams, rootEndpoint, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel) || this;
        _this._rootEndpoint = rootEndpoint;
        _this.ui.id = 'goNetCoreCustomFilepicker';
        _this._serviceName = 'Microsoft ASP .NET Core Web API';
        _this._className = 'GoNetCore';
        return _this;
    }
    Object.defineProperty(GoNetCore.prototype, "rootEndpoint", {
        get: function () { return this._rootEndpoint; },
        enumerable: true,
        configurable: true
    });
    GoNetCore.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        var storage = this;
        return new Promise(function (resolve, reject) {
            resolve(true);
        });
    };
    GoNetCore.prototype.showUI = function (action, numAdditionalFiles) {
        var storage = this;
        var ui = storage.ui;
        var spacestring = 'qwe45qw34';
        if (!numAdditionalFiles)
            numAdditionalFiles = 0;
        var maxFilesToShow = GoNetCore._MIN_FILES_IN_UI + numAdditionalFiles;
        ui.innerHTML = '';
        var title = action + ' Diagram File';
        ui.innerHTML += '<strong>' + title + '</strong><hr></hr>';
        document.getElementsByTagName('body')[0].appendChild(ui);
        ui.style.visibility = 'visible';
        var filesDiv = document.createElement('div');
        filesDiv.id = 'fileOptions';
        var savedDiagrams = [];
        var numFilesToCheck = GoNetCore._MIN_FILES_IN_UI + numAdditionalFiles;
        var numFilesChecked = 0;
        var hasCheckedAllFiles = false;
        storage.getFiles().then(function (files) {
            if (files.length !== 0) {
                for (var i in files) {
                    var item = files[i];
                    if (savedDiagrams.length < maxFilesToShow) {
                        numFilesChecked++;
                        var fileContent = item.file;
                        if (fileContent && fileContent.indexOf('GraphLinksModel' || false) !== -1) {
                            var file = { name: item.name, id: item.id };
                            savedDiagrams.push(file);
                        }
                        if (numFilesChecked === files.length)
                            hasCheckedAllFiles = true;
                    }
                }
            }
            else
                hasCheckedAllFiles = true;
            if (savedDiagrams.length !== 0) {
                for (var i = 0; i < savedDiagrams.length; i++) {
                    var item = savedDiagrams[i];
                    var name_1 = item.name;
                    var id = item.id;
                    if (action !== 'Save') {
                        filesDiv.innerHTML +=
                            "<div class='fileOption'>" +
                                '<input id=' + id + " type='radio' name='localStorageFile' />" +
                                '<label id =' + id + '-label' + " for='" + name_1 + "'>" + name_1 + '</label>' +
                                '</div>';
                    }
                    else {
                        filesDiv.innerHTML +=
                            "<div class='fileOption'>" +
                                '<label id =' + id + '-label' + " for='" + id + "'>" + name_1 + '</label>' +
                                '</div>';
                    }
                }
            }
            if (!hasCheckedAllFiles) {
                var num_1 = numAdditionalFiles + 50;
                filesDiv.innerHTML += "<p>There may be more diagram files not shown. <a id='netCoreLoadMoreFiles'>Click here</a> to try loading more.</p>";
                document.getElementById('netCoreLoadMoreFiles').onclick = function () {
                    storage.showUI(action, num_1);
                };
            }
            ui.appendChild(filesDiv);
            if (storage.currentDiagramFile.id) {
                var el = document.getElementById(storage.currentDiagramFile.id + '-label');
                if (el)
                    el.style.fontStyle = 'italic';
            }
            if (action === 'Save') {
                var userInputDiv = document.createElement('div');
                userInputDiv.id = 'userInputDiv';
                userInputDiv.innerHTML += '<span>Save Diagram As </span><input id="userInput" placeholder="Enter filename"></input>';
                ui.appendChild(userInputDiv);
            }
            var submitDiv = document.createElement('div');
            submitDiv.id = 'submitDiv';
            var actionButton = document.createElement('button');
            actionButton.textContent = action;
            actionButton.id = 'actionButton';
            actionButton.onclick = function () {
                storage.processUIResult(action);
            };
            submitDiv.appendChild(actionButton);
            ui.appendChild(submitDiv);
            var cancelDiv = document.createElement('div');
            var cancelButton = document.createElement('button');
            cancelButton.id = 'cancelButton';
            cancelButton.textContent = 'Cancel';
            cancelButton.onclick = function () {
                storage.hideUI(true);
            };
            cancelDiv.appendChild(cancelButton);
            ui.appendChild(cancelDiv);
        });
        return storage._deferredPromise['promise'];
    };
    GoNetCore.prototype.processUIResult = function (action) {
        var storage = this;
        function getSelectedFile() {
            var radios = document.getElementsByName('localStorageFile');
            var selectedFile = null;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    selectedFile = radios[i].id.replace(/qwe45qw34/g, ' ');
                }
            }
            if (selectedFile)
                return selectedFile;
            else
                return null;
        }
        var file = getSelectedFile();
        switch (action) {
            case 'Save': {
                var name_2 = document.getElementById('userInput').value;
                if (name_2) {
                    name_2 += '.diagram';
                    storage.save(name_2);
                }
                else {
                }
                break;
            }
            case 'Load': {
                storage.load(file);
                break;
            }
            case 'Delete': {
                storage.remove(file);
                break;
            }
        }
        storage.hideUI();
    };
    GoNetCore.prototype.getFile = function (path) {
        var storage = this;
        var url = storage.rootEndpoint + path;
        return new Promise(function (resolve, reject) {
            if (path) {
                var xhr_1 = new XMLHttpRequest();
                xhr_1.open('GET', url, true);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState === 4) {
                        if (xhr_1.status >= 200 && xhr_1.status < 300) {
                            resolve((JSON.parse(xhr_1.response)));
                        }
                    }
                };
                xhr_1.send();
            }
            else
                reject('Cannot get diagram file from ASP .NET Core Web API with id ' + path);
        });
    };
    GoNetCore.prototype.getFiles = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', storage.rootEndpoint, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else
                        reject(xhr.response);
                }
            };
            xhr.send();
        });
    };
    GoNetCore.prototype.checkFileExists = function (path) {
        var storage = this;
        var url = storage.rootEndpoint + path;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve((true));
                    }
                    else {
                        resolve(false);
                    }
                }
            };
            xhr.send();
        });
    };
    GoNetCore.prototype.saveWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            resolve(storage.showUI('Save'));
        });
    };
    GoNetCore.prototype.save = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (storage.currentDiagramFile.id && !path) {
                var xhr_2 = new XMLHttpRequest();
                storage.getFile(storage.currentDiagramFile.id).then(function (resp) {
                    var item = {
                        id: storage.currentDiagramFile.id,
                        name: storage.currentDiagramFile.name,
                        file: storage.makeSaveFile()
                    };
                    var savedFile = { id: item.id, name: item.name, path: item.name };
                    xhr_2.open('PUT', storage.rootEndpoint + storage.currentDiagramFile.id, true);
                    xhr_2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    xhr_2.onreadystatechange = function () {
                        if (xhr_2.readyState === 4) {
                            if (xhr_2.status > 200 && xhr_2.status < 300) {
                                resolve(savedFile);
                            }
                            else {
                                reject(xhr_2.responseText);
                            }
                        }
                    };
                    xhr_2.send(JSON.stringify(item));
                });
            }
            else {
                var xhr_3 = new XMLHttpRequest();
                var item_1 = {
                    name: (path !== null) ? path : 'New diagram',
                    file: storage.makeSaveFile()
                };
                xhr_3.open('POST', storage.rootEndpoint, true);
                xhr_3.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xhr_3.onreadystatechange = function () {
                    if (xhr_3.readyState === 4) {
                        if (xhr_3.status > 200 && xhr_3.status < 300) {
                            var id = JSON.parse(xhr_3.response).id;
                            var savedFile = { id: id, name: item_1.name, path: item_1.name };
                            storage.currentDiagramFile = savedFile;
                            resolve(savedFile);
                            storage._deferredPromise['promise'].resolve(savedFile);
                            storage._deferredPromise['promise'] = storage.makeDeferredPromise();
                        }
                        else {
                            reject(xhr_3.responseText);
                        }
                    }
                };
                xhr_3.send(JSON.stringify(item_1));
            }
        });
    };
    GoNetCore.prototype.loadWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            resolve(storage.showUI('Load'));
        }).catch(function (e) {
            throw Error(e);
        });
    };
    GoNetCore.prototype.load = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                var xhr_4 = new XMLHttpRequest();
                xhr_4.open('GET', storage.rootEndpoint + path, true);
                xhr_4.onreadystatechange = function () {
                    if (xhr_4.readyState === 4) {
                        if (xhr_4.status >= 200 && xhr_4.status < 300) {
                            var respJSON = JSON.parse(xhr_4.response);
                            storage.loadFromFileContents(respJSON.file);
                            var loadedFile = { id: respJSON.id, path: respJSON.name, name: respJSON.name };
                            storage.currentDiagramFile = loadedFile;
                            resolve(loadedFile);
                            storage._deferredPromise.promise.resolve(loadedFile);
                            storage._deferredPromise.promise = storage.makeDeferredPromise();
                        }
                        else {
                            reject(xhr_4.responseText);
                        }
                    }
                };
                xhr_4.send();
            }
            else
                throw Error('Cannot load file from .NET Core Web API with path ' + path);
        }).catch(function (e) {
            throw Error(e);
        });
    };
    GoNetCore.prototype.removeWithUI = function () {
        var storage = this;
        return new Promise(function (resolve, reject) {
            resolve(storage.showUI('Delete'));
        });
    };
    GoNetCore.prototype.remove = function (path) {
        var storage = this;
        return new Promise(function (resolve, reject) {
            if (path) {
                storage.getFile(path).then(function (resp) {
                    var deletedFile = { name: resp.name, path: resp.name, id: path };
                    if (storage.currentDiagramFile && resp.name === storage.currentDiagramFile.name)
                        storage.currentDiagramFile = { name: null, path: null, id: null };
                    var xhr = new XMLHttpRequest();
                    xhr.open('DELETE', storage.rootEndpoint + path, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                resolve(deletedFile);
                                storage._deferredPromise['promise'].resolve(deletedFile);
                                storage._deferredPromise['promise'] = storage.makeDeferredPromise();
                            }
                            else {
                                reject(xhr.responseText);
                            }
                        }
                    };
                    xhr.send();
                });
            }
            else
                throw Error('Cannot delete file from local storage with id ' + path);
        });
    };
    GoNetCore._MIN_FILES_IN_UI = 100;
    return GoNetCore;
}(gcs.GoCloudStorage));
exports.GoNetCore = GoNetCore;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(1);
var gcs = __webpack_require__(0);
var GoCloudStorageManager = (function () {
    function GoCloudStorageManager(storages, iconsRelativeDirectory) {
        if (storages instanceof Array) {
            var storagesSet = new go.Set();
            for (var i = 0; i < storages.length; i++) {
                if (!(storages[i] instanceof gcs.GoCloudStorage)) {
                    throw new Error("Cannot create GoCloudStorageManager; provided 'storages' parameter elements are not all of type GoCloudStorage");
                }
                else {
                    storagesSet.add(storages[i]);
                }
            }
            storages = storagesSet;
        }
        if (!(storages instanceof go.Set) || !storages)
            throw Error("Cannot create GoCloudStorageManager with provided 'storages' parameter");
        var storageManager = this;
        storageManager._storages = storages;
        storageManager._currentStorage = storages.first();
        var menu = document.createElement('div');
        menu.id = 'goCloudStorageManagerMenu';
        storageManager._menu = menu;
        storageManager._deferredPromise = { promise: gcs.GoCloudStorage.prototype.makeDeferredPromise() };
        storageManager._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : '../goCloudStorageIcons/';
        if (iconsRelativeDirectory) {
            storageManager._storages.iterator.each(function (storage) {
                storage.iconsRelativeDirectory = iconsRelativeDirectory;
            });
        }
        if (window.location.href.indexOf('account_id=dbid') !== -1) {
            storages.iterator.each(function (storage) {
                if (storage.className === 'GoDropBox') {
                    storageManager._currentStorage = storage;
                    storageManager.currentStorage.authorize();
                }
            });
        }
        document.getElementsByTagName('body')[0].appendChild(storageManager.menu);
    }
    Object.defineProperty(GoCloudStorageManager.prototype, "storages", {
        get: function () { return this._storages; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorageManager.prototype, "iconsRelativeDirectory", {
        get: function () { return this._iconsRelativeDirectory; },
        set: function (value) { this._iconsRelativeDirectory = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorageManager.prototype, "menu", {
        get: function () { return this._menu; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorageManager.prototype, "currentStorage", {
        get: function () { return this._currentStorage; },
        set: function (value) { this._currentStorage = value; },
        enumerable: true,
        configurable: true
    });
    GoCloudStorageManager.prototype.create = function (saveBeforeCreate) {
        if (saveBeforeCreate === void 0) { saveBeforeCreate = false; }
        var storageManager = this;
        return new Promise(function (resolve, reject) {
            resolve(storageManager.handleAction('Create', saveBeforeCreate));
        });
    };
    GoCloudStorageManager.prototype.load = function () {
        var storageManager = this;
        return new Promise(function (resolve, reject) {
            resolve(storageManager.handleAction('Load'));
        });
    };
    GoCloudStorageManager.prototype.remove = function () {
        var storageManager = this;
        return new Promise(function (resolve, reject) {
            resolve(storageManager.handleAction('Remove'));
        });
    };
    GoCloudStorageManager.prototype.save = function (isSaveAs) {
        if (isSaveAs === void 0) { isSaveAs = true; }
        var storageManager = this;
        return new Promise(function (resolve, reject) {
            if (isSaveAs)
                resolve(storageManager.handleAction('SaveAs'));
            else
                resolve(storageManager.handleAction('Save'));
        });
    };
    GoCloudStorageManager.prototype.showMessage = function (msg, seconds) {
        if (!seconds)
            seconds = 2;
        var messageBox = document.createElement('div');
        messageBox.id = 'goCloudStorageManagerMessageBox';
        messageBox.innerHTML = '<p>' + msg + '</p>';
        document.body.appendChild(messageBox);
        setTimeout(function () {
            messageBox.style.opacity = '0';
            setTimeout(function () { messageBox.parentNode.removeChild(messageBox); }, 1000);
        }, 1000 * seconds);
    };
    GoCloudStorageManager.prototype.getStorageIconPath = function (className) {
        var storageManager = this;
        if (storageManager.iconsRelativeDirectory == null || storageManager.iconsRelativeDirectory === undefined)
            return null;
        var src = storageManager.iconsRelativeDirectory;
        switch (className) {
            case 'GoGoogleDrive': {
                src += 'googleDrive.jpg';
                break;
            }
            case 'GoOneDrive': {
                src += 'oneDrive.png';
                break;
            }
            case 'GoLocalStorage': {
                src += 'localStorage.png';
                break;
            }
            case 'GoDropBox': {
                src += 'dropBox.png';
                break;
            }
        }
        return src;
    };
    GoCloudStorageManager.prototype.selectStorageService = function () {
        var storageManager = this;
        var storages = this.storages;
        return new Promise(function (resolve, reject) {
            var menu = storageManager.menu;
            var title = 'Select Storage Service';
            menu.innerHTML = '<strong>' + title + '</strong><hr></hr>';
            var selectedStorage = document.createElement('p');
            selectedStorage.id = 'gcsmSelectedStorage';
            selectedStorage.innerHTML = storageManager.currentStorage.serviceName;
            menu.appendChild(selectedStorage);
            menu.onchange = function () {
                var radios = document.getElementsByName('storageSelection');
                var selectedStorageClassName = null;
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        selectedStorageClassName = radios[i].id;
                    }
                }
                var serviceNameStr = '';
                storages.iterator.each(function (s) {
                    if (s.className === selectedStorageClassName) {
                        serviceNameStr = s.serviceName;
                    }
                });
                document.getElementById('gcsmSelectedStorage').innerHTML = serviceNameStr;
            };
            storageManager.menu.style.visibility = 'visible';
            var optionsDiv = document.createElement('div');
            optionsDiv.id = 'storageOptions';
            var it = storages.iterator;
            it.each(function (storage) {
                var type = storage.className;
                var src = storageManager.getStorageIconPath(type);
                var isChecked = storage.className === storageManager.currentStorage.className;
                var checkedStr = '';
                if (isChecked)
                    checkedStr = 'checked';
                optionsDiv.innerHTML +=
                    '<label>' +
                        '<input id=' + type + " type='radio' name='storageSelection' " + checkedStr + ' />' +
                        "<img class='storageLogo' src=" + src + ' >';
            });
            menu.appendChild(optionsDiv);
            var description = 'This will be where you save / load diagram model data to / from. You will need to grant GoCloudStorage permission to access your files on the selected storage service.';
            menu.innerHTML += "<p class='description'>" + description + '</p>';
            var submitDiv = document.createElement('div');
            var actionButton = document.createElement('button');
            actionButton.id = 'actionButton';
            actionButton.textContent = 'Select';
            actionButton.onclick = function () {
                var radios = document.getElementsByName('storageSelection');
                var selectedStorage = null;
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        selectedStorage = radios[i].id;
                    }
                }
                storageManager.storages.each(function (storage) {
                    if (storage.className === selectedStorage)
                        storageManager.currentStorage = storage;
                });
                if (storageManager.currentStorageNeedsAuth()) {
                    storageManager.currentStorage.authorize().then(function (resp) {
                    });
                }
                resolve(storageManager.currentStorage);
                storageManager.hideMenu();
            };
            submitDiv.appendChild(actionButton);
            menu.appendChild(submitDiv);
            var cancelDiv = document.createElement('div');
            var cancelButton = document.createElement('button');
            cancelButton.id = 'cancelButton';
            cancelButton.textContent = 'Cancel';
            cancelButton.onclick = function () {
                storageManager.hideMenu();
            };
            cancelDiv.appendChild(cancelButton);
            menu.appendChild(cancelDiv);
        });
    };
    GoCloudStorageManager.prototype.hideMenu = function () {
        var storageManager = this;
        storageManager.menu.style.visibility = 'hidden';
    };
    GoCloudStorageManager.prototype.currentStorageNeedsAuth = function () {
        var storageManager = this;
        var currentStorageClass = storageManager.currentStorage.className;
        if (currentStorageClass === 'GoGoogleDrive' || currentStorageClass === 'GoDropBox')
            return true;
        return false;
    };
    GoCloudStorageManager.prototype.handleAction = function (action, saveBeforeCreate) {
        if (saveBeforeCreate === void 0) { saveBeforeCreate = false; }
        var storageManager = this;
        var storage = storageManager.currentStorage;
        return new Promise(function (resolve, reject) {
            function doAction() {
                switch (action) {
                    case 'Load': {
                        resolve(storage.loadWithUI());
                        break;
                    }
                    case 'SaveAs': {
                        resolve(storage.saveWithUI());
                        break;
                    }
                    case 'Save': {
                        resolve(storage.save());
                        break;
                    }
                    case 'Remove': {
                        resolve(storage.removeWithUI());
                        break;
                    }
                    case 'Create': {
                        resolve(storage.create(null, saveBeforeCreate));
                        break;
                    }
                }
                storageManager.hideMenu();
            }
            if (storageManager.currentStorageNeedsAuth()) {
                storage.authorize().then(function () {
                    doAction();
                });
            }
            else
                doAction();
        });
    };
    return GoCloudStorageManager;
}());
exports.GoCloudStorageManager = GoCloudStorageManager;


/***/ })
/******/ ]);