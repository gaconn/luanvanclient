import { useAccordionButton } from "react-bootstrap/esm/AccordionButton"

const AccourdionToggler = ({children, eventKey}) => {
    const onIconExpandClick = useAccordionButton(eventKey)

    return (
        <span className="side-bar-item-icon-expand" onClick={onIconExpandClick}>{children}</span>
    )
}

export default AccourdionToggler