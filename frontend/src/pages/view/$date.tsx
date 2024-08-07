import { useParams } from 'react-router-dom';

const ViewPage = () => {
  const { date } = useParams<{ date: string }>();

  return (
    <div>
      
      <h1>View Page</h1>
      <p>Date: {date}</p>
    </div>
  );
};

export default ViewPage;