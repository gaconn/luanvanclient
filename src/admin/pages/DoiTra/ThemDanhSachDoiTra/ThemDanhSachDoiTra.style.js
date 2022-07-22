import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

`

export const Content = styled.div`
    margin: 30px;
    display: flex;
    form {
        width: 500px;
    }

    .order-section {
        width: 100%;
        border: 1px solid #999;
        box-shadow: 2px 2px 2px rgba(3,3,3,0.5);
        padding: 20px 10px;
        color: #333;
        font-size: 1rem;
    }
    h3{
        color: red;
        font-size 1.5rem;
        font-weight: bold;
    }
    .order-info{
        justify-content: space-around;
        font-weight: bold;
        span {
            color: blue;
        }
    }

    .order-function-list{
        list-style: none;
        padding: 0;
        margin: 0;
        li{
            color: #666;
            font-weight: bold;
            padding: 5px 10px;
            :hover{
                color: orange;
                cursor: pointer;
            }
        }
    }

    .order-bill {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #aaa;
        font-weight: bold;
    }
    .order-bill-list {
        width: 300px;
        margin: 0 auto;
        border: none;
        box-shadow: none;
    }

    .order-total {
        color: red;
        font-weight: bold;
    }
    .order-item-list-title {
        border-bottom: 2px solid #aaa;
        padding: 10px 0;
        font-weight: bold;
    }
    .order-item-value {
        border-bottom: 1px solid #bbb;
    }
`