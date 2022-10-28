import React, { useState } from 'react'
import useLogin from '../hooks/useLogin'


export default function Login() {

    const { login, error, isLoading } = useLogin()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        console.log(form)
        await login(form.email, form.password)
        setForm({ email: '', password: '' })
    }
    return (
        <form onSubmit={handleSubmit} className='login'>
            <h3>Login</h3>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                required
                placeholder='Email'
                onChange={handleChange}
                value={form.email}
                name='email'
                id='email'
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                placeholder='Password'
                required
                onChange={handleChange}
                value={form.password}
                name='password'
                id='password'
            />
            <button type='submit' disabled={isLoading}>Sign Up</button>
            {
                error && <div className="error">{error}</div>
            }
        </form>
    )
}
