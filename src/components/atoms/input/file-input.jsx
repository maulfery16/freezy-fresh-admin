/* eslint-disable react/display-name */
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import { Modal, Upload } from 'antd';

import UploadDekstopIcon from '../../../assets/icons/desktop-upload.svg';
import UploadMobileIcon from '../../../assets/icons/mobile-upload.svg';

import RequestAdapterService from '../../../services/request-adapter';

const AtomFileInput = forwardRef((props, ref) => {
	const [fileList, setfileList] = useState([]);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	const closeImagePreview = () => setPreviewVisible(false);

	const convertImageURLtoFile = async (url) => {
		const imageService = new RequestAdapterService();
		const response = await imageService.sendGetRequest(url);
		const contentType = response.headers.get('content-type');
		const blob = await response.blob();
		return new File([blob], 'Image', { contentType });
	};

	const getBase64 = (file) => {
		if (file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});
		}
	};

	const setImagePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
		);
	};

	const setImage = ({ fileList: files }) => setfileList(files);

	const setUploadIcon = () => {
		if (props.isMobileImage) return UploadMobileIcon;
		return UploadDekstopIcon;
	};

	useEffect(() => {
		if (props.defaultValue) {
			const filename = props.defaultValue.split('/');

			setfileList([
				{
					uid: '-1',
					name: filename[filename.length - 1],
					status: 'done',
					url: props.defaultValue,
				},
			]);
		}
	}, []);

	useImperativeHandle(ref, () => ({
		async getImage() {
			let image;
			if (fileList[0]) {
				if (fileList[0].originFileObj) {
					image = fileList[0].originFileObj;
				} else {
					image = await convertImageURLtoFile(fileList[0].url);
				}

				return image;
			} else {
				if (props.required) throw new Error('Image is required');
			}
		},
	}));

	return (
		<>
			<Upload
				accept={props.accept || 'image/png, image/jpeg'}
				beforeUpload={() => false}
				listType="picture-card"
				fileList={fileList}
				onPreview={setImagePreview}
				onChange={setImage}
			>
				{fileList.length >= 1 ? null : (
					<div>
						<img src={setUploadIcon()} />
						<div className="blue mt3">+ Pilih Gambar</div>
					</div>
				)}
			</Upload>

			<Modal
				visible={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={closeImagePreview}
			>
				<img
					alt="example"
					style={{ width: '100%' }}
					src={previewImage}
				/>
			</Modal>
		</>
	);
});

export default AtomFileInput;
