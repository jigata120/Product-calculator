import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://product-calculator-1-wu2x.onrender.com',
  test:{
    environment: 'jsdom'
  },
  setupFiles:'./tests/setup.js'
})
