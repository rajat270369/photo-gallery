
function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="h-56 w-full object-cover"
        loading="lazy"
      />

      <div className="flex items-center justify-between p-4">
        <p className="font-medium text-gray-800">
          {photo.author}
        </p>

        <button
          onClick={() => onToggleFavorite(photo.id)}
          className="text-2xl"
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
          title={isFavorite ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>
    </article>
  );
}

export default PhotoCard;
