/**
 * Fetches all lab tests from the backend API
 * @returns {Promise<Array>} Array of lab tests
 */
export async function getLabTests() {
  try {
    const response = await fetch('http://localhost:8080/tests');
    if (!response.ok) {
      throw new Error('Failed to fetch lab tests');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    throw error;
  }
}

/**
 * Fetches a specific lab test by ID from the backend API
 * @param {string} id - The ID of the lab test to fetch
 * @returns {Promise<Object>} The lab test object
 */
export async function getLabTestById(id) {
  try {
    const response = await fetch(`http://localhost:8080/tests/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch lab test');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching lab test:', error);
    throw error;
  }
}

/**
 * Fetches lab tests by category from the backend API
 * @param {string} category - The category of lab tests to fetch
 * @returns {Promise<Array>} Array of lab tests in the specified category
 */
export async function getLabTestsByCategory(category) {
  try {
    const response = await fetch(`http://localhost:8080/tests/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch lab tests by category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching lab tests by category:', error);
    throw error;
  }
} 