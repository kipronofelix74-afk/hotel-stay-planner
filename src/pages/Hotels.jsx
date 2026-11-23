import { useState } from 'react';
import HotelCard from '../components/HotelCard';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import StatusMessage from '../components/StatusMessage';
import useFetch from '../hooks/useFetch';
import { getHotels } from '../api';

const filters = [
  { id: 'all', label: 'All stays' },
  { id: 'cancel', label: 'Free cancellation' },
  { id: 'breakfast', label: 'Breakfast included' },
  { id: 'budget', label: 'Under KES 10,000' },
];

export default function Hotels() {
  const { data: hotels, loading, error, retry } = useFetch(getHotels);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [filter, setFilter] = useState('all');

  const results = (hotels || [])
    .filter((h) => `${h.name} ${h.city}`.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((h) => {
      if (filter === 'cancel') return h.freeCancellation;
      if (filter === 'breakfast') return h.breakfast;
      if (filter === 'budget') return h.price < 10000;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });

  return (
    <>
      <h1>Browse stays</h1>
      <SearchBar query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} />
      <FilterChips options={filters} value={filter} onChange={setFilter} />

      <StatusMessage
        loading={loading}
        error={error}
        onRetry={retry}
        empty={!loading && !error && results.length === 0 ? 'No stays match your search. Try a different name or filter.' : null}
      />
      {!loading && !error && results.length > 0 && (
        <h2 className="count-title">{results.length} {results.length === 1 ? 'stay' : 'stays'} found</h2>
      )}
      <div className="grid hotels">
        {results.map((h) => <HotelCard key={h.id} hotel={h} />)}
      </div>
    </>
  );
}
