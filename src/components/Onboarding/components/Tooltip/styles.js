import styled from 'styled-components'

export const TooltipContainer = styled.div`
  user-select: none;
  cursor: pointer;
  margin: 0px 0px;
  -webkit-tap-highlight-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;

  .tooltipContent {
    color: ${(props) => props.theme.palette.common.white};
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px 25px;
    padding-bottom: 5px;
    font-size: 13px;
    width: 500px;
    max-width: 500px;
    cursor: default;
    line-height: 20px;
    font-weight: 500;
    background-color: ${(props) => props.theme.palette.background.paper};
    border: 1px solid #999;
    z-index: 99999999;
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.16);
    margin-left: 5px;
  }
  .tooltipContent.sm {
    max-width: 23rem;
  }
  .tooltipContent.md {
    max-width: 40rem;
  }
  .cancel {
    text-align: right;
  }

  .arrow {
    position: absolute;
    width: 0;
    height: 0;
  }
  .top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }
  .top .arrow {
    bottom: -8px;
    left: calc(50% - 10px);
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
    border-left: 10px solid transparent;
  }
  .right .arrow,
  .left .arrow,
  .center .arrow {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .center .arrow {
    left: -8px;
    border-right: 10px solid #999;
  }
  .right {
    left: calc(100% + 10px);
  }
  .right .arrow {
    top: 10px;
    left: -10px;
    border-right: 10px solid #999;
  }
  .left {
    right: calc(100% + 8px);
  }
  .center {
    left: 50%;
    /* top: 50%; */
  }
  .left .arrow {
    right: -8px;
    border-left: 10px solid #999;
  }
  .bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
  }
  .bottom .arrow {
    top: -10px;
    left: calc(50% - 10px);
    border-right: 10px solid transparent;
    border-bottom: 10px solid #999;
    border-left: 10px solid transparent;
  }

  .align-center {
    /* margin-top: 10px; */
    display: flex;
    justify-content: space-between;
  }

  button {
    padding: 7px 20px;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    margin: 20px 0px;
    /* margin: 10px 5px; */
  }

  button:focus {
    outline: none;
  }

  .button-primary {
    background: rgb(22, 158, 158);
    border: 1px solid rgb(22, 158, 158);
    color: #fff;
    font-weight: 900;
  }

  .button-secondary {
    border: 1px solid #fff;
    color: rgb(22, 158, 158);
    font-weight: 900;
    background: rgb(243, 240, 240);
  }

  .exclude {
    background-color: white;
    border-radius: 50%;
    z-index: 999;
    padding: 15px !important;
    margin-left: 25px;
    opacity: 1;
  }

  .overlayZ {
    z-index: 999;
  }

  section {
    background: #00000085;
    z-index: 1;
    position: absolute;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
