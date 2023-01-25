/*
* Copyright (C) 1998-2023 by Northwoods Software Corporation
* All Rights Reserved.
*
* Go One Drive
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
    exports.GoOneDrive = void 0;
    var gcs = require("./GoCloudStorage.js");
    /**
     * Class for saving / loading GoJS {@link Diagram#model}s to / from Microsoft One Drive.
     * As with all {@link GoCloudStorage} subclasses (with the exception of {@link GoLocalStorage}, any page using GoDropBox must be served on a web server.
     *
     * **Note**: Makes use of <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive FilePicker for JavaScript v7.2</a>. Any page
     * using GoOneDrive must include a script tag with src set to https://js.live.net/v7.2/OneDrive.js.
     * @category Storage
     */
    var GoOneDrive = /** @class */ (function (_super) {
        __extends(GoOneDrive, _super);
        /**
         * @constructor
         * @param {go.Diagram[]} managedDiagrams An array of GoJS {@link Diagram}s whose model(s) will be saved to
         * / loaded from OneDrive. Can also be a single Diagram.
         * @param {string} clientId The client ID of the application in use (given by Microsoft in Microsoft Dev Center)
         * @param {string} defaultModel String representation of the default model data for new diagrams. If this is null, default new diagrams
         * will be empty. Usually a value given by calling {@link Model#toJson} on a GoJS Diagram's Model.
         * @param {string} iconsRelativeDirectory The directory path relative to the page in which this instance of GoOneDrive exists, in which
         * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
         */
        function GoOneDrive(managedDiagrams, clientId, defaultModel, iconsRelativeDirectory) {
            var _this = _super.call(this, managedDiagrams, defaultModel, clientId, iconsRelativeDirectory) || this;
            _this._oauthToken = null;
            _this.ui.id = 'goOneDriveSavePrompt';
            if (window['OneDrive']) {
                _this._oneDriveFilepicker = window['OneDrive'];
            }
            _this.authorize(false); // // on construction, check if there is an access_token in the window URI (there will be if redirected from a permissions grant page)
            _this._serviceName = 'Microsoft OneDrive';
            _this._className = 'GoOneDrive';
            return _this;
        }
        Object.defineProperty(GoOneDrive.prototype, "oauthToken", {
            /**
             * Get / set the global oauthToken. Only used to authorize requests in {@link #load}, {@link #save}, and {@link #remove}
             * when the {@link #oneDriveFilepicker} property is not used. Not needed when the oneDriveFilePicker is used, as action-specific tokens (issued by the Microsoft-provided
             * <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a>) are issued then. oauthToken is null after construction,
             * but can be set or refreshed with calls to {@link #authorize}.
             */
            get: function () { return this._oauthToken; },
            set: function (value) { this._oauthToken = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoOneDrive.prototype, "oneDriveFilepicker", {
            /**
             * Get <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a> object. Used to display a Microsoft user's OneDrive files.
             */
            get: function () { return this._oneDriveFilepicker; },
            enumerable: false,
            configurable: true
        });
        /**
         * Get OAuth 2.0 token for Microsoft OneDrive API requests with a specific Microsoft account. Sets {@link #oauthToken}.
         * @param {boolean} refreshToken Whether to get a new access token (triggers a page redirect) (true) or try to find / use the one in the browser
         * window URI (no redirect) (false)
         * @return {Promise<boolean>} Returns a Promise that resolves with a boolean stating whether authorization was succesful (true) or failed (false).
         */
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
        /**
         * Get information about the currently logged in Microsoft user. Some fields of particular note include:
         *   - displayName
         *   - givenName
         *   - id
         *   - jobTitle
         *   - userPrincipalName (email)
         *
         * **Note:** If {@link #oauthToken} is not valid or has expired, a page redirect to the Microsoft Account sign in will occur.
         * @return {Promise<any>} Returns a Promise that resolves with information about the currently logged in Microsoft user
         */
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
                        else if (xhr.status === 401) { // unauthorized request (expired token)
                            storage.authorize(true);
                            reject(xhr.response);
                        }
                    };
                    xhr.send();
                }
            });
        };
        /**
         * Check whether a file exists at a given path.
         * @param {string} path A valid MS OneDrive filepath to save current diagram model to
         *   Path must be of the form: `/drive/root:/{item-path}`
         * @return {Promise<any>} Returns a Promise that resolves with a boolean stating whether a file exists at a given path
         */
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
        /**
         * Get the OneDrive file reference object at a given path. Properties of particular note include:
         *   - name: The name of the file in OneDrive
         *   - id: The OneDrive-given file ID
         *   - parentReference
         *     - path: The path of the parent folder of the file at the provided path
         *
         * **Note:** Name, ID, and path are requisite for creating valid {@link DiagramFile}s. A path can be constructed by concatenating the
         * parentReference.path with name. DiagramFiles optionally also contain parentReference and token values (both used exclusively by GoOneDrive and its methods).
         * @param {string} path A valid MS OneDrive filepath to save current diagram model to
         *   Path must be of the form: `/drive/root:/{item-path}`
         * @param {string} token Optional: A token received by OneDrive filepicker (loadDiagramWithUI) to allow for its file to be loaded.
         * If no token is given, use global oauthToken
         * @return {Promise<any>} Returns a Promise that resolves with a OneDrive file reference object at a given path
         */
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
                        if (xhr.status === 200) { // 200=OK
                            var file = JSON.parse(xhr.response);
                            resolve(file);
                        }
                        else if (xhr.status === 401) { // unauthorized request
                            storage.authorize(true);
                        }
                        else {
                            reject(xhr.response);
                        }
                    }
                }; // end filexhr
                xhr.send();
            });
        };
        /**
         * Show the custom GoOneDrive save prompt {@link #ui}.
         * @return {Promise<any>} Returns a Promise that resolves (in {@link #save}, {@link #load}, or {@link #remove}) with a {@link DiagramFile}
         * representing the saved/loaded/deleted file
         */
        GoOneDrive.prototype.showUI = function () {
            var storage = this;
            var ui = storage.ui;
            ui.innerHTML = ''; // clear div
            ui.style.visibility = 'visible';
            ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "oneDrive.png'></img><strong>Save Diagram As</strong><hr></hr>";
            // user input div
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
        /**
         * Save the each {@link #managedDiagrams}' model data to a user's One Drive account, using
         * <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">One Drive FilePicker</a>.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
         */
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
                                path: 'placeholder' // will be defined in saveDiagram
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
        /**
         * Save {@link #managedDiagrams}' model data to Microsoft OneDrive. If path is supplied save to that path. If no path is supplied but {@link #currentDiagramFile} has non-null,
         * valid properties, update saved diagram file content at the path in OneDrive corresponding to currentDiagramFile.path with current managedDiagrams' model data.
         * @param {string} path A valid MS OneDrive filepath to save current diagram model to. Path syntax is
         * `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
         */
        GoOneDrive.prototype.save = function (path) {
            var storage = this;
            return new Promise(function (resolve, reject) {
                if (path) { // save as
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
                            else if (xhr_1.status === 401) { // unauthorized request
                                storage.authorize(true);
                            }
                            else {
                                throw Error(xhr_1.response);
                            }
                        }
                    };
                    xhr_1.send(bodyContent);
                }
                else if (storage.currentDiagramFile.path) { // save
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
                            resolve(savedFile); // used if saveDiagram was called without UI
                            // if save has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
                            storage._deferredPromise.promise.resolve(savedFile);
                            storage._deferredPromise.promise = storage.makeDeferredPromise();
                        }
                        else {
                            reject(xhr_2.response); // failed save
                        }
                    }; // end xhr onload
                    xhr_2.send(bodyContent);
                }
                else {
                    resolve(storage.saveWithUI());
                }
            });
        };
        /**
         * Load diagram model data from a given OneDrive-specific file path into {@link #managedDiagrams} using the MS OneDrive filepicker.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
         */
        GoOneDrive.prototype.loadWithUI = function () {
            var storage = this;
            return new Promise(function (resolve, reject) {
                var odOptions = {
                    clientId: storage.clientId,
                    action: 'share',
                    multiSelect: false,
                    advanced: {
                        filter: '.diagram' // only show diagram files
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
        /**
         * Load the contents of a saved diagram from MS OneDrive to diagram model.
         * @param {string} path A valid Microsoft OneDrive filepath to load diagram model data from. Path syntax is
         * `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @param {string} token A token received by <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a>
         * (passed from {@link #loadWithUI}) to allow for its file to be loaded. If no token is given, use global {@link #oauthToken}
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
         */
        GoOneDrive.prototype.load = function (path, token) {
            var storage = this;
            return new Promise(function (resolve, reject) {
                if (path) {
                    var t = (token) ? token : storage.oauthToken;
                    storage.getFile(path, t).then(function (file) {
                        var downloadLink = file['@microsoft.graph.downloadUrl'];
                        // Download file from download link
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
                        }; // end downloadxhr
                        downloadxhr.send();
                    });
                }
                else
                    reject('Cannot load file from OneDrive with path ' + path);
            });
        };
        /**
         * Delete a diagram from a user's OneDrive using the <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a>.
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
         */
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
        /**
         * Delete a diagram from a user's OneDrive at a given path.
         * @param {string} path A valid Microsoft OneDrive filepath to delete. Path syntax is
         * `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @param {string} token A token received by OneDrive filepicker (passed from {@link #removeWithUI}) to allow for
         * its file to be deleted. If no token is given, use global {@link #oauthToken}
         * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
         */
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
                        else if (xhr.status === 401) { // unauthorized request
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
        /**
         * Generate and return a Microsoft Graph URL for a target item
         * @param {Object} driveItem The item to generate the URL for
         * @param {Boolean} targetParentFolder Indicates whether to target the parent folder + filename instead of the item itself
         * @param {Boolean} itemRelativeApiPath Indicates whether to append /content to the item URL
         * @return {string} Returns a Microsoft Graph URL for a target item
         */
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
});
