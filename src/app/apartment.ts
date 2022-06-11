export interface Apartments {
    id?:          string;
    name?:        string;
    urlCode?:     string;
    location?:    Location;
    houseLayout?: HouseLayout;
    score?:       Score;
    info?:        Info;
    media?:       Media;
    bookingData?: BookingData;
}

export interface BookingData {
    maxGuests?:      number;
    cleaningFee?:    number;
    dailyBreakdown?: { [key: string]: DailyBreakdown };
}

export interface DailyBreakdown {
    nightPrice?: number;
    minStay?:    number;
    available?:  boolean;
}

export interface HouseLayout {
    bedrooms?:  string;
    bathrooms?: string;
    beds?:      number;
    area?:      number;
    guests?:    string;
}

export interface Info {
    slogan?:      string;
    description?: string;
    amenities?:   string[];
}

export interface Location {
    town?: string;
    map?:  Map;
}

export interface Map {
    lat?: number;
    lng?: number;
}

export interface Media {
    video?:   string;
    gallery?: Gallery[];
}

export interface Gallery {
    size1?: Size;
    size2?: Size;
    size3?: Size;
}

export interface Size {
    src?: string;
    w?:   number;
    h?:   number;
}

export interface Score {
    value?: string;
    count?: number;
}
