import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class GooglePlacesApi implements ICredentialType {
	name = 'googlePlacesApi';

	displayName = 'Google Places API';

	documentationUrl = 'https://developers.google.com/maps/documentation/places/web-service/text-search';

	icon: Icon = 'file:googlePlaces.svg';

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
			baseURL: 'https://places.googleapis.com',
			url: '/v1/places:searchText',
			method: 'POST',
			headers: {
				'X-Goog-FieldMask': 'places.id',
			},
			body: {
				textQuery: 'Stockholm',
			},
		},
	};
}
