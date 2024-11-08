import { useEffect, useState } from "react";
import nodata from "../../../public/nodata.png"
import { LoadingData } from "../../dataTypes";
import {  API_Header } from "../../libs";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const [loadingData, setLoadingData] = useState<LoadingData[]>([]);

  const getLoading = async () => {
    try {
      const res = await API_Header.get('/loading');
      setLoadingData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const handleScan = () => {
    navigate('/scan/outbound');
  };

  useEffect(() => {
    getLoading();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-300">
    {/* Header Section */}
    <h1 className="text-3xl font-bold text-center">Dashboard Outbound</h1>

    {/* Status Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    </div>

    {/* Table Section */}
    <div className="bg-orenPos text-white rounded-t-lg p-4 flex justify-between items-center">
<h3 className="text-lg font-semibold">
  Total Bag: {loadingData.length}
</h3>

{/* Search Input */}
<div className="flex-grow mx-4 rounded-2xl">
  <input
    type="text"
    placeholder="Search by Bag ID"
    className="w-full p-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-gray-300"
  />
</div>

<div className="py-2 px-5 bg-orange-500 rounded cursor-pointer" onClick={handleScan} >
  <h3 className="text-lg font-semibold">Scan</h3>
</div>
</div>
      <div className="bg-white rounded-b-lg shadowCard overflow-auto">
        <table className="w-full text-left table-auto border-collapse">
        <thead className="text-white">
            <tr className="border-t-2 border-white bg-orenPos">
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">Bag ID</th>
              <th className="px-4 py-2 border border-gray-200">PID</th>
              <th className="px-4 py-2 border border-gray-200">Bag Weight</th>
              <th className="px-4 py-2 border border-gray-200">Total Package</th>
              <th className="px-4 py-2 border border-gray-200">
              Receiver
              </th>
              <th className="px-4 py-2 border border-gray-200">
                Location
              </th>
              <th className="px-4 py-2 border border-gray-200">Status</th>
              <th className="px-4 py-2 border border-gray-200">Scanned at</th>
            </tr>
          </thead>
          <tbody>
          {loadingData.map((data, index) => (
              <tr
                key={data.id}
                className={`text-center cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => navigate(`/loading/${data.id}`)}
              >
                
                <td className="px-4 py-2 border-r  border-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.BagID}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.PID}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.weight} kg
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.total}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.receiver_name}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.destination}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.status}
                </td>
                <td className="px-4 py-2 border-l  border-gray-500">
                  {data.scanned_at}
                </td>
              </tr>
            ))}
            {/* Tampilkan jika no data found */}
            {loadingData.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={nodata}
                      alt="No Data"
                      className="w-40 mb-4"
                    />
                    <span className="text-gray-500">no data found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
