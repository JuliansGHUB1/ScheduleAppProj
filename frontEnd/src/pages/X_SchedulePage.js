import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  // data: contains json payload
  const [data, setData] = useState(null);
  // loading: contains loading state
  const [loading, setLoading] = useState(true);
  // function: fetches data from backend
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
  // useEffect: runs fetchData function on initial component mount
  useEffect(() => {
    fetchData(); // Initial fetch
  }, []
  ); 
  // function: handle refresh of page -> fetch data again
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
