import * as React from 'react';
import { PlaceDetails } from '../utils/places';
import { shortUrl } from '../utils/string';

export const PlaceSearchResult: React.SFC<PlaceDetails> = placeDetails => {
  const url = placeDetails.website ? (
    <a href={placeDetails.website} target="_blank">
      {shortUrl(placeDetails.website, 20)}
    </a>
  ) : (
    ''
  );
  return (
    <li className="search-result">
      <h3>{placeDetails.name}</h3>

      <img className="icon" src={placeDetails.icon} alt={placeDetails.name} />
      <div>
        <a href={placeDetails.url} target="_blank">
          {placeDetails.vicinity}
        </a>
        {' - '}
        {url}
      </div>
    </li>
  );
};
