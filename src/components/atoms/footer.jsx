import React from 'react';

const AtomFooter = () => {
	const today = new Date();
	const year = today.getFullYear();

	return (
		<h5 className="silver pa3">
			Copyright &copy; {year} Freezy Fresh. All rights reserved
		</h5>
	);
};

export default AtomFooter;
