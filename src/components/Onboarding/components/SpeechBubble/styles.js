import styled from 'styled-components'

export const SpeechBubbleContainer = styled.div`
  .container {
    display: inline-flex;
    user-select: none;
    cursor: pointer;
    margin: 0px 0px;
    -webkit-tap-highlight-color: transparent;
  }

  .bubble {
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 40px;
    left: 40px;
    background: #fff;
    border-radius: 50%;
    z-index: 999;
    animation: fadeIn ease-in-out 0.25s;
  }

  .tooltipContent {
    color: #212529;
    position: absolute;
    z-index: 1000;
    left: 40px;
    bottom: 40px;
    padding: 15px 25px;
    padding-bottom: 5px;
    font-size: 13px;
    width: 200px;
    min-width: 250px;
    max-width: 300px;
    cursor: default;
    border-radius: 8px;
    line-height: 20px;
    font-weight: 500;
    background-color: #fff;
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.16);
    animation: fadeIn ease-in-out 0.45s;
  }
  .tooltipContent.sm {
    max-width: 23rem;
  }
  .tooltipContent.md {
    max-width: 40rem;
  }
  .arrow {
    position: absolute;
    width: 0;
    height: 0;
  }
  .top {
    bottom: calc(100% + 15px);
    left: 40px;
  }
  .top .arrow {
    bottom: -15px;
    left: calc(40px);
    border-right: 20px solid transparent;
    border-top: 20px solid #fff;
  }
  .right .arrow,
  .left .arrow,
  .center .arrow {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .center .arrow {
    left: -8px;
    border-right: 10px solid #fff;
  }
  .right {
    left: calc(100% + 10px);
  }
  .right .arrow {
    left: -8px;
    border-right: 10px solid #fff;
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
    border-left: 10px solid #fff;
  }
  .bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }
  .bottom .arrow {
    top: -8px;
    left: calc(50% - 10px);
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
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

  .cancel {
    text-align: right;
  }
  .cancel img {
    width: 17px;
    cursor: pointer;
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
