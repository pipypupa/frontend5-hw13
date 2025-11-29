import React, { Component } from "react";
import styled from "styled-components";

class ModalWithTimer extends Component {
  state = {
    isOpen: false,
    timer: 0,
  };

  intervalId = null;

  openModal = () => {
    this.setState({ isOpen: true, timer: 0 }, () => {
      this.startTimer();
    });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    this.clearTimer();
  };

  startTimer = () => {
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer + 1 }));
    }, 1000);
  };

  clearTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      this.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.clearTimer();
  }

  render() {
    return (
      <AppContainer>
        <TimerDisplay>Таймер: {this.state.timer} сек.</TimerDisplay>
        <OpenButton onClick={this.openModal}>
          Відкрити модальне вікно
        </OpenButton>

        {this.state.isOpen && (
          <Backdrop onClick={this.closeModal}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
              <h2>Модальне вікно</h2>
              <p>Натисніть Escape для закриття</p>
              <CloseButton onClick={this.closeModal}>Закрити</CloseButton>
            </ModalBox>
          </Backdrop>
        )}
      </AppContainer>
    );
  }
}

export default ModalWithTimer;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 15px;
`;

const TimerDisplay = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  background: #f0f0f0;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OpenButton = styled.button`
  padding: 10px 25px;
  background: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: pink;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 10px;
  min-width: 500px;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 15px;
  padding: 8px 15px;
  background: black;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: crimson;
    transform: translateY(-2px);
  }
`;
