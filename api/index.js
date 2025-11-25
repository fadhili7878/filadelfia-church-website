export default async function handler(req, res) {
  try {
    // Step 1: Check if the file exists
    console.log("Attempting import...");
    const mod = await import("../build/server/index.js");
    
    console.log("Import successful!");
    console.log("Module keys:", Object.keys(mod));
    console.log("Has 'app':", 'app' in mod);
    console.log("Has 'default':", 'default' in mod);
    
    const app = mod.app || mod.default;
    
    if (!app) {
      return res.status(500).json({
        error: "No app found",
        availableExports: Object.keys(mod),
        moduleType: typeof mod
      });
    }
    
    console.log("App type:", typeof app);
    console.log("Has fetch:", typeof app.fetch);
    
    // Step 2: Try a simple fetch
    const testReq = new Request("https://example.com/");
    const testRes = await app.fetch(testReq);
    
    console.log("Test fetch status:", testRes.status);
    
    return res.status(200).json({
      success: true,
      message: "App loaded successfully",
      testStatus: testRes.status,
      exports: Object.keys(mod)
    });
    
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}