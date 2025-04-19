import React, { useState, useEffect } from 'react';

export const Banner = () => {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_KEY = 'a52f7654d212491c82e635495ba2129a';

  const resizeImage = (url, width) => {
    if (!url) return '';
    const parts = url.split('/media/');
    return `https://media.rawg.io/media/resize/${width}/-/` + parts[1];
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`);
        const data = await res.json();
        setGames(data.results || []);
      } catch (err) {
        console.error('Failed to fetch games:', err);
      }
    };

    fetchGames();
  }, [API_KEY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % games.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [games]);

  if (!games.length) return <div className="text-center text-white py-10">Loading games...</div>;

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[500px] overflow-hidden rounded-xl shadow-xl">

      <img
        src={resizeImage(games[currentIndex].background_image, 640)}
        alt={games[currentIndex].name}
        className="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

 
      <div className="absolute bottom-4 left-4 z-20 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold sm:font-bold drop-shadow-md">
        {games[currentIndex].name}
      </div>
    </div>
  );
};
