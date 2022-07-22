import React from "react";
import { TreeItem } from "../TreeItem";
import { Container } from "./Tree.style";
import {AiFillFolderAdd} from "react-icons/ai"

const Tree = ({ parent = [], handleShowInfo, handleAddMore, idParent , onDeleteClick}) => {
    return (
        <Container>
            <ul>
                {parent.map((node, index) => {
                    return <TreeItem key={index} node={node} handleShowInfo={handleShowInfo} handleAddMore={handleAddMore} onDeleteClick={onDeleteClick}/>;
                })}
                <li key="cate-add" className="category-item-add">
                  <div className="category-item-icon-wrapper"></div> 
                  {!idParent && <span className="category-add-icon" onClick={()=>handleAddMore(idParent)}>
                    <AiFillFolderAdd />
                  </span>}
                </li>
            </ul>
        </Container>
    );
};

export default Tree;
