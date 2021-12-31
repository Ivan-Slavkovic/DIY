import { useEffect, useState } from 'react';
import '../CSS/Register.css';
import { UserDataRegister } from '../utils/DataFetch';

const Register = () => {
	const [ form, setForm ] = useState({
		email   : '',
		pass    : '',
		name    : '',
		gender  : '',
		address : ''
	});

	const UpdateForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
		// console.log(form);
	};

	let [ errors, setErrors ] = useState({
		email   : [],
		passw   : [],
		name    : [],
		address : [],
		gender  : []
	});

	let [ registerMessage, setRegisterMessage ] = useState('');

	let [ dirty, setDirty ] = useState({
		email   : false,
		pass    : false,
		name    : false,
		address : false,
		gender  : false
	});

	const Blur = (e) => {
		setDirty({ ...dirty, [e.target.name]: true });
		validate();
	};

	let validate = () => {
		let errorsData = {};
		//email
		errorsData.email = [];
		if (!form.email) {
			errorsData.email.push("Email can't be blank");
		}

		//email regex
		const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if (form.email) {
			if (!validEmailRegex.test(form.email)) {
				errorsData.email.push('Proper email address is expected');
			}
		}

		//password
		errorsData.pass = [];

		//pass can't be blank
		if (!form.pass) {
			errorsData.pass.push("Password can't be blank");
		}

		//pass regex

		if (form.pass) {
			if (form.pass.length < 8) {
				errorsData.pass.push(
					'Passwrod should have at least 8 characters'
				);
			}
		}

		//name
		errorsData.name = [];
		if (!form.name) {
			errorsData.name.push('Name cannot be blank');
		}

		//gender
		errorsData.gender = [];
		if (!form.gender) {
			errorsData.gender.push('Please select gender.');
		}

		//address
		errorsData.address = [];
		if (!form.address) {
			errorsData.address.push('Address cannot be blank.');
		}
		setErrors(errorsData);
	};
	useEffect(validate, [
		form.email,
		form.pass,
		form.name,
		form.gender,
		form.address
	]);

	let onRegisterClick = async (e) => {
		//seting all controls as dirty
		let dirtyData = dirty;
		e.preventDefault();
		Object.keys(dirty).forEach((control) => {
			dirtyData[control] = true;
		});
		setDirty(dirtyData);

		validate();
		if (isValid()) {
			var result = await UserDataRegister(form);
			console.log(result);
			if (result.status === 200) {
				setRegisterMessage(
					<span>You have successfully registered!</span>
				);
			}
		} else {
			setRegisterMessage(<span>Unable to connect to database</span>);
		}
	};

	let isValid = () => {
		let valid = true;

		for (let control in errors) {
			if (errors[control].length > 0) {
				valid = false;
			}
		}
		return valid;
	};

	// UserData;
	return (
		<div className="container">
			<section id="content">
				<form action="">
					<h2>REGISTER</h2>
					{/* Email start */}

					<input
						type="text"
						name="email"
						value={form.email}
						placeholder="Email"
						id="username"
						onChange={UpdateForm}
						onBlur={Blur}
					/>
					<div>
						{dirty['email'] && errors['email'][0] ? (
							errors['email']
						) : (
							''
						)}
					</div>
					{/* Email end */}

					{/* Pass start */}

					<input
						type="password"
						name="pass"
						value={form.pass}
						placeholder="Password"
						id="password"
						onChange={UpdateForm}
						onBlur={Blur}
					/>
					<div>
						{dirty['pass'] && errors['pass'][0] ? (
							errors['pass']
						) : (
							''
						)}
					</div>
					{/* Pass end */}

					{/* Name start */}

					<input
						type="text"
						name="name"
						value={form.name}
						placeholder="Name"
						id="name"
						onChange={UpdateForm}
						onBlur={Blur}
					/>
					<div>
						{dirty['name'] && errors['name'][0] ? (
							errors['name']
						) : (
							''
						)}
					</div>
					{/* Name end */}

					<input
						type="radio"
						name="gender"
						id="male"
						value="m"
						checked={form.gender === 'm' ? true : false}
						onChange={UpdateForm}
						onBlur={Blur}
						data-icon=""
					/>

					<input
						type="radio"
						name="gender"
						id="female"
						value="f"
						checked={form.gender === 'f' ? true : false}
						onChange={UpdateForm}
						onBlur={Blur}
						data-icon=""
					/>

					{/* Gender end*/}

					{/* Address start */}
					<input
						type="text"
						name="address"
						value={form.address}
						id="address"
						onChange={UpdateForm}
						onBlur={Blur}
						placeholder="Address"
					/>
					{/* Address end */}

					<input
						type="submit"
						value="Register"
						onClick={onRegisterClick}
					/>
					{dirty['address'] && errors['address'][0] ? (
						errors['address']
					) : (
						''
					)}
				</form>
			</section>
		</div>
	);
};

export default Register;
