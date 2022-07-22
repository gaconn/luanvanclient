import LoadingPage from "../Loading";
import { Link } from "react-router-dom";
import uniqid from 'uniqid';
import CartAPI from "../../services/API/Cart";
const Search = ( {ProductSearch,LoadingProduct} ) => {
    if(LoadingProduct){
        return <LoadingPage/>
    }
    console.log(ProductSearch)
    const HandleInfo = (item) => {
        localStorage.setItem('DetailID', item)
    };
    const handleInfoCart = async (item) => {
        let SessionID = localStorage.getItem('SessionID')
        if (!SessionID) {
            let session = uniqid()
            SessionID = localStorage.setItem('SessionID', session)
        }
        const data = { IDSanPham: item.id, SoLuong: 1, SessionID: SessionID }
        const addToCart = CartAPI.AddToCart(data)
    }
    return (
        <>
            {
                ProductSearch &&  ProductSearch.map &&  ProductSearch.map((item,k)=>(
                    <div className="col-lg-4 col-md-6 col-sm-6" key={k}>
                    <div className="product__item">
                        <div
                            className="product__item__pic set-bg"
                        >
                            {
                                item.HinhAnh &&
                                <img
                                    className="d-block w-100"
                                    src={process.env.REACT_APP_API_IMAGE + JSON.parse(item.HinhAnh)[0]}
                                    style={{ height: 300 }}
                                    alt="First slide"
                                />   
                            }
                            <ul className="product__item__pic__hover">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-heart" />
                                    </a>
                                </li>
                                <li>
                                    <Link to="/ProductDetail" onClick={() => HandleInfo(item.id)}   >
                                        <i className="fa fa-retweet" />
                                    </Link>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-shopping-cart" onClick={() => handleInfoCart(item)} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="product__item__text">
                            <h6>
                                <Link to="/ProductDetail" onClick={() => HandleInfo(item.id)}>{item.Ten}</Link>
                            </h6>
                            <h5>${item.GiaGoc * 2}</h5>
                        </div>
                    </div>
                </div>
                ))
            }
        </>
    );
}

export default Search;