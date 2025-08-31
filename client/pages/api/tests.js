import { getLabTests } from "../../lib/db"; // Assuming you have a function to fetch tests

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tests = await getLabTests();
      res.status(200).json(tests);
    } catch (error) {
      console.error('Error in tests API route:', error);
      res.status(500).json({ error: 'Failed to fetch lab tests' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
