import React,{useState,useEffect} from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

// import FlashPic from '../../assets/svgs/FlashPic.svg'

const Flash = () => {
  const [prog,setProg] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProg((oldProg) => {
        const diff = Math.random() * 10;
        return Math.min(oldProg + diff, 100);
      });
    },100);
    return () => {clearInterval(timer)}
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row max-h">
          <div className="col-12 text-center align-middle justify-center mt-5 pt-5">
            <h3 className="display-3 brandColor text-bold">
              PETS REUNITE HUB
            </h3>
            <small className="text-body-secondary">Missing a Paw-some Friend? Find them here, fast and fur-ious!</small>
            <ProgressBar now={prog} variant='info' style={{marginLeft:'24rem',marginRight:'24rem',marginTop:'2rem'}} />
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Flash;