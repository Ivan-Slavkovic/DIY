import '../CSS/FAQ.css';
import React from 'react';

const FAQ = () => {
	return (
		<React.Fragment>
			{/* <div className="FAQ_container"> */}
			{/* <div className="center_FAQ">
					<h3>FAQ</h3>
				</div> */}
			<div className="FAQ_content">
				<div className="center_FAQ">
					<h3>FAQ</h3>
				</div>
				<div className="list">
					<input
						type="checkbox"
						id="question1"
						name="q"
						className="questions"
					/>
					<div className="plus">+</div>
					<label htmlFor="question1" className="question">
						How much does DIY cost?
					</label>
					<div className="answers">
						DIY usually costs nothing but there are few cases where
						you could get asked to run to the nearest market and get
						few things. Don't worry it will not be anything big
						because these project's are about things you have in
						your household.
					</div>
				</div>

				<div className="list">
					<input
						type="checkbox"
						id="question2"
						name="q"
						className="questions"
					/>
					<div className="plus">+</div>
					<label htmlFor="question2" className="question">
						How does DIY work?
					</label>
					<div className="answers">
						People here watch inspiring videos, do creative projects
						and make their own videos on DIY which gives them
						amazing opportunities to both learn and inspire others.
					</div>
				</div>

				<div className="list">
					<input
						type="checkbox"
						id="question3"
						name="q"
						className="questions"
					/>
					<div className="plus">+</div>
					<label htmlFor="question3" className="question">
						Do I need to buy any materials?
					</label>
					<div className="answers">
						For most courses– Nope! DIY projects are designed with
						everyday materials in mind, especially stuff commonly
						found around the house(and inside junk drawers) like
						paper, pencils, cardboard, glue, and baking soda. No
						need to purchase any additional items. A couple of
						courses require that you have some special tools or
						devices but that is seldom.
					</div>
				</div>

				<div className="list">
					<input
						type="checkbox"
						id="question4"
						name="q"
						className="questions"
					/>
					<div className="plus">+</div>
					<label htmlFor="question4" className="question">
						Pitanje broj 4
					</label>
					<div className="answers">Ovde ide odgovor za pitane</div>
				</div>
			</div>
			{/* </div> */}
		</React.Fragment>
	);
};

export default FAQ;
