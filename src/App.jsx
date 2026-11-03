import usePhotos from "./hooks/usePhotos";

function App(){

  const{photos,loading, error}=usePhotos();

  return(
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">

        My photo gallary

      </h1>

      {loading &&(
        <p className="mt-6 text-gray-600">
           Loading photos....
        </p>
      )}
      {error &&(
        <p className="mt-6 text-red-600">
          {error}

        </p>
      )}

      {!loading && !error &&(
        <p class Name="mt-6 text-green-700">
            Successfully loaded{photos.length} photos!
            </p>
      )}

    </main>

  );
}
export default App;