import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Devices from './components/Devices';
import Layout from './components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full bg-gray-100">
        <Layout title="NodeVices">
          <Devices />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
