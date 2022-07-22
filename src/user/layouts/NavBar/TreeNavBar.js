import Accordion from 'react-bootstrap/Accordion';
import ListItem from './ListItem';

const TreeNavBar = ({ listChild = [] }) => {
    const Tree = listChild.map((item, k) => {
        if (item.listChild) {
            return <Accordion defaultActiveKey="0" flush key={k}>
                <Accordion.Item eventKey="1" >
                    <Accordion.Header>{item.Ten}</Accordion.Header>
                    <Accordion.Body>
                        <ListItem listChild={item.listChild} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        }
        return  <ListItem listChild={item.listChild}  />
    })
    return (
        <>
            {Tree}
        </>
    );
}

export default TreeNavBar;