import './App.scss';
import { useMemo, useState } from 'react';

import { GiphyImage } from './GiphyImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.REACT_APP_API;

function App() {
  const [count, setCount] = useState(3);
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [highlighted, setHighlighted] = useState();

  const fetchRandom = async (ev) => {
    ev.preventDefault();
    if (!fetching) {
      setFetching(true);
      const res = await fetch(`${API_URL}/BentExample?count=${count}`, {
        mode: 'cors',
      });
      const json = await res.json();
      setResults(json.giphs || []);
      setFetching(false);
    }
  };

  const sortedResults = useMemo(() => {
    return results
      .reduce((acc, val) => {
        acc.push(val.id);
        return acc;
      }, [])
      .sort();
  }, [results]);

  const highlightNext = (ev) => {
    ev.preventDefault();
    if (!highlighted) {
      setHighlighted(sortedResults[0]);
    } else {
      const curr = sortedResults.indexOf(highlighted);
      // get next highlighted
      setHighlighted(
        curr === sortedResults.length - 1
          ? sortedResults[0]
          : sortedResults[curr + 1]
      );
    }
  };

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
        ) : results.length ? (
          results.map((result) => (
            <GiphyImage
              key={result.id}
              data={result}
              highlight={highlighted === result.id}
            />
          ))
        ) : null}
      </section>
    </article>
  );
}

export default App;
