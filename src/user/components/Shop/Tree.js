import { useState } from 'react';
import TreeITem from './TreeItem';
const Tree = ({ categoryParent = [] }) => {
    const [listparent,setListparent]=useState({})
    const showInfoParent = (item) => {
        setListparent(item);
    };
    return (<>
        {categoryParent.map((node, index) => (
            <TreeITem key={index} node={node} handleInfoParent={showInfoParent}/>
        ))}
       

    </>);
}

export default Tree;