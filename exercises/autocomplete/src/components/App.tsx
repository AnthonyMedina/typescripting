import * as React from 'react';
import { PlaceSearchResult } from './place-search-result';
import {
  PlaceDetails,
  PlaceSummary,
  fetchPlaceSummaries,
  fetchPlaceDetails
} from '../utils/places';

interface IAppState {
  results: PlaceDetails[];
}

export default class App extends React.Component<{}, IAppState> {
  constructor() {
    super({});
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
    const placeResults = this.state.results.map(pr => {
      return <p key={pr.id}>{pr.name}</p>;
      // return <PlaceSearchResult {...pr}/>;
    });
    return <ul className="results">{placeResults}</ul>;
  }
}
