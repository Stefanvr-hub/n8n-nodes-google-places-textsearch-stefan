"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePlacesTextSearch = void 0;
class GooglePlacesTextSearch {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const textQuery = this.getNodeParameter('textQuery', i);
            const fieldMask = this.getNodeParameter('fieldMask', i);
            const options = {
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
            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'googlePlacesApi', options);
            const places = (response.places || []);
            for (const place of places) {
                returnData.push({
                    json: place,
                });
            }
        }
        return [returnData];
    }
}
exports.GooglePlacesTextSearch = GooglePlacesTextSearch;
//# sourceMappingURL=GooglePlacesTextSearch.node.js.map