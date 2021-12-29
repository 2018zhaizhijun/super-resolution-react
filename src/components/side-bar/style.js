import styled from 'styled-components';

export const SidebarWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 150px;
    height: 100%;
    box-shadow: 1px 1px 2px 2px #eeeded;
    background-color: #fcfcfc;
    z-index: 1;
    transition: left 0.5s;

    .sidebar-link {
        text-decoration: none;
        outline: none;
        color: #292828;
        padding: 20px 0;
        width: 100%;
        transition: color 0.3s;
        text-align: center;
        border-bottom: 1px solid #ececebe7;

        &:hover {
            text-decoration: none;
            color: #fcfcf7;
            background-color: #a0a0a0;
        }
    }

    .active-link {
        background-color: #a0a0a0;
        color: #fcfcf7;
    }
`