import {useEffect, useState} from "react";

function usePhotos()
{
    const[photos, setPhotos]= useState([]);
    
    const[loading,setLoading]= useState(true);

    const[error, setError]= useState("");


useEffect(() =>{

    async function getPhotos(){

    try{
        const response = await fetch(
            "https://picsum.photos/v2/list?limit=30"
        );

        if(!response.ok){
            throw new Error("Failed to fetch photos");

        }
        const data=await response.json();

        setPhotos(data);
    }   
    catch(err){

        setError(err.message || "something went wrong");

    } 

    finally{

        setLoading(false);
    }

    }
    getPhotos();
}, []);

return {photos,loading,error};
}

export default usePhotos;