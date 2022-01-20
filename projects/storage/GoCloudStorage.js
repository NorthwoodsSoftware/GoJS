/*
 * Copyright (C) 1998-2022 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * GoCloudStorage.js
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoCloudStorage = void 0;
    var go = require("../../release/go");
    /**
     * An abstract class for storing GoJS {@link Model}s in various cloud storage services.
     *
     * GoCloudStorage is never used on its own. Its subclasses can be used to manage diagram model storage programatically,
     * or any subset of GoCloudStorage subclasses can be bundled and used graphically with the {@link GoCloudStorageManager}.
     *
     * **Note**: With the exception of {@link GoLocalStorage}, all GoCloudStorage subclasses must be used in pages served
     * on a web server.
     * @category Storage
     */
    var GoCloudStorage = /** @class */ (function () {
        /**
         * @constructor
         * @param {go.Diagram|go.Diagram[]} managedDiagrams An array of GoJS {@link Diagram}s whose model(s) will be saved to
         * / loaded from a cloud storage service. Can also be a single Diagram.
         * @param {string} clientId The client ID of the cloud storage application to use (given by the cloud storage service to developer).
         * Not needed for all subclasses.
         * @param {string} defaultModel String representation of the default model data for new diagrams. If this is null, default new diagrams will be empty.
         * Usually a value given by calling {@link Model#toJson} on a GoJS Diagram's Model.
         * @param {string} iconsRelativeDirectory The directory path relative to the page in which this instance of GoCloudStorage exists, in which
         * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
         */
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
            // if defaultModel does not begin with "{", try using that as the iconsRelativeDirectory
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
            // make sure iconsRelativeDirectory has a trailing '/'
            var lastChar = this._iconsRelativeDirectory.charAt(this._iconsRelativeDirectory.length - 1);
            if (lastChar !== '/') {
                this._iconsRelativeDirectory += '/';
            }
            var menu = document.createElement('div');
            menu.className = 'goCustomFilepicker';
            menu.style.visibility = 'hidden';
            // TODO -- this assumes the document has a body element, is this OK??
            document.getElementsByTagName('body')[0].appendChild(menu);
            this._ui = menu;
            this._deferredPromise = { promise: this.makeDeferredPromise() };
            // enable autosaving capability
            // tslint:disable-next-line:no-shadowed-variable
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
            /**
             * Get / set the GoJS {@link Diagram}s associated with this instance of GoCloudStorage.
             * Set with a parameter during construction.
             * @function.
             * @return {go.Diagram[]}
             */
            get: function () { return this._managedDiagrams; },
            set: function (value) { this._managedDiagrams = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "defaultModel", {
            /**
             * Get / set the defaultModel data for the app used by an instance of GoCloudStorage.
             * defaultModel is used when creating new diagrams. See {@link #create}.
             * @function.
             * @return {string}
             */
            get: function () { return this._defaultModel; },
            set: function (value) { this._defaultModel = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "iconsRelativeDirectory", {
            /**
             * Get / set iconsRelativeDirectory, the directory path relative to the page in which this instance of GoCloudStorage exists,
             * in which the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
             * @function.
             * @return {string}
             */
            get: function () { return this._iconsRelativeDirectory; },
            set: function (value) { this._iconsRelativeDirectory = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "clientId", {
            /**
             * Get the clientId for the app using the cloud storage service. This is usually given by the cloud storage provider's dev console or similar.
             * Set with a parameter during construction.
             * @function.
             * @return {string}
             */
            get: function () { return this._clientId; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "currentDiagramFile", {
            /**
             * Get or set the currently open {@link DiagramFile}. By default, currentDiagramFile is set when a file is
             * loaded from storage, saved to storage (if saved to a different path from the currentDiagramFile.path), or
             * deleted from storage (if the deleted file is the currently open one).
             * The default value is a {@link DiagramFile} with null id, name, and path values.
             * @function.
             * @return {Object}
             */
            get: function () { return this._currentDiagramFile; },
            set: function (value) { this._currentDiagramFile = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "isAutoSaving", {
            /**
             * Get or set isAutoSaving property. If true, the {@link #managedDiagrams} will be saved to storage after every
             * {@link Transaction} (only if {@link #currentDiagramFile} holds a non-null path value).
             * Additionally, if isAutoSaving is true, users will be prompted to save newly created
             * diagrams when created with {@link #create}.
             * The default value for isAutoSaving is `true`.
             * @function.
             * @return {boolean}
             */
            get: function () { return this._isAutoSaving; },
            set: function (value) { this._isAutoSaving = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "serviceName", {
            /**
             * Get the name of the cloud storage service being used; i.e. "Dropbox"
             * @function.
             * @return {string}
             */
            get: function () { return this._serviceName; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "className", {
            /**
             * Get the name of the class; i.e. "GoDropbox"
             * @function.
             * @return {string}
             */
            get: function () { return this._className; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorage.prototype, "ui", {
            /**
             * Get the UI element associated with this instance of GoCloudStorage. This is a custom filepicker window for {@link GoDropBox} and
             * {@link GoLocalStorage}. It is a save prompt for {@link GoOneDrive} and {@link GoGoogleDrive} (both these classes use third party
             * UI for storage navigation, provided by Microsoft and Google, respectively). The UI element is created during construction.
             * @function.
             * @return {HTMLElement}
             */
            get: function () { return this._ui; },
            enumerable: false,
            configurable: true
        });
        /**
         * Explicitly authorize a currently-signed in user of the storage service to use the application associated with this
         * instance of GoCloudStorage (via {@link #clientId}. If no currently signed-in user exists, prompt user to sign into their account, then authorize that account.
         *
         * **Note:** Authorization does not occur (and is not possible or necessary) with {@link GoLocalStorage}. Instead,
         * {@link GoLocalStorage#authorize} ensures localStorage exists in the browser.
         * @param {boolean} refreshToken Whether to get a new access token (true) or try to find / use an existing one. Exact behavior varies
         * from subclass to subclass. See:
         *   - {@link GoLocalStorage#authorize}
         *   - {@link GoDropBox#authorize}
         *   - {@link GoGoogleDrive#authorize}
         *   - {@link GoOneDrive#authorize}
         * @return {Promise<any>} Returns a Promise that resolves with a boolean stating whether authorization was succesful (true) or failed (false).
         */
        GoCloudStorage.prototype.authorize = function (refreshToken) {
            if (refreshToken === void 0) { refreshToken = false; }
            return new Promise(function (resolve, reject) {
                reject('authorize not implemented');
            });
        };
        /**
         * @private
         * @hidden
         * Returns a new {@link DeferredPromise}. Use this method to reset {@link #deferredPromise}.promise property
         * after deferredPromise.promise has been resolved. For example:
         *
         * ```js
         *
         * // function a returns the "promise" field of deferredPromise
         * function a () {
         *      return gcs.deferredPromise.promise
         * }
         *
         * // function b resolves the "promise" field of deferredPromise and resets it
         * function b () {
         *      gcs.deferredPromise.promise.resolve("Promise resolved"); // resolve
         *      gcs.deferredPromise.promise = gcs.makeDeferredPromise(); // reset
         * }
         *
         * a(); // return deferredPromise.promise
         * b(); // b is called after a (and before anything else can resolve deferredPromise.promise), so b resolves deferredPromise.promise
         *
         * ```
         * @return {Promise<Object>}
         */
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
        /**
         * Get information about the currently logged in user. This information varies from subclass to subclass. For more info, see:
         *   - {@link GoDropBox#getUserInfo}
         *   - {@link GoGoogleDrive#getUserInfo}
         *   - {@link GoOneDrive#getUserInfo}
         * @return {Promise<any>} Returns a Promise that resolves with information about the currently logged in user
         */
        GoCloudStorage.prototype.getUserInfo = function () {
            return new Promise(function (resolve, reject) {
                reject('getUserInfo not implemented');
            });
        };
        /**
         * Hide the {@link #ui} element associated with this instance of GoCloudStorage. Used in some UI element onclicks.
         * @param {boolean} isActionCanceled If action (save, delete, load) is canceled, resolve Promise (returned previously in
         * {@link #showUI}) with a 'Canceled' notification. Default value is false.
         */
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
        /**
         * Check whether a file exists at a given path.
         * @param {string} path A valid filepath. What is meant by this varies from subclass to subclass. Rules for valid filepaths by subclass:
         *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
         *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
         *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
         *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @return {Promise<boolean>} Returns a Promise that resolves with a boolean stating whether a file exists at a given path.
         */
        GoCloudStorage.prototype.checkFileExists = function (path) {
            return new Promise(function (resolve, reject) {
                reject('checkFileExists not implemented');
            });
        };
        /**
         * Get the file at a given path in storage. The exact file data given varies from storage service
         * to storage service, though all include name, path, id data. The exact syntax of these data fields may vary.
         * See subclass-specific documentation for more details.
         *   - {@link GoLocalStorage#getFile}
         *   - {@link GoDropBox#getFile}
         *   - {@link GoGoogleDrive#getFile}
         *   - {@link GoOneDrive#getFile}
         * @param {string} path A valid filepath. What is meant by this varies from subclass to subclass. Rules for valid filepaths by subclass:
         *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
         *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
         *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
         *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @return {Promise<any>} Return a Promise that resolves with the file at a given path in storage(or null).
         */
        GoCloudStorage.prototype.getFile = function (path) {
            return new Promise(function (resolve, reject) {
                throw Error('getFile not implemented');
            });
        };
        /**
         * Show the {@link #ui} element associated with this instance of GoCloudStorage.
         * @param {string} action Clarify what action is being done after file selection. Acceptable values: Save, Delete, Load
         * @return {Promise} Returns a Promise that resolves (in {@link #save}, {@link #load}, or {@link #remove} with an {@link DiagramFile}
         * representing the saved/loaded/deleted file
         */
        GoCloudStorage.prototype.showUI = function (action) {
            return new Promise(function (resolve, reject) {
                throw Error('showUI not implemented');
            });
        };
        /**
         * Set each of {@link #managedDiagrams}' .model to {@link #defaultModel} (if defaultModel is null,
         * each model will be set to a new {@link GraphLinksModel} by default).
         * If {@link #isAutoSaving} is true and no path parameter is supplied, users will be immediately prompted to save their new diagrams to cloud storage.
         * @param {string} path Optional. If a valid filepath is supplied, save each of {@link #managedDiagrams}' model data to this path. No UI of any sort appears.
         * What is meant by "valid filepath" varies from subclass to subclass. Rules for valid filepaths by subclass:
         *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
         *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
         *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
         *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @param {boolean} saveBefore Optional. If true, the user will be prompted to save their current diagram(s) before GoCloudStorage makes a new one.
         * The default value is false.
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the newly created file.
         */
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
                // TODO -- offer the chance for user to save their current diagram
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
                                    resolve('New diagram created.'); // no prompt to save
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
                                resolve('New diagram created.'); // no prompt to save
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
                        resolve('New diagram created.'); // no prompt to save
                }
            });
        };
        GoCloudStorage.prototype.promptUserToSaveBeforeNew = function () {
            return new Promise(function (resolve, reject) {
                // Remove any prior window like this
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
        /**
         * @private
         * @hidden
         * Returns the data to save to storage. This is a string representation of a JSON-like object.
         * Keys are the div IDs of the diagrams being saved. Values are the model.toJson() values for those diagrams.
         * @return {string}
         */
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
        /**
         * @private
         * @hidden
         * Loads all models in a saved file to their respective diagrams
         */
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
        /**
         * Save the current diagram's model data to cloud storage with the {@link #ui} for this class.
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
         */
        GoCloudStorage.prototype.saveWithUI = function () {
            return new Promise(function (resolve, reject) {
                reject('saveWithUI not implemented');
            });
        };
        /**
         * Save {@link #managedDiagrams}' model data to storage. If path is supplied save to that path. If no path is supplied but {@link #currentDiagramFile} has non-null,
         * valid properties, update saved diagram file content at the path in storage corresponding to currentDiagramFile.path with current managedDiagrams' model data.
         *
         * Rules for valid filepaths by subclass:
         *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
         *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
         *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
         *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @return {Promise} Returns a Promise that resolves with a  {@link DiagramFile} representing the saved file
         */
        GoCloudStorage.prototype.save = function (path) {
            return new Promise(function (resolve, reject) {
                reject('save not implemented');
            });
        };
        /**
         * Load diagram model data from a given cloud storage-specific file path into {@link #managedDiagrams}.
         * @param {string} path A valid filepath. What is meant by this varies from subclass to subclass. Rules for valid filepaths by subclass:
         *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
         *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
         *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
         *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile}
         */
        GoCloudStorage.prototype.load = function (path) {
            return new Promise(function (resolve, reject) {
                reject('load not implemented');
            });
        };
        /**
         * Load diagram model data from cloud storage into {@link #managedDiagrams} using the {@link #ui} for this class.
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
         */
        GoCloudStorage.prototype.loadWithUI = function () {
            return new Promise(function (resolve, reject) {
                reject('loadWithUI not implemented');
            });
        };
        /**
         * Remove a file containing diagram model data at a given cloud storage-specific file path.
         * @param {string} path A valid filepath. What is meant by this varies from subclass to subclass. Rules for valid filepaths by subclass:
         *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
         *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
         *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
         *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file.
         */
        GoCloudStorage.prototype.remove = function (path) {
            return new Promise(function (resolve, reject) {
                reject('remove not implemented');
            });
        };
        /**
         * Remove a given diagram from cloud storage using the {@link #ui} for this class.
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
         */
        GoCloudStorage.prototype.removeWithUI = function () {
            return new Promise(function (resolve, reject) {
                reject('removeWithUI not implemented');
            });
        };
        return GoCloudStorage;
    }());
    exports.GoCloudStorage = GoCloudStorage;
});
