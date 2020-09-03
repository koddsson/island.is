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
    DiagnosticStatusClass,
    DiagnosticStatusClassFromJSON,
    DiagnosticStatusClassFromJSONTyped,
    DiagnosticStatusClassToJSON,
    OcspStatus,
    OcspStatusFromJSON,
    OcspStatusFromJSONTyped,
    OcspStatusToJSON,
} from './';

/**
 * OCSP responder diagnostics
 * @export
 * @interface OcspResponder
 */
export interface OcspResponder {
    /**
     * url of the OCSP responder
     * @type {string}
     * @memberof OcspResponder
     */
    readonly url: string;
    /**
     * 
     * @type {DiagnosticStatusClass}
     * @memberof OcspResponder
     */
    readonly statusClass: DiagnosticStatusClass;
    /**
     * 
     * @type {OcspStatus}
     * @memberof OcspResponder
     */
    readonly statusCode: OcspStatus;
    /**
     * last time updated
     * @type {Date}
     * @memberof OcspResponder
     */
    readonly prevUpdateAt?: Date;
    /**
     * next time updated
     * @type {Date}
     * @memberof OcspResponder
     */
    readonly nextUpdateAt: Date;
}

export function OcspResponderFromJSON(json: any): OcspResponder {
    return OcspResponderFromJSONTyped(json, false);
}

export function OcspResponderFromJSONTyped(json: any, ignoreDiscriminator: boolean): OcspResponder {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
        'statusClass': DiagnosticStatusClassFromJSON(json['status_class']),
        'statusCode': OcspStatusFromJSON(json['status_code']),
        'prevUpdateAt': !exists(json, 'prev_update_at') ? undefined : (new Date(json['prev_update_at'])),
        'nextUpdateAt': (new Date(json['next_update_at'])),
    };
}

export function OcspResponderToJSON(value?: OcspResponder | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}


