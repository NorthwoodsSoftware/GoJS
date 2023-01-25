/*
* Copyright (C) 1998-2023 by Northwoods Software Corporation
* All Rights Reserved.
*
* Go DropBox
*/

import * as go from '../../release/go';
import * as gcs from './GoCloudStorage.js';

/**
 * Class for saving / loading GoJS {@link Model}s to / from Dropbox.
 * As with all {@link GoCloudStorage} subclasses (with the exception of {@link GoLocalStorage}, any page using GoDropBox must be served on a web server.
 *
 * **Note**: Any page using GoDropBox must include a script tag with a reference to the <a href="https://cdnjs.com/libraries/dropbox.js/">Dropbox JS SDK</a>.
 * @category Storage
 */
export class GoDropBox extends gcs.GoCloudStorage {

    private _dropbox: any;
    private _menuPath: string;
    private _options: any;

    /**
     * @constructor
     * @param {go.Diagram|go.Diagram[]} managedDiagrams An array of GoJS {@link Diagram}s whose model(s) will be saved to / loaded from Dropbox.
     * Can also be a single Diagram.
     * @param {string} clientId The client ID of the application in use (given in Dropbox Developer's Console)
     * @param {string} defaultModel String representation of the default model data for new diagrams. If this is null,
     * default new diagrams will be empty. Usually a value given by calling {@link Model#toJson} on a GoJS Diagram's Model.
     * @param {string} iconsRelativeDirectory The directory path relative to the page in which this instance of GoDropBox exists, in which
     * the storage service brand icons can be found. The default value is "../goCloudStorageIcons/".
     */
    constructor(managedDiagrams: go.Diagram | Array<go.Diagram>, clientId: string, defaultModel?: string, iconsRelativeDirectory?: string) {
        super(managedDiagrams, defaultModel, clientId, iconsRelativeDirectory);
        if (window['Dropbox']) {
            const Dropbox = window['Dropbox'];
            this._dropbox = new Dropbox({ clientId: clientId });
        }
        this.menuPath = '';
        this.ui.id = 'goDropBoxCustomFilepicker';
        this._serviceName = 'Dropbox';
        this._className = 'GoDropBox';
        this._options = {

            // Required. Called when a user selects an item in the Chooser.
            success: function(files) {
                alert("Here's the file link: " + files[0].link);
            },

            // Optional. Called when the user closes the dialog without selecting a file
            // and does not include any parameters.
            cancel: function() {

            },

            // Optional. "preview" (default) is a preview link to the document for sharing,
            // "direct" is an expiring link to download the contents of the file. For more
            // information about link types, see Link types below.
            linkType: 'direct', // or "direct"

            // Optional. A value of false (default) limits selection to a single file, while
            // true enables multiple file selection.
            multiselect: false, // or true

            // Optional. This is a list of file extensions. If specified, the user will
            // only be able to select files with these extensions. You may also specify
            // file types, such as "video" or "images" in the list. For more information,
            // see File types below. By default, all extensions are allowed.
            extensions: ['.pdf', '.doc', '.docx', '.diagram'],

            // Optional. A value of false (default) limits selection to files,
            // while true allows the user to select both folders and files.
            // You cannot specify `linkType: "direct"` when using `folderselect: true`.
            folderselect: false // or true
        };
    }

    /**
     * Get the <a href="https://github.com/dropbox/dropbox-sdk-js">Dropbox client</a> instance associated with this instance of GoDropBox
     * (via {@link #clientId}). Set during {@link #authorize}.
     * @function.
     * @return {any}
     */
    get dropbox(): any { return this._dropbox; }

    /**
     * Get / set currently open Dropnpx path in custom filepicker {@link #ui}. Default value is the empty string, which corresponds to the
     * currently signed in user's Drobox account's root path. Set when a user clicks on a folder in the custom ui menu by invoking anchor onclick values.
     * These onclick values are set when the Dropbox directory at the current menuPath is displayed with {@link #showUI}.
     * @function.
     * @return {string}
     */
    get menuPath(): string { return this._menuPath; }
    set menuPath(value: string) { this._menuPath = value; }

    /**
     * Check if there is a signed in Dropbox user who has authorized the application linked to this instance of GoDropBox (via {@link #clientId}).
     * If not, prompt user to sign in / authenticate their Dropbox account.
     * @param {boolean} refreshToken Whether to get a new acess token (triggers a page redirect) (true) or try to find / use the
     * one in the browser window URI (no redirect) (false)
     * @return {Promise<boolean>} Returns a Promise that resolves with a boolean stating whether authorization was succesful (true) or failed (false)
     */
    public authorize(refreshToken: boolean = false) {
        const storage = this;
        return new Promise(function(resolve: Function, reject: Function) {
            // First, check if we're explicitly being told to refresh token (redirect to login screen)
            if (refreshToken) {
                storage.maybeSaveAppState();
                // redirect to the Dropbox sign in page for authentication
                const authUrl: string = storage.dropbox.getAuthenticationUrl(window.location.href);
                window.location.href = authUrl;
                resolve(false);
            } else if (!storage.dropbox.getAccessToken()) { // Then, check if there is no access token set on our Dropbox instance...
                // if no redirect, check if there's an db_id and access_token in the current uri
                if (storage.getAccessTokenFromUrl()) {
                    storage.dropbox.setAccessToken(storage.getAccessTokenFromUrl());
                    resolve(true);
                } else {
                    storage.maybeSaveAppState();
                    // if not, redirect to get an access_token from Dropbox login screen
                    const authUrl: string = storage.dropbox.getAuthenticationUrl(window.location.href);
                    window.location.href = authUrl;
                    resolve(false);
                }
            }
            // load in diagrams' models from before the auth flow started (preserve prior app state)
            storage.maybeLoadAppState();
            // If not explicitly redirecting and we have an access token already, we're already authenticated
            resolve(true);
        });
    }

    private getAccessTokenFromUrl() {
        const accessToken = window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.indexOf('&'));
        return !!accessToken ? accessToken : null;
    }

    /**
     * Attempt to preserve the app state in local storage
     * This is usually called before a redirect (usually auth flow), so when we return to the app page, we can have the same model data
     */
    private maybeSaveAppState() {
        const storage = this;
        try {
            // temp save the current diagram model data to local storage, if possible (preserver prior app state)
            // This will be loaded back in after the auth process (which happens in another window)
            const item: string = storage.makeSaveFile();
            window.localStorage.setItem('gdb-' + storage.clientId, item);
        } catch (e) {
            throw new Error('Local storage not supported; diagrams model data will not be preserved during Dropboc authentication.');
        }
    }

    /**
     * Attempt to load the previous app state from local storage
     * This is usually called after a redirect from another page (usually auth flow),
     * so when we return to the app page, we can have the same model data as before
     */
    private maybeLoadAppState() {
        const storage = this;
        try {
            const fileContents: string = window.localStorage.getItem('gdb-' + storage.clientId);
            storage.loadFromFileContents(fileContents);
            localStorage.removeItem('gdb-' + storage.clientId);
        } catch (e) { }
    }

    /**
     * Sign out the currently signed in Dropbox user
     * Note: Since this redirects the app page, unsaved diagram model data will be lost after calling this
     */
    public signOut() {
        const storage = this;
        const dbx = storage.dropbox;
        // if (!dbx.getAccessToken()) return;
        storage.maybeSaveAppState();
        dbx.setAccessToken(null);
        dbx.authTokenRevoke();
        /*.then(function(response) {
            // the access token for `dbx` has been revoked
            console.log("got authTokenRevoke response:");
            console.log(response);

            // this should fail now:
            dbx.usersGetCurrentAccount()
              .then(function(response) {
                console.log("got usersGetCurrentAccount response:");
                console.log(response);
              })
              .catch(function(error) {
                console.log("got usersGetCurrentAccount error:");
                console.log(error);
              });

        })
        .catch(function(error) {
          console.log("got authTokenRevoke error:");
          console.log(error);
        });*/
        // window.location.href = window.location.href.substring(0, window.location.href.indexOf('#'));
    }

    /*
    No longer used???
    public testAuth() {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        const link: string = 'https://www.dropbox.com/oauth2/authorize';
        xhr.open('GET', link, true);
        xhr.setRequestHeader('response_type', 'code');
        xhr.setRequestHeader('client_id', this.clientId);
        xhr.onload = function () {
            if (xhr.readyState === 4 && (xhr.status === 200)) {
                // tslint:disable-next-line:no-console
                console.log(xhr.response);
            } else {
                throw new Error(xhr.response); // failed to load
            }
        }; // end xhr onload
        xhr.send();
    }*/

    /**
     * Get information about the currently logged in Dropbox user. Some properties of particular note include:
     *   - country
     *   - email
     *   - account_id
     *   - name
     *     - abbreviated_name
     *     - display_name
     *     - given_name
     *     - surname
     * @return {Promise} Returns a Promise that resolves with information about the currently logged in Dropbox user
     */
    public getUserInfo() {
        const storage = this;
        return new Promise(function(resolve, reject) {
            // Case: No access token in URI
            if (!storage.dropbox.getAccessToken() && window.location.hash.indexOf('access_token') === -1) {
                storage.authorize(true);
            } else if (!storage.dropbox.getAccessToken() && window.location.hash.indexOf('access_token') === 1) {
                storage.authorize(false);
            }
            storage.dropbox.usersGetCurrentAccount(null).then(function(userData) {
                resolve(userData);
            }).catch(function(e) {
                // Case: storage.dropbox.access_token has expired or become malformed; get another access token
                if (e.status === 400) {
                    storage.authorize(true);
                }
            });
        });
    }

    public showUI() {
        const storage = this;
        const ui = storage.ui;
        ui.innerHTML = ''; // clear div
        ui.style.visibility = 'visible';

        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "dropBox.png'></img><strong>Save Diagram As</strong><hr></hr>";
        // user input div
        const userInputDiv: HTMLElement = document.createElement('div');
        userInputDiv.id = 'userInputDiv';
        userInputDiv.innerHTML += '<input id="gdb-userInput" placeholder="Enter filename"></input>';
        ui.appendChild(userInputDiv);

        const submitDiv: HTMLElement = document.createElement('div');
        submitDiv.id = 'submitDiv';
        const actionButton = document.createElement('button');
        actionButton.id = 'actionButton';
        actionButton.textContent = 'Save';
        actionButton.onclick = function() {
            const input: HTMLInputElement = (document.getElementById('gdb-userInput')) as HTMLInputElement;
            const val: string = input.value;
            if (val !== '' && val !== undefined && val != null) {
                ui.style.visibility = 'hidden';
                storage.saveWithUI(val);
            }
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);

        const cancelDiv: HTMLElement = document.createElement('div');
        cancelDiv.id = 'cancelDiv';
        const cancelButton = document.createElement('button');
        cancelButton.id = 'cancelButton';
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = function() {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);

        return storage._deferredPromise.promise;
    }

    /**
     * Hide the custom GoDropBox filepicker {@link #ui}; nullify {@link #menuPath}.
     * @param {boolean} isActionCanceled If action (Save, Delete, Load) is cancelled, resolve the Promise returned in {@link #showUI} with a 'Canceled' notification.
     */
    public hideUI(isActionCanceled?: boolean) {
        const storage = this;
        storage.menuPath = '';
        super.hideUI(isActionCanceled);
    }

    /**
     * @private
     * @hidden
     * Process the result of pressing the action (Save, Delete, Load) button on the custom GoDropBox filepicker {@link #ui}.
     * @param {string} action The action that must be done. Acceptable values:
     *   - Save
     *   - Delete
     *   - Load
     */
    public processUIResult(action: string) {
        const storage = this;
        /**
         * Get the selected file (in menu's) Dropbox filepath
         * @return {string} The selected file's Dropbox filepath
         */
        function getSelectedFilepath() {
            const radios = document.getElementsByName('dropBoxFile');
            let selectedFile = null;
            for (let i = 0; i < radios.length; i++) {
                if ((radios[i] as HTMLInputElement).checked) {
                    selectedFile = radios[i].getAttribute('data');
                }
            }
            return selectedFile;
        }

        const filePath: string = getSelectedFilepath();
        switch (action) {
            case 'Save': {
                if (storage.menuPath || storage.menuPath === '') {
                    let name: string = (document.getElementById('userInput') as HTMLInputElement).value;
                    if (name) {
                        if (name.indexOf('.diagram') === -1) name += '.diagram';
                        storage.save(storage.menuPath + '/' + name);
                    } else {
                        // handle bad save name
                        // tslint:disable-next-line:no-console
                        console.log('Proposed file name is not valid'); // placeholder handler
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
    }

    /**
     * Check whether a file exists in user's Dropbox at a given path.
     * @param {string} path A valid Dropbox filepath. Path syntax is `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`.
     * Alternatively, this may be a valid Dropbox file ID.
     * @return {Promise} Returns a Promise that resolves with a boolean stating whether a file exists in user's Dropbox at a given path
     */
    public checkFileExists(path: string) {
        const storage = this;
        if (path.indexOf('.diagram') === -1) path += '.diagram';
        return new Promise(function(resolve: Function, reject: Function) {
            storage.dropbox.filesGetMetadata({ path: path }).then(function(resp) {
                if (resp) resolve(true);
            }).catch(function(err) {
                resolve(false);
            });
        });
    }

    /**
     * Get the Dropbox file reference object at a given path. Properties of particular note include:
     *   - name: The name of the file in DropBox
     *   - id: The DropBox-given file ID
     *   - path_diplay: A lower-case version of the path this file is stored at in DropBox
     *   - .tag: A tag denoting the type of this file. Common values are "file" and "folder".
     *
     * **Note:** The first three elements in the above list are requisite for creating valid {@link DiagramFile}s.
     * @param {string} path A valid Dropbox filepath. Path syntax is `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`.
     * Alternatively, this may be a valid Dropbox file ID.
     * @return {Promise} Returns a Promise that resolves with a Dropbox file reference object at a given path
     */
    public getFile(path: string) {
        const storage = this;
        if (path.indexOf('.diagram') === -1) path += '.diagram';
        return storage.dropbox.filesGetMetadata({ path: path }).then(function(resp) {
            if (resp) return resp;
        }).catch(function(err) {
            return null;
        });
    }

    /**
     * Save the current {@link #managedDiagrams} model data to Dropbox with the filepicker {@link #ui}. Returns a Promise that resolves with a
     * {@link DiagramFile} representing the saved file.
     * @param {string} filename Optional: The name to save data to Dropbox under. If this is not provided, you will be prompted for a filename
     * @return {Promise}
     */
    public saveWithUI(filename?: string) {
        const storage = this;

        if (filename === undefined || filename == null) {
            // let filename: string = prompt("GIMME A NAME");
            // storage.saveWithUI(filename);
            return new Promise(function(resolve, reject) {
                resolve(storage.showUI());
            });
        } else {

            if (filename.length < 8) {
                filename += '.diagram';
            } else {
                const lastEight: string = filename.substring(filename.length - 8, filename.length);
                if (lastEight !== '.diagram') {
                    filename += '.diagram';
                }
            }

            return new Promise(function(resolve, reject) {

                storage._options.success = function(resp) {

                    const a = 3;

                    // find the file that was just saved
                    // look at all files with "filename" in title
                    // find most recent of those
                    const savedFile: any = null;
                    storage.dropbox.filesListFolder({
                        path: '',
                        recursive: true
                    }).then(function(r) {

                        const files = r.entries;
                        const possibleFiles = [];
                        /*for (let i in files) {
                            var file = files[i];

                            //var fname = filename.replace(/.diagram([^_]*)$/,'$1');

                            //console.log(fname);
                            if (file.filename.indexOf(fname) != -1 && file.filename.indexOf(".diagram") != -1) {
                                possibleFiles.push(file);
                            }
                        }*/


                        // find most recently modified (saved)
                        const latestestDate: Date = new Date(-8400000);
                        let latestFile = null;
                        // for (let i in files) {
                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            let dateModified = new Date(file.server_modified);
                            if (dateModified != null && dateModified !== undefined && dateModified instanceof Date) {
                                if (dateModified > latestestDate) {
                                    dateModified = latestestDate;
                                    latestFile = file;
                                }
                            }
                        }

                        // resolve Promises
                        // tslint:disable-next-line:no-shadowed-variable
                        const savedFile: gcs.DiagramFile = { name: latestFile.name, path: latestFile.path_lower, id: latestFile.id };
                        storage.currentDiagramFile = savedFile;
                        resolve(savedFile);

                        storage._deferredPromise.promise.resolve(savedFile);
                        storage._deferredPromise.promise = storage.makeDeferredPromise();
                    });
                };

                function makeTextFile(text) {
                    const data = new Blob([text], { type: 'text/plain' });
                    let uri = '';
                    uri = window.URL.createObjectURL(data);

                    return uri;
                }
                const dataURI = 'data:text/html,' + encodeURIComponent(storage.makeSaveFile());

                const Dropbox = window['Dropbox'];
                Dropbox.save(dataURI, filename, storage._options);

            });
        } // end if filename exists case
    }

    /**
     * Save {@link #managedDiagrams}' model data to Dropbox. If path is supplied save to that path. If no path is supplied but {@link #currentDiagramFile} has non-null,
     * valid properties, update saved diagram file content at the path in Dropbox corresponding to currentDiagramFile.path with current managedDiagrams' model data.
     * If no path is supplied and currentDiagramFile is null or has null properties, this calls {@link #saveWithUI}.
     * @param {string} path A valid Dropbox filepath to save current diagram model to. Path syntax is `/{path-to-file}/{filename}`;
     * i.e. `/Public/example.diagram`.
     * Alternatively, this may be a valid Dropbox file ID.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
     */
    public save(path?: string) {
        const storage = this;
        return new Promise(function(resolve, reject) {
            if (path) { // save as
                storage.dropbox.filesUpload({
                    contents: storage.makeSaveFile(),
                    path: path,
                    autorename: true, // instead of overwriting, save to a different name (i.e. test.diagram -> test(1).diagram)
                    mode: { '.tag': 'add' },
                    mute: false
                }).then(function(resp) {
                    const savedFile: gcs.DiagramFile = { name: resp.name, id: resp.id, path: resp.path_lower };
                    storage.currentDiagramFile = savedFile;

                    resolve(savedFile); // used if saveDiagramAs was called without UI

                    // if saveAs has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
                    storage._deferredPromise.promise.resolve(savedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();

                }).catch(function(e) {
                    // Bad request: Access token is either expired or malformed. Get another one.
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            } else if (storage.currentDiagramFile.path) { // save
                path = storage.currentDiagramFile.path;
                storage.dropbox.filesUpload({
                    contents: storage.makeSaveFile(),
                    path: path,
                    autorename: false,
                    mode: { '.tag': 'overwrite' },
                    mute: true
                }).then(function(resp) {
                    const savedFile: Object = { name: resp.name, id: resp.id, path: resp.path_lower };
                    resolve(savedFile);
                }).catch(function(e) {
                    // Bad request: Access token is either expired or malformed. Get another one.
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            } else {
                resolve(storage.saveWithUI());
                // throw Error("Cannot save file to Dropbox with path " + path);
            }
        });
    }

    /**
     * Load the contents of a saved diagram from Dropbox using the custom filepicker {@link #ui}.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file.
     */
    public loadWithUI() {
        const storage = this;
        storage._options.success = function(r) {
            const file = r[0];
            // get the file path
            storage.dropbox.filesGetMetadata({ path: file.id }).then(function(resp) {
                const path: string = resp.path_display;
                storage.load(path);
            });
        };

        const Dropbox = window['Dropbox'];
        Dropbox.choose(storage._options);
        return storage._deferredPromise.promise; // will not resolve until action (save, load, delete) completes
    }

    /**
     * Load the contents of a saved diagram from Dropbox.
     * @param {string} path A valid Dropbox filepath to load diagram model data from. Path syntax is `/{path-to-file}/{filename}`;
     * i.e. `/Public/example.diagram`.
     * Alternatively, this may be a valid Dropbox file ID.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
     */
    public load(path: string) {
        const storage = this;
        return new Promise(function(resolve, reject) {
            if (path) {
                storage.dropbox.filesGetTemporaryLink({ path: path }).then(function(resp) {
                    const link: string = resp.link;
                    storage.currentDiagramFile.name = resp.metadata.name;
                    storage.currentDiagramFile.id = resp.metadata.id;
                    storage.currentDiagramFile.path = path;
                    const xhr: XMLHttpRequest = new XMLHttpRequest();
                    xhr.open('GET', link, true);
                    xhr.setRequestHeader('Authorization', 'Bearer ' + storage.dropbox.getAccessToken());
                    xhr.onload = function() {
                        if (xhr.readyState === 4 && (xhr.status === 200)) {
                            storage.loadFromFileContents(xhr.response);

                            const loadedFile: gcs.DiagramFile = { name: resp.metadata.name, id: resp.metadata.id, path: resp.metadata.path_lower };
                            resolve(loadedFile); // used if loadDiagram was called without UI

                            // if loadDiagram has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
                            storage._deferredPromise.promise.resolve(loadedFile);
                            storage._deferredPromise.promise = storage.makeDeferredPromise();
                        } else {
                            throw Error('Cannot load file from Dropbox with path ' + path); // failed to load
                        }
                    }; // end xhr onload
                    xhr.send();
                }).catch(function(e) {
                    // Bad request: Access token is either expired or malformed. Get another one.
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            } else throw Error('Cannot load file from Dropbox with path ' + path);
        });
    }

    /**
     * Delete a chosen diagram file from Dropbox using the custom filepicker {@link #ui}.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file.
     */
    public removeWithUI() {
        const storage = this;
        storage._options.success = function(r) {
            const file = r[0];
            // get the file path
            storage.dropbox.filesGetMetadata({ path: file.id }).then(function(resp) {
                const path: string = resp.path_display;
                storage.remove(path);
            });
        };

        const Dropbox = window['Dropbox'];
        Dropbox.choose(storage._options);
        return storage._deferredPromise.promise; // will not resolve until action (save, load, delete) completes
    }

    /**
     * Delete a given diagram file from Dropbox.
     * @param {string} path A valid Dropbox filepath to delete diagram model data from. Path syntax is
     * `/{path-to-file}/{filename}`; i.e. `/Public/example.diagram`.
     * Alternatively, this may be a valid Dropbox file ID.
     * @return {Promise} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file.
     */
    public remove(path: string) {
        const storage = this;
        return new Promise(function(resolve, reject) {
            if (path) {
                storage.dropbox.filesDelete({ path: path }).then(function(resp) {
                    if (storage.currentDiagramFile && storage.currentDiagramFile['id'] === resp['id']) storage.currentDiagramFile = { name: null, path: null, id: null };
                    const deletedFile: gcs.DiagramFile = { name: resp.name, id: resp['id'], path: resp.path_lower };

                    resolve(deletedFile); // used if deleteDiagram was called without UI

                    // if deleteDiagram has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
                    storage._deferredPromise.promise.resolve(deletedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();
                }).catch(function(e) {
                    // Bad request: Access token is either expired or malformed. Get another one.
                    if (e.status === 400) {
                        storage.authorize(true);
                    }
                });
            } else throw Error('Cannot delete file from Dropbox with path ' + path);
        });
    }
}
