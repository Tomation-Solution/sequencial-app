import { createContext, useContext } from 'react'
import axios from '../api/axios'

// Providers
import NotificationContext from '../NotificationProvider'
import { AppContext } from '../../provider/index'
import UserContext from '../state-manager/userProvider'

const ApiContext = createContext()

export const ApiProvider = (props) => {
	const { addNotification } = useContext(NotificationContext)
	const { setLoading } = useContext(AppContext)
	const { setProperties } = useContext(UserContext)

	const signin = async (email, password) => {
		setLoading(true)

		try {
			const res = await axios.post('/auth/login', JSON.stringify({ email, password }), {
				headers: { 'Content-Type': 'application/json' },
			})

			if (res.status === 200 && res?.data?.status === 'valid') {
				await setProperties('token', res?.data?.token)
				await setProperties('profile', res?.data?.user)
				addNotification(res?.data?.msg, 'success')
				console.log('res: ', res)
				setLoading(false)
				return true
			} else {
				addNotification(res?.data?.msg, 'error')
				console.log('res: ', res)
				return false
			}
		} catch (err) {
			setLoading(false)
			addNotification(err?.response.data.msg, 'error')
			console.log('res: ', err)
			console.error(err?.message)
			return false
		}
	}

	const signup = async (fullname, email, password) => {
		setLoading(true)

		try {
			const res = await axios.post('/auth/register', JSON.stringify({ fullname, email, password }), {
				headers: { 'Content-Type': 'application/json' },
			})

			if (res.status === 200 && res?.data?.status === 'valid') {
				await setProperties('token', res?.data?.token)
				await setProperties('profile', res?.data?.user)
				addNotification(res?.data?.msg, 'success')
				setLoading(false)
				return true
			} else {
				setLoading(false)
				addNotification(res?.data?.msg, 'error')
				console.log('res: ', res)
				return false
			}
		} catch (err) {
			setLoading(false)
			addNotification(err?.response.data.msg, 'error')
			console.error(err)
			return false
		}
	}

	const verifyOTP = async (email, otp, url) => {
		setLoading(true)

		try {
			const res = await axios.post(url, JSON.stringify({ email, otp }), {
				headers: { 'Content-Type': 'application/json' },
			})

			if (res.status === 200 && res?.data?.status === 'valid') {
				addNotification(res?.data?.msg, 'success')
				setLoading(false)
				return true
			} else {
				setLoading(false)
				addNotification(res?.data?.msg, 'error')
				console.log('res: ', res)
				return false
			}
		} catch (err) {
			setLoading(false)
			addNotification(err?.response.data.msg, 'error')
			console.error(err)
			return false
		}
	}

	const forgotPassword = async (email) => {
		setLoading(true)

		try {
			const res = await axios.post('/auth/forgot-password', JSON.stringify({ email }), {
				headers: { 'Content-Type': 'application/json' },
			})

			if (res.status === 200 && res?.data?.status === 'valid') {
				await setProperties('email', email)
				addNotification(res?.data?.msg, 'success')
				setLoading(false)
				return true
			} else {
				setLoading(false)
				addNotification(res?.data?.msg, 'error')
				console.log('res: ', res)
				return false
			}
		} catch (err) {
			setLoading(false)
			addNotification(err?.response.data.msg, 'error')
			console.error(err)
			return false
		}
	}

	const resetPassword = async (email, password) => {
		setLoading(true)

		try {
			const res = await axios.post('/auth/reset-new-password', JSON.stringify({ email, password }), {
				headers: { 'Content-Type': 'application/json' },
			})

			if (res.status === 200 && res?.data?.status === 'valid') {
				addNotification(res?.data?.msg, 'success')
				setLoading(false)
				return true
			} else {
				setLoading(false)
				addNotification(res?.data?.msg, 'error')
				console.log('res: ', res)
				return false
			}
		} catch (err) {
			setLoading(false)
			addNotification(err?.response.data.msg, 'error')
			console.error(err)
			return false
		}
	}

	const callActions = {
		signin,
		signup,
		verifyOTP,
		forgotPassword,
		resetPassword,
	}

	return <ApiContext.Provider value={callActions}>{props.children}</ApiContext.Provider>
}

export default ApiContext
