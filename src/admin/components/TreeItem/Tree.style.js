import styled from "styled-components";

export const Container = styled.li`
    padding-top: 5px;
    padding-bottom: 5px;
    margin-left: 10px;
    .category-item-icon-show {
        cursor: pointer;
        align-self: center;
        :hover {
            color: orange;
        }
    }
    .category-item-icon-wrapper {
        width: 20px;
        display: flex;
        margin-right: 10px;
    }
    .category-item-text {
        flex-grow: 1;
        border-bottom: 1px solid #ccc;
        :hover {
            color: blue;
            cursor: pointer;
        }
    }
    .category-add-icon {
        border: 1px solid green;
        padding: 5px;
        :hover {
            cursor: pointer;
            color: green;
        }
    }
    .category-remove-icon {
        border: 1px solid red;
        padding: 5px;
        :hover {
            cursor: pointer;
            color: red;    
        }
    }
`;
