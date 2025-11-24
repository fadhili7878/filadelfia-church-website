export default async function handler(req, res) {
  try {
    const { default: server } = await import('../build/server/index.js');
    return server(req, res);
  } catch (error) {
    console.error('Server initialization failed:', error);
    res.status(500).json({
      error: 'Server initialization failed',
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}