export async function fetchUsers(): Promise<{ id: number, name: string, email: string }[]> {
	const response = await fetch('https://gorest.co.in/public-api/users')
	const data = await response.json()
	return data.data
}