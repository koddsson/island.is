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
 * an action to change state or edit token, key, cert or csr
 * @export
 * @enum {string}
 */
export enum PossibleAction {
    DELETE = 'DELETE',
    ACTIVATE = 'ACTIVATE',
    DISABLE = 'DISABLE',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
    UNREGISTER = 'UNREGISTER',
    IMPORTFROMTOKEN = 'IMPORT_FROM_TOKEN',
    GENERATEKEY = 'GENERATE_KEY',
    EDITFRIENDLYNAME = 'EDIT_FRIENDLY_NAME',
    GENERATEAUTHCSR = 'GENERATE_AUTH_CSR',
    GENERATESIGNCSR = 'GENERATE_SIGN_CSR'
}

export function PossibleActionFromJSON(json: any): PossibleAction {
    return PossibleActionFromJSONTyped(json, false);
}

export function PossibleActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): PossibleAction {
    return json as PossibleAction;
}

export function PossibleActionToJSON(value?: PossibleAction | null): any {
    return value as any;
}

