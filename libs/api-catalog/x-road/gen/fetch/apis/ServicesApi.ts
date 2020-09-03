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
    Endpoint,
    EndpointFromJSON,
    EndpointToJSON,
    Service,
    ServiceFromJSON,
    ServiceToJSON,
    ServiceClient,
    ServiceClientFromJSON,
    ServiceClientToJSON,
    ServiceClients,
    ServiceClientsFromJSON,
    ServiceClientsToJSON,
    ServiceUpdate,
    ServiceUpdateFromJSON,
    ServiceUpdateToJSON,
} from '../models';

export interface AddEndpointRequest {
    id: string;
    endpoint?: Endpoint;
}

export interface AddServiceServiceClientsRequest {
    id: string;
    serviceClients?: ServiceClients;
}

export interface DeleteServiceServiceClientsRequest {
    id: string;
    serviceClients?: ServiceClients;
}

export interface GetServiceRequest {
    id: string;
}

export interface GetServiceServiceClientsRequest {
    id: string;
}

export interface UpdateServiceRequest {
    id: string;
    serviceUpdate?: ServiceUpdate;
}

/**
 * 
 */
export class ServicesApi extends runtime.BaseAPI {

    /**
     * Administrator creates a new endpoint.
     * create endpoint
     */
    async addEndpointRaw(requestParameters: AddEndpointRequest): Promise<runtime.ApiResponse<Endpoint>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addEndpoint.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/services/{id}/endpoints`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EndpointToJSON(requestParameters.endpoint),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EndpointFromJSON(jsonValue));
    }

    /**
     * Administrator creates a new endpoint.
     * create endpoint
     */
    async addEndpoint(requestParameters: AddEndpointRequest): Promise<Endpoint> {
        const response = await this.addEndpointRaw(requestParameters);
        return await response.value();
    }

    /**
     * Adds access rights to selected service for new ServiceClients
     * add access rights to selected service for new ServiceClients
     */
    async addServiceServiceClientsRaw(requestParameters: AddServiceServiceClientsRequest): Promise<runtime.ApiResponse<Array<ServiceClient>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addServiceServiceClients.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/services/{id}/service-clients`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ServiceClientsToJSON(requestParameters.serviceClients),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceClientFromJSON));
    }

    /**
     * Adds access rights to selected service for new ServiceClients
     * add access rights to selected service for new ServiceClients
     */
    async addServiceServiceClients(requestParameters: AddServiceServiceClientsRequest): Promise<Array<ServiceClient>> {
        const response = await this.addServiceServiceClientsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator removes access to selected service from given ServiceClients
     * remove access to selected service from given ServiceClients
     */
    async deleteServiceServiceClientsRaw(requestParameters: DeleteServiceServiceClientsRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteServiceServiceClients.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/services/{id}/service-clients/delete`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ServiceClientsToJSON(requestParameters.serviceClients),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Administrator removes access to selected service from given ServiceClients
     * remove access to selected service from given ServiceClients
     */
    async deleteServiceServiceClients(requestParameters: DeleteServiceServiceClientsRequest): Promise<void> {
        await this.deleteServiceServiceClientsRaw(requestParameters);
    }

    /**
     * Administrator views selected service.
     * get service
     */
    async getServiceRaw(requestParameters: GetServiceRequest): Promise<runtime.ApiResponse<Service>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getService.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/services/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceFromJSON(jsonValue));
    }

    /**
     * Administrator views selected service.
     * get service
     */
    async getService(requestParameters: GetServiceRequest): Promise<Service> {
        const response = await this.getServiceRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator views service clients who have access to the given service
     * get service clients who have access rights for the selected service
     */
    async getServiceServiceClientsRaw(requestParameters: GetServiceServiceClientsRequest): Promise<runtime.ApiResponse<Array<ServiceClient>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getServiceServiceClients.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/services/{id}/service-clients`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceClientFromJSON));
    }

    /**
     * Administrator views service clients who have access to the given service
     * get service clients who have access rights for the selected service
     */
    async getServiceServiceClients(requestParameters: GetServiceServiceClientsRequest): Promise<Array<ServiceClient>> {
        const response = await this.getServiceServiceClientsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Administrator updates the service.
     * update service
     */
    async updateServiceRaw(requestParameters: UpdateServiceRequest): Promise<runtime.ApiResponse<Service>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateService.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/services/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ServiceUpdateToJSON(requestParameters.serviceUpdate),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceFromJSON(jsonValue));
    }

    /**
     * Administrator updates the service.
     * update service
     */
    async updateService(requestParameters: UpdateServiceRequest): Promise<Service> {
        const response = await this.updateServiceRaw(requestParameters);
        return await response.value();
    }

}
