import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AtomTextEditor = (props) => {
	return (
		<ReactQuill
			bounds={'#quill-container'}
			formats={[
				'header',
				'font',
				'size',
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'list',
				'bullet',
				'indent',
				'link',
				'image',
				'video',
			]}
			modules={{
				toolbar: [
					[{ header: '1' }, { header: '2' }, { font: [] }],
					[{ size: [] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[
						{ list: 'ordered' },
						{ list: 'bullet' },
						{ indent: '-1' },
						{ indent: '+1' },
					],
					['link', 'image', 'video'],
					['clean'],
				],
				clipboard: {
					matchVisual: false,
				},
			}}
			theme="snow"
			{...props}
		/>
	);
};

export default AtomTextEditor;
