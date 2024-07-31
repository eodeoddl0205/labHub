import React, { useEffect, useState, useRef } from 'react';
import Loader from "../../components/CustomFeatures/Loader";
import ModalComponent from "../../components/CustomFeatures/CustomModal";
import Notification, { NotificationRef } from '../../components/CustomFeatures/Notification';
import styled from 'styled-components';
import CountingNumber from '../../components/CustomFeatures/CountingNumber';

const Index: React.FC = () => {
  // 모달 사전 설정
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
    console.log(id);
    closeModal();
  };

  // 로딩 사전 설정
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 노티피케이션 사전 설정
  const notificationRef = useRef<NotificationRef>(null);
  const [notificationTime, setNotificationTime] = useState(1000);
  
  const [notificationType, setNotificationType] = useState<'default' | 'success' | 'error' | 'warning' | 'info'>('default');
  const [notificationMessage, setNotificationMessage] = useState('test');
  const handleNotify = () => {
    if (notificationRef.current) {
      notificationRef.current.notify(notificationMessage, notificationType);
    }
  };

  return (
    <>
      {/*모달*/}
      <h1>모달</h1>
      <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal} title='커스텀' buttons={modalButtons} showCloseButton={false}><h1></h1><input></input></ModalComponent>
      <OpenButton onClick={openModal}>Open Custom Modal</OpenButton>
      <br/>
      {/*노티피케이션*/}
      <h1>노티피케이션</h1>
      <label>
        내용:
        <input value={notificationMessage} onChange={(e) => { setNotificationMessage(e.target.value) }}></input>
      </label>
      <br />
      <label>
        시간:
        <input value={notificationTime} onChange={(e) => { setNotificationTime(Number(e.target.value)) }}></input>
      </label>
      <br />
      <Select value={notificationType} onChange={(e) => setNotificationType(e.target.value as 'default' | 'success' | 'error' | 'warning' | 'info')}>
        <option value="default">Default</option>
        <option value="success">Success</option>
        <option value="error">Error</option>
        <option value="warning">Warning</option>
        <option value="info">Info</option>
      </Select>
      <button onClick={handleNotify}>Notify!</button>
      <br />
      <Notification ref={notificationRef} closeTime={notificationTime} />
      {/*카운트 */}
      <h1>카운트</h1>
      <CountingNumber initialCount={1000} duration={3000}/>
      {/*로딩 */}
      <h1>로딩</h1>
      {loading ? (
        <div style={{ width: "120px" }}>
          <Loader loading={loading} color="#4caf50" size={60} message="로딩중..." bgColor="rgba(255, 255, 255, 0.1)" />
        </div>
      ) : (
        <div>로더 테스트 완료</div>
      )}
    </>
  );
};

export default Index;

const OpenButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Select = styled.select`
  margin-top: 10px;
  padding: 5px;
  font-size: 16px;
`;