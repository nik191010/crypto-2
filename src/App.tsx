import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppContext from './config/context';

import Navbar from './components/Navbar';
import Coins from './components/Coins';
import Search from './components/Search';
import Coin from './pages/Coin';
import Pagination from './components/Pagination';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  current_price: number;
  total_volume: number;
  image: string;
}

const App: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const location = useLocation();
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;

  const url = `${
    import.meta.env.VITE_API_COINS_URL
  }/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`;

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Coin[]>(url);
        setCoins(response.data);
        console.log(coins);
      } catch (error) {
        console.error('Failed to load resource:', error);
        alert('Failed to load resource'); // Basic error feedback
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  // Handle pagination
  useEffect(() => {
    setCurrentItems(coins.slice(itemOffset, endOffset));
  }, [coins, itemOffset]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % coins.length;
    setItemOffset(newOffset);
    setVisible(false);
    setCurrentPage(event.selected);
  };

  const handleSorting = (sortField: keyof Coin, sortOrder: 'asc' | 'desc') => {
    if (sortField) {
      const sorted = [...currentItems].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;

        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'desc' ? 1 : -1)
        );
      });

      setCurrentItems(sorted);
    }
  };

  const pageCount = useMemo(
    () => Math.ceil(coins.length / itemsPerPage),
    [coins.length],
  );

  return (
    <AppContext.Provider value={{ visible, setVisible, setSearch }}>
      <div className="container">
        {location.pathname === '/' && (
          <>
            <Navbar />
            <Search />
          </>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Coins
                coins={coins}
                currentItems={currentItems}
                loading={loading}
                search={search}
                handleSorting={handleSorting}
              />
            }
          />
          <Route path="/coin/:coinId" element={<Coin />} />
        </Routes>
        {location.pathname === '/' && (
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
