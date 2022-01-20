/*
* Copyright (C) 1998-2022 by Northwoods Software Corporation
* All Rights Reserved.
*
* Go Local Storage
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GoCloudStorage.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoLocalStorage = void 0;
    var gcs = require("./GoCloudStorage.js");
    /**
     * Class for saving / loading GoJS {@link Model}s to / from Local Storage.
     * GoLocalStorage is the only {@link GoCloudStorage} subclass than can be used in a local page;
     * that is, one not served by a web server.
     *
     * **Note**: This class will not work with browsers that do not have Local Storage support
     * (like some old versions of Internet Explorer).
     * @category Storage
     */
    var GoLocalStorage = /** @class */ (function (_super) {
        __extends(GoLocalStorage, _super);
        /**
         * @constructor
         * @param {go.Diagram|go.Diagram[]} managedDiagrams
         * An array of GoJS {@link Diagram}s whose model(s) will be saved to / loaded from Local Storage.
         * Can also be a single Diagram.
         * @param {string} defaultModel
         * String representation of the default model data for new diagrams. If this is null, default new
         * diagrams will be empty. Usually a value given by calling {@link Model#toJson} on a GoJS Diagram's Model.
         * @param {string} iconsRelativeDirectory
         * The directory path relative to the page in which this instance of GoLocalStorage exists, in which
         * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
         */
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
            /**
             * Get the browser window's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a> property.
             * @function.
             * @return {Storage}
             */
            get: function () { return this._localStorage; },
            enumerable: false,
            configurable: true
        });
        /**
         * Check if Local Storage is supported by the current browser.
         * @param {boolean} refreshToken This parameter can be ignored. It exists only to maintain GoCloudStorage system structure
         * @return {Promise<boolean>} Returns a Promise that resolves with a boolean (true if local storage is supported, false if not)
         */
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
                    // local storage not supported
                    resolve(false);
                }
            });
        };
        /**
         * Show the custom Go Local Storage filepicker {@link #ui}.
         * @param {string} action Clarify what action is being done after file selection. Must be one of the following:
         *   - New
         *   - Open
         *   - Save
         *   - Delete
         * @param {number} numAdditionalFiles Optional: Number of files to show in UI, in addition to a static numerical property (that can only be
         * modified by changing source code). This prevents long wait times while the UI loads if there are a large number of diagram files stored in Local Storage.
         * @return {Promise<any>} Returns a Promise that resolves (in {@link #save}, {@link #load}, or {@link #remove} with an {@link DiagramFile}
         * representing the saved/loaded/deleted file
         */
        GoLocalStorage.prototype.showUI = function (action, numAdditionalFiles) {
            var storage = this;
            var ui = storage.ui;
            var spacestring = 'qwe45qw34'; // used as a placeholder for spaces in IDs
            if (!numAdditionalFiles)
                numAdditionalFiles = 0;
            var maxFilesToShow = GoLocalStorage._MIN_FILES_IN_UI + numAdditionalFiles;
            ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "localStorage.png'></img>";
            var title = action + ' Diagram File';
            ui.innerHTML += '<strong>' + title + '</strong><hr></hr>';
            // document.getElementsByTagName('body')[0].appendChild(ui);
            ui.style.visibility = 'visible';
            var filesDiv = document.createElement('div');
            filesDiv.id = 'fileOptions';
            // filter out non-diagram files in local storage (only until max allowed files is reached)
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
                // list diagram files in local storage as selectable files (as many as MIN_FILES_IN_UI + additionalFiles param)
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
            // If there may be more diagram files to show, say so and provide user with option to try loading more in the UI
            if (!hasCheckedAllFiles) {
                var num_1 = numAdditionalFiles + 50;
                filesDiv.innerHTML += "<p>There may be more diagram files not shown. <a id='localStorageLoadMoreFiles'>Click here</a> to try loading more.</p>";
                document.getElementById('localStorageLoadMoreFiles').onclick = function () {
                    storage.showUI(action, num_1);
                };
            }
            ui.appendChild(filesDiv);
            // italicize currently open file, if a file is currently open
            if (storage.currentDiagramFile.id) {
                var str = storage.currentDiagramFile.id.replace(/ /g, spacestring);
                var el = document.getElementById(str + '-label');
                if (el)
                    el.style.fontStyle = 'italic';
            }
            // user input div (only for save)
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
            return storage._deferredPromise['promise']; // will not resolve until action (save, load, delete) completes
        };
        /**
         * @private
         * @hidden
         * Process the result of pressing the action button on the custom GoLocalStorage filepicker {@link #ui}.
         * @param {string} action The action being done. Acceptable values:
         *   - Save
         *   - Load
         *   - Delete
         */
        GoLocalStorage.prototype.processUIResult = function (action) {
            var storage = this;
            // Helper: Return key of the file selected from the custom localstorage filepicker menu
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
                        // handle bad name
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
        /**
         * Get information about a diagram file saved to Local Storage. This data includes:
         *   - content: The content of the saved file (a string respresentation of a GoJS Diagram Model)
         *   - id: The key of the file in local storage
         *   - name: Same as id value
         *   - path: Same as id value
         *
         * **Note:** Id, name, and path are all provided (despite being the same). They are required for creating valid {@link DiagramFile}s.
         * @param {string} path A valid key corresponding to a saved diagram file in Local Storage
         * @return {Promise<any>} Returns a Promise that resolves with information about a diagram file saved to local storage
         */
        GoLocalStorage.prototype.getFile = function (path) {
            if (path.indexOf('.diagram') === -1)
                path += '.diagram';
            return new Promise(function (resolve, reject) {
                var fileContent = (!!window.localStorage.getItem(path)) ? window.localStorage.getItem(path) : null;
                var file = { name: path, content: fileContent, path: path, id: path };
                resolve(file);
            });
        };
        /**
         * Check whether a file exists in Local Storage at a given path.
         * @param {string} path A valid key corresponding to a saved diagram file in Local Storage
         * @return {Promise<any>} Returns a Promise that resolves with a boolean stating whether a file exists in LocalStorage at a given path
         */
        GoLocalStorage.prototype.checkFileExists = function (path) {
            if (path.indexOf('.diagram') === -1)
                path += '.diagram';
            return new Promise(function (resolve, reject) {
                var fileExists = !!(window.localStorage.getItem(path));
                resolve(fileExists);
            });
        };
        /**
         * Save the current {@link #managedDiagrams}'s model data to Local Storage using the custom filepicker {@link #ui}.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file
         */
        GoLocalStorage.prototype.saveWithUI = function () {
            var storage = this;
            return new Promise(function (resolve, reject) {
                resolve(storage.showUI('Save'));
            });
        };
        /**
         * Save {@link #managedDiagrams}' model data to Local Storage. If path is supplied save to that path. If no path is supplied but {@link #currentDiagramFile} has non-null,
         * valid properties, update saved diagram file content at the key in Local Storage corresponding to currentDiagramFile.path with current managedDiagrams' model data.
         * If no path is supplied and currentDiagramFile is null or has null properties, this calls {@link #saveWithUI}.
         * @param {string} path A string to save diagram model data to (becomes the key for the file in Local Storage)
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file
         */
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
                    resolve(savedFile); // used if saveDiagramAs was called without UI
                    // if saveDiagramAs has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
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
        /**
         * Get the contents of a given file; load to {@link #managedDiagrams} model. Use the custom filepicker {@link #ui}.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
         */
        GoLocalStorage.prototype.loadWithUI = function () {
            var storage = this;
            return new Promise(function (resolve, reject) {
                resolve(storage.showUI('Load'));
            }).catch(function (e) {
                throw Error(e);
            });
        };
        /**
         * Get the contents of a given file; load to {@link #managedDiagrams} model.
         * @param {string} path A valid localstorage key to load diagram model data from
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
         */
        GoLocalStorage.prototype.load = function (path) {
            var storage = this;
            return new Promise(function (resolve, reject) {
                if (path) {
                    var fileContents = storage.localStorage.getItem(path);
                    if (fileContents) {
                        storage.loadFromFileContents(fileContents);
                        var loadedFile = { name: path, id: path, path: path };
                        storage.currentDiagramFile = loadedFile;
                        resolve(loadedFile); // used if loadDiagram was called without UI
                        // if loadDiagram has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
                        storage._deferredPromise.promise.resolve(loadedFile);
                        storage._deferredPromise.promise = storage.makeDeferredPromise();
                    }
                    else
                        throw Error('Cannot load file from local storage with path ' + path);
                }
                else
                    throw Error('Cannot load file from local storage with path ' + path);
            }).catch(function (e) {
                // console.error(e);
                throw Error(e);
            });
        };
        /**
         * Delete a diagram from Local Storage using the custom filepicker menu {@link #ui}.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
         */
        GoLocalStorage.prototype.removeWithUI = function () {
            var storage = this;
            return new Promise(function (resolve, reject) {
                resolve(storage.showUI('Delete'));
            });
        };
        /**
         * Delete a given diagram from Local Storage.
         * @param {string} path A valid localstorage key to delete diagram model data from
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
         */
        GoLocalStorage.prototype.remove = function (path) {
            var storage = this;
            return new Promise(function (resolve, reject) {
                if (path) {
                    var deletedFile = { name: path, path: path, id: path };
                    if (storage.currentDiagramFile && path === storage.currentDiagramFile['name'])
                        storage.currentDiagramFile = { name: null, path: null, id: null };
                    storage.localStorage.removeItem(path); // remove file from local storage
                    resolve(deletedFile); // used if deleteDiagram was called without UI
                    // if deleteDiagram has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
                    storage._deferredPromise['promise'].resolve(deletedFile);
                    storage._deferredPromise['promise'] = storage.makeDeferredPromise();
                }
                else
                    throw Error('Cannot delete file from local storage with path ' + path);
            });
        };
        /**
         * The number of files to display in {@link #ui} before loading more
         */
        GoLocalStorage._MIN_FILES_IN_UI = 100;
        return GoLocalStorage;
    }(gcs.GoCloudStorage));
    exports.GoLocalStorage = GoLocalStorage;
});
