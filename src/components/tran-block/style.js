import styled from 'styled-components';

export const TransWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    top: 10%;
    width: 80%;
    height: 80%;
    align-items: center;
    justify-content: space-evenly;

    .draggerArea {
        flex: 0 0 40%;
        width: 100%;
    }

    .resultArea {
        align-self: flex-start;
        background-color: #fcfcfcf3;
        box-shadow: 0 0 2px #CCC inset;
        overflow: auto;

        .displayDragger {
            height: 0;
            visibility: hidden;
        }

        .ant-upload-list-item {
            margin-top: 0;
            border: none;
            border-bottom: 1px solid rgba(228, 228, 228, 0.7);
        }
    }

    @media (min-width: 710px) {
        flex-direction: row;
        width: 90%;
        height: 60%;
        top: 15%;

        .draggerArea {
            height: 100%;
        }
    }
`