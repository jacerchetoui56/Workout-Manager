import React, { useState } from 'react'
import useSignUp from '../hooks/useSignUp'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Signup() {
    const { user } = useAuthContext()

    const { signup, isLoading, error } = useSignUp()
    const [form, setForm] = useState({
        name: '',
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

        await signup(form.name, form.email, form.password)
        if (user) {
            setForm({ name: '', email: '', password: '' })
        }
    }
    return (
        <form onSubmit={handleSubmit} className='signup'>
            <h3>Sign Up</h3>
            <label htmlFor="name">Name:</label>
            <input
                required
                type="text"
                placeholder='Name'
                onChange={handleChange}
                value={form.name}
                name='name'
                id='name'
            />
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
            <button disabled={isLoading} type='submit'>Login</button>
            {
                error &&
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}
