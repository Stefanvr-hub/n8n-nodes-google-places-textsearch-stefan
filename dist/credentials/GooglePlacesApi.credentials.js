"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePlacesApi = void 0;
class GooglePlacesApi {
    constructor() {
        this.name = 'googlePlacesApi';
        this.displayName = 'Google Places API';
        this.documentationUrl = 'https://developers.google.com/maps/documentation/places/web-service/text-search';
        this.icon = 'file:googlePlaces.svg';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-Goog-Api-Key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
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
}
exports.GooglePlacesApi = GooglePlacesApi;
//# sourceMappingURL=GooglePlacesApi.credentials.js.map