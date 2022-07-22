import { useParams } from "react-router-dom"
import DetailComponent from "../components/Detail"
import ManageComponents from "../components/mange"

const Main = () => {
    const { option } = useParams()
    var pageBody
    switch (option) {
        case "ProductDetail":
            pageBody = < DetailComponent />
            break;
        case "InformationCustomer":
            pageBody = <ManageComponents />
            break;
        default:
            break;
    }
    return (
        <div>
            {pageBody}
        </div>
    )
}

export default Main