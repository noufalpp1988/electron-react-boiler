import React from 'react';
import { Link } from 'react-router-dom';

function Sample() {
  const [data, setData] = React.useState(null);

  const apiUrl = 'http://localhost:3001';

  React.useEffect(() => {
    fetch(`${apiUrl}/api`)
      .then((res) => res.json())
      .then((val) => setData(val.message))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TEST</h1>
        <p>{!data ? 'Loading...' : data}</p>
        <Link to="/"> Home </Link>
      </header>
    </div>
  );
}

export default Sample;
