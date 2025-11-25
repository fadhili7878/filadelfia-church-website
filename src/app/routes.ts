import { readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	type RouteConfigEntry,
	index,
	route,
} from '@react-router/dev/routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type Tree = {
	path: string;
	children: Tree[];
	hasPage: boolean;
	isParam: boolean;
	paramName: string;
	isCatchAll: boolean;
};

function buildRouteTree(dir: string, basePath = ''): Tree {
	const files = readdirSync(dir);
	const node: Tree = {
		path: basePath,
		children: [],
		hasPage: false,
		isParam: false,
		isCatchAll: false,
		paramName: '',
	};

	// Check if the current directory name indicates a parameter
	const dirName = basePath.split('/').pop();
	if (dirName?.startsWith('[') && dirName.endsWith(']')) {
		node.isParam = true;
		const paramName = dirName.slice(1, -1);

		// Check if it's a catch-all parameter (e.g., [...ids])
		if (paramName.startsWith('...')) {
			node.isCatchAll = true;
			node.paramName = paramName.slice(3); // Remove the '...' prefix
		} else {
			node.paramName = paramName;
		}
	}

	for (const file of files) {
		const filePath = join(dir, file);
		let stat;
		
		try {
			stat = statSync(filePath);
		} catch (error) {
			// Skip files that can't be read
			continue;
		}

		if (stat.isDirectory()) {
			const childPath = basePath ? `${basePath}/${file}` : file;
			const childNode = buildRouteTree(filePath, childPath);
			node.children.push(childNode);
		} else if (file === 'page.jsx' || file === 'page.tsx') {
			node.hasPage = true;
		}
	}

	return node;
}

function generateRoutes(node: Tree): RouteConfigEntry[] {
	const routes: RouteConfigEntry[] = [];

	if (node.hasPage) {
		// Use relative path from routes.ts location
		const componentPath = node.path === '' 
			? './page.jsx' 
			: `./${node.path}/page.jsx`;

		if (node.path === '') {
			routes.push(index(componentPath));
		} else {
			// Handle parameter routes
			let routePath = node.path;

			// Replace all parameter segments in the path
			const segments = routePath.split('/');
			const processedSegments = segments.map((segment) => {
				if (segment.startsWith('[') && segment.endsWith(']')) {
					const paramName = segment.slice(1, -1);

					// Handle catch-all parameters (e.g., [...ids] becomes *)
					if (paramName.startsWith('...')) {
						return '*';
					}
					// Handle optional parameters (e.g., [[id]] becomes :id?)
					if (paramName.startsWith('[') && paramName.endsWith(']')) {
						return `:${paramName.slice(1, -1)}?`;
					}
					// Handle regular parameters (e.g., [id] becomes :id)
					return `:${paramName}`;
				}
				return segment;
			});

			routePath = processedSegments.join('/');
			routes.push(route(routePath, componentPath));
		}
	}

	for (const child of node.children) {
		routes.push(...generateRoutes(child));
	}

	return routes;
}

// Hot module replacement for development
if (import.meta.env?.DEV) {
	import.meta.glob('./**/page.{jsx,tsx}', { eager: false });
	if (import.meta.hot) {
		import.meta.hot.accept(() => {
			import.meta.hot?.invalidate();
		});
	}
}

// Build the route tree
let routes: RouteConfigEntry[] = [];

try {
	const tree = buildRouteTree(__dirname);
	routes = generateRoutes(tree);
	
	// Add 404 catch-all route
	const notFound = route('*', './__create/not-found.tsx');
	routes.push(notFound);
	
	console.log('✅ Generated routes:', routes.length);
} catch (error) {
	console.error('❌ Error generating routes:', error);
	// Fallback to minimal routes to prevent build failure
	routes = [
		index('./page.jsx'),
		route('*', './__create/not-found.tsx'),
	];
}

export default routes;