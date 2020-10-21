import { useQuery } from "react-query"
import { fetchUsers } from "../services/UsersClient"

export default function useNames(queryKey: string) {
	const { data } = useQuery(['users', queryKey], fetchUsers)

	return data
}