import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FetchItems.css';

const RotatingItemsColumn = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://my-p-backend.onrender.com/api/about/items');
        setItems(response.data);
        setVisibleItems(response.data.slice(0, 2)); // Show the first two items initially
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    // Rotate items every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 2) % items.length;
        setVisibleItems(items.slice(nextIndex, nextIndex + 2));
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [items]);

  return (
    <div className="items-column">
      {visibleItems.map((item, index) => (
        <div key={index} className="column-item">
          <img src={`http://localhost:5000/${item.imagePath}`} alt={item.name} />
          <div className="item-details">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RotatingItemsColumn;
