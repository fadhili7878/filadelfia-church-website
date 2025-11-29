import type { Config } from "@react-router/dev/config";

export default {
  // App and build directories  
  appDirectory: "src/app",
  buildDirectory: "build",
  
  // SSR enabled
  ssr: true,
  
  // Server build configuration
  serverBuildFile: "index.js",
  serverModuleFormat: "esm",
  
  // Prerender configuration
  prerender: ["/"],
  
  // Important: This tells React Router to generate the routes manifest
  buildEnd: async ({ buildManifest }) => {
    console.log("✅ Build complete. Routes:", buildManifest?.routes?.length || 0);
  },
} satisfies Config;