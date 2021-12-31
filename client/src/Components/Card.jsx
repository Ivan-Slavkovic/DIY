import '../CSS/Card.css';
import React from 'react';

const Card = () => {
	return (
		<div className="container">
			<div className="info_container">
				<iframe
					title="firstFrame"
					className="iframe"
					src="https://youtube.com/embed/CfAzdUiPImQ"
				/>
				<div className="product_title">
					<h2>Tittle here</h2>
				</div>
				<div className="product_description">
					<p>Some text about this product</p>
				</div>
			</div>
			<div className="title_container" />
		</div>
	);
};
export default Card;
