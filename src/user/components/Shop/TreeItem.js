
import Accordion from 'react-bootstrap/Accordion';
import ItemCate from './Item';
const TreeITem = ({ node ,handleInfoParent}) => {
    const hasChild = (node.listChild && node.listChild.length > 0) ? true : false;
    return (<>
        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header >{node.Ten}</Accordion.Header>
                <Accordion.Body>
                    {hasChild && <ItemCate categoryParent={node.listChild} handleInfo={handleInfoParent} />}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>);
}

export default TreeITem;