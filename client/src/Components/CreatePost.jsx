// Moras da uradis REDUX preko kojeg vuces name i email i prosledjujes ovde
// da ne bi unosio 2 puta iste podatke
import { useState } from 'react';
const CreatePost = () => {
	const submitHandler = () => {
		// console.log('s');
	};

	const [ youtubeVideo, setYoutubeVideo ] = useState('');

	return (
		<div className="container">
			<section id="content">
				<form action="">
					<h2>POST YOUR PROJECT</h2>
					<input type="text" placeholder="Post title" required />
					<input type="text" placeholder="Video URL" required />
					<input
						className="post_description"
						type="text"
						placeholder="Description"
						required
					/>
					<input type="text" placeholder="Picture URL" />
					<button type="submit" onClick={submitHandler()}>
						Submit
					</button>
				</form>
			</section>
		</div>
	);
};

export default CreatePost;
