import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../CSS/Login.css';
import store from '../store';
import { UserDataLogin } from '../utils/DataFetch';

const Login = () => {
	const reduxEmail = useSelector((state) => state.email);
	const reduxPassword = useSelector((state) => state.password);

	const dispatch = useDispatch();
	// console.log(counter);

	const [ form, setForm ] = useState({
		email : '',
		pass  : ''
	});

	const [ dirty, setDirty ] = useState({
		email : false,
		pass  : false
	});

	let [ errors, setErrors ] = useState({
		email : [],
		pass  : []
	});

	let [ loginMessage, setLoginMessage ] = useState('');

	let validate = () => {
		let errorsData = {};

		//email validation
		errorsData.email = [];
		if (!form.email) {
			errorsData.email.push('Email cannot be blank!');
		}

		const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if (form.email) {
			if (!validEmailRegex.test(form.email)) {
				errorsData.email.push('Proper email address requires');
			}
		}

		//password validataion
		errorsData.pass = [];
		if (!form.pass) {
			errorsData.pass.push('Password cannot be blank');
		}
		if (form.pass.length < 8) {
			errorsData.pass.push('Password must have at least 8 characters');
		}
		setErrors(errorsData);
	};

	useEffect(validate, [ form.email, form.pass ]);

	const UpdateForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
		// console.log(e.target.name);
	};

	const onLoginClick = async (e) => {
		e.preventDefault();
		let dirtyData = dirty;
		Object.keys(dirty).forEach((control) => {
			dirtyData[control] = true;
		});
		setDirty(dirtyData);

		validate();
		if (isValid()) {
			var result = await UserDataLogin(form);
			// console.log(result);
			if (result.status === 200) {
				//redirect to main page
				setLoginMessage(
					<span style={{ color: 'green' }}>
						You have successfully logged in
					</span>
				);
				store.dispatch({ type: 'login' });
			} else {
				//stay on the same one
				setLoginMessage(
					<span style={{ color: 'red' }}>
						Unable to connect to database
					</span>
				);
			}
			dispatch({
				type     : 'login',
				email    : form.email,
				password : form.pass
			});
		}
		console.log(reduxEmail, reduxPassword);
	};

	let isValid = () => {
		let valid = true;

		for (let control in errors) {
			if (errors[control].length > 0) valid = false;
		}
		return valid;
	};

	// const UpdateForm = (e) => {};
	return (
		<div className="container">
			<section id="content">
				<form action="">
					<h2>LOGIN</h2>
					<div className="input_container">
						{/* <label htmlFor="email">Email:</label> */}
						<input
							type="text"
							name="email"
							value={form.email}
							placeholder="Email"
							id="username"
							required=""
							onChange={UpdateForm}
							onBlur={() => {
								setDirty({ ...dirty, email: true });
								validate();
							}}
						/>
						<div>
							{dirty['email'] && errors['email'][0] ? (
								errors['email']
							) : (
								''
							)}
						</div>
					</div>
					<div>
						{/* <label htmlFor="pass">Password:</label> */}
						<input
							type="password"
							name="pass"
							value={form.pass}
							placeholder="Password"
							id="password"
							required=""
							onChange={UpdateForm}
							onBlur={() => {
								setDirty({ ...dirty, pass: true });
								validate();
							}}
						/>
						<div>
							{dirty['pass'] && errors['pass'][0] ? (
								errors['pass']
							) : (
								''
							)}
						</div>
					</div>
					<div>
						{/* <button onClick={onLoginClick}>Submit</button>
						<button onClick={onLoginClick}>
							Don't have an account?
						</button> */}
						<input
							type="submit"
							value="Log in"
							onClick={onLoginClick}
						/>
						<input value="Register" type="submit" />
						<div>{loginMessage}</div>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Login;
