import styled from 'styled-components';

export const PageWrapper = styled.div`
    width: 80%;
    max-width: 600px;
    height: 100%;
    position: relative;
    margin: 0 auto;
    font-size: 16px;
    /* background-color: #fefefe; */
    /* box-shadow: 2px 3px 5px 2px #eeeded; */

    /* @media (min-width: 700px) {
        width: 60%;
    } */
`

export const SectionWrapper = styled.div`
    p {
        font-size: 18px;
    }

    .rowWrapper {
        display: flex;
        width: 100%;

        .colWrapper {
            flex: 1 1 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            
            img, video {
                width: 80%;
            }
        }
    }
`

export const ComparisonWrapper = styled.div`
    h3::before {
        content: '';
        position: relative;
        background-color: #404040;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 10px;
        transform: translateY(-3px);
    }

    p {
        text-indent:2rem;
    }
`