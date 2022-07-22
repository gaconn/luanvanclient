import { useAccordionButton } from "react-bootstrap/esm/AccordionButton"

const ListTagToggle = ({children, eventKey}) => {
    const onIconExpandClick = useAccordionButton(eventKey)

    return (
        <span className="side-bar-item-icon-expand" onClick={onIconExpandClick}>{children}</span>
    )
}

export default ListTagToggle