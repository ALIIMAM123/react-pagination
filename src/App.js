import React, { useState, useEffect } from 'react';
import './style.css';
const App = () => {
  const [loader, setLoader] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filteredData, setFilteredData] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSKip] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true); // Start loading
        const getData = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${
            (pageNo - 1) * limit
          }&select=title,price`
        );
        const responseData = await getData.json();

        console.log(responseData, 'responseData');

        // Extract products and total count
        const products = responseData.products || [];
        const total = responseData.total || 0;
        const skip = responseData.skip;

        // Update state with products and total count
        setFilteredData(products);
        setTotalCount(total);
        setSKip(skip);

        setLoader(false); // Stop loading
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoader(false); // Stop loading on error
      }
    };

    fetchData();
  }, [limit, pageNo, skip]);

  const handlePreviousButton = () => {
    setPageNo((prevPageNo) => prevPageNo - 1);
  };

  const handleNextButton = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };

  console.log(pageNo, 'pagenO');

  return (
    <div className="main-container">
      <h1 className="user-detail-text">User Details</h1>
      <div className="wrapper-container">
        {loader ? (
          <div>Loading..........</div>
        ) : (
          filteredData &&
          filteredData.length > 0 &&
          filteredData.map((eachItem) => (
            <div className="name-wrapper-container">
              <div className="detail-wrapper">
                <div className="section-1 section">
                  <div className="left-section">Id</div>
                  <div className="right-section">{eachItem.id}</div>
                </div>
                <div className="section-2 section">
                  <div className="left-section">Title</div>
                  <div className="right-section">{eachItem.title}</div>
                </div>
                <div className="section-3 section">
                  <div className="left-section">Price</div>
                  <div className="right-section">{eachItem.price}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* pagination button */}
      <div className="page-no-container">
        <div className="totalCount">
          <div className="total-count-name">Total Count</div>
          <div className="span-count">
            {`${skip + 1}-${Math.min(
              skip + limit,
              totalCount
            )} of ${totalCount}`}
          </div>
        </div>
        <div className="page-no-wrapper">
          <div
            className={`btn ${skip < 10 ? 'disable-btn' : ''}`}
            onClick={handlePreviousButton}
          >
            Prev
          </div>
          <div
            className={`btn ${
              Math.max(skip + limit) > totalCount ? 'disable-btn' : ''
            }`}
            onClick={handleNextButton}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
