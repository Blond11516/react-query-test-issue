import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks"
import useUsers from '../useUsers'
import * as UsersClient from '../../services/UsersClient'
import { queryCache } from "react-query"

jest.mock('../../services/UsersClient')

const user = { id: 1, name: 'Bob Ross', email: 'bob@ross.com' }

describe('useUsers', () => {
	let result: RenderHookResult<Parameters<typeof useUsers>, ReturnType<typeof useUsers>>

	const render = () => {
		result = renderHook(() => useUsers('aKey'))
	}

	beforeEach(() => {
		jest.spyOn(UsersClient, 'fetchUsers').mockResolvedValue([user])
	})

	afterEach(async () => {
		await act(async () => {
			queryCache.clear()
			await result.waitFor(() => !queryCache.isFetching)
		})
	})

	it('should request the users', async () => {
		render()
		expect(UsersClient.fetchUsers).toHaveBeenCalled()
		await result.waitForNextUpdate()
	})

	describe('when the call succeeds', () => {
		beforeEach(() => {
			jest.spyOn(UsersClient, 'fetchUsers').mockResolvedValue([user])
		});

		it('should return the users', async () => {
			render()
			await result.waitForNextUpdate()
			expect(result.result.current).toEqual([user])
		})
	})
})