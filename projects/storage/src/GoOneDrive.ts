/*
* Copyright (C) 1998-2020 by Northwoods Software Corporation
* All Rights Reserved.
*
* Go One Drive
*/

// import { Promise } from 'es6-promise';
import * as go from 'gojs';
import * as gcs from './GoCloudStorage.js';

/**
 * Class for saving / loading GoJS {@link Diagram#model}s to / from Microsoft One Drive.
 * As with all {@link GoCloudStorage} subclasses (with the exception of {@link GoLocalStorage}, any page using GoDropBox must be served on a web server.
 *
 * **Note**: Makes use of <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive FilePicker for JavaScript v7.2</a>. Any page
 * using GoOneDrive must include a script tag with src set to https://js.live.net/v7.2/OneDrive.js.
 * @category Storage
 */
export class GoOneDrive extends gcs.GoCloudStorage {

    private _oneDriveFilepicker: any;
    private _oauthToken: string;

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
    constructor(managedDiagrams: go.Diagram | Array<go.Diagram>, clientId: string, defaultModel?: string, iconsRelativeDirectory?: string) {
        super(managedDiagrams, defaultModel, clientId, iconsRelativeDirectory);
        this._oauthToken = null;
        this.ui.id = 'goOneDriveSavePrompt';
        if (window['OneDrive']) {
            this._oneDriveFilepicker = window['OneDrive'];
        }
        this.authorize(false); // // on construction, check if there is an access_token in the window URI (there will be if redirected from a permissions grant page)
        this._serviceName = 'Microsoft OneDrive';
        this._className = 'GoOneDrive';
    }

    /**
     * Get / set the global oauthToken. Only used to authorize requests in {@link #load}, {@link #save}, and {@link #remove}
     * when the {@link #oneDriveFilepicker} property is not used. Not needed when the oneDriveFilePicker is used, as action-specific tokens (issued by the Microsoft-provided
     * <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a>) are issued then. oauthToken is null after construction,
     * but can be set or refreshed with calls to {@link #authorize}.
     */
    get oauthToken(): string { return this._oauthToken; }
    set oauthToken(value: string) { this._oauthToken = value; }

    /**
     * Get <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a> object. Used to display a Microsoft user's OneDrive files.
     */
    get oneDriveFilepicker(): any { return this._oneDriveFilepicker; }

    /**
     * Get OAuth 2.0 token for Microsoft OneDrive API requests with a specific Microsoft account. Sets {@link #oauthToken}.
     * @param {boolean} refreshToken Whether to get a new access token (triggers a page redirect) (true) or try to find / use the one in the browser
     * window URI (no redirect) (false)
     * @return {Promise<boolean>} Returns a Promise that resolves with a boolean stating whether authorization was succesful (true) or failed (false).
     */
    public authorize(refreshToken?: boolean): Promise<boolean> {
        const storage = this;
        return new Promise(function(resolve: Function, reject: Function) {
            if (!refreshToken && window.location.hash.indexOf('access_token') !== -1) {
                const accessToken: string = window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.indexOf('&'));
                storage.oauthToken = accessToken;
                resolve(true);
            } else if (refreshToken) {
                const authUrl: string = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' + storage.clientId +
                    '&scope=files.readwrite.all&response_type=token&redirect_uri=' + window.location.href + '';
                window.location.href = authUrl;
                resolve(true);
            }
        });
    }

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
    public getUserInfo(): Promise<any> {
        const storage = this;
        return new Promise(function(resolve: Function, reject: Function) {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            if (!storage.oauthToken) {
                if (window.location.hash.indexOf('access_token') === -1) {
                    reject('No acessToken in current uri');
                    storage.authorize(true);
                } else {
                    reject('oauthToken not set');
                    storage.authorize(false);
                }
            } else {
                xhr.open('GET', 'https://graph.microsoft.com/v1.0/me');
                xhr.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else if (xhr.status === 401) { // unauthorized request (expired token)
                        storage.authorize(true);
                        reject(xhr.response);
                    }
                };
                xhr.send();
            }
        });

    }

    /**
     * Check whether a file exists at a given path.
     * @param {string} path A valid MS OneDrive filepath to save current diagram model to
     *   Path must be of the form: `/drive/root:/{item-path}`
     * @return {Promise<any>} Returns a Promise that resolves with a boolean stating whether a file exists at a given path
     */
    public checkFileExists(path: string): Promise<any> {
        const storage = this;
        if (path.indexOf('.diagram') === -1) path += '.diagram';

        return new Promise(function(resolve: Function, reject: Function) {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', 'https://graph.microsoft.com/v1.0' + path, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
            xhr.onreadystatechange = function() {
                let bool; let err;
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        bool = true;
                    } else if (xhr.status === 401) {
                        storage.authorize(true);
                    } else if (xhr.status === 404) {
                        bool = false;
                    } else {
                        err = xhr.response;
                    }
                    resolve(bool);
                    if (err) reject(err);
                }
            };
            xhr.send();
        });
    }

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
    public getFile(path: string, token?: string): Promise<any> {
        const storage = this;
        if (path.indexOf('.diagram') === -1) path += '.diagram';
        return new Promise(function(resolve: Function, reject: Function) {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', 'https://graph.microsoft.com/v1.0' + path, true);
            const t: string = (token) ? token : storage.oauthToken;
            xhr.setRequestHeader('Authorization', 'Bearer ' + t);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {  // 200=OK
                        const file: Object = JSON.parse(xhr.response);
                        resolve(file);
                    } else if (xhr.status === 401) { // unauthorized request
                        storage.authorize(true);
                    } else {
                        reject(xhr.response);
                    }
                }
            }; // end filexhr
            xhr.send();
        });
    }

    /**
     * Show the custom GoOneDrive save prompt {@link #ui}.
     * @return {Promise<any>} Returns a Promise that resolves (in {@link #save}, {@link #load}, or {@link #remove}) with a {@link DiagramFile}
     * representing the saved/loaded/deleted file
     */
    public showUI(): Promise<any> {
        const storage = this;
        const ui = storage.ui;
        ui.innerHTML = ''; // clear div
        ui.style.visibility = 'visible';
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "oneDrive.png'></img><strong>Save Diagram As</strong><hr></hr>";

        // user input div
        const userInputDiv: HTMLElement = document.createElement('div');
        userInputDiv.id = 'userInputDiv';
        userInputDiv.innerHTML += '<input id="userInput" placeholder="Enter filename"></input>';
        ui.appendChild(userInputDiv);

        const submitDiv: HTMLElement = document.createElement('div');
        submitDiv.id = 'submitDiv';
        const actionButton = document.createElement('button');
        actionButton.id = 'actionButton';
        actionButton.textContent = 'Save';
        actionButton.onclick = function() {
            storage.saveWithUI();
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
     * Save the each {@link #managedDiagrams}' model data to a user's One Drive account, using
     * <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">One Drive FilePicker</a>.
     * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
     */
    public saveWithUI(): Promise<any> {
        const storage = this;
        const ui = storage.ui;
        return new Promise(function(resolve, reject) {
            if (ui.style.visibility === 'hidden') {
                resolve(storage.showUI());
            } else {
                let saveName = (document.getElementById('userInput') as HTMLInputElement).value;
                if (saveName && saveName.indexOf('.diagram') === -1) saveName += '.diagram';
                const odOptions: Object = {
                    clientId: storage.clientId,
                    action: 'query',
                    openInNewWindow: true,
                    success: function(selection) {
                        const folder: Object = selection.value[0];
                        const token: string = selection.accessToken;

                        storage.currentDiagramFile = {
                            id: null,
                            name: saveName,
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
                if (saveName && saveName !== '' && saveName !== undefined) storage.oneDriveFilepicker.save(odOptions);
                else reject('Cannot save file to OneDrive with save name ' + saveName);
            }
        });
    }

    /**
     * Save {@link #managedDiagrams}' model data to Microsoft OneDrive. If path is supplied save to that path. If no path is supplied but {@link #currentDiagramFile} has non-null,
     * valid properties, update saved diagram file content at the path in OneDrive corresponding to currentDiagramFile.path with current managedDiagrams' model data.
     * @param {string} path A valid MS OneDrive filepath to save current diagram model to. Path syntax is
     * `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
     * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the saved file.
     */
    public save(path?: string): Promise<any> {
        const storage = this;
        return new Promise(function(resolve: Function, reject: Function) {
            if (path) { // save as
                const xhr: XMLHttpRequest = new XMLHttpRequest();
                if (path.indexOf('.diagram') === -1) path += '.diagram';
                const bodyContent: string = storage.makeSaveFile();
                xhr.open('PUT', 'https://graph.microsoft.com/v1.0' + path + ':/content', true);
                xhr.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            const file: Object = JSON.parse(xhr.response);
                            const savedFile: gcs.DiagramFile = {
                                name: file['name'], id: file['id'],
                                path: file['parentReference']['path'] + '/' + file['name'], parentReference: file['parentReference']
                            };
                            resolve(savedFile);
                        } else if (xhr.status === 401) { // unauthorized request
                            storage.authorize(true);
                        } else {
                            throw Error(xhr.response);
                        }
                    }
                };
                xhr.send(bodyContent);
            } else if (storage.currentDiagramFile.path) { // save
                const token: string = storage.currentDiagramFile.token;
                const url: string = storage.generateGraphUrl(storage.currentDiagramFile, true, true);
                const bodyContent: string = storage.makeSaveFile();

                const t: string = (!token) ? storage.oauthToken : storage.currentDiagramFile.token;
                const xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('Authorization', 'Bearer ' + t);
                xhr.onload = function() {
                    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
                        const file: Object = JSON.parse(xhr.response);
                        const savedFile: gcs.DiagramFile = {
                            name: file['name'], id: file['id'],
                            path: file['parentReference']['path'] + '/' + file['name'], token: token, parentReference: file['parentReference']
                        };
                        storage.currentDiagramFile = savedFile;
                        resolve(savedFile); // used if saveDiagram was called without UI

                        // if save has been called in processUIResult, need to resolve / reset the Deferred Promise instance variable
                        storage._deferredPromise.promise.resolve(savedFile);
                        storage._deferredPromise.promise = storage.makeDeferredPromise();
                    } else {
                        reject(xhr.response); // failed save
                    }
                }; // end xhr onload
                xhr.send(bodyContent);
            } else {
                resolve(storage.saveWithUI());
            }
        });
    }

    /**
     * Load diagram model data from a given OneDrive-specific file path into {@link #managedDiagrams} using the MS OneDrive filepicker.
     * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
     */
    public loadWithUI(): Promise<any> {
        const storage = this;
        return new Promise(function(resolve: Function, reject: Function) {
            const odOptions: Object = {
                clientId: storage.clientId,
                action: 'share',
                multiSelect: false,
                advanced: {
                    filter: '.diagram' // only show diagram files
                },
                success: function(files: Object) {
                    const file: Object = files['value'][0];
                    const token: string = files['accessToken'];
                    const filePath = file['parentReference']['path'] + '/' + file['name'];
                    resolve(storage.load(filePath, token));
                }
            };
            storage.oneDriveFilepicker.open(odOptions);
        });
    }

    /**
     * Load the contents of a saved diagram from MS OneDrive to diagram model.
     * @param {string} path A valid Microsoft OneDrive filepath to load diagram model data from. Path syntax is
     * `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
     * @param {string} token A token received by <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a>
     * (passed from {@link #loadWithUI}) to allow for its file to be loaded. If no token is given, use global {@link #oauthToken}
     * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the loaded file
     */
    public load(path: string, token?: string): Promise<any> {
        const storage = this;
        return new Promise(function(resolve: Function, reject: Function) {
            if (path) {
                const t: string = (token) ? token : storage.oauthToken;
                storage.getFile(path, t).then(function(file: Object) {
                    const downloadLink: string = file['@microsoft.graph.downloadUrl'];
                    // Download file from download link
                    const downloadxhr: XMLHttpRequest = new XMLHttpRequest();
                    downloadxhr.open('GET', downloadLink, true);
                    downloadxhr.onreadystatechange = function() {
                        if (downloadxhr.readyState === 4) {
                            if (downloadxhr.status === 200) {
                                storage.loadFromFileContents(downloadxhr.response);
                                const loadedFile: gcs.DiagramFile = {
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
            } else reject('Cannot load file from OneDrive with path ' + path);
        });
    }

    /**
     * Delete a diagram from a user's OneDrive using the <a href="https://dev.onedrive.com/sdk/js-v72/js-picker-overview.htm">OneDrive Filepicker</a>.
     * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
     */
    public removeWithUI(): Promise<any> {
        const storage = this;
        return new Promise(function(resolve: Function, reject: Function) {
            const odOptions = {
                clientId: storage.clientId,
                action: 'share',
                openInNewWindow: true,
                success: function(files: Object) {
                    if (files) {
                        const file: Object = files['value'][0];
                        const token: string = files['accessToken'];
                        const filePath: string = file['parentReference']['path'] + '/' + file['name'];
                        resolve(new Promise(function(res: Function, rej: Function) {
                            res(storage.remove(filePath, token));
                        }));
                    }
                }
            };
            storage.oneDriveFilepicker.open(odOptions);
        });
    }

    /**
     * Delete a diagram from a user's OneDrive at a given path.
     * @param {string} path A valid Microsoft OneDrive filepath to delete. Path syntax is
     * `/drive/root:/{path-to-file}/{filename}`; i.e. `/drive/root:/Documents/example.diagram`
     * @param {string} token A token received by OneDrive filepicker (passed from {@link #removeWithUI}) to allow for
     * its file to be deleted. If no token is given, use global {@link #oauthToken}
     * @return {Promise<any>} Returns a Promise that resolves with a {@link DiagramFile} representing the deleted file
     */
    public remove(path: string, token?: string): Promise<any> {
        const storage = this;
        const t: string = (token) ? token : storage.oauthToken;
        return new Promise(function(resolve: Function, reject: Function) {
            storage.getFile(path, t).then(function(file: Object) {
                const deletedFile: gcs.DiagramFile = { name: file['name'], id: file['id'], path: file['parentReference']['path'] + '/' + file['name'] };
                const xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.open('DELETE', 'https://graph.microsoft.com/v1.0' + path, true);
                xhr.setRequestHeader('Authorization', 'Bearer' + t);
                xhr.onload = function() {
                    if (xhr.readyState === 4 && xhr.status === 204) {
                        if (storage.currentDiagramFile && path === storage.currentDiagramFile.path) storage.currentDiagramFile = { id: null, path: null, name: null };
                        resolve(deletedFile);
                    } else if (xhr.status === 401) { // unauthorized request
                        storage.authorize(true);
                    } else {
                        reject(xhr.response);
                    }
                };
                xhr.send();
            }).catch(function(err: string) {
                throw Error(err);
            });
        });
    }

    /**
     * Generate and return a Microsoft Graph URL for a target item
     * @param {Object} driveItem The item to generate the URL for
     * @param {Boolean} targetParentFolder Indicates whether to target the parent folder + filename instead of the item itself
     * @param {Boolean} itemRelativeApiPath Indicates whether to append /content to the item URL
     * @return {string} Returns a Microsoft Graph URL for a target item
     */
    public generateGraphUrl(driveItem: Object, targetParentFolder: boolean, itemRelativeApiPath: boolean) {
        let url: string = 'https://graph.microsoft.com/v1.0/';
        if (targetParentFolder) url += 'drives/' + driveItem['parentReference']['driveId'] + '/items/' + driveItem['parentReference']['id'] + '/children/' + driveItem['name'];
        else url += 'drives/' + driveItem['parentReference']['driveId'] + '/items/' + driveItem['id'];

        if (itemRelativeApiPath) url += '/content';
        return url;
    }

}
