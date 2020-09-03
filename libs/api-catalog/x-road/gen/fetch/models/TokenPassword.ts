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
 * @interface TokenPassword
 */
export interface TokenPassword {
    /**
     * password for logging in to the token
     * @type {string}
     * @memberof TokenPassword
     */
    password?: string;
}

export function TokenPasswordFromJSON(json: any): TokenPassword {
    return TokenPasswordFromJSONTyped(json, false);
}

export function TokenPasswordFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenPassword {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'password': !exists(json, 'password') ? undefined : json['password'],
    };
}

export function TokenPasswordToJSON(value?: TokenPassword | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'password': value.password,
    };
}


