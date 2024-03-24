import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
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

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
 }, [data]); // Re-run effect whenever 'data' changes

 if (loading) {
    return <div>Loading...</div>;
 }

 return (
    <div>
      {/* Render your data here */}
      <p>{data && data.message}</p>
    </div>
 );
};

export default DataFetcher;