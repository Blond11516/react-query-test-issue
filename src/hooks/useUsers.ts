import { useQuery } from "react-query"
import { fetchUsers } from "../services/UsersClient"

export default function useNames() {
	const { data } = useQuery('users', fetchUsers)

	return data
}