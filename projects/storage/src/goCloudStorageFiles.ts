import * as GoCloudStorage from './GoCloudStorage';
import * as GoDropBox from './GoDropBox';
import * as GoGoogleDrive from './GoGoogleDrive';
import * as GoLocalStorage from './GoLocalStorage';
import * as GoNetCore from './GoNetCore';
import * as GoOneDrive from './GoOneDrive';

module.exports = {
    GoLocalStorage: require('./GoLocalStorage').GoLocalStorage,
    GoDropBox: require('./GoDropBox').GoDropBox,
    GoGoogleDrive: require('./GoGoogleDrive').GoGoogleDrive,
    GoOneDrive: require('./GoOneDrive').GoOneDrive,
    GoNetCore: require('./GoNetCore').GoNetCore,
    GoCloudStorageManager: require('./GoCloudStorageManager').GoCloudStorageManager
};
