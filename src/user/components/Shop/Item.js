import ListGroup from 'react-bootstrap/ListGroup';


const ItemCate = ({ categoryParent = [],handleInfo }) => {
    return (
        <>
            {
                categoryParent.map((categories, index) => (
                    <ListGroup key={index}>
                        <ListGroup.Item action onClick={()=>handleInfo(categories)} href=''>{categories.Ten}</ListGroup.Item>
                    </ListGroup>
                ))
            }

        </>);
}

export default ItemCate;