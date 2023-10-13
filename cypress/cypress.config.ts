import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'bqjw7h',
  e2e: {
    baseUrl: 'http://localhost:5000',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
