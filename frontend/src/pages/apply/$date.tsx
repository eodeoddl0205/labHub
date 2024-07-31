import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MapContainer = styled.div`
`

const ApplyPage = () => {
  const { date } = useParams<{ date: string }>();

  return (
    <div>
      <h1>Apply Page</h1>
      <p>Date: {date}</p>
      <MapContainer>
        
      </MapContainer>
    </div>
  );
};

export default ApplyPage;