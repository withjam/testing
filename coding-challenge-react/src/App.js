import './App.scss';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.REACT_APP_API;

function App() {
  const [count, setCount] = useState(3);
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchRandom = async () => {
    if (!fetching) {
      setFetching(true);
      const res = await fetch(`${API_URL}/BentExample`, {
        mode: 'cors',
      });
      const json = await res.json();
      setResults(json.giphs || []);
      setFetching(false);
    }
  };

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
          <select
            name='count'
            value={count}
            onChange={(ev) => setCount(ev.target.value)}
          >
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button
            className='primary'
            onClick={fetchRandom}
            disabled={!!fetching}
          >
            {fetching ? (
              <FontAwesomeIcon icon={faCircleNotch} spin />
            ) : (
              'Random'
            )}
          </button>
          <button onClick={highlightNext} disabled={!results.length}>
            Highlight
          </button>
        </form>
      </section>
      <section className='results'>
        {fetching ? (
          <FontAwesomeIcon icon={faCircleNotch} spin size='lg' />
        ) : results.length ? null : (
          <em>Nothing matched</em>
        )}
      </section>
    </article>
  );
}

export default App;
