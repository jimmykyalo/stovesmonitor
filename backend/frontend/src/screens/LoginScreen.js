import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions'
import Loader from '../components/Loader';
import Alert from '../components/Alert';


function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch =  useDispatch()
	const redirect = location.search ? location.search.split('=')[1] : '/home'

	const userLogin = useSelector(state=> state.userLogin)
	const {userInfo, error, loading} = userLogin

	useEffect(() => {
		window.scrollTo(0,0)
		
			
		if (userInfo) {
			navigate(redirect)
		}
	}, [navigate, userInfo, redirect])

	const onSubmitHandler = (e)=>{
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<div className="container">
				
				<div className="w-full md:w-1/3 mx-auto mt-20">
						
						<form className=' rounded-2xl py-6 bg-white shadow-xl' onSubmit={onSubmitHandler}>
							
							<h2 className='text-xl font-bold text-transparent text-center bg-clip-text bg-gradient-to-tl from-emerald-500 to-green-500'>Welcome Back</h2>
							<div className="form-group">
								<label htmlFor="email" className="form-label">Email</label>
								<input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder='Please Enter your email address' name="email" id="email" className="form-input" />
							</div>

							<div className="form-group">
								<label htmlFor="password" className="form-label">Password</label>
								<input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder='Please Enter your password' name="password" id="password" className="form-input" />
							</div>
							<div className="px-6 hover:scale-101">
								<button type="submit" className='form-submit'>Sign In</button>
								
							</div>
							<div className="px-6 py-2">
								<div>New user? <Link className='text-green-500 hover:underline' to={'/register'}>Sign Up</Link></div>
								<div><Link className='text-green-500 hover:underline' to={'/reset'}>Forgot Password</Link></div>
							</div>
							{error && <Alert variant='error'>{error}</Alert>}

						</form>
						{loading && <Loader fullscreen />}
				</div>
		</div>
	)
}

export default LoginScreen