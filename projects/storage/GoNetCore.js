/*
* Copyright (C) 1998-2021 by Northwoods Software Corporation
* All Rights Reserved.
*
* Go Net Core (unfinished)
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    var gcs = require("./GoCloudStorage.js");
    /**
     * @hidden
     * Class for saving / loading GoJS {@link Model}s to / from Local Storage.
     * GoLocalStorage is the only {@link GoCloudStorage} subclass than can be used in a local page; that is, one not served by a web server.
     *
     * **Note**: that this class will not work with browsers that do not have Local Storage support (like some old versions of Internet Explorer).
     * @category Storage
     */
    var GoNetCore = /** @class */ (function (_super) {
        __extends(GoNetCore, _super);
        /**
         * @constructor
         * @param {go.Diagram|go.Diagram[]} managedDiagrams An array of GoJS {@link Diagram}s whose model(s) will be saved to / loaded from Local Storage.
         * Can also be a single Diagram.
         * @param {string} defaultModel String representation of the default model data for new diagrams. If this is null, default new
         * diagrams will be empty. Usually a value given by calling {@link Model#toJson} on a GoJS Diagram's Model.
         * @param {string} iconsRelativeDirectory The directory path relative to the page in which this instance of GoLocalStorage exists, in which
         * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
         */
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
        /**
         * Check if Local Storage is supported by the current browser.
         * @param {boolean} refreshToken This parameter can be ignored. It exists only to maintain GoCloudStorage system structure
         * @return {Promise<boolean>} Returns a Promise that resolves with a boolean (true if local storage is supported, false if not)
         */
        GoNetCore.prototype.authorize = function (refreshToken) {
            if (refreshToken === void 0) { refreshToken = false; }
            var storage = this;
            return new Promise(function (resolve, reject) {
                resolve(true); // TODO? no auth at all right now
            });
        };
        /*
         * TODO TODO TODO
         * Show the custom Go Net Core filepicker {@link #ui}.
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
        GoNetCore.prototype.showUI = function (action, numAdditionalFiles) {
            var storage = this;
            var ui = storage.ui;
            var spacestring = 'qwe45qw34'; // used as a placeholder for spaces in IDs
            if (!numAdditionalFiles)
                numAdditionalFiles = 0;
            var maxFilesToShow = GoNetCore._MIN_FILES_IN_UI + numAdditionalFiles;
            ui.innerHTML = ''; // "<img class='icons' src='" + storage.iconsRelativeDirectory + "localStorage.png'></img>"; // TODO
            var title = action + ' Diagram File';
            ui.innerHTML += '<strong>' + title + '</strong><hr></hr>';
            document.getElementsByTagName('body')[0].appendChild(ui);
            ui.style.visibility = 'visible';
            var filesDiv = document.createElement('div');
            filesDiv.id = 'fileOptions';
            // filter out non-diagram files in local storage (only until max allowed files is reached)
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
                            if (fileContent && fileContent.indexOf('GraphLinksModel' || 'TreeModel') !== -1) {
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
                    // list diagram files in local storage as selectable files (as many as MIN_FILES_IN_UI + additionalFiles param)
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
                // If there may be more diagram files to show, say so and provide user with option to try loading more in the UI
                if (!hasCheckedAllFiles) {
                    var num_1 = numAdditionalFiles + 50;
                    filesDiv.innerHTML += "<p>There may be more diagram files not shown. <a id='netCoreLoadMoreFiles'>Click here</a> to try loading more.</p>";
                    document.getElementById('netCoreLoadMoreFiles').onclick = function () {
                        storage.showUI(action, num_1);
                    };
                }
                ui.appendChild(filesDiv);
                // italicize currently open file, if a file is currently open
                if (storage.currentDiagramFile.id) {
                    var el = document.getElementById(storage.currentDiagramFile.id + '-label');
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
            });
            return storage._deferredPromise['promise']; // will not resolve until action (save, load, delete) completes
        };
        /**
         * TODO TODO TODO
         * @private
         * @hidden
         * Process the result of pressing the action button on the custom GoLocalStorage filepicker {@link #ui}.
         * @param {string} action The action being done. Acceptable values:
         *   - Save
         *   - Load
         *   - Delete
         */
        GoNetCore.prototype.processUIResult = function (action) {
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
                    var name_2 = document.getElementById('userInput').value;
                    if (name_2) {
                        name_2 += '.diagram';
                        storage.save(name_2);
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
         * Get information about a diagram file saved to .NET Core database. This data includes:
         *   - content: The content of the saved file (a string respresentation of a GoJS Diagram Model)
         *   - id: The key of the file in local storage
         *   - name: Same as id value
         *   - path: Same as id value
         *
         * **Note:** Id, name, and path are all provided (despite being the same). They are requisite for creating valid {@link DiagramFile}s.
         * @param {string} path A valid id corresponding to a saved diagram file in the .NET Core database
         * @return {Promise<any>} Returns a Promise that resolves with information about a diagram file saved to local storage
         */
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
        /**
         * Get all the files in the ASP.NET Core database.
         * Returns a Promise that resolves with JSON data about every file, including name, id, and content
         */
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
        /**
         * Check whether a file exists in LocalStorage at a given path.
         * @param {string} path A valid key corresponding to a saved diagram file in Local Storage
         * @return {Promise<any>} Returns a Promise that resolves with a boolean stating whether a file exists in LocalStorage at a given path
         */
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
        /**
         * Save the current {@link #managedDiagrams}'s model data to Local Storage using the custom filepicker {@link #ui}.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file
         */
        GoNetCore.prototype.saveWithUI = function () {
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
        GoNetCore.prototype.save = function (path) {
            var storage = this;
            return new Promise(function (resolve, reject) {
                // PUT -- update current entry
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
                                resolve(savedFile); // used if saveDiagram was called without UI
                                // if saveDiagram has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
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
        /**
         * Get the contents of a given file; load to {@link #managedDiagrams} model. Use the custom filepicker {@link #ui}.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
         */
        GoNetCore.prototype.loadWithUI = function () {
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
                                resolve(loadedFile); // used if loadDiagram was called without UI
                                // if loadDiagram has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
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
        /**
         * Delete a diagram from Local Storage using the custom filepicker menu {@link #ui}.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
         */
        GoNetCore.prototype.removeWithUI = function () {
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
                                    resolve(deletedFile); // used if deleteDiagram was called without UI
                                    // if deleteDiagram has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
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
        /**
         * The number of files to display in {@link #ui} before loading more
         */
        GoNetCore._MIN_FILES_IN_UI = 100;
        return GoNetCore;
    }(gcs.GoCloudStorage));
    exports.GoNetCore = GoNetCore;
});
