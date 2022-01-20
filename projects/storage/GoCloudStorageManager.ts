/**
 * Copyright (C) 1998-2022 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * Go Cloud Storage Manager
 */

import * as go from '../../release/go';
import * as gcs from './GoCloudStorage.js';

/**
 * Class for easily saving / loading GoJS {@link Model}s to / from a user-defined set of Cloud Storage Services with a pre-defined UI.
 *
 * GoCloudStorageManager holds a set of {@link GoCloudStorage} subclass instances ({@link #storages}) to manage. When one is selected from the
 * storage selection {@link #menu}, it becomes the {@link #currentStorage} property, which is used to save / load / delete / create files.
 * @category Storage
 */
export class GoCloudStorageManager {

    private _storages: go.Set<gcs.GoCloudStorage>;
    private _currentStorage: gcs.GoCloudStorage;
    private _menu: HTMLElement;
    private _deferredPromise: gcs.DeferredPromise;
    private _iconsRelativeDirectory: string;

    /**
     * @constructor
     * @param {go.Set<gcs.GoCloudStorage>} storages Contains valid instances of {@link GoCloudStorage} subclasses. Use at most one instance of each subclass.
     * @param {string} iconsRelativeDirectory The directory path relative to the page in which this instance of GoCloudStorageManager exists, in which
     * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
     * **Note:** If this parameter is supplied, it is used as for the "iconsRelativeDirectory" constructor parameter for each instance
     * this instance of GoCloudStorageManager manages in {@link #storages}.
     */
    constructor(storages: go.Set<gcs.GoCloudStorage> | Array<gcs.GoCloudStorage>, iconsRelativeDirectory?: string) {
        if (storages instanceof Array) {
            const storagesSet = new go.Set<gcs.GoCloudStorage>();
            for (let i = 0; i < storages.length; i++) {
                if (!(storages[i] instanceof gcs.GoCloudStorage)) {
                    throw new Error("Cannot create GoCloudStorageManager; provided 'storages' parameter elements are not all of type GoCloudStorage");
                } else {
                    storagesSet.add(storages[i]);
                }
            }
            storages = storagesSet;
        }
        if (!(storages instanceof go.Set) || !storages) throw Error("Cannot create GoCloudStorageManager with provided 'storages' parameter");
        const storageManager = this;
        storageManager._storages = storages;
        storageManager._currentStorage = storages.first();
        const menu = document.createElement('div');
        menu.id = 'goCloudStorageManagerMenu';
        storageManager._menu = menu;
        storageManager._deferredPromise = { promise: gcs.GoCloudStorage.prototype.makeDeferredPromise() };
        storageManager._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : '../goCloudStorageIcons/';
        if (iconsRelativeDirectory) {
            storageManager._storages.iterator.each(function(storage) {
                storage.iconsRelativeDirectory = iconsRelativeDirectory;
            });
        }
        // if href includes a certain string, we just authenticated DropBox, so use GoDropBox as "currentStorage"
        if (window.location.href.indexOf('account_id=dbid') !== -1) {
            storages.iterator.each(function(storage) {
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

    /**
     * Get storages ({@link GoCloudStorage} subclass instances) managed by an instance of GoCloudStorageManager. At most, there should be only one instance of each subclass.
     * This is set with a parameter during construction.
     * @function.
     * @return {go.Set<gcs.GoCloudStorage>}
     */
    get storages(): go.Set<gcs.GoCloudStorage> { return this._storages; }

    /**
     * Get / set iconsRelativeDirectory, the directory path relative to the page in which this instance of GoCloudStorageManager exists, in which
     * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
     * @function.
     * @return {string}
     */
    get iconsRelativeDirectory(): string { return this._iconsRelativeDirectory; }
    set iconsRelativeDirectory(value: string) { this._iconsRelativeDirectory = value; }

    /**
     * Get GoCloudStorageManager menu, from which a user chooses which storage service for this instance of GoCloudStorageManager to actively manage (see {@link #currentStorage}).
     * This is created (as a blank div) during construction. Its contents are populated during {@link #selectStorageService}.
     * @function.
     * @return {HTMLElement}
     */
    get menu(): HTMLElement { return this._menu; }

    /**
     * Get / set the {@link GoCloudStorage} subclass this instance of GoCloudStorageManager is actively managing.
     * @function.
     * @return {gcs.GoCloudStorage}
     */
    get currentStorage() { return this._currentStorage; }
    set currentStorage(value: gcs.GoCloudStorage) { this._currentStorage = value; }

    /**
     * Creates a new diagram with {@link #currentStorage}'s default model data (see {@link GoCloudStorage#defaultModel}.
     * If currentStorage.isAutoSaving is true, prompt to save it to to currentStorage's storage service.
     * if {@link #currentStorage}'s {@link GoCloudStorage#isAutoSaving} is true).
     * @param {boolean} saveBeforeCreate Whether or not to prompt the user to save their current work before creating a new diagram.
     * See more at {@link GoCloudStorage#create}. Default value is false.
     * @return {Promise} Returns a Promise that resolves a {@link DiagramFile} representing the newly created file (if file was saved).
     */
    public create(saveBeforeCreate: boolean = false) {
        const storageManager = this;
        return new Promise(function(resolve: Function, reject: Function) {
            resolve(storageManager.handleAction('Create', saveBeforeCreate));
        });
    }

    /**
     * Launches the load interface for {@link #currentStorage}.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file.
     */
    public load() {
        const storageManager = this;
        return new Promise(function(resolve: Function, reject: Function) {
            resolve(storageManager.handleAction('Load'));
        });
    }

    /**
     * Launches the remove interface for {@link #currentStorage}.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file.
     */
    public remove() {
        const storageManager = this;
        return new Promise(function(resolve: Function, reject: Function) {
            resolve(storageManager.handleAction('Remove'));
        });
    }

    /**
     * Either launches the save interface for {@link #currentStorage} or just saves the {@link GoCloudStorage#managedDiagrams}' model data  to
     * storage at the path supplied in currentStorage's {@link GoCloudStorage#currentDiagramFile}.path value, depending on a parameter.
     * @param {boolean} isSaveAs If true, show the save interface for currentStorage. If false, save currentStorage's managedDiagrams' model data to storage.
     * Default value is true.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
     */
    public save(isSaveAs: boolean = true) {
        const storageManager = this;
        return new Promise(function(resolve: Function, reject: Function) {
            if (isSaveAs) resolve(storageManager.handleAction('SaveAs'));
            else resolve(storageManager.handleAction('Save'));
        });
    }

    /**
     * Display a message on the screen for a given number of seconds. Can be used for a variety of purposes, but a common one is to
     * notify users when a file has been loaded / saved / deleted / created by handling the {@link DiagramFile} argument in the
     * "then" function of returned Promises (from functions {@link #load}, {@link #create}, {@link #save},
     * {@link #remove}) by displaying it as a message.
     * @param msg Message to display
     * @param seconds Number of seconds to display the message for. If no value is provided, the message will display for two seconds.
     */
    public showMessage(msg: string, seconds?: number) {
        if (!seconds) seconds = 2;
        const messageBox = document.createElement('div');
        messageBox.id = 'goCloudStorageManagerMessageBox';
        messageBox.innerHTML = '<p>' + msg + '</p>';
        document.body.appendChild(messageBox);
        setTimeout(function() {
            messageBox.style.opacity = '0';
            setTimeout(function() { messageBox.parentNode.removeChild(messageBox); }, 1000);
        }, 1000 * seconds);
    }

    /**
     * Get the path to the icon for a given {@link GoCloudStorage#className}
     * @param className
     */
    public getStorageIconPath(className: string) {
        const storageManager = this;
        if (storageManager.iconsRelativeDirectory == null || storageManager.iconsRelativeDirectory === undefined) return null;
        let src: string = storageManager.iconsRelativeDirectory;
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
    }

    /**
     * Display options ({@link #storages}) supported by this instance of GoCloudStorageManager.
     * Sets {@link #currentStorage} to user's choice.
     * @return {Promise} Returns a Promise that resolves with the new {@link #currentStorage} instance
     */
    public selectStorageService() {
        const storageManager = this;
        const storages = this.storages;

        return new Promise(function(resolve: Function, reject: Function) {
            const menu = storageManager.menu;
            const title: string = 'Select Storage Service';
            menu.innerHTML = '<strong>' + title + '</strong><hr></hr>';

            const selectedStorage: HTMLElement = document.createElement('p');
            selectedStorage.id = 'gcsmSelectedStorage'; // Go Cloud Storage Manager selected storage
            selectedStorage.innerHTML = storageManager.currentStorage.serviceName;
            menu.appendChild(selectedStorage);

            // display the name of the currently selected radio button's storage service
            menu.onchange = function() {
                const radios: NodeListOf<HTMLInputElement> = document.getElementsByName('storageSelection') as NodeListOf<HTMLInputElement>;
                let selectedStorageClassName: string = null;
                for (let i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        selectedStorageClassName = radios[i].id;
                    }
                }
                let serviceNameStr: string = '';
                storages.iterator.each(function(s) {
                    if (s.className === selectedStorageClassName) {
                        serviceNameStr = s.serviceName;
                    }
                });
                document.getElementById('gcsmSelectedStorage').innerHTML = serviceNameStr;
            };

            // document.getElementsByTagName('body')[0].appendChild(storageManager.menu);
            storageManager.menu.style.visibility = 'visible';
            const optionsDiv: HTMLElement = document.createElement('div');
            optionsDiv.id = 'storageOptions';

            const it = storages.iterator;
            it.each(function(storage) {
                // create a radio input box for each service managed by this instace of GoCloudStorageManager
                const type: string = storage.className;
                const src: string = storageManager.getStorageIconPath(type);
                const isChecked: boolean = storage.className === storageManager.currentStorage.className;
                let checkedStr: string = '';
                if (isChecked) checkedStr = 'checked';

                optionsDiv.innerHTML +=
                    '<label>' +
                    '<input id=' + type + " type='radio' name='storageSelection' " + checkedStr + ' />' +
                    "<img class='storageLogo' src=" + src + ' >';
            });

            menu.appendChild(optionsDiv);

            // tslint:disable-next-line:max-line-length
            const description: string = 'This will be where you save / load diagram model data to / from. You will need to grant GoCloudStorage permission to access your files on the selected storage service.';
            menu.innerHTML += "<p class='description'>" + description + '</p>';

            const submitDiv: HTMLElement = document.createElement('div');
            const actionButton = document.createElement('button');
            actionButton.id = 'actionButton';
            actionButton.textContent = 'Select';
            actionButton.onclick = function() {
                // set currentStorage
                const radios: NodeListOf<HTMLInputElement> = document.getElementsByName('storageSelection') as NodeListOf<HTMLInputElement>;
                // tslint:disable-next-line:no-shadowed-variable
                let selectedStorage: string = null;
                for (let i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        selectedStorage = radios[i].id;
                    }
                }
                storageManager.storages.each(function(storage) {
                    if (storage.className === selectedStorage) storageManager.currentStorage = storage;
                });
                if (storageManager.currentStorageNeedsAuth()) {
                    storageManager.currentStorage.authorize().then(function(resp) {
                    });
                }
                resolve(storageManager.currentStorage);
                storageManager.hideMenu();
            };
            submitDiv.appendChild(actionButton);
            menu.appendChild(submitDiv);

            const cancelDiv: HTMLElement = document.createElement('div');
            const cancelButton = document.createElement('button');
            cancelButton.id = 'cancelButton';
            cancelButton.textContent = 'Cancel';
            cancelButton.onclick = function() {
                storageManager.hideMenu();
            };
            cancelDiv.appendChild(cancelButton);
            menu.appendChild(cancelDiv);
        });

    }

    /**
     * Hide the storage selection {@link #menu}
     */
    public hideMenu() {
        const storageManager = this;
        storageManager.menu.style.visibility = 'hidden';
    }

    /**
     * @private
     * Some classes need to be explicitly authorized (get a user-specific auth token) for use with GoCloudStorageManager. Some do not.
     * This function simply examines the currently active storage and determines whether or not this explicit authorization is needed.
     * @return {boolean}
     */
    private currentStorageNeedsAuth() {
        const storageManager = this;
        const currentStorageClass: string = storageManager.currentStorage.className;
        if (currentStorageClass === 'GoGoogleDrive' || currentStorageClass === 'GoDropBox') return true;
        return false;
    }

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
    public handleAction(action: string, saveBeforeCreate: boolean = false) {
        const storageManager = this;
        const storage: gcs.GoCloudStorage = storageManager.currentStorage;
        return new Promise(function(resolve: Function, reject: Function) {
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
                storage.authorize().then(function() {
                    doAction();
                });
            } else doAction();
        });
    }
}
