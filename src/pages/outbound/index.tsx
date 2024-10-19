import { useEffect, useState } from "react";
import { API } from "../../libs";
import nodata from "../../../public/nodata.png"
import { LoadingData } from "../../dataTypes";



export default function Loading() {
  const [loadingData, setLoadingData] = useState<LoadingData[]>([]);

  const getLoading = async () => {
    try {
      const res = await API.get('/loading');
      setLoadingData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoading();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Header Section */}
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Outbound</h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      </div>

      {/* Table Section */}
      <div className="bg-orange-500 text-white rounded-t-lg p-4">
        <h3 className="text-lg font-semibold">
          Total Outbound Bag: {loadingData.length}
        </h3>
      </div>
      <div className="bg-white rounded-b-lg shadowCard overflow-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white">
            <tr className="border-t-2 border-white bg-orange-500">
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">Bag ID</th>
              <th className="px-4 py-2 border border-gray-200">Bag Weight</th>
              <th className="px-4 py-2 border border-gray-200">Start Time</th>
              <th className="px-4 py-2 border border-gray-200">End Time</th>
              <th className="px-4 py-2 border border-gray-200">Loaded By</th>
              <th className="px-4 py-2 border border-gray-200">Contact</th>
              <th className="px-4 py-2 border border-gray-200">Status</th>
              <th className="px-4 py-2 border border-gray-200">Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {loadingData.map((data, index) => (
              <tr
                key={data.id}
                className={`text-center ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}
              >
                <td className="px-4 py-2 border-r border-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.BagID}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.Bag_Weight}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {new Date(data.loadStartTime).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {new Date(data.loadEndTime).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.loadedBy}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.loader_contact}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.status}
                </td>
                <td className="px-4 py-2 border-l border-gray-500">
                  {data.vehicle}
                </td>
              </tr>
            ))}
            {loadingData.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={nodata}
                      alt="No Data"
                      className="w-40 mb-4"
                    />
                    <span className="text-gray-500">Tidak ada data</span>
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