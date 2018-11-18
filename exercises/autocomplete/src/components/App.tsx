import * as React from 'react';
import { PlaceSearchResult } from './place-search-result';
import {
  PlaceDetails,
  PlaceSummary,
  fetchPlaceSummaries,
  fetchPlaceDetails
} from '../utils/places';
import './App.scss';

interface IAppState {
  results: PlaceDetails[];
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      results: []
    };
  }

  async componentDidMount() {
    const placeSummaries: PlaceSummary[] = await fetchPlaceSummaries('donut');
    const results: PlaceDetails[] = await fetchPlaceDetails(
      placeSummaries.map(p => p.place_id)
    );
    this.setState({ results });
  }
  render() {
    const placeResults = this.state.results.map(placeDetails => {
      return <PlaceSearchResult key={placeDetails.id} {...placeDetails} />;
    });
    return <ul className="results">{placeResults}</ul>;
  }
}
