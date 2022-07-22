import List from "./ListProduct";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Tree from "./Tree";
import categoryAPI from "../../services/API/CategoryAPI";
import productAPI from "../../services/API/ProductAPI";
import "./search.css";
import { useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
const ShopComponent = () => {
    const [categories, setCategories] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(0);
    const [finish, setFinish] = useState(false);
    const [keyword, setKeyword] = useState();
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await categoryAPI.getTree();
            setCategories(response.data);
        };
        fetchCategory();
    }, []);
    const fetchProduct = async (objCondition) => {
        let tmpPage = 1;
        objCondition.page = page + 1;
        // khi search thì set lại page = 1
        let isSearch = keyword !== objCondition.Ten;
        if (isSearch) {
            objCondition.page = tmpPage;
        }
        const productResponse = await productAPI.getAll(objCondition);
        setProduct((product) => {
            // nếu đang search thì trả về danh sách mới
            if (isSearch) {
                return productResponse.data.data;
            }
            // còn không thì nối thêm vào danh sách cũ
            return [...product, ...productResponse.data.data];
        });
        setPage((page) => {
            if (isSearch) {
                return 1;
            }
            if (productResponse.success && productResponse.data.data.length > 0) {
                return page + 1;
            }
            return page;
        });
        setFinish((finish) => {
            if (productResponse.success && productResponse.data.data.length === 0) {
                return true;
            }
            return false;
        });
        setKeyword(() => {
            return objCondition.Ten;
        });
    };
    useEffect(() => {
        const Ten = searchParams.get("keyword");

        if (!Loading && Ten === keyword) return;
        const objCondition = {};
        objCondition.Ten = Ten;
        fetchProduct(objCondition);
        setLoading(() => {
            return false;
        });
    }, [searchParams, Loading]);

    // infinite loading
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || Loading) return;
        setLoading(true);
    };
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item ">
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Thể loại</Accordion.Header>
                                            <Accordion.Body>
                                                <Tree categoryParent={categories} />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-7">
                            {/* safe off */}
                            <div className="filter__item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-5">
                                        <div className="filter__sort">
                                            <span>Sort By</span>
                                            <select>
                                                <option value={0}>Default</option>
                                                <option value={0}>Default</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-3">
                                        <div className="filter__option">
                                            <span className="icon_grid-2x2" />
                                            <span className="icon_ul" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* List product */}
                                {<List Product={product} LoadingProduct={Loading} />}
                            </div>
                            <div className="d-flex justify-content-center" style={{ height: "60px" }}>
                                {Loading && <Spinner animation="border" />}
                                {finish && "Hết hàng"}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopComponent;
