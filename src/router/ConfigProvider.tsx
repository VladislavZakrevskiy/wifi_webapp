import { RouterProvider } from 'react-router-dom'
import { router } from './routerConfig'

export const ConfigProvider = () => {
    return <RouterProvider router={router} />
}
