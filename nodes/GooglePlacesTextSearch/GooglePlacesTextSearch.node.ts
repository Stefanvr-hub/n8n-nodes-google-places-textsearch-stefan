import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class GooglePlacesTextSearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Google Places Text Search',
		name: 'googlePlacesTextSearch',
		icon: 'file:googlePlaces.svg',
		group: ['transform'],
		version: 1,
		description: 'Search places using Google Places API',
		defaults: {
			name: 'Google Places Text Search',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'API Key',
				name: 'apiKey',
				type: 'string',
				default: '',
				required: true,
			},
			{
				displayName: 'Text Query',
				name: 'textQuery',
				type: 'string',
				default: '',
				required: true,
			},
			{
				displayName: 'Field Mask',
				name: 'fieldMask',
				type: 'string',
				default: 'places.displayName,places.formattedAddress',
				description: 'Fields returned from the API',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const apiKey = this.getNodeParameter('apiKey', i) as string;
			const textQuery = this.getNodeParameter('textQuery', i) as string;
			const fieldMask = this.getNodeParameter('fieldMask', i) as string;

			const options: IHttpRequestOptions = {
				method: 'POST',
				url: 'https://places.googleapis.com/v1/places:searchText',
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-Api-Key': apiKey,
					'X-Goog-FieldMask': fieldMask,
				},
				body: {
					textQuery,
				},
				json: true,
			};

			const response = await this.helpers.httpRequest(options);
			const places = response.places || [];

			for (const place of places) {
				returnData.push({
					json: place,
				});
			}
		}

		return [returnData];
	}
}
