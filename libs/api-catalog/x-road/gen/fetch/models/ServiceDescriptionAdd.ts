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
    ServiceType,
    ServiceTypeFromJSON,
    ServiceTypeFromJSONTyped,
    ServiceTypeToJSON,
} from './';

/**
 * request object containing service description url, service code and type
 * @export
 * @interface ServiceDescriptionAdd
 */
export interface ServiceDescriptionAdd {
    /**
     * path for the service description file
     * @type {string}
     * @memberof ServiceDescriptionAdd
     */
    url: string;
    /**
     * service code for REST service
     * @type {string}
     * @memberof ServiceDescriptionAdd
     */
    restServiceCode?: string;
    /**
     * if true, any ignorable warnings are ignored. if false (or missing), any warnings cause request to fail
     * @type {boolean}
     * @memberof ServiceDescriptionAdd
     */
    ignoreWarnings?: boolean;
    /**
     * 
     * @type {ServiceType}
     * @memberof ServiceDescriptionAdd
     */
    type: ServiceType;
}

export function ServiceDescriptionAddFromJSON(json: any): ServiceDescriptionAdd {
    return ServiceDescriptionAddFromJSONTyped(json, false);
}

export function ServiceDescriptionAddFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceDescriptionAdd {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
        'restServiceCode': !exists(json, 'rest_service_code') ? undefined : json['rest_service_code'],
        'ignoreWarnings': !exists(json, 'ignore_warnings') ? undefined : json['ignore_warnings'],
        'type': ServiceTypeFromJSON(json['type']),
    };
}

export function ServiceDescriptionAddToJSON(value?: ServiceDescriptionAdd | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'url': value.url,
        'rest_service_code': value.restServiceCode,
        'ignore_warnings': value.ignoreWarnings,
        'type': ServiceTypeToJSON(value.type),
    };
}


