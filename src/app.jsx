import { QueryClient, QueryClientProvider } from 'react-query'
import HotelList from './components/hotel-list/hotel-list'
import 'antd/dist/antd.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HotelList />
  </QueryClientProvider>
)

export default App
