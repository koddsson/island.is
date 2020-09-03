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
 * security server backup
 * @export
 * @interface Backup
 */
export interface Backup {
    /**
     * backup filename
     * @type {string}
     * @memberof Backup
     */
    filename: string;
    /**
     * backup created at
     * @type {Date}
     * @memberof Backup
     */
    createdAt: Date;
}

export function BackupFromJSON(json: any): Backup {
    return BackupFromJSONTyped(json, false);
}

export function BackupFromJSONTyped(json: any, ignoreDiscriminator: boolean): Backup {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'filename': json['filename'],
        'createdAt': (new Date(json['created_at'])),
    };
}

export function BackupToJSON(value?: Backup | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'filename': value.filename,
        'created_at': (value.createdAt.toISOString()),
    };
}


