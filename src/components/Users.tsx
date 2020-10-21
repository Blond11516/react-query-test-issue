import React from 'react'
import useUsers from '../hooks/useUsers'

export default function Names() {
	const users = useUsers()

	return (
		<>
			{users && users.map((user: { id: number, name: string, email: string }) => (
				<div key={user.id}>
					<span>{user.name}</span>
					{' '}
					<span>{user.email}</span>
				</div>
			))}
		</>
	)
}