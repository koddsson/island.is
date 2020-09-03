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
    LocalGroup,
    LocalGroupFromJSON,
    LocalGroupToJSON,
    LocalGroupDescription,
    LocalGroupDescriptionFromJSON,
    LocalGroupDescriptionToJSON,
    Members,
    MembersFromJSON,
    MembersToJSON,
} from '../models';

export interface AddLocalGroupMemberRequest {
    groupId: string;
    members?: Members;
}

export interface DeleteLocalGroupRequest {
    groupId: string;
}

export interface DeleteLocalGroupMemberRequest {
    groupId: string;
    members?: Members;
}

export interface GetLocalGroupRequest {
    groupId: string;
}

export interface UpdateLocalGroupRequest {
    groupId: string;
    localGroupDescription?: LocalGroupDescription;
}

/**
 * 
 */
export class LocalGroupsApi extends runtime.BaseAPI {

    /**
     * Administrator adds a new member for the local group. The new member can be an X-Road member or a subsystem
     * add new member for the local group
     */
    async addLocalGroupMemberRaw(requestParameters: AddLocalGroupMemberRequest): Promise<runtime.ApiResponse<Members>> {
        if (requestParameters.groupId === null || requestParameters.groupId === undefined) {
            throw new runtime.RequiredError('groupId','Required parameter requestParameters.groupId was null or undefined when calling addLocalGroupMember.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/local-groups/{group_id}/members`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters.groupId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MembersToJSON(requestParameters.members),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MembersFromJSON(jsonValue));
    }

    /**
     * Administrator adds a new member for the local group. The new member can be an X-Road member or a subsystem
     * add new member for the local group
     */
    async addLocalGroupMember(requestParameters: AddLocalGroupMemberRequest): Promise<Members> {
        const response = await this.addLocalGroupMemberRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator deletes the local group.
     * delete local group
     */
    async deleteLocalGroupRaw(requestParameters: DeleteLocalGroupRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.groupId === null || requestParameters.groupId === undefined) {
            throw new runtime.RequiredError('groupId','Required parameter requestParameters.groupId was null or undefined when calling deleteLocalGroup.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/local-groups/{group_id}`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters.groupId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Administrator deletes the local group.
     * delete local group
     */
    async deleteLocalGroup(requestParameters: DeleteLocalGroupRequest): Promise<void> {
        await this.deleteLocalGroupRaw(requestParameters);
    }

    /**
     * Administrator deletes the member from local group.
     * delete member from local group
     */
    async deleteLocalGroupMemberRaw(requestParameters: DeleteLocalGroupMemberRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.groupId === null || requestParameters.groupId === undefined) {
            throw new runtime.RequiredError('groupId','Required parameter requestParameters.groupId was null or undefined when calling deleteLocalGroupMember.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/local-groups/{group_id}/members/delete`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters.groupId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MembersToJSON(requestParameters.members),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Administrator deletes the member from local group.
     * delete member from local group
     */
    async deleteLocalGroupMember(requestParameters: DeleteLocalGroupMemberRequest): Promise<void> {
        await this.deleteLocalGroupMemberRaw(requestParameters);
    }

    /**
     * Administrator views local group details.
     * get local group information
     */
    async getLocalGroupRaw(requestParameters: GetLocalGroupRequest): Promise<runtime.ApiResponse<LocalGroup>> {
        if (requestParameters.groupId === null || requestParameters.groupId === undefined) {
            throw new runtime.RequiredError('groupId','Required parameter requestParameters.groupId was null or undefined when calling getLocalGroup.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/local-groups/{group_id}`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters.groupId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LocalGroupFromJSON(jsonValue));
    }

    /**
     * Administrator views local group details.
     * get local group information
     */
    async getLocalGroup(requestParameters: GetLocalGroupRequest): Promise<LocalGroup> {
        const response = await this.getLocalGroupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator updates the local group information.
     * update local group information
     */
    async updateLocalGroupRaw(requestParameters: UpdateLocalGroupRequest): Promise<runtime.ApiResponse<LocalGroup>> {
        if (requestParameters.groupId === null || requestParameters.groupId === undefined) {
            throw new runtime.RequiredError('groupId','Required parameter requestParameters.groupId was null or undefined when calling updateLocalGroup.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/local-groups/{group_id}`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters.groupId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: LocalGroupDescriptionToJSON(requestParameters.localGroupDescription),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LocalGroupFromJSON(jsonValue));
    }

    /**
     * Administrator updates the local group information.
     * update local group information
     */
    async updateLocalGroup(requestParameters: UpdateLocalGroupRequest): Promise<LocalGroup> {
        const response = await this.updateLocalGroupRaw(requestParameters);
        return await response.value();
    }

}
