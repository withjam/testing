import './App.scss';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [count, setCount] = useState(3);
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchRandom = () => {};

  const highlightNext = () => {};

  const values = [1, 2, 3, 4, 5];

  return (
    <article className='challenge-app'>
      <header>
        <h1>GIPHY Challenge</h1>
      </header>
      <section className='banner'>
        <p>
          Click "Random" to display random GIPHY images. Click "Highlight" to
          highlight them in alphabetical order by id.
        </p>
        <form name='actions'>
          <select name='count'>
            {values.map((value) => (
              <option value={value} selected={count === value}>
                {value}
              </option>
            ))}
          </select>
          <button className='primary' onClick={fetchRandom}>
            Random
          </button>
          <button onClick={highlightNext} disabled={!results.length}>
            Highlight
          </button>
        </form>
      </section>
      <section className='results'>
        {fetching ? (
          <FontAwesomeIcon icon='spinner' spin size='lg' />
        ) : results.length ? null : (
          <em>Nothing matched</em>
        )}
      </section>
    </article>
  );
}

export default App;
