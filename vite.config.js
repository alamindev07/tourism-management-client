import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import path from 'path'; // ✅ import 'path' to resolve the alias

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'), // ✅ Now you can use "@/hooks/..."
//     },
//   },
// });




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [
//     react()
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// });



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
//   optimizeDeps: {
//     include: ['swiper', 'daisyui'], 
//   },
//   build: {
//     rollupOptions: {
//       treeshake: false, 
//     },
//   },
// })
