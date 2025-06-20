// src/pages/containers/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import HoloEffect from './HoloEffect';
import './index.css'; // Assuming you have a CSS file for styles
import { BrowserRouter } from 'react-router-dom';

interface Container {
  id: string;
  name: string[];
  image?: string;
  state?: string;
  status?: string;
}



const ContainerPage = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContainers = () => {
      axios.get('/api/containers')
        .then(res => {
          console.log("API Response:", res.data);
          setContainers(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log("API Error:", err);
          setError('Failed to load containers');
          setLoading(false);
        });
    };

    fetchContainers();
    const interval = setInterval(fetchContainers, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      {loading && <p className="text-center">Loading containers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mb-0">
          <p>Please checkout the newer version of this;
            <a target="_top" href="https://codepen.io/simeydotme/pen/abYWJdX">https://codepen.io/simeydotme/pen/abYWJdX</a>
          </p>
          <h1>Pokemon Card, Holo Effect</h1>
        </div>
      )}

      {!loading && !error && containers.length === 0 && (
        <p className="text-center text-gray-500">No containers found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {containers.map((container, index) => (
          <div key={container.id} className="card w-[71.5vw] h-[100vw] bg-gradient-to-br from-blue-900 via-indigo-800 to-indigo-900 text-white rounded-xl shadow-xl overflow-hidden relative font-mono hover:scale-105">
            <div style={{
              // position: 'absolute',
              bottom: '1rem',
              // left: '1rem',
              right: '1rem',
              // backgroundColor: 'rgba(0,0,0,0.2)',
              padding: '8px',
              borderRadius: '0.5rem',
              zIndex: 5,
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: 1.4,
              height: '100%',
            }}>

              {/* Header - Title & Status */}
              <div className="flex items-start justify-between gap-2 px-4 pt-3 pb-2 bg-black/30">
                <span className="absolute top-1 right-3 px-2 py-1 text-xs rounded-full ${c.status === 'running' ? 'bg-green-500' : 'bg-red-500'} font-bold shadow text-[min(12px,3.5vw)] ">
                  {container.state === 'running' ? '✅ Running' : '⛔ Stopped'}
                </span>
                
                <h2 className="text-center text-2xl font-bold uppercase mb-1 text-[min(12px,3.5vw)]">{container.image}</h2>



              </div>
              <div className="bg-black/60 text-xs px-2 py-1 rounded whitespace-nowrap">
                80:80
              </div>


              {/* Body */}
              <div className="px-4 py-3 space-y-1 text-sm">
                <div><strong>Image:</strong> nginx:latest</div>
                <div><strong>Status:</strong> Running</div>
                <div><strong>Type:</strong> Container</div>
                <div><strong>Created:</strong> 2 hours ago</div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 w-full px-4 py-2 text-[0.75rem] italic bg-black/40">
                “A lightweight and fast web server container built on the latest NGINX...”
              </div>


              {/* Card Image / Effect Placeholder */}

              {/* Card Info Section */}


              {/* Description / Flavor Text */}






            </div>
          </div>
        ))}
      </div>

      <style className="hover"></style>
      <section className="demo">
        <div className="card"></div>
        <span className="operator">+</span>
        <div className="card"><span>color-dodge</span></div>
        <span className="operator">+</span>
        <div className="card"><span>color-dodge</span></div>
      </section>


      <HoloEffect />
    </div>
  );
}

export default ContainerPage;
