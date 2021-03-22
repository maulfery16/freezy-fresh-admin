import { Col, Row, Typography } from 'antd';
import React from 'react';

import AtomCard from '../../../components/atoms/card';
import MoleculeImportExportWrapper from '../../../components/molecules/import-export-wrapper';
import OrganismLayout from '../../../components/organisms/layout';

import DownloadImage from '../../../assets/images/download.svg';
import UploadImage from '../../../assets/images/upload.svg';

const ProductImportPage = () => {
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
						/>
					</AtomCard>
				</Col>

				<Col span={12}>
					<AtomCard title="Upload File Excel">
						<MoleculeImportExportWrapper
							buttonLabel="UPLOAD FILE"
							info="Pilih atau letakkan file Excel(.xlsx atau .csv) kamu disini, Maks. 300 produk dalam satu file."
							image={UploadImage}
						/>{' '}
					</AtomCard>
				</Col>
			</Row>
		</OrganismLayout>
	);
};

export default ProductImportPage;
