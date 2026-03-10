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
		description: 'Search places using Google Places API Text Search',
		defaults: {
			name: 'Google Places Text Search',
		},
		usableAsTool: true,
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
				description: 'The text string to search for',
			},
			{
				displayName: 'Field Mask',
				name: 'fieldMask',
				type: 'string',
				default: 'places.displayName,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.formattedAddress,places.id,places.rating,nextPageToken',
				required: true,
				description: 'Comma-separated response fields. No spaces allowed.',
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 10,
				typeOptions: {
					minValue: 1,
					maxValue: 20,
				},
				description: 'Maximum number of results to return',
			},
			{
				displayName: 'Language Code',
				name: 'languageCode',
				type: 'string',
				default: '',
				description: 'Optional language code such as en or sv',
			},
			{
				displayName: 'Results Page Token',
				name: 'resultsPageToken',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Optional token to fetch the next page of results',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const textQuery = this.getNodeParameter('textQuery', i) as string;
			const fieldMask = this.getNodeParameter('fieldMask', i) as string;
			const pageSize = this.getNodeParameter('pageSize', i) as number;
			const languageCode = this.getNodeParameter('languageCode', i) as string;
			const resultsPageToken = this.getNodeParameter('resultsPageToken', i) as string;

			const body: IDataObject = {
				textQuery,
				pageSize,
			};

			if (languageCode) {
				body.languageCode = languageCode;
			}

			if (resultsPageToken) {
				body.pageToken = resultsPageToken;
			}

			const options: IHttpRequestOptions = {
				method: 'POST',
				url: 'https://places.googleapis.com/v1/places:searchText',
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-FieldMask': fieldMask,
				},
				body,
				json: true,
			};

			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'googlePlacesApi',
				options,
			);

			const responseData = response as IDataObject;
			const places = (responseData.places || []) as IDataObject[];
			const nextPageToken = responseData.nextPageToken;

			for (const place of places) {
				returnData.push({
					json: {
						...place,
						nextPageToken,
					},
				});
			}
		}

		return [returnData];
	}
}
