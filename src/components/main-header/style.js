import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    font-size: 1.1rem;
    background-color: #fcfcfc;
    box-shadow: 0 1px 2px 2px #eeeded;
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    i {
        font-style: normal;
    }

    .nav-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        line-height: 60px;
        height: 100%;

        .header-link {
            text-decoration: none;
            outline: none;
            color: #292828;
            padding: 0 20px;
            height: 100%;
            transition: color 0.3s;

            &:hover {
                text-decoration: none;
                color: #fcfcf7;
                background-color: #a0a0a0;
            }
        }
    }

    .active-link {
        background-color: #a0a0a0;
        
        i {
            color: #fcfcf7;
        }
    }

    .logo-menu {
        height: 100%;
        display: flex;
        align-items: center;

        img {
            display: block;
            margin: 0 auto;
            height: 90%;
            padding: 0 20px;
        }

        .icon {
            padding-left: 15px;
        }
    }

    .usr-menu {
        height: 100%;
        margin-left: auto;

        .drop-menu {
            height: 100%;
            display: flex;
            align-items: center;

            img {
                display: block;
                border-radius: 50%;
                height: 90%;
                padding: 0 5px;
            }

            .icon {
                padding: 0 8px;
            }
        }

        .login-link {
            line-height: 60px;
            text-decoration: none;
            outline: none;
            color: #292828;
            padding: 0 20px;
            transition: color 0.3s;

            &:hover {
                color: #4d6cf5;
                cursor: pointer;
            }
        }

    }

    .hidden {
        display: none;
    }

`

export const ProfileMenu = styled.div`
    background-color: #fcfcfc;
    box-shadow: 0 1px 2px 2px #eeeded;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 180px;
    right: 5px;

    i {
        font-style: normal;
    }

    .info-disp {
        background-color: #f5f4f4;
        width: 100%;
        padding: 10px 0;

        .info-li {
            padding: 5px 0;
            text-indent: 5px;

            .icon {
                padding: 0 8px;
            }
        }

        .conceal {
            visibility: hidden;
        }
    }

    .menu-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: center;

        .menu-logout {
            height: 55px;
            line-height: 55px;
            transition: color 0.3s;

            &:hover {
                color: #4d6cf5;
                cursor: pointer;
            }
        }

        /* .menu-item {
            width: 100%;
            border-bottom: 1px solid #ececebe7;
            height: 55px;

            .menu-link {
                color: #292828;
                text-decoration: none;
                outline: none;
                height: 100%;
                width: 100%;
            }

            &:hover {
                text-decoration: none;
                background-color: #a0a0a0;

                .menu-link {
                    color: #fcfcf7;
                }
            }
        } */

        .menu-link {
            text-decoration: none;
            outline: none;
            color: #292828;
            width: 100%;
            height: 55px;
            line-height: 55px;
            transition: color 0.3s;

            &:hover {
                color: #fcfcf7;
                background-color: #a0a0a0;
            }
        }

        .active-link {
            background-color: #a0a0a0;
            color: #fcfcf7;
        }
    }

`
