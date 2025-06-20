// pages/index.tsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🏠 Home</h1>
      <Link to="/containers" className="text-blue-600 underline">Go to Containers</Link>
    </div>
  );
};

export default HomePage;
