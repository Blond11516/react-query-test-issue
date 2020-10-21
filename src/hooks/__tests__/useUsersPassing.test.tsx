import React from 'react'
import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks"
import useUsers from '../useUsers'
import * as UsersClient from '../../services/UsersClient'
import { Query, QueryCache, ReactQueryCacheProvider } from "react-query"

jest.mock('../../services/UsersClient')

const queryCache = new QueryCache()

describe('useUsers', () => {
	let result: RenderHookResult<Parameters<typeof useUsers>, ReturnType<typeof useUsers>>

	const render = () => {
		result = renderHook(useUsers,
			{
				wrapper: ({ children }) => <ReactQueryCacheProvider queryCache={queryCache}>{children}</ReactQueryCacheProvider>
			}
		)
	}

	beforeEach(() => {
		jest.spyOn(UsersClient, 'fetchUsers').mockReturnValue(new Promise(() => undefined))
	})

	afterEach(async () => {
		await act(async () => {
			queryCache.clear()
			await result.waitFor(() => !queryCache.isFetching)
		})
	})

	it('should request the users', () => {
		render()
		expect(UsersClient.fetchUsers).toHaveBeenCalled()
	})

	describe('when the call succeeds', () => {
		const user = { id: 1, name: 'Bob Ross', email: 'bob@ross.com' }

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