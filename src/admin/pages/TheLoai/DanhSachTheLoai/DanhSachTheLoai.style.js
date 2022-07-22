import styled from "styled-components";

export const Container = styled.div`
`

export const Content = styled.div`
    display: flex;
    .category-item-icon {
        color: #666;
        font-size: 1.2rem;
        padding: 0 3px;
        :hover{
            cursor: pointer;
            color: orange;
        }
    }
    .category-item-detail {
        flex-grow:1;
        display: flex;
        margin:0 auto;
    }
    .category-container{
        width: 500px;
        height: 100vh;
        padding: 10px;
        background: #eee;
        position: sticky;
        top: 0;
        left: 0;
        overflow-y: scroll;
        overflow-x: hidden;

        ::-webkit-scrollbar{
            width: 4px;
        }
        ::-webkit-scrollbar-track {
            background: #35404d;

        }
        ::-webkit-scrollbar-thumb {
            background: #888;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #FF6C60;
        }
        .category-list{
            padding: 0 0 0 10px;
            margin: 0;
            width: 100%;
            
            .category-item{
                width: 100%;
                
                padding: 0px 0 0 10px;
                border-left: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                display: flex;
                justify-content:center;
                flex-direction: column;
                .category-item-parent{
                    display: flex;
                }
                .category-item-icon-hide:hover,
                .category-item-icon-show:hover{
                    color: orange;
                    cursor: pointer;
                }
                .category-item-text{
                    min-width: 200px;
                }
                .category-item-text:hover{
                    color: blue;
                    cursor:pointer;
                }

                .category-item-icon-hide,
                .category-item-icon-show,
                .category-load{
                    width: 30px;
                }
            }
        }
    }

`