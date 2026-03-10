import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GooglePlacesApi implements ICredentialType {
	name = 'googlePlacesApi';
	displayName = 'Google Places API';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Goog-Api-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			baseURL: 'https://places.googleapis.com',
			url: '/v1/places:searchText',
			headers: {
				'Content-Type': 'application/json',
				'X-Goog-FieldMask': 'places.id',
			},
			body: {
				textQuery: 'coffee',
			},
		},
	};
}
