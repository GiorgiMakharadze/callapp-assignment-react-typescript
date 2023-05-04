import { useEffect } from "react";
import useDataStore from "../store";

const Table = () => {
  const { data, fetchData } = useDataStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  if (!Array.isArray(data)) {
    console.log("Data is not an array:", data);
    return <div>Error: Data is not an array</div>;
  }

  console.log("Data:", data);
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          {/* Add more header columns as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td></td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            {/* Add more body columns as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
