import { Form, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import AtomTextEditor from '../../atoms/input/text-editor';

const MoleculeTextEditorGroup = (props) => {
	return (
		<Form.Item>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<AtomTextEditor {...props} />
		</Form.Item>
	);
};

MoleculeTextEditorGroup.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};

export default MoleculeTextEditorGroup;
