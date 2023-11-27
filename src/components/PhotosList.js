import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Skeleton from "./Skeleteon";
import PhotosListItem from "./PhotosListItem";
import Button from "./Button";

function PhotosList({album}) {
    const {data, error, isFetching} = useFetchPhotosQuery(album);
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    }

    let content;
    if (isFetching) {
        content = <Skeleton className="h-8 w-8" time={4} />
    } else if (error) {
        content = <div>Error loading photos - {error}</div>
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo} />
         });
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos in {album.title}</h3>
                <Button onClick={handleAddPhoto} loading={addPhotoResults.isLoading}>
                    + Add Photo
                </Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center">
                { content }
            </div>
        </div>
    
    )
}

export default PhotosList;