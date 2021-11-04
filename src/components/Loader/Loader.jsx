import Loader from 'react-loader-spinner';
import './Loader.scss'



const Load =  () =>{
  return (
    <div className="Loader">
      <Loader
        type="Rings"
        color="#00BFFF"
        height={150}
        width={150}
        timeout={2000}
      />
    </div>
  );
};
export default Load;