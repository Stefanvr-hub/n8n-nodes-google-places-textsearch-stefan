import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, Icon, INodeProperties } from 'n8n-workflow';
export declare class GooglePlacesApi implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    icon: Icon;
    properties: INodeProperties[];
    authenticate: IAuthenticateGeneric;
    test: ICredentialTestRequest;
}
