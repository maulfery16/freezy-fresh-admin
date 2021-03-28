import React, { useState } from 'react';
import { Col, message, Row, Typography, Upload } from 'antd';

import AtomCard from '../../../components/atoms/card';
import MoleculeImportExportWrapper from '../../../components/molecules/import-export-wrapper';
import OrganismLayout from '../../../components/organisms/layout';

import DownloadImage from '../../../assets/images/download.svg';
import UploadImage from '../../../assets/images/upload.svg';

import config from '../../../config';
import ProductService from '../../../services/product';

const ProductImportPage = () => {
	const productService = new ProductService();

	const [isUploadingProduct, setIsUploadingProduct] = useState(false);

	const downloadTemplate = () => {
		try {
			window.open(
				`${config.API_URL}/v1/storage/templates/products/import_produk.xlsx`,
				'_blank'
			);
		} catch (error) {
			error.message(message.error);
		}
	};

	const uploadProduct = async ({ file }) => {
		console.log(file);

		setIsUploadingProduct(true);

		try {
			const fileProduct = new FormData();

			fileProduct.append('file', file);
			await productService.uploadProduct(fileProduct);

			message.success('Berhasil mengupload data produk');
		} catch (error) {
			error.message(message.error);
		} finally {
			setIsUploadingProduct(false);
		}
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products' },
				{
					name: 'Produk-Produk',
					link: '/products',
				},
				{
					name: 'Import',
					link: location.pathname,
				},
			]}
			title="Product Import Page"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Import Produk`.toUpperCase()}</span>
			</Typography.Title>

			<Row align="top" className="mt4" gutter={24}>
				<Col span={12}>
					<AtomCard title="Download dan Isi File Excel">
						<MoleculeImportExportWrapper
							buttonLabel="DOWNLOAD TEMPLATE"
							info="Gunakan template ini untuk tambah produk di beragam kategori"
							image={DownloadImage}
							onClick={downloadTemplate}
						/>
					</AtomCard>
				</Col>

				<Col span={12}>
					<AtomCard title="Upload File Excel">
						<Upload
							beforeUpload={() => false}
							onChange={uploadProduct}
							showUploadList={false}
						>
							<MoleculeImportExportWrapper
								buttonLabel="UPLOAD FILE"
								info="Pilih atau letakkan file Excel(.xlsx atau .csv) kamu disini, Maks. 300 produk dalam satu file."
								image={UploadImage}
								loading={isUploadingProduct}
							/>
						</Upload>
					</AtomCard>
				</Col>
			</Row>
		</OrganismLayout>
	);
};

export default ProductImportPage;
