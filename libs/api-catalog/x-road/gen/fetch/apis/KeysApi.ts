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


import * as runtime from '../runtime';
import {
    CsrFormat,
    CsrFormatFromJSON,
    CsrFormatToJSON,
    CsrGenerate,
    CsrGenerateFromJSON,
    CsrGenerateToJSON,
    Key,
    KeyFromJSON,
    KeyToJSON,
    KeyName,
    KeyNameFromJSON,
    KeyNameToJSON,
    PossibleAction,
    PossibleActionFromJSON,
    PossibleActionToJSON,
} from '../models';

export interface DeleteCsrRequest {
    id: string;
    csrId: string;
}

export interface DeleteKeyRequest {
    id: string;
    ignoreWarnings?: boolean;
}

export interface DownloadCsrRequest {
    id: string;
    csrId: string;
    csrFormat?: CsrFormat;
}

export interface GenerateCsrRequest {
    id: string;
    csrGenerate?: CsrGenerate;
}

export interface GetKeyRequest {
    id: string;
}

export interface GetPossibleActionsForCsrRequest {
    id: string;
    csrId: string;
}

export interface GetPossibleActionsForKeyRequest {
    id: string;
}

export interface UpdateKeyRequest {
    id: string;
    keyName?: KeyName;
}

/**
 * 
 */
export class KeysApi extends runtime.BaseAPI {

    /**
     * Administrator deletes csr from the key.
     * delete csr from the selected key
     */
    async deleteCsrRaw(requestParameters: DeleteCsrRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteCsr.');
        }

        if (requestParameters.csrId === null || requestParameters.csrId === undefined) {
            throw new runtime.RequiredError('csrId','Required parameter requestParameters.csrId was null or undefined when calling deleteCsr.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}/csrs/{csr_id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"csr_id"}}`, encodeURIComponent(String(requestParameters.csrId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Administrator deletes csr from the key.
     * delete csr from the selected key
     */
    async deleteCsr(requestParameters: DeleteCsrRequest): Promise<void> {
        await this.deleteCsrRaw(requestParameters);
    }

    /**
     * Administrator deletes the key. Note that with this endpoint it\'s possible to delete an authentication key with a registered authentication certificate. Attempt to delete an authentication key with a registered authentication certificate and with ignore_warnings = false causes the operation to fail with a warning in response\'s ErrorInfo object. Attempt to delete an authentication key with a registered authentication certificate and with ignore_warnings = true succeeds. The authentication certificate is first unregistered, and the key and certificate are deleted after that. 
     * delete key
     */
    async deleteKeyRaw(requestParameters: DeleteKeyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteKey.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.ignoreWarnings !== undefined) {
            queryParameters['ignore_warnings'] = requestParameters.ignoreWarnings;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Administrator deletes the key. Note that with this endpoint it\'s possible to delete an authentication key with a registered authentication certificate. Attempt to delete an authentication key with a registered authentication certificate and with ignore_warnings = false causes the operation to fail with a warning in response\'s ErrorInfo object. Attempt to delete an authentication key with a registered authentication certificate and with ignore_warnings = true succeeds. The authentication certificate is first unregistered, and the key and certificate are deleted after that. 
     * delete key
     */
    async deleteKey(requestParameters: DeleteKeyRequest): Promise<void> {
        await this.deleteKeyRaw(requestParameters);
    }

    /**
     * Administrator downloads a csr that has been created earlier
     * download a CSR binary
     */
    async downloadCsrRaw(requestParameters: DownloadCsrRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling downloadCsr.');
        }

        if (requestParameters.csrId === null || requestParameters.csrId === undefined) {
            throw new runtime.RequiredError('csrId','Required parameter requestParameters.csrId was null or undefined when calling downloadCsr.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.csrFormat !== undefined) {
            queryParameters['csr_format'] = requestParameters.csrFormat;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}/csrs/{csr_id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"csr_id"}}`, encodeURIComponent(String(requestParameters.csrId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Administrator downloads a csr that has been created earlier
     * download a CSR binary
     */
    async downloadCsr(requestParameters: DownloadCsrRequest): Promise<Blob> {
        const response = await this.downloadCsrRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator generates csr for the key.
     * generate csr for the selected key
     */
    async generateCsrRaw(requestParameters: GenerateCsrRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling generateCsr.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}/csrs`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CsrGenerateToJSON(requestParameters.csrGenerate),
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Administrator generates csr for the key.
     * generate csr for the selected key
     */
    async generateCsr(requestParameters: GenerateCsrRequest): Promise<Blob> {
        const response = await this.generateCsrRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator views key details.
     * get information for the selected key in selected token
     */
    async getKeyRaw(requestParameters: GetKeyRequest): Promise<runtime.ApiResponse<Key>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getKey.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => KeyFromJSON(jsonValue));
    }

    /**
     * Administrator views key details.
     * get information for the selected key in selected token
     */
    async getKey(requestParameters: GetKeyRequest): Promise<Key> {
        const response = await this.getKeyRaw(requestParameters);
        return await response.value();
    }

    /**
     * UI needs to know which actions can be done on one csr
     * get possible actions for one csr
     */
    async getPossibleActionsForCsrRaw(requestParameters: GetPossibleActionsForCsrRequest): Promise<runtime.ApiResponse<Array<PossibleAction>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPossibleActionsForCsr.');
        }

        if (requestParameters.csrId === null || requestParameters.csrId === undefined) {
            throw new runtime.RequiredError('csrId','Required parameter requestParameters.csrId was null or undefined when calling getPossibleActionsForCsr.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}/csrs/{csr_id}/possible-actions`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"csr_id"}}`, encodeURIComponent(String(requestParameters.csrId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PossibleActionFromJSON));
    }

    /**
     * UI needs to know which actions can be done on one csr
     * get possible actions for one csr
     */
    async getPossibleActionsForCsr(requestParameters: GetPossibleActionsForCsrRequest): Promise<Array<PossibleAction>> {
        const response = await this.getPossibleActionsForCsrRaw(requestParameters);
        return await response.value();
    }

    /**
     * UI needs to know which actions can be done on one key
     * get possible actions for one key
     */
    async getPossibleActionsForKeyRaw(requestParameters: GetPossibleActionsForKeyRequest): Promise<runtime.ApiResponse<Array<PossibleAction>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPossibleActionsForKey.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}/possible-actions`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PossibleActionFromJSON));
    }

    /**
     * UI needs to know which actions can be done on one key
     * get possible actions for one key
     */
    async getPossibleActionsForKey(requestParameters: GetPossibleActionsForKeyRequest): Promise<Array<PossibleAction>> {
        const response = await this.getPossibleActionsForKeyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator updates the key information.
     * update key information
     */
    async updateKeyRaw(requestParameters: UpdateKeyRequest): Promise<runtime.ApiResponse<Key>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateKey.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/keys/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: KeyNameToJSON(requestParameters.keyName),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => KeyFromJSON(jsonValue));
    }

    /**
     * Administrator updates the key information.
     * update key information
     */
    async updateKey(requestParameters: UpdateKeyRequest): Promise<Key> {
        const response = await this.updateKeyRaw(requestParameters);
        return await response.value();
    }

}
