import _ from 'underscore';
import MathJax from 'react-mathjax';
import PropTypes from 'prop-types';
import React from 'react';

const changeLatex1 = (text) => {
	let prefix = false;

	return text
		.split('')
		.map((s) => {
			if (s === '$') {
				prefix = !prefix;
				return prefix ? '∀$' : '$∀';
			}
			return s;
		})
		.join('');
};

const changeLatex2 = (text) => {
	return text.replaceAll('\\(', '∀$').replaceAll('\\)', '$∀');
};

const MoleculeMarkdownRenderer = ({ text, withBorder }) => {
	text = _.unescape(_.unescape(text));
	text = text.includes('$') ? changeLatex1(text) : changeLatex2(text);

	const content = (
		<MathJax.Provider>
			{text.split('∀').map((text, index) => {
				if (text.includes('$')) {
					text = text.replaceAll('$', '');
					return (
						<span key={index}>
							<MathJax.Node inline formula={text} />
						</span>
					);
				} else {
					return (
						<span
							key={index}
							dangerouslySetInnerHTML={{
								__html: text,
							}}
						/>
					);
				}
			})}
		</MathJax.Provider>
	);

	return (
		<>
			{withBorder ? (
				<div
					style={{
						maxHeight: 400,
						overflowY: 'auto',
					}}
					className={`br3 ba bw1 b--black-10 pv2 ph2`}
				>
					{content}
				</div>
			) : (
				{ content }
			)}
		</>
	);
};

MoleculeMarkdownRenderer.propTypes = {
	text: PropTypes.string,
	withBorder: PropTypes.bool,
};

export default MoleculeMarkdownRenderer;
