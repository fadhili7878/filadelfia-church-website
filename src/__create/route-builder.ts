/// <reference types="vite/client" />
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from './fetch';
import path from 'node:path';

const API_BASENAME = '/api';
const api = new Hono();

// Get current directory - different paths for dev vs production
const currentDir = fileURLToPath(new URL('.', import.meta.url));
let __dirname: string;

if (import.meta.env.DEV) {
  // In development: src/__create/route-builder.ts -> ../app/api
  __dirname = join(currentDir, '../app/api');
  console.log('DEV mode - API directory:', __dirname);
} else {
  // In production: find the actual src/app/api directory from the build
  // Navigate up from build/server/assets to the project root, then to src/app/api
  const projectRoot = join(currentDir, '../../../..');
  __dirname = join(projectRoot, 'src/app/api');
  console.log('PROD mode - API directory:', __dirname);
}

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Recursively find all route.js files
async function findRouteFiles(dir: string): Promise<string[]> {
  try {
    const files = await readdir(dir);
    let routes: string[] = [];

    for (const file of files) {
      try {
        const filePath = join(dir, file);
        const statResult = await stat(filePath);

        if (statResult.isDirectory()) {
          routes = routes.concat(await findRouteFiles(filePath));
        } else if (file === 'route.js') {
          // Handle root route.js specially
          if (filePath === join(__dirname, 'route.js')) {
            routes.unshift(filePath); // Add to beginning of array
          } else {
            routes.push(filePath);
          }
        }
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    }

    return routes;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    // Return empty array if directory doesn't exist (production build)
    return [];
  }
}

// Helper function to transform file path to Hono route path
function getHonoPath(routeFile: string): { name: string; pattern: string }[] {
  const relativePath = routeFile.replace(__dirname, '');
  const parts = relativePath.split('/').filter(Boolean);
  const routeParts = parts.slice(0, -1); // Remove 'route.js'
  if (routeParts.length === 0) {
    return [{ name: 'root', pattern: '' }];
  }
  const transformedParts = routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
  return transformedParts;
}

// Register a single route with lazy import
function registerRouteLazy(path: string, importFn: () => Promise<any>) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  
  for (const method of methods) {
    const methodLowercase = method.toLowerCase();
    const handler: Handler = async (c) => {
      const params = c.req.param();
      const route = await importFn();
      if (route[method]) {
        return await route[method](c.req.raw, { params });
      }
      return c.notFound();
    };
    
    switch (methodLowercase) {
      case 'get':
        api.get(path, handler);
        break;
      case 'post':
        api.post(path, handler);
        break;
      case 'put':
        api.put(path, handler);
        break;
      case 'delete':
        api.delete(path, handler);
        break;
      case 'patch':
        api.patch(path, handler);
        break;
    }
  }
}

// Synchronous function for production route registration
function registerProductionRoutes() {
  console.log('Registering API routes (production mode with lazy loading)');
  
  registerRouteLazy('/auth/token', () => import('../app/api/auth/token/route.js'));
  registerRouteLazy('/auth/expo-web-success', () => import('../app/api/auth/expo-web-success/route.js'));
  // Skip ssr-test route as it's only needed for development
  
  console.log('Successfully registered 2 API routes (lazy)');
}

// Async function for development route registration
async function registerDevelopmentRoutes() {
  // In development, scan for routes dynamically
  const apiDir = path.resolve(__dirname, '../app/api');
  console.log(`Looking for API routes in: ${apiDir}`);
  
  const routeFiles = await findRouteFiles(apiDir).catch((error) => {
    console.error('Error finding route files:', error);
    return [];
  });

  if (routeFiles.length === 0) {
    console.log('No API route files found, skipping route registration');
    return;
  }

  const sortedRouteFiles = routeFiles
    .slice()
    .sort((a, b) => b.length - a.length);

  // Clear existing routes before registering new ones
  api.routes = [];

  for (const routeFile of sortedRouteFiles) {
    // Skip auth routes that conflict with built-in auth handler
    if (routeFile.includes('/api/auth/') && !routeFile.includes('/api/auth/token')) {
      console.log(`Skipping auth route: ${routeFile}`);
      continue;
    }
    
    try {
      const route = await import(/* @vite-ignore */ `${routeFile}?update=${Date.now()}`);

      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      for (const method of methods) {
        try {
          if (route[method]) {
            const parts = getHonoPath(routeFile);
            const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
            const handler: Handler = async (c) => {
              const params = c.req.param();
              const updatedRoute = await import(
                /* @vite-ignore */ `${routeFile}?update=${Date.now()}`
              );
              return await updatedRoute[method](c.req.raw, { params });
            };
            const methodLowercase = method.toLowerCase();
            switch (methodLowercase) {
              case 'get':
                api.get(honoPath, handler);
                break;
              case 'post':
                api.post(honoPath, handler);
                break;
              case 'put':
                api.put(honoPath, handler);
                break;
              case 'delete':
                api.delete(honoPath, handler);
                break;
              case 'patch':
                api.patch(honoPath, handler);
                break;
              default:
                console.warn(`Unsupported method: ${method}`);
                break;
            }
          }
        } catch (error) {
          console.error(`Error registering route ${routeFile} for method ${method}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error importing route file ${routeFile}:`, error);
    }
  }
  
  console.log(`Successfully registered ${sortedRouteFiles.length} API routes`);
}

// Initialize routes based on environment
if (import.meta.env.PROD) {
  registerProductionRoutes();
} else {
  registerDevelopmentRoutes().catch((err) => {
    console.error('Failed to initialize routes:', err);
  });
}

// Hot reload routes in development
if (import.meta.env.DEV) {
  import.meta.glob('../src/app/api/**/route.js', {
    eager: true,
  });
  if (import.meta.hot) {
    import.meta.hot.accept((newSelf: any) => {
      registerDevelopmentRoutes().catch((err) => {
        console.error('Error reloading routes:', err);
      });
    });
  }
}

export { api, API_BASENAME };
