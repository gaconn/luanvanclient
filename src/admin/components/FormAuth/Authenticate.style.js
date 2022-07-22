import styled from "styled-components";


export const Container =styled.div`
    display: flex ;
    justify-content: center;
    padding: 20px ;
    .notify-message {
        color: white;
    }
`;

export const Content = styled.div`
    min-width: 400px;
    .auth-title{
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;  
    }
    .auth-switch{
        text-align: end;
        font-size: 1rem;
        font-weight: bold;
        color: #75a1cc;
        cursor: pointer;
        :hover{
            color: #1881ea;
        }
    }
    .auth-button {
        width: 100% ;
        display:flex ;
        justify-content: center;
    }
    
`;

