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
 * Object for updating endpoints method and/or path
 * @export
 * @interface EndpointUpdate
 */
export interface EndpointUpdate {
    /**
     * http method mapped to this endpoint
     * @type {string}
     * @memberof EndpointUpdate
     */
    method?: EndpointUpdateMethodEnum;
    /**
     * relative path where this endpoint is mapped to
     * @type {string}
     * @memberof EndpointUpdate
     */
    path?: string;
}

export function EndpointUpdateFromJSON(json: any): EndpointUpdate {
    return EndpointUpdateFromJSONTyped(json, false);
}

export function EndpointUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): EndpointUpdate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'method': !exists(json, 'method') ? undefined : json['method'],
        'path': !exists(json, 'path') ? undefined : json['path'],
    };
}

export function EndpointUpdateToJSON(value?: EndpointUpdate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'method': value.method,
        'path': value.path,
    };
}

/**
* @export
* @enum {string}
*/
export enum EndpointUpdateMethodEnum {
    Star = '*',
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE'
}


