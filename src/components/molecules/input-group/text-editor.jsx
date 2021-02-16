import { Form, Typography } from 'antd';
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

export default MoleculeTextEditorGroup;
