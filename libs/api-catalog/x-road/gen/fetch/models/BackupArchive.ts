/* tslint:disable */
/* eslint-disable */
/**
 * X-Road Security Server Admin API
 * X-Road Security Server Admin API
 *
 * The version of the OpenAPI document: 1.0.28
 * Contact: info@niis.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * security server backup archive file
 * @export
 * @interface BackupArchive
 */
export interface BackupArchive {
    /**
     * 
     * @type {Blob}
     * @memberof BackupArchive
     */
    file?: Blob;
}

export function BackupArchiveFromJSON(json: any): BackupArchive {
    return BackupArchiveFromJSONTyped(json, false);
}

export function BackupArchiveFromJSONTyped(json: any, ignoreDiscriminator: boolean): BackupArchive {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'file': !exists(json, 'file') ? undefined : json['file'],
    };
}

export function BackupArchiveToJSON(value?: BackupArchive | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'file': value.file,
    };
}


