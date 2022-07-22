import React, { useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import {MdDeleteOutline} from "react-icons/md"
import Tree from "../Tree";
import { Container } from "./Tree.style";

export const TreeItem = ({ node , handleShowInfo , handleAddMore ,onDeleteClick} ) => {
    const [visibleChild, setVisibleChild] = useState(false);
    const hasChild = (node.listChild && node.listChild.length > 0) ? true : false;
    return (
        <Container className="category-item">
            <div className="category-item-parent d-flex" >
                <div className="category-item-icon-wrapper">
                    {hasChild && (
                        <span className="category-item-icon-show pe-1 " onClick={() => setVisibleChild(!visibleChild)}>
                            {visibleChild ? <BsDashSquare /> :<BsPlusSquare />}
                        </span>
                    )}
                </div>
                <span className="category-item-text" onClick={()=>handleShowInfo(node)}>{node.Ten}</span>
                <span className="category-add-icon" onClick={()=>handleAddMore(node.id)}>
                    <AiFillFolderAdd />
                </span>
                <span className="category-remove-icon" onClick={()=>onDeleteClick(node.id)}>
                    <MdDeleteOutline />
                </span>
            </div>

            {hasChild && visibleChild && <Tree parent={node.listChild} idParent={node.id} handleShowInfo={handleShowInfo} handleAddMore={handleAddMore} onDeleteClick={onDeleteClick}/>}
        </Container>
    );
};
