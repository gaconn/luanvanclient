import styled from 'styled-components'


export const Container = styled.div`
    border-bottom: 1px solid #666;
    border-left: 1px solid #666;
    padding-left: 10px;
    .category-item-add{
        display: flex;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-left: 10px;
        .category-add-icon {
            border: 1px solid green;
            padding: 5px;
            :hover{
                cursor: pointer;
                color: green;
            }
        }
    }
`