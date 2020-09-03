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
import {
    CodeWithDetails,
    CodeWithDetailsFromJSON,
    CodeWithDetailsFromJSONTyped,
    CodeWithDetailsToJSON,
} from './';

/**
 * object returned in error cases
 * @export
 * @interface ErrorInfo
 */
export interface ErrorInfo {
    /**
     * http status code
     * @type {number}
     * @memberof ErrorInfo
     */
    status: number;
    /**
     * 
     * @type {CodeWithDetails}
     * @memberof ErrorInfo
     */
    error?: CodeWithDetails;
    /**
     * warnings that could be ignored
     * @type {Array<CodeWithDetails>}
     * @memberof ErrorInfo
     */
    warnings?: Array<CodeWithDetails>;
}

export function ErrorInfoFromJSON(json: any): ErrorInfo {
    return ErrorInfoFromJSONTyped(json, false);
}

export function ErrorInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
        'error': !exists(json, 'error') ? undefined : CodeWithDetailsFromJSON(json['error']),
        'warnings': !exists(json, 'warnings') ? undefined : ((json['warnings'] as Array<any>).map(CodeWithDetailsFromJSON)),
    };
}

export function ErrorInfoToJSON(value?: ErrorInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'error': CodeWithDetailsToJSON(value.error),
        'warnings': value.warnings === undefined ? undefined : ((value.warnings as Array<any>).map(CodeWithDetailsToJSON)),
    };
}


