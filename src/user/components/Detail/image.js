const ImageDetail = ({IMAGE=[]}) => {  
    return (  
        <img
        className="product__details__pic__item--large"
        src={process.env.REACT_APP_API_IMAGE+IMAGE}
        alt=""
      />
      
    );
}
 
export default ImageDetail;