import React from 'react';
import { Link } from 'react-router-dom';

const Keywords = props => {
  if (props.keywords.length > 0) {
    return (
      <div className="keywords">
        {props.keywords.map(keyword => (
          <Link to={`/keywords/${keyword.id}`} key={keyword.id}>
            <div className="keyword">
              {keyword.word}: {keyword.counter}
            </div>
          </Link>
        ))}
      </div>
    );
  } else return '';
};

export default Keywords;
