export interface ZipCode {
    postCode: string;
    country: string;
    countryAbbreviation: string;
    places: Place[];
}

export interface Place {
    placeName: string;
    longitude: string;
    state: string;
    stateAbbreviation: string;
    latitude: string;
}
