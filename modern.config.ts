import { appTools, defineConfig } from '@modern-js/app-tools';
import { ssgPlugin } from '@modern-js/plugin-ssg';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  output: {
    ssg: {
      routes: [
        {
          url: '/posts/:post',
          params: [{ post: 'my-first-post' }],
        },
        {
          url: '/reading-list/',
        },
      ],
    },
  },
  server: {
    ssr: process.env.NODE_ENV === 'development',
  },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
    ssgPlugin(),
  ],
});
