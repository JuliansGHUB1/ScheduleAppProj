import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT');
      const newData = await response.json();
      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []); // Runs only once on component mount

  const handleRefresh = () => {
    fetchData(); // Manually trigger data refresh
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Render your data here */}
          <p>{data && data.message}</p>
          <button onClick={handleRefresh}>Retrieve Latest Schedules</button>
        </div>
      )}
    </div>
  );
};

export default DataFetcher;
