import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    min-width: 300px;
    background: #2a3542;
    font-size: 0.8rem;
    position: sticky ;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
`

export const Content = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    width: 300px;
    justify-content: space-between;

    .side-bar-list-1{
        overflow-y: scroll;
        overflow-y: overlay;
        height: 80vh;
        border-bottom: 1px solid #fff;
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
    }

`

export const List = styled.ul`
    list-style: none;
    padding: 0px 0;
    width: 300px;
    .side-bar-item-expand-list {
        background: #35404d ;
        padding: 0px 0px;
        margin: 0 0px;
        .side-bar-item-expand-item{
            display: flex;
            flex-direction: column;
        }
    }
    .side-bar-item-label-focus {
        background: #35404d;
    }
    .side-bar-item-sub{
    }
`

export const Item = styled.li`
    padding: 0px 0px;
    line-height: 2rem;
    display: flex;
    color: #bbb;
    width: 100%;
    flex-direction: column;
    .side-bar-item-control{
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 10px 20px;
        line-height: 2rem;
        text-decoration: none;
        color: inherit;
    }
    .side-bar-item-label{
        flex-grow: 1;
        width: 190px;
        word-wrap: break-word;
        a {
            text-decoration: none;
            color: inherit;
        }
    }
    :hover{ 
        color: #fff;
        background: #35404d;
        cursor: pointer;
    }
    :hover .side-bar-item-icon{ 
        color: #FF6C60;
    }
    .side-bar-item-sub:hover .side-bar-item-icon-sub {
        color: #FF6C60;
    }
    .side-bar-item-icon,.side-bar-item-icon-sub{
        padding: 0 20px;
        font-size: 1.2rem;
        
    }
    .side-bar-item-icon-expand{
        padding: 0 10px;
    }

    @media only screen and (max-width: 768px) {
        .side-bar-item-label,.side-bar-item-icon-expand {
            display: none;
        }
        .side-bar-item-control {
            padding: 10px 0px;
        }
    }

`