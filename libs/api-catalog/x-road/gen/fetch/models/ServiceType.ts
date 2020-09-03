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

/**
 * service type
 * @export
 * @enum {string}
 */
export enum ServiceType {
    WSDL = 'WSDL',
    REST = 'REST',
    OPENAPI3 = 'OPENAPI3'
}

export function ServiceTypeFromJSON(json: any): ServiceType {
    return ServiceTypeFromJSONTyped(json, false);
}

export function ServiceTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceType {
    return json as ServiceType;
}

export function ServiceTypeToJSON(value?: ServiceType | null): any {
    return value as any;
}

