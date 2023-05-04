import { useEffect } from "react";

import { useAppContext } from "../context/appContext";

const AllData = () => {
  const { fetchAllData, data, loading, error } = useAppContext();

  useEffect(() => {
    fetchAllData();
  }, []);

  if (!data) {
    return <div>No data available</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Email: {item.email}</p>
          <p>Gender: {item.gender}</p>
          <p>
            Address: {item.address.street}, {item.address.city}
          </p>
          <p>Phone: {item.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default AllData;
