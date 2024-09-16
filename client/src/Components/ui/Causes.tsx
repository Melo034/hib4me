import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';




const Causes = () => {
  interface Cause {
    name: string;
    image: string;
    condition: string;
    description: string;
    raised: number;
    goal: number;
  }
  
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await fetch("https://hib4me-server.vercel.app/api/donations/all"); // Update with your correct API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch causes");
        }
        const data = await response.json();
        setCauses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <section>
        <div className="max-w-screen-xl px-4 mx-auto text-white md:px-8">
          <div className="relative max-w-2xl mx-auto sm:text-center">
            <div className="relative z-10">
              <h1 className="pt-20 mx-auto text-4xl font-bold text-white sm:text-6xl">
                Our Causes
              </h1>
              <p className="mt-5 font-serif text-sm sm:text-xl">
                No amount is too small, lives are depending on your donations
              </p>
            </div>
          </div>
          <div className="relative pb-20 mt-12">
            <ul className="grid gap-8 lg:grid-cols-2">
              {causes.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-8 bg-white sm:flex-row rounded-xl"
                >
                  <div className="w-full h-96 sm:w-1/2">
                    <img
                      src={`http://localhost:3000${item.image}`} 
                      className="object-cover object-center w-full h-full shadow-md rounded-xl"
                      alt={item.name}
                    />
                  </div>
                  <div className="p-4 sm:mt-0 sm:w-1/2">
                    <h4 className="text-lg font-semibold text-black">
                      {item.name}
                    </h4>
                    <p className="py-2 text-black">
                      Condition: {item.condition}
                    </p>
                    <p className="mt-2 text-sm text-black">
                      {item.description}
                    </p>
                    <div className="relative max-w-sm py-3 mx-auto sm:mx-0">
                      <div className="flex h-3 bg-[#FED8B1] rounded-full">
                        <div
                          className="bg-[#9E6643] rounded-full"
                          style={{
                            width: `${(item.raised / item.goal) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Raised: ${item.raised}</span>
                      <span className="text-black">Goal: ${item.goal}</span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Link to="/donate" className="px-4 py-1 text-white bg-[#9E6643] rounded">
                        Donate
                      </Link>
                      <button className="px-4 py-1 text-[#9E6643] bg-white rounded border-2 border-[#9E6643]">
                        Share
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xl text-center text-white">
              There are many more patients in the system that are in need of
              financial aid.{" "}
              <a href="#" className="text-[#06A0C2]">
                See more...
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Causes;
