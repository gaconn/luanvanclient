import { useAccordionButton } from "react-bootstrap/esm/AccordionButton"

const IconTagToggle = ({children, eventKey}) => {
    const onIconClick = useAccordionButton(eventKey)
    return (
        <span className="side-bar-item-icon" onClick={onIconClick}>{children}</span>
    )
}

export default IconTagToggle