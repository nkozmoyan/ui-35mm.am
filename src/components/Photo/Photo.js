import './Photo.css';

export default function Photo({photo}){
    return (
        <div className="photo">
          <img alt={photo.photoTitle} src={'http://post35mm.com/' + photo.url.orig}></img>
          <h2>{photo.photoTitle}</h2>
          <h3>{photo.user.name}</h3>
        </div>
      )
}