const testDelete = async () => {
    try {
        console.log("Simulating DELETE request to local server...");
        // Assuming a project with ID 7 exists based on the screenshot url /api/projects/7
        const response = await fetch('http://localhost:3000/api/projects/7', {
            method: 'DELETE',
        });
        
        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log(`Raw Response: ${text}`);
    } catch (e) {
        console.error("Fetch failed:", e.message);
    }
};

testDelete();
