/// <reference types="vite/client" />
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

// Get current directory - different paths for dev vs production
const currentDir = fileURLToPath(new URL('.', import.meta.url));
let __dirname: string;

if (import.meta.env.DEV) {
  // In development: __create/route-builder.ts -> ../src/app/api
  __dirname = join(currentDir, '../src/app/api');
} else {
  // In production: find the actual src/app/api directory from the build
  // Navigate up from build/server/assets to the project root, then to src/app/api
  const projectRoot = join(currentDir, '../../../..');
  __dirname = join(projectRoot, 'src/app/api');
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

// Register a single route
function registerRoute(path: string, route: any) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  for (const method of methods) {
    if (route[method]) {
      const handler: Handler = async (c) => {
        const params = c.req.param();
        return await route[method](c.req.raw, { params });
      };
      const methodLowercase = method.toLowerCase();
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
}

// Import and register all routes
async function registerRoutes() {
  // Clear existing routes  
  api.routes = [];

  if (import.meta.env.PROD) {
    // In production, use static imports
    console.log('Registering API routes (production mode)');
    try {
      const tokenRoute = await import('../src/app/api/auth/token/route.js');
      registerRoute('/auth/token', tokenRoute);
      
      const expoRoute = await import('../src/app/api/auth/expo-web-success/route.js');
      registerRoute('/auth/expo-web-success', expoRoute);
      
      const ssrTestRoute = await import('../src/app/api/__create/ssr-test/route.js');
      registerRoute('/__create/ssr-test', ssrTestRoute);
      
      console.log('Successfully registered 3 API routes');
    } catch (error) {
      console.error('Error importing static routes:', error);
    }
  } else {
    // In development, scan for routes dynamically
    console.log(`Looking for API routes in: ${__dirname}`);
    
    const routeFiles = await findRouteFiles(__dirname).catch((error) => {
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

    for (const routeFile of sortedRouteFiles) {
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
}

// Initial route registration
await registerRoutes();

// Hot reload routes in development
if (import.meta.env.DEV) {
  import.meta.glob('../src/app/api/**/route.js', {
    eager: true,
  });
  if (import.meta.hot) {
    import.meta.hot.accept((newSelf: any) => {
      registerRoutes().catch((err) => {
        console.error('Error reloading routes:', err);
      });
    });
  }
}

export { api, API_BASENAME };
