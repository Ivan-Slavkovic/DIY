import axios from 'axios';

const config = {
	headers : {
		'Access-Control-Allow-Origin'  : '*',
		'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
	}
};

// export const UserDataLogin = async (form) => {
// 	var temp;
// 	await axios
// 		.post('http://127.0.0.1:8000/login/', form, config)
// 		.then((result) => {
// 			temp = result;
// 		})
// 		.catch((e) => {
// 			console.log(e);
// 		});
// 	// console.log(temp);
// 	return temp;
// };

export const UserDataLogin = async (form) => {
	let response;
	try {
		response = await axios.post(
			'http://127.0.0.1:8000/login/',
			form,
			config
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const UserDataRegister = async (form) => {
	let response;
	try {
		response = await axios.post(
			'http://127.0.0.1:8000/register/',
			form,
			config
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// export const API = axios.create({
// 	baseURL : 'http://127.0.0.1:8000/login'
// });
