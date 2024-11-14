import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        __API__: JSON.stringify('http://localhost:3000'),
        __MODE__: JSON.stringify("dev"),
        __IMAGE_BUCKET__: JSON.stringify("http://localhost:3000/static/"),
        __BOT_USERNAME__: JSON.stringify("naitikanal_bot")
    },
})
