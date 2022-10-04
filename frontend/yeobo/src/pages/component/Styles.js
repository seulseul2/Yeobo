// Styles.js
import styled from "styled-components";

export const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(9, 9, 9, 0.6);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoadingText = styled.div`
    font: 1.5rem "Noto Sans KR";
    text-align: center;
  color: white;
`;
