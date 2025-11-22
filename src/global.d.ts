import 'react-router';
module 'virtual:load-fonts.jsx' {
	export function LoadFonts(): null;
}

// Vite-specific types
interface ImportMetaEnv {
	readonly DEV: boolean;
	readonly PROD: boolean;
	readonly MODE: string;
	readonly BASE_URL: string;
	readonly SSR: boolean;
	// Add other env variables as needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
	readonly hot?: {
		accept(): void;
		accept(cb: (newModule: any) => void): void;
		accept(dep: string, cb: (newModule: any) => void): void;
		accept(deps: string[], cb: (newModule: any) => void): void;
		dispose(cb: () => void): void;
		decline(): void;
		invalidate(): void;
		data: any;
	};
	readonly glob?: (pattern: string, options?: { eager?: boolean }) => Record<string, () => Promise<any>>;
}
declare module 'react-router' {
	interface AppLoadContext {
		// add context properties here
	}
}
declare module 'npm:stripe' {
	import Stripe from 'stripe';
	export default Stripe;
}
declare module '@auth/create/react' {
	import { SessionProvider } from '@auth/react';
	export { SessionProvider };
}
