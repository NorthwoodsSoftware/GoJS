/*
 * Copyright (C) 1998-2023 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * GoCloudStorage.js
*/

import * as go from '../../release/go';


/**
 * A simple interface containing basic information about a diagram saved to a storage service.
 * Guarantees the existence of file id, name, and path.
 *
 * DiagramFiles are used as a minimal representation of files stored in data. {@link GoCloudStorage#currentDiagramFile}.
 * {@link GoCloudStorage#save}, {@link GoCloudStorage#load}, {@link GoCloudStorage#remove},
 * and {@link GoCloudStorage#create} all return Promises which resolve with
 * DiagramFiles containing minimal data about the saved / loaded / removed / created file in storage.
 * @category Storage
 */
export interface DiagramFile {
    /**
     * The storage-given ID of the diagram file. This is usually a lengthy alphanumeric string.
     *
     * **Note**: In the case of files saved to / loaded from Local Storage with {@link GoLocalStorage},
     * ID is the same as the name of the file.
     */
    id: string;
    /**
     * The name of the diagram file in storage. This is assigned by the user during {@link GoCloudStorage#save}.
     */
    name: string;
    /**
     * The path of the diagram file in storage. Rules for valid path syntax by subclass:
     *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
     *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
     *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs.
     *      Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
     *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
     */
    path: string;
    /**
     * @private
     * @hidden
     * token is sometimes necesary for {@link GoOneDrive}. This is an access token given by the
     * <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">
     * Microsoft OneDrive Filepicker</a> allowing read / write on a specific drive file.
     * No other {@link GoCloudStorage} subclasses use it. It is unlikely one will use this field without editing source code.
     */
    token?: string;
    /**
     * @private
     * @hidden
     * parentReference is sometimes necesary for {@link GoOneDrive}. It is the
     * <a href="https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/itemreference"> parent information</a>
     * of a Microsoft OneDrive item, if the item has a parent.
     * No other {@link GoCloudStorage} subclasses use it. It is unlikely one will use this field without editing source code.
     */
    parentReference?: Object;
}

/**
 * @private
 * @hidden
 * A simple interface acting as a wrapper for a Promise that gurantees the existence of the promise field.
 * DeferredPromise is important in that it allows for a Promise to be returned by one function and resolved within another.
 * You may call `.resolve` and `.reject` on this field as you may a standard ES6 Promise. After resolving / rejecting
 * deferredPromise.promise, it is recommended you reset it by calling {@link GoCloudStorage.makeDeferredPromise}. Example:
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
 */
export interface DeferredPromise {
    promise: any; // this really isn't "any", it's an ES6 Promise, but declaring it as Promise<any> removes .resolve() functionality???
}

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
export class GoCloudStorage {

    private _managedDiagrams: Array<go.Diagram>;
    private _clientId: string;
    private _isAutoSaving: boolean;
    private _currentDiagramFile: DiagramFile;
    private _ui: HTMLElement;
    private _defaultModel: string;
    /**
     * @private
     * @hidden
     */
    protected _serviceName: string;
    /**
     * @private
     * @hidden
     */
    protected _className: string;
    /**
     * @private
     * @hidden
     */
    protected _deferredPromise: DeferredPromise;
    private _iconsRelativeDirectory: string;

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
    constructor(managedDiagrams: go.Diagram | Array<go.Diagram>, defaultModel?: string, clientId?: string, iconsRelativeDirectory?: string) {
        if (managedDiagrams instanceof go.Diagram) managedDiagrams = [managedDiagrams];
        this._managedDiagrams = managedDiagrams;
        this._currentDiagramFile = { name: null, id: null, path: null };
        this._isAutoSaving = true;
        if (clientId) this._clientId = clientId;
        else clientId = null;

        // if defaultModel does not begin with "{", try using that as the iconsRelativeDirectory
        if (defaultModel) {
            const firstChar: string = defaultModel.trim().charAt(0);
            if (defaultModel && firstChar === '{') this._defaultModel = defaultModel;
            if (firstChar !== '{' && !iconsRelativeDirectory) this._iconsRelativeDirectory = defaultModel;
            else this._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : '../goCloudStorageIcons/';
        } else {
            this._defaultModel = null;
            this._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : '../goCloudStorageIcons/';
        }

        // make sure iconsRelativeDirectory has a trailing '/'
        const lastChar = this._iconsRelativeDirectory.charAt(this._iconsRelativeDirectory.length - 1);
        if (lastChar !== '/') {
            this._iconsRelativeDirectory += '/';
        }

        const menu = document.createElement('div');
        menu.className = 'goCustomFilepicker';
        menu.style.visibility = 'hidden';

        // TODO -- this assumes the document has a body element, is this OK??
        document.getElementsByTagName('body')[0].appendChild(menu);
        this._ui = menu;
        this._deferredPromise = { promise: this.makeDeferredPromise() };

        // enable autosaving capability
        // tslint:disable-next-line:no-shadowed-variable
        function addAutoSave(d: go.Diagram) {
            d.addModelChangedListener(function(e: go.ChangedEvent) {
                if (e.isTransactionFinished && storage.isAutoSaving && e.oldValue !== '') {
                    if (storage.currentDiagramFile.name) {
                        storage.save();
                    }
                }
            });
        }

        const d = this.managedDiagrams;
        const storage = this;
        if (d instanceof go.Diagram) {
            addAutoSave(d);
        } else {
            for (let i = 0; i < d.length; i++) {
                addAutoSave(d[i]);
            }
        }
    }

    /**
     * Get / set the GoJS {@link Diagram}s associated with this instance of GoCloudStorage.
     * Set with a parameter during construction.
     * @function.
     * @return {go.Diagram[]}
     */
    get managedDiagrams(): Array<go.Diagram> { return this._managedDiagrams; }
    set managedDiagrams(value: Array<go.Diagram>) { this._managedDiagrams = value; }

    /**
     * Get / set the defaultModel data for the app used by an instance of GoCloudStorage.
     * defaultModel is used when creating new diagrams. See {@link #create}.
     * @function.
     * @return {string}
     */
    get defaultModel(): string { return this._defaultModel; }
    set defaultModel(value: string) { this._defaultModel = value; }

    /**
     * Get / set iconsRelativeDirectory, the directory path relative to the page in which this instance of GoCloudStorage exists,
     * in which the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
     * @function.
     * @return {string}
     */
    get iconsRelativeDirectory(): string { return this._iconsRelativeDirectory; }
    set iconsRelativeDirectory(value: string) { this._iconsRelativeDirectory = value; }

    /**
     * Get the clientId for the app using the cloud storage service. This is usually given by the cloud storage provider's dev console or similar.
     * Set with a parameter during construction.
     * @function.
     * @return {string}
     */
    get clientId(): string { return this._clientId; }

    /**
     * Get or set the currently open {@link DiagramFile}. By default, currentDiagramFile is set when a file is
     * loaded from storage, saved to storage (if saved to a different path from the currentDiagramFile.path), or
     * deleted from storage (if the deleted file is the currently open one).
     * The default value is a {@link DiagramFile} with null id, name, and path values.
     * @function.
     * @return {Object}
     */
    get currentDiagramFile(): DiagramFile { return this._currentDiagramFile; }
    set currentDiagramFile(value: DiagramFile) { this._currentDiagramFile = value; }

    /**
     * Get or set isAutoSaving property. If true, the {@link #managedDiagrams} will be saved to storage after every
     * {@link Transaction} (only if {@link #currentDiagramFile} holds a non-null path value).
     * Additionally, if isAutoSaving is true, users will be prompted to save newly created
     * diagrams when created with {@link #create}.
     * The default value for isAutoSaving is `true`.
     * @function.
     * @return {boolean}
     */
    get isAutoSaving(): boolean { return this._isAutoSaving; }
    set isAutoSaving(value: boolean) { this._isAutoSaving = value; }

    /**
     * Get the name of the cloud storage service being used; i.e. "Dropbox"
     * @function.
     * @return {string}
     */
    get serviceName(): string { return this._serviceName; }

    /**
     * Get the name of the class; i.e. "GoDropbox"
     * @function.
     * @return {string}
     */
    get className(): string { return this._className; }

    /**
     * Get the UI element associated with this instance of GoCloudStorage. This is a custom filepicker window for {@link GoDropBox} and
     * {@link GoLocalStorage}. It is a save prompt for {@link GoOneDrive} and {@link GoGoogleDrive} (both these classes use third party
     * UI for storage navigation, provided by Microsoft and Google, respectively). The UI element is created during construction.
     * @function.
     * @return {HTMLElement}
     */
    get ui(): HTMLElement { return this._ui; }

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
    public authorize(refreshToken: boolean = false): Promise<any> {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('authorize not implemented');
        });
    }

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
    public makeDeferredPromise(): Promise<Object> {
        let res: Function; let rej: Function;
        const promise: any = new Promise((resolve: Function, reject: Function) => {
            res = resolve;
            rej = reject;
        });
        promise.resolve = res;
        promise.reject = rej;

        return promise;
    }

    /**
     * Get information about the currently logged in user. This information varies from subclass to subclass. For more info, see:
     *   - {@link GoDropBox#getUserInfo}
     *   - {@link GoGoogleDrive#getUserInfo}
     *   - {@link GoOneDrive#getUserInfo}
     * @return {Promise<any>} Returns a Promise that resolves with information about the currently logged in user
     */
    public getUserInfo() {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('getUserInfo not implemented');
        });
    }

    /**
     * Hide the {@link #ui} element associated with this instance of GoCloudStorage. Used in some UI element onclicks.
     * @param {boolean} isActionCanceled If action (save, delete, load) is canceled, resolve Promise (returned previously in
     * {@link #showUI}) with a 'Canceled' notification. Default value is false.
     */
    public hideUI(isActionCanceled: boolean = false) {
        const storage = this;
        storage.ui.style.visibility = 'hidden';
        if (isActionCanceled) {
            const action: string = document.getElementById('actionButton').innerHTML;
            storage._deferredPromise.promise.resolve(action + ' canceled by user');
            storage._deferredPromise.promise = storage.makeDeferredPromise();
        }
    }

    /**
     * Check whether a file exists at a given path.
     * @param {string} path A valid filepath. What is meant by this varies from subclass to subclass. Rules for valid filepaths by subclass:
     *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
     *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
     *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
     *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
     * @return {Promise<boolean>} Returns a Promise that resolves with a boolean stating whether a file exists at a given path.
     */
    public checkFileExists(path: string) {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('checkFileExists not implemented');
        });
    }

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
    public getFile(path: string) {
        return new Promise(function(resolve: Function, reject: Function) {
            throw Error('getFile not implemented');
        });
    }

    /**
     * Show the {@link #ui} element associated with this instance of GoCloudStorage.
     * @param {string} action Clarify what action is being done after file selection. Acceptable values: Save, Delete, Load
     * @return {Promise} Returns a Promise that resolves (in {@link #save}, {@link #load}, or {@link #remove} with an {@link DiagramFile}
     * representing the saved/loaded/deleted file
     */
    public showUI(action: string) {
        return new Promise(function(resolve: Function, reject: Function) {
            throw Error('showUI not implemented');
        });
    }

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
    public create(path?: string, saveBefore: boolean = false) {
        const storage = this;
        function makeNewDiagram(d: go.Diagram) {
            if (storage.defaultModel) d.model = go.Model.fromJson(JSON.parse(storage.defaultModel));
            else d.model = new go.GraphLinksModel();
        }
        return new Promise(function(resolve: Function, reject: Function) {
            // TODO -- offer the chance for user to save their current diagram
            if (saveBefore) {
                storage.promptUserToSaveBeforeNew().then(function(resp) {
                    if (resp) {
                        storage.saveWithUI().then(function(diagramFile) {
                            storage.currentDiagramFile = { name: null, id: null, path: null };
                            if (storage.managedDiagrams instanceof go.Diagram) {
                                makeNewDiagram(storage.managedDiagrams);
                            } else {
                                for (let i = 0; i < storage.managedDiagrams.length; i++) {
                                    makeNewDiagram(storage.managedDiagrams[i]);
                                }
                            }
                            if (storage.isAutoSaving) {
                                if (path) {
                                    resolve(storage.save(path));
                                } else resolve(storage.saveWithUI());
                            } else resolve('New diagram created.'); // no prompt to save
                        });
                    } else {
                        storage.currentDiagramFile = { name: null, id: null, path: null };
                        if (storage.managedDiagrams instanceof go.Diagram) {
                            makeNewDiagram(storage.managedDiagrams);
                        } else {
                            for (let i = 0; i < storage.managedDiagrams.length; i++) {
                                makeNewDiagram(storage.managedDiagrams[i]);
                            }
                        }
                        if (storage.isAutoSaving) {
                            if (path) {
                                resolve(storage.save(path));
                            } else resolve(storage.saveWithUI());
                        } else resolve('New diagram created.'); // no prompt to save
                    }
                });
            }
            if (!saveBefore) {
                storage.currentDiagramFile = { name: null, id: null, path: null };
                if (storage.managedDiagrams instanceof go.Diagram) {
                    makeNewDiagram(storage.managedDiagrams);
                } else {
                    for (let i = 0; i < storage.managedDiagrams.length; i++) {
                        makeNewDiagram(storage.managedDiagrams[i]);
                    }
                }
                if (storage.isAutoSaving) {
                    if (path) {
                        resolve(storage.save(path));
                    } else resolve(storage.saveWithUI());
                } else resolve('New diagram created.'); // no prompt to save
            }
        });
    }

    private promptUserToSaveBeforeNew() {
        return new Promise(function(resolve: Function, reject: Function) {
            // Remove any prior window like this
            const d = document.getElementById('gcs-save-before-new');
            if (d) {
                document.body.removeChild(d);
            }

            const div = document.createElement('div');
            div.id = 'gcs-save-before-new';
            const p = document.createElement('p');
            p.innerText = 'Save current diagram(s) before creating a new file?';

            const yb = document.createElement('button');
            yb.innerText = 'Yes';
            const nb = document.createElement('button');
            nb.innerText = 'No';

            yb.onclick = function() {
                document.body.removeChild(div);
                resolve(true);
            };

            nb.onclick = function() {
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
    }

    /**
     * @private
     * @hidden
     * Returns the data to save to storage. This is a string representation of a JSON-like object.
     * Keys are the div IDs of the diagrams being saved. Values are the model.toJson() values for those diagrams.
     * @return {string}
     */
    protected makeSaveFile() {
        let item: string = '{\n';
        const storage = this;
        if (storage.managedDiagrams.length === 0) return;
        for (let i = 0; i < storage.managedDiagrams.length; i++) {
            const diagram: go.Diagram = storage.managedDiagrams[i];
            const div: string = diagram.div.id;
            const _model: string = diagram.model.toJson();
            item += '"' + div + '"' + ': ' + diagram.model.toJson();
            if (i + 1 !== storage.managedDiagrams.length) item += ',\n';
        }

        item += '\n}';
        return item;
    }

    /**
     * @private
     * @hidden
     * Loads all models in a saved file to their respective diagrams
     */
    protected loadFromFileContents(fileContents: string) {
        const models = JSON.parse(fileContents);
        for (const divId in models) {
            const model = models[divId];
            const div: HTMLDivElement = document.getElementById(divId) as HTMLDivElement;
            const diagram: any = go.Diagram.fromDiv(div);
            if (diagram) {
                diagram.model = go.Model.fromJson(JSON.stringify(model));
            } else {
                throw Error('No Diagram on page is associated with a div with id ' + divId);
            }
        }
    }

    /**
     * Save the current diagram's model data to cloud storage with the {@link #ui} for this class.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
     */
    public saveWithUI() {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('saveWithUI not implemented');
        });
    }

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
    public save(path?: string) {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('save not implemented');
        });
    }

    /**
     * Load diagram model data from a given cloud storage-specific file path into {@link #managedDiagrams}.
     * @param {string} path A valid filepath. What is meant by this varies from subclass to subclass. Rules for valid filepaths by subclass:
     *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
     *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
     *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
     *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile}
     */
    public load(path: string) {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('load not implemented');
        });
    }

    /**
     * Load diagram model data from cloud storage into {@link #managedDiagrams} using the {@link #ui} for this class.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
     */
    public loadWithUI() {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('loadWithUI not implemented');
        });
    }

    /**
     * Remove a file containing diagram model data at a given cloud storage-specific file path.
     * @param {string} path A valid filepath. What is meant by this varies from subclass to subclass. Rules for valid filepaths by subclass:
     *   - {@link GoLocalStorage}: Just the filename (the key in local storage); i.e. `example.diagram`
     *   - {@link GoDropBox}: `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`
     *   - {@link GoGoogleDrive}: Use Google Drive-given file IDs. Parameter is still called 'path' in GoGoogleDrive methods to preserve system nomenclature.
     *   - {@link GoOneDrive}: `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file.
     */
    public remove(path: string) {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('remove not implemented');
        });
    }

    /**
     * Remove a given diagram from cloud storage using the {@link #ui} for this class.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
     */
    public removeWithUI() {
        return new Promise(function(resolve: Function, reject: Function) {
            reject('removeWithUI not implemented');
        });
    }

}
