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
    Backup,
    BackupFromJSON,
    BackupToJSON,
    TokensLoggedOut,
    TokensLoggedOutFromJSON,
    TokensLoggedOutToJSON,
} from '../models';

export interface DeleteBackupRequest {
    filename: string;
}

export interface DownloadBackupRequest {
    filename: string;
}

export interface RestoreBackupRequest {
    filename: string;
}

export interface UploadBackupRequest {
    ignoreWarnings?: boolean;
    file?: Blob;
}

/**
 * 
 */
export class BackupsApi extends runtime.BaseAPI {

    /**
     * Adds security server backup to the system
     * add new backup for the security server
     */
    async addBackupRaw(): Promise<runtime.ApiResponse<Backup>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/backups`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BackupFromJSON(jsonValue));
    }

    /**
     * Adds security server backup to the system
     * add new backup for the security server
     */
    async addBackup(): Promise<Backup> {
        const response = await this.addBackupRaw();
        return await response.value();
    }

    /**
     * Administrator deletes the backup of the security server.
     * delete security server backup
     */
    async deleteBackupRaw(requestParameters: DeleteBackupRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.filename === null || requestParameters.filename === undefined) {
            throw new runtime.RequiredError('filename','Required parameter requestParameters.filename was null or undefined when calling deleteBackup.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/backups/{filename}`.replace(`{${"filename"}}`, encodeURIComponent(String(requestParameters.filename))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Administrator deletes the backup of the security server.
     * delete security server backup
     */
    async deleteBackup(requestParameters: DeleteBackupRequest): Promise<void> {
        await this.deleteBackupRaw(requestParameters);
    }

    /**
     * Administrator downloads the backup of the security server.
     * download security server backup
     */
    async downloadBackupRaw(requestParameters: DownloadBackupRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.filename === null || requestParameters.filename === undefined) {
            throw new runtime.RequiredError('filename','Required parameter requestParameters.filename was null or undefined when calling downloadBackup.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/backups/{filename}/download`.replace(`{${"filename"}}`, encodeURIComponent(String(requestParameters.filename))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Administrator downloads the backup of the security server.
     * download security server backup
     */
    async downloadBackup(requestParameters: DownloadBackupRequest): Promise<Blob> {
        const response = await this.downloadBackupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator views the backups for the security server.
     * get security server backups
     */
    async getBackupsRaw(): Promise<runtime.ApiResponse<Array<Backup>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/backups`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BackupFromJSON));
    }

    /**
     * Administrator views the backups for the security server.
     * get security server backups
     */
    async getBackups(): Promise<Array<Backup>> {
        const response = await this.getBackupsRaw();
        return await response.value();
    }

    /**
     * Administrator restores the security server configuration from backup.
     * restore security server configuration from backup
     */
    async restoreBackupRaw(requestParameters: RestoreBackupRequest): Promise<runtime.ApiResponse<TokensLoggedOut>> {
        if (requestParameters.filename === null || requestParameters.filename === undefined) {
            throw new runtime.RequiredError('filename','Required parameter requestParameters.filename was null or undefined when calling restoreBackup.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/backups/{filename}/restore`.replace(`{${"filename"}}`, encodeURIComponent(String(requestParameters.filename))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TokensLoggedOutFromJSON(jsonValue));
    }

    /**
     * Administrator restores the security server configuration from backup.
     * restore security server configuration from backup
     */
    async restoreBackup(requestParameters: RestoreBackupRequest): Promise<TokensLoggedOut> {
        const response = await this.restoreBackupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Uploads new security server backup to the system
     * upload new backup for the security server
     */
    async uploadBackupRaw(requestParameters: UploadBackupRequest): Promise<runtime.ApiResponse<Backup>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.ignoreWarnings !== undefined) {
            queryParameters['ignore_warnings'] = requestParameters.ignoreWarnings;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.file !== undefined) {
            formParams.append('file', requestParameters.file as any);
        }

        const response = await this.request({
            path: `/backups/upload`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BackupFromJSON(jsonValue));
    }

    /**
     * Uploads new security server backup to the system
     * upload new backup for the security server
     */
    async uploadBackup(requestParameters: UploadBackupRequest): Promise<Backup> {
        const response = await this.uploadBackupRaw(requestParameters);
        return await response.value();
    }

}
