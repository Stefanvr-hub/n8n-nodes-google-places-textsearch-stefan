import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
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
		credentials: [
			{
				name: 'googlePlacesApi',
				required: true,
			},
		],
		properties: [
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
				default: 'places.displayName,places.formattedAddress,places.id',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const textQuery = this.getNodeParameter('textQuery', i) as string;
			const fieldMask = this.getNodeParameter('fieldMask', i) as string;

			const options: IHttpRequestOptions = {
				method: 'POST',
				url: 'https://places.googleapis.com/v1/places:searchText',
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-FieldMask': fieldMask,
				},
				body: {
					textQuery,
				},
				json: true,
			};

			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'googlePlacesApi',
				options,
			);

			const places = ((response as IDataObject).places || []) as IDataObject[];

			for (const place of places) {
				returnData.push({
					json: place,
				});
			}
		}

		return [returnData];
	}
}
