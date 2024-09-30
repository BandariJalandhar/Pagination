import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 3; 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const result = await response.json();
      setData(result); 
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handler for Next button
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler for Previous button
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };
console.log(data)
  return (
    <div className="App">
      <h1>Product Categories</h1>
<div className='products'>


      {/* Render the current items based on pagination */}
      {currentItems.map((item, index) => (
        <div key={index} className='productCard'>
          <img src={item.image} className='productImage'/>
          <p>{item.title}</p>
          <p>Rs: {item.price}</p>
          <p>Description:  {truncateDescription(item.description, 150)}</p>
          <p>Rating: {item.rating.rate}</p>
          <p>Couny: {item.rating.count}</p>
        </div>
      ))}
</div>
      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {Math.ceil(data.length / itemsPerPage)} </span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
