/*
 * Copyright (C) 1998-2020 by Northwoods Software Corporation
 * All Rights Reserved.
*/

import * as GoCloudStorage from './GoCloudStorage.js';
import * as GoDropBox from './GoDropBox.js';
import * as GoGoogleDrive from './GoGoogleDrive.js';
import * as GoLocalStorage from './GoLocalStorage.js';
import * as GoNetCore from './GoNetCore.js';
import * as GoOneDrive from './GoOneDrive.js';

module.exports = {
    GoLocalStorage: require('./GoLocalStorage').GoLocalStorage,
    GoDropBox: require('./GoDropBox').GoDropBox,
    GoGoogleDrive: require('./GoGoogleDrive').GoGoogleDrive,
    GoOneDrive: require('./GoOneDrive').GoOneDrive,
    GoNetCore: require('./GoNetCore').GoNetCore,
    GoCloudStorageManager: require('./GoCloudStorageManager').GoCloudStorageManager
};
