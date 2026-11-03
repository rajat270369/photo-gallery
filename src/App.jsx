
import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";

import usePhotos from "./hooks/useFetchPhotos";
import PhotoCard from "./components/PhotoCard";
import favoritesReducer from "./reducers/favoritesReducer";

function App() {
  const { photos, loading, error } = usePhotos();

  const [searchTerm, setSearchTerm] = useState("");

  // Load saved favourites from localStorage
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    [],
    () => {
      try {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
  );

  // Saves Favourites when a change occurs
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Search handler
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Filter photos by author
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  // Toggle 
  function handleToggleFavorite(photoId) {
    dispatch({
      type: "TOGGLE_FAVORITE",
      photoId,
    });
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-6 text-center text-4xl font-bold text-blue-600">
          My Photo Gallery
        </h1>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search photos by author..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-blue-500 sm:max-w-md"
          />

          <p className="font-semibold text-gray-700">
            🩵 Favourites: {favorites.length}
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              <p className="py-10 text-center text-gray-600">
                No photos found.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavorite={favorites.includes(photo.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}

export default App;
