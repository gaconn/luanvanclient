import { useNavigate } from "react-router-dom"
import Spinner from "react-bootstrap/Spinner"
import { useEffect } from "react"
const Landing = () => {
    const navigation = useNavigate()
    useEffect(()=> {
        setTimeout(()=>{
            navigation("/home")
        }, 2000)
    },[])
    return <div className="landing-container">
    <Spinner animation="grow"/>
</div>
}

export default Landing