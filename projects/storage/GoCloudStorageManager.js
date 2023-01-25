/**
 * Copyright (C) 1998-2023 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * Go Cloud Storage Manager
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../release/go", "./GoCloudStorage.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoCloudStorageManager = void 0;
    var go = require("../../release/go");
    var gcs = require("./GoCloudStorage.js");
    /**
     * Class for easily saving / loading GoJS {@link Model}s to / from a user-defined set of Cloud Storage Services with a pre-defined UI.
     *
     * GoCloudStorageManager holds a set of {@link GoCloudStorage} subclass instances ({@link #storages}) to manage. When one is selected from the
     * storage selection {@link #menu}, it becomes the {@link #currentStorage} property, which is used to save / load / delete / create files.
     * @category Storage
     */
    var GoCloudStorageManager = /** @class */ (function () {
        /**
         * @constructor
         * @param {go.Set<gcs.GoCloudStorage>} storages Contains valid instances of {@link GoCloudStorage} subclasses. Use at most one instance of each subclass.
         * @param {string} iconsRelativeDirectory The directory path relative to the page in which this instance of GoCloudStorageManager exists, in which
         * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
         * **Note:** If this parameter is supplied, it is used as for the "iconsRelativeDirectory" constructor parameter for each instance
         * this instance of GoCloudStorageManager manages in {@link #storages}.
         */
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
            // if href includes a certain string, we just authenticated DropBox, so use GoDropBox as "currentStorage"
            if (window.location.href.indexOf('account_id=dbid') !== -1) {
                storages.iterator.each(function (storage) {
                    if (storage.className === 'GoDropBox') {
                        storageManager._currentStorage = storage;
                        // this will force a load of the diagram data that existed before the Dropbox auth flow
                        storageManager.currentStorage.authorize();
                    }
                });
            }
            // append the menu ui to the document
            document.getElementsByTagName('body')[0].appendChild(storageManager.menu);
        }
        Object.defineProperty(GoCloudStorageManager.prototype, "storages", {
            /**
             * Get storages ({@link GoCloudStorage} subclass instances) managed by an instance of GoCloudStorageManager. At most, there should be only one instance of each subclass.
             * This is set with a parameter during construction.
             * @function.
             * @return {go.Set<gcs.GoCloudStorage>}
             */
            get: function () { return this._storages; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorageManager.prototype, "iconsRelativeDirectory", {
            /**
             * Get / set iconsRelativeDirectory, the directory path relative to the page in which this instance of GoCloudStorageManager exists, in which
             * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
             * @function.
             * @return {string}
             */
            get: function () { return this._iconsRelativeDirectory; },
            set: function (value) { this._iconsRelativeDirectory = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorageManager.prototype, "menu", {
            /**
             * Get GoCloudStorageManager menu, from which a user chooses which storage service for this instance of GoCloudStorageManager to actively manage (see {@link #currentStorage}).
             * This is created (as a blank div) during construction. Its contents are populated during {@link #selectStorageService}.
             * @function.
             * @return {HTMLElement}
             */
            get: function () { return this._menu; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GoCloudStorageManager.prototype, "currentStorage", {
            /**
             * Get / set the {@link GoCloudStorage} subclass this instance of GoCloudStorageManager is actively managing.
             * @function.
             * @return {gcs.GoCloudStorage}
             */
            get: function () { return this._currentStorage; },
            set: function (value) { this._currentStorage = value; },
            enumerable: false,
            configurable: true
        });
        /**
         * Creates a new diagram with {@link #currentStorage}'s default model data (see {@link GoCloudStorage#defaultModel}.
         * If currentStorage.isAutoSaving is true, prompt to save it to to currentStorage's storage service.
         * if {@link #currentStorage}'s {@link GoCloudStorage#isAutoSaving} is true).
         * @param {boolean} saveBeforeCreate Whether or not to prompt the user to save their current work before creating a new diagram.
         * See more at {@link GoCloudStorage#create}. Default value is false.
         * @return {Promise} Returns a Promise that resolves a {@link DiagramFile} representing the newly created file (if file was saved).
         */
        GoCloudStorageManager.prototype.create = function (saveBeforeCreate) {
            if (saveBeforeCreate === void 0) { saveBeforeCreate = false; }
            var storageManager = this;
            return new Promise(function (resolve, reject) {
                resolve(storageManager.handleAction('Create', saveBeforeCreate));
            });
        };
        /**
         * Launches the load interface for {@link #currentStorage}.
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file.
         */
        GoCloudStorageManager.prototype.load = function () {
            var storageManager = this;
            return new Promise(function (resolve, reject) {
                resolve(storageManager.handleAction('Load'));
            });
        };
        /**
         * Launches the remove interface for {@link #currentStorage}.
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file.
         */
        GoCloudStorageManager.prototype.remove = function () {
            var storageManager = this;
            return new Promise(function (resolve, reject) {
                resolve(storageManager.handleAction('Remove'));
            });
        };
        /**
         * Either launches the save interface for {@link #currentStorage} or just saves the {@link GoCloudStorage#managedDiagrams}' model data  to
         * storage at the path supplied in currentStorage's {@link GoCloudStorage#currentDiagramFile}.path value, depending on a parameter.
         * @param {boolean} isSaveAs If true, show the save interface for currentStorage. If false, save currentStorage's managedDiagrams' model data to storage.
         * Default value is true.
         * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
         */
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
        /**
         * Display a message on the screen for a given number of seconds. Can be used for a variety of purposes, but a common one is to
         * notify users when a file has been loaded / saved / deleted / created by handling the {@link DiagramFile} argument in the
         * "then" function of returned Promises (from functions {@link #load}, {@link #create}, {@link #save},
         * {@link #remove}) by displaying it as a message.
         * @param msg Message to display
         * @param seconds Number of seconds to display the message for. If no value is provided, the message will display for two seconds.
         */
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
        /**
         * Get the path to the icon for a given {@link GoCloudStorage#className}
         * @param className
         */
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
        /**
         * Display options ({@link #storages}) supported by this instance of GoCloudStorageManager.
         * Sets {@link #currentStorage} to user's choice.
         * @return {Promise} Returns a Promise that resolves with the new {@link #currentStorage} instance
         */
        GoCloudStorageManager.prototype.selectStorageService = function () {
            var storageManager = this;
            var storages = this.storages;
            return new Promise(function (resolve, reject) {
                var menu = storageManager.menu;
                var title = 'Select Storage Service';
                menu.innerHTML = '<strong>' + title + '</strong><hr></hr>';
                var selectedStorage = document.createElement('p');
                selectedStorage.id = 'gcsmSelectedStorage'; // Go Cloud Storage Manager selected storage
                selectedStorage.innerHTML = storageManager.currentStorage.serviceName;
                menu.appendChild(selectedStorage);
                // display the name of the currently selected radio button's storage service
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
                // document.getElementsByTagName('body')[0].appendChild(storageManager.menu);
                storageManager.menu.style.visibility = 'visible';
                var optionsDiv = document.createElement('div');
                optionsDiv.id = 'storageOptions';
                var it = storages.iterator;
                it.each(function (storage) {
                    // create a radio input box for each service managed by this instace of GoCloudStorageManager
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
                // tslint:disable-next-line:max-line-length
                var description = 'This will be where you save / load diagram model data to / from. You will need to grant GoCloudStorage permission to access your files on the selected storage service.';
                menu.innerHTML += "<p class='description'>" + description + '</p>';
                var submitDiv = document.createElement('div');
                var actionButton = document.createElement('button');
                actionButton.id = 'actionButton';
                actionButton.textContent = 'Select';
                actionButton.onclick = function () {
                    // set currentStorage
                    var radios = document.getElementsByName('storageSelection');
                    // tslint:disable-next-line:no-shadowed-variable
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
        /**
         * Hide the storage selection {@link #menu}
         */
        GoCloudStorageManager.prototype.hideMenu = function () {
            var storageManager = this;
            storageManager.menu.style.visibility = 'hidden';
        };
        /**
         * @private
         * Some classes need to be explicitly authorized (get a user-specific auth token) for use with GoCloudStorageManager. Some do not.
         * This function simply examines the currently active storage and determines whether or not this explicit authorization is needed.
         * @return {boolean}
         */
        GoCloudStorageManager.prototype.currentStorageNeedsAuth = function () {
            var storageManager = this;
            var currentStorageClass = storageManager.currentStorage.className;
            if (currentStorageClass === 'GoGoogleDrive' || currentStorageClass === 'GoDropBox')
                return true;
            return false;
        };
        /**
         * Handle an action with the current {@link #currentStorage}. Possible values for `action` can be:
         *   - Load
         *   - Save
         *   - Save As
         *   - Create
         *   - Remove
         * @param action
         * @param saveBeforeCreate Whether or not to prompt the user to save their current work before creating a new file.
         * Default value is false. See more at {@link GoCloudStorage#create}
         */
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
});
