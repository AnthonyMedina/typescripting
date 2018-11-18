import { API_KEY } from '../apikeys';

export interface PlaceSummary {
  description: string;
  id: string;
  place_id: string;
}

export interface PlaceDetails {
  id: string;
  rating: number;
  icon: string;
  name: string;
  url: string;
  vicinity: string;
  website?: string;
}

export function fetchPlaceSummaries(input: string): Promise<PlaceSummary[]> {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?types=establishment&input=${input}&key=${API_KEY}`
  )
    .then(response => response.json())
    .then(jsonData => {
      return jsonData.predictions as PlaceSummary[];
    });
}

export function fetchPlaceDetails(placeids: string[]): Promise<PlaceDetails[]> {
  return Promise.all(
    placeids.map(placeid => {
      return fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${API_KEY}`
      )
        .then(response => response.json())
        .then(jsonData => jsonData.result as PlaceDetails);
    })
  );
}
