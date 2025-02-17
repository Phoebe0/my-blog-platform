import {createRoot} from 'react-dom/client'
import AppRoutes from "./routes";
import {ClerkProvider} from '@clerk/clerk-react'
import {ToastContainer} from 'react-toastify';

// 使用TanStack Query来进行数据同步，并使用QueryClientProvider来提供QueryClient
// QueryClientProvider是一个React组件，它提供了一个QueryClient实例，用于管理和缓存查询结果
// QueryClient是一个React Query的核心类，它负责管理查询状态、缓存和执行查询
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <QueryClientProvider client={queryClient}>
            <AppRoutes/>
            <ToastContainer position='bottom-right'/>
        </QueryClientProvider>
    </ClerkProvider>
);