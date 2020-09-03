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
 * 
 * @export
 * @interface IgnoreWarnings
 */
export interface IgnoreWarnings {
    /**
     * if true, any ignorable warnings are ignored. if false (or missing), any warnings cause request to fail
     * @type {boolean}
     * @memberof IgnoreWarnings
     */
    ignoreWarnings?: boolean;
}

export function IgnoreWarningsFromJSON(json: any): IgnoreWarnings {
    return IgnoreWarningsFromJSONTyped(json, false);
}

export function IgnoreWarningsFromJSONTyped(json: any, ignoreDiscriminator: boolean): IgnoreWarnings {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ignoreWarnings': !exists(json, 'ignore_warnings') ? undefined : json['ignore_warnings'],
    };
}

export function IgnoreWarningsToJSON(value?: IgnoreWarnings | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ignore_warnings': value.ignoreWarnings,
    };
}


