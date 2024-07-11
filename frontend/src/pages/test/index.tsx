import React, { useEffect, useState, useRef } from 'react';
import Loader from "../../components/Loader";
import ModalComponent from "../../components/CustomModal"
import Notification, { NotificationRef } from '../../components/Notification';
import styled from 'styled-components';

const Index: React.FC = () => {
  //모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const modalButtons = [
    { id: 'button1', label: 'Button 1', onClick: () => handleButtonClick('button1'), color: '#007bff' },
    { id: 'button2', label: 'Button 2', onClick: () => handleButtonClick('button2'), color: '#dc3545' },
    { id: 'button3', label: 'Button 3', onClick: () => handleButtonClick('button3'), color: '#ffffff' },
    { id: 'button4', label: 'Button 4', onClick: () => handleButtonClick('button4'), color: '#d4d4d4' },
  ];

  const handleButtonClick = (id: string) => {
    console.log(id)
    closeModal();
  };


  //로딩 관련
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  // 노티피케이션 관련
  const notificationRef = useRef<NotificationRef>(null);
  const handleNotify = () => {
    if (notificationRef.current) {
      notificationRef.current.notify("정보! 이승찬 곰돌이 찢어버린다", 'info');
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div style={{width:"120px"}}>
            <Loader loading={loading} color="#4caf50" size={60} message="페이지 로딩중..." bgColor="rgba(255, 255, 255, 0.1)" />
          </div>
        </>
      ) : (
      <>
        <div>반가워</div>
      </>
      )}
      <OpenButton onClick={openModal}>Open Custom Modal</OpenButton>
      <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal} title='커스텀' buttons={modalButtons} showCloseButton={true}><p>커스텀모달입니다.</p></ModalComponent>
      <button onClick={handleNotify}>Notify!</button>
      <Notification ref={notificationRef} />
    </>
  )
}

export default Index;

const OpenButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;