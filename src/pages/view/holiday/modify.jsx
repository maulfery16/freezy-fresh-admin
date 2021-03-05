/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Skeleton, Typography, message, Form, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomNumberFormat from '../../../components/atoms/number-format';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const { TabPane } = Tabs;

// import HolidayService from '../../../services/holiday';
// const holidayService = new HolidayService();

const mock = {
	data: [
		{
			id: 'FF-8387423',
			discount: 0.5,
			name: 'Apel Fuji',
			price: 20000,
			stock: 99,
		},
		{
			id: 'FF-8387422',
			discount: 0.5,
			name: 'Apel Fuji',
			price: 20000,
			stock: 99,
		},
	],
	meta: {
		pagination: { totalData: 1 },
	},
};

const HolidayModifyPage = () => {
	const column = [
		{
			title: 'SKUID',
			dataIndex: 'id',
		},
		{
			title: 'Nama Produk',
			dataIndex: 'name',
		},
		{
			title: 'Stok Tersedia',
			dataIndex: 'stock',
		},
		{
			title: 'Harga Normal',
			dataIndex: 'price',
			render: (price) => <AtomNumberFormat prefix="Rp. " value={price} />,
		},
		{
			title: 'Harga Setelah Discount',
			dataIndex: 'price',
			render: (price, record) => (
				<AtomNumberFormat
					prefix="Rp. "
					value={price - price * record.discount}
				/>
			),
		},
		{
			title: 'Discount (%)',
			dataIndex: 'discount',
			render: (disc) => `${disc * 100}%`,
		},
	];
	const viewTableRef = useRef();
	const holidayImageMobileRef = useRef();
	const holidayImageDekstopRef = useRef();
	const holidayImageSmall1Ref = useRef();
	const holidayImageSmall2Ref = useRef();
	const holidayImageSmall3Ref = useRef();

	const history = useHistory();

	const [holiday] = useState({
		short_desc: {
			id: 'Deskripsi Singkat',
			en: 'Short Description',
		},
		long_desc: {
			id: 'Deskripsi Panjang',
			en: 'Long Description',
		},
		banner_mobile_image:
			'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
		banner_desktop_image:
			'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
		banner_small1_image:
			'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
		banner_small2_image:
			'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
		banner_small3_image:
			'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
		title: {
			id: 'Artikel Super',
			en: 'Super View',
		},
		term_and_condition: {
			id: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et turpis tincidunt lacus ornare malesuada. Integer purus nulla, vestibulum non lectus at, mollis semper dui. Etiam mattis velit id vehicula faucibus. Donec bibendum tempus mi, sit amet venenatis erat finibus ut. Suspendisse vitae cursus urna, ac pulvinar magna. Nullam viverra sapien arcu, at congue orci lacinia quis. Quisque sapien eros, facilisis in maximus eu, finibus eu mauris. Morbi bibendum ligula in rhoncus dictum. Aenean fermentum blandit elit vitae vehicula.

Phasellus ac enim ac diam malesuada semper. Fusce sem nisi, luctus ut tellus ut, dictum blandit massa. In id molestie eros, eu varius libero. Curabitur non neque non elit pellentesque ornare. Duis libero arcu, placerat eu lorem nec, consectetur hendrerit mi. Pellentesque nec diam ut eros rhoncus luctus. Ut a ultrices felis.

Ut luctus ex non eleifend ullamcorper. Nullam elementum nisi sem, id egestas nisi pretium nec. Sed pretium interdum tristique. Mauris at porttitor enim. In a mi et massa porttitor molestie. Fusce varius, lorem ut cursus consectetur, sapien diam tincidunt magna, nec ultrices quam quam malesuada ante. Sed auctor mi eu finibus finibus. Quisque iaculis malesuada metus, eget ornare magna laoreet nec. Morbi interdum gravida bibendum. `,
			en: ` Suspendisse at nisl nisi. Praesent at diam mattis, porta arcu blandit, efficitur nisi. Sed suscipit massa diam, et vehicula mauris ornare a. Nunc blandit metus vitae lacus ultrices ornare. Aenean eget justo fringilla, pharetra odio at, cursus augue. Donec lacinia dolor malesuada ipsum vestibulum ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse molestie, ipsum et porttitor ultricies, sem arcu pharetra risus, non finibus diam tortor ac odio. Morbi est mauris, lobortis eu mauris a, fringilla pellentesque orci. Morbi mollis rhoncus orci nec convallis. Proin efficitur, eros sit amet pellentesque tincidunt, libero turpis hendrerit sem, quis convallis arcu ante quis ligula. Phasellus porta aliquet dolor, vel mattis libero interdum a. In in dui ex.

Integer rhoncus leo ac diam vestibulum aliquam. Duis in eros sit amet mauris volutpat luctus nec id nulla. Nulla pretium libero a ante cursus, vitae pellentesque mauris efficitur. Mauris ut dolor porta, fermentum leo nec, rutrum mauris. Nam felis nunc, rhoncus quis lorem id, mollis rutrum velit. Nulla facilisi. Vestibulum quis cursus ante. In molestie sapien ullamcorper orci elementum ullamcorper. Proin eget convallis ex, eu iaculis nisl. Vestibulum congue nulla eu tristique faucibus. Etiam mollis in turpis sed posuere. Nunc interdum ac enim a varius. Morbi euismod porta nisi, quis egestas massa sollicitudin eu. Aliquam dapibus condimentum metus porta rutrum. Sed vehicula ac lacus in aliquam. Quisque tempor dolor ac venenatis blandit. `,
		},
	});
	const [longDescEn, setLongDescEn] = useState('');
	const [longDescId, setLongDescId] = useState('');
	const [termEn, setTermEn] = useState('');
	const [termId, setTermId] = useState('');

	// eslint-disable-next-line no-unused-vars
	const [productList, setProductList] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreating, setIsCreating] = useState(null);

	const getHoliday = () => {
		try {
			// const holiday = holidayService.getHolidayDetail(holidayID);
			// setHoliday(holiday);

			setLongDescId(holiday.long_desc.id);
			setLongDescEn(holiday.long_desc.en);

			setTermId(holiday.term_and_condition.id);
			setTermEn(holiday.term_and_condition.en);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="branches"
				operator=":"
				identifier="branches-filter"
				label="Cabang"
				key="branches-filter"
				placeholder="Semua Cabang"
				data={{ url: 'branches' }}
			/>,
			<MoleculeDatatableFilter
				name="base_categories"
				operator=":"
				identifier="base_categories-filter"
				label="Kategori Dasar"
				key="base_categories-filter"
				placeholder="Semua Kategori Dasar"
				data={{ url: 'base_categories' }}
			/>,
		];
	};

	const setHolidayInitialValues = () => {
		return isCreating
			? {}
			: {
					en_title: holiday.title.en,
					id_title: holiday.title.id,
					id_short_desc: holiday.short_desc.id,
					en_short_desc: holiday.short_desc.en,
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			if (holidayImageMobileRef)
				data.append('mobile_image', holidayImageMobileRef);
			if (holidayImageDekstopRef)
				data.append('desktop_image', holidayImageDekstopRef);
			if (holidayImageSmall1Ref)
				data.append('small_image_1', holidayImageSmall1Ref);
			if (holidayImageSmall2Ref)
				data.append('small_image_2', holidayImageSmall2Ref);
			if (holidayImageSmall3Ref)
				data.append('small_image_3', holidayImageSmall3Ref);
			data.append('title[id]', values.id_title);
			data.append('title[en]', values.en_title);
			data.append('short_desc[id]', values.id_short_desc);
			data.append('short_desc[en]', values.en_short_desc);
			data.append('long_desc[id]', longDescId);
			data.append('long_desc[en]', longDescEn);
			data.append('term[id]', termId);
			data.append('term[en]', termEn);

			// 	await holidayService.editHoliday(id, data);
			// 	message.success('Berhasil mengubah holiday');

			message.info(
				'Akan dikembalikan ke halaman daftar holiday dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/holiday');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
			await getHoliday();
			setIsCreating(!holiday);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Holiday', link: location.pathname },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title="Holiday"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Holiday`.toUpperCase()}</span>
			</Typography.Title>

			{!holiday ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_holiday"
					initialValues={setHolidayInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Tabs defaultActiveKey="1">
						<TabPane tab={`Info Holiday`.toUpperCase()} key="1">
							<Row align="top" className="mt4" gutter={24}>
								<Col span={24}>
									<AtomCard>
										<Row gutter={[24, 24]}>
											<Col span={24}>
												<MoleculeFileInputGroup
													label="Foto Banner"
													description="
												Format gambar .jpg .jpeg .png, Untuk foto banner mobile ukuran minimum 0 x 0px (Untuk
												gambar optimal gunakan ukuran minimum 0 x 0 px) Untuk foto banner desktop ukuran
												minimum 0 x 0px (Untuk gambar optimal gunakan ukuran minimum 0 x 0 px)
											"
													fileInputs={[
														{
															defaultValue: holiday
																? holiday.banner_mobile_image
																: null,
															isMobileImage: true,
															label:
																'Foto Banner Mobile',
															ref: holidayImageMobileRef,
														},
														{
															defaultValue: holiday
																? holiday.banner_desktop_image
																: null,
															label:
																'Foto Banner Dekstop',
															ref: holidayImageDekstopRef,
														},
														{
															defaultValue: holiday
																? holiday.banner_small1_image
																: null,
															label:
																'Foto Banner Kecil 1',
															ref: holidayImageSmall1Ref,
														},
														{
															defaultValue: holiday
																? holiday.banner_small2_image
																: null,
															label:
																'Foto Banner Kecil 2',
															ref: holidayImageSmall2Ref,
														},
														{
															defaultValue: holiday
																? holiday.banner_small3_image
																: null,
															label:
																'Foto Banner Kecil 3',
															ref: holidayImageSmall3Ref,
														},
													]}
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextInputGroup
													name="id_title"
													label="Title (ID)"
													placeholder="Judul Title (ID)"
													type="text"
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextInputGroup
													name="en_title"
													label="Judul (EN)"
													placeholder="Judul (EN)"
													type="text"
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextInputGroup
													autoSize={{
														minRows: 2,
														maxRows: 6,
													}}
													label="Deskripsi Singkat (ID)"
													name="id_short_desc"
													placeholder="Deskripsi Singkat (ID)"
													type="textarea"
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextInputGroup
													autoSize={{
														minRows: 2,
														maxRows: 6,
													}}
													name="en_short_desc"
													label="Deskripsi Singkat (EN)"
													placeholder="Deskripsi Singkat (EN)"
													type="textarea"
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextEditorGroup
													label="Deskripsi Lengkap (ID)"
													onChange={setLongDescId}
													value={longDescId}
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextEditorGroup
													label="Deskripsi Lengkap (EN)"
													onChange={setLongDescEn}
													value={longDescEn}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>

								<Col className="mt4" span={24}>
									<AtomCard title="Daftar Produk">
										<OrganismDatatable
											columns={column}
											dataSourceURL={`products`}
											filters={renderDatatableFilters()}
											mock={mock}
											ref={viewTableRef}
											searchInput={true}
										/>
									</AtomCard>
								</Col>
							</Row>
						</TabPane>
						<TabPane
							tab={`Syarat & ketentuan`.toUpperCase()}
							key="2"
						>
							<Row align="top" gutter={24}>
								<Col span={24}>
									<AtomCard>
										<Row gutter={[12, 24]}>
											<Col span={24}>
												<MoleculeTextEditorGroup
													label={`Syarat & Ketentuan (ID)`}
													onChange={setTermId}
													value={termId}
												/>
											</Col>

											<Col span={24}>
												<MoleculeTextEditorGroup
													label={`Syarat & Ketentuan (EN)`}
													onChange={setTermEn}
													value={termEn}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>
							</Row>
						</TabPane>
					</Tabs>
					<Row>
						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/view/holiday"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Holiday"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default HolidayModifyPage;
