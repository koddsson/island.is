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
 * member's name
 * @export
 * @interface MemberName
 */
export interface MemberName {
    /**
     * 
     * @type {string}
     * @memberof MemberName
     */
    memberName?: string;
}

export function MemberNameFromJSON(json: any): MemberName {
    return MemberNameFromJSONTyped(json, false);
}

export function MemberNameFromJSONTyped(json: any, ignoreDiscriminator: boolean): MemberName {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'memberName': !exists(json, 'member_name') ? undefined : json['member_name'],
    };
}

export function MemberNameToJSON(value?: MemberName | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'member_name': value.memberName,
    };
}


