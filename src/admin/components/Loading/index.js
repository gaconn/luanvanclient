import { Spinner } from "react-bootstrap"

const Loading = () => {
    return <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="grow" variant="info" />
    </div>
}

export default Loading