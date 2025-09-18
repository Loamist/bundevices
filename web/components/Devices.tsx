import { useQuery } from '@tanstack/react-query';

interface Device {
  id: number;
  name: string;
  status: 'online' | 'offline';
}

async function fetchDevices(): Promise<Device[]> {
  const response = await fetch(`${process.env.BUN_PUBLIC_API_URL}/api/devices`);
  if (!response.ok) {
    throw new Error('Failed to fetch devices');
  }
  return response.json();
}

export default function Devices() {
  const {
    data: devices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading devices...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading devices</h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {devices?.map((device) => (
                  <tr key={device.id} className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.id}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{device.name}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {device?.status ?? '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
