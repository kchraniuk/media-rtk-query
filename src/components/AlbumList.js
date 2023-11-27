import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleteon';
import AlbumListItem from './AlbumListItem';
import Button from './Button';

function AlbumList({user}) {
   const {data, error, isFetching} = useFetchAlbumsQuery(user);
   const [addAlbum, results] = useAddAlbumMutation(user);

   const handleAddAlbum = () => {
       addAlbum(user);
   }

   let content;
   if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />
   } else if (error) {
        content = <div>Error loading albums - {error}</div>
   } else {
        content = data.map((album) => {
            return <AlbumListItem key={album.id} album={album} />
        })
   }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for { user.name }</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>
                    + Add Album
                </Button>
            </div>
            <div>{ content }</div>
        </div>
    );
}

export default AlbumList;