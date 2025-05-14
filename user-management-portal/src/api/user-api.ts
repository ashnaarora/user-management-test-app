const API_BASE_URL = 'http://localhost:3001';

async function createUser(userData: { firstName: string, lastName: string, email: string }) {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return response;
}

async function getUsers() {
    const response = await fetch(`${API_BASE_URL}/api/users`);
    return response.json();
}

export { createUser, getUsers };
