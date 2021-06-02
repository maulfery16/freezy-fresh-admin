/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, Row, Typography, message, Input, Form } from 'antd';
import { useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomSpinner from '../../../components/atoms/spinner';
import AtomNumberFormat from '../../../components/atoms/number-format';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';
import AtomBranchSelect from '../../../components/atoms/selection/branch';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';

import AdditionalSectionService from '../../../services/additional-sections';
const additionalSectionService = new AdditionalSectionService();

const AdditionalSectionDetailPage = () => {
	const column = [
		{
			title: 'Cabang (ID)',
			dataIndex: 'branch',
			sorter: true,
			render: (_, record) => record?.product_detail?.branch?.id
		},
		{
			title: 'SKUID',
			dataIndex: 'sku_id',
			sorter: true,
			render: (_, record) => record?.product_detail?.sku_id
		},
		{
			title: 'Nama Produk',
			dataIndex: 'name',
			sorter: true,
			render: (_, record) => record?.product_detail?.name?.id
		},
		{
			title: 'Stok Tersedia',
			dataIndex: 'stock',
			sorter: true,
			render: (_, record) => record?.product_detail?.available_stock
		},
		{
			title: 'Harga Normal',
			dataIndex: 'price',
			sorter: true,
			render: (_, record) => (
				<AtomNumberFormat
					prefix="Rp. "
					value={record?.product_detail?.price}
				/>
			),
		},
		{
			title: 'Stok Terjual',
			dataIndex: 'total_sold',
			sorter: true,
			render: (_, record) => record?.product_detail?.total_sold
		},
		{
			title: 'Batas Stok per User',
			sorter: true,
			dataIndex: 'max_stock_per_user',
		},
		{
			title: 'Harga Setelah Discount',
			dataIndex: 'price_after_discount',
			sorter: true,
			render: (price_after_discount) => (
				<AtomNumberFormat
					prefix="Rp. "
					value={price_after_discount}
				/>
			),
		},
		{
			title: 'Discount (%)',
			dataIndex: 'discount_percentage',
			sorter: true,
			render: (discount_percentage) =>
			discount_percentage ? `${discount_percentage} %` : null,
		},
	];
	const viewTableRef = useRef();
  const {id} = useParams();
	const [sectionDetail, setSectionDetail] = useState(null);
	const [products, setProducts] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [filters, setFilters] = useState({
		branch: '',
		productCategory: '',
	});

	const getDetailSection = async () => {
		setIsLoading(true);
		try {
			const {data} = await additionalSectionService.findSectionById(id);
			setSectionDetail(data);
			if (data.products && Array.isArray(data.products) && data.products.length > 0) {
				const tmp = {};
				tmp.data = data.products;
				tmp.meta = { pagination: { total: data.products.length } }
				setProducts(tmp)
			}
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const applyFilter = (values) => {
		const filterTmp = {};

		if (values.branches) filterTmp.branch = values.branches;
		else filterTmp.branch = '';
		if (values.product_category) filterTmp.productCategory = values.product_category;
		else filterTmp.productCategory = '';

		setFilters(filterTmp);
	};

	const getDatatableData = () => {
		if (keyword !== '' || filters.branch || filters.branch !== '' || filters.productCategory || filters.productCategory !== '') {
			let tmp = {...products};
			if (keyword !== '')
				tmp.data = tmp.data.filter((column) =>
					column.product_detail.name.id.toLowerCase().includes(keyword.toLowerCase())
				);
	
			if (filters.branch || filters.branch !== '')
				tmp.data = tmp.data.filter((column) =>
				column.product_detail.branch.id.includes(filters.branch)
				);
	
			if (filters.productCategory || filters.productCategory !== '')
				tmp.data = tmp.data.filter((column) =>
					column.product_detail.base_category.id.includes(filters.productCategory)
				);
			return tmp;
		} else {
			return products;
		}
	};

	useEffect(() => {
		(async () => {
			getDetailSection();
		})();
	}, []);

	useEffect(() => {
		viewTableRef.current.refetchData();
	}, [keyword, filters])

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
        { name: 'Tampilan', link: '/view/additional-sections' },
				{ name: 'Detail Section', link: location.pathname },
			]}
			title="Detail Section"
		>
			<Row>
				<Col span={24}>
					<Row align="middle" justify="space-between">
						<Typography.Title level={4}>
							<span className="fw7">
								{`Detail Section`.toUpperCase()}
							</span>
						</Typography.Title>

						<MoleculeDatatableAdditionalAction
							column={column}
							getLimit={0}
							isEdit={true}
							label="Section"
							route={`/view/additional-sections/${id}`}
							url="additional-home-sections"
						/>
					</Row>
				</Col>
			</Row>

			{isLoading ? (
				<AtomSpinner/>
			) : (
        <Row align="top" className="mt4" gutter={24}>
          <Col span={24}>
            <AtomCard>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Typography.Text strong>
                    <span className="denim f5">
                      {'Info Section'.toUpperCase()}
                    </span>
                  </Typography.Text>
                </Col>

                <Col span={24}>
                  <MoleculeInfoGroup
                    title="Foto Banner"
                    content={
                      <MoleculeImageGroup
                        images={[
                          {
                            source:
                              sectionDetail?.banner_mobile_home,
                            label:
                              ' Foto Banner Mobile (Beranda)',
                          },
                          {
                            source:
                              sectionDetail?.banner_mobile_detail,
                            label:
                              ' Foto Banner Mobile (Detail)',
                          },
                          {
                            source:
                              sectionDetail?.banner_desktop_home,
                            label:
                              ' Foto Banner Desktop (Beranda)',
                          },
                          {
                            source:
                              sectionDetail?.banner_desktop_detail,
                            label:
                              ' Foto Banner Desktop (Detail)',
                          },
                        ]}
                      />
                    }
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Title (ID)"
                    content={sectionDetail?.title?.id}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Title (EN)"
                    content={sectionDetail?.title?.en}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Singkat (ID)"
                    content={sectionDetail?.short_description?.id}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Singkat (EN)"
                    content={sectionDetail?.short_description?.en}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Lengkap (ID)"
                    content={sectionDetail?.long_description?.id ? (
                      <MoleculeMarkdownRenderer
                        withBorder
                        text={
                          sectionDetail?.long_description?.id
                        }
                      />
                    ) : null}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Lengkap (EN)"
                    content={sectionDetail?.long_description?.en ? (
                      <MoleculeMarkdownRenderer
                        withBorder
                        text={
                          sectionDetail?.long_description?.en
                        }
                      />
                    ) : null}
                  />
                </Col>

                <Col span={24}>
                  <Typography.Text strong>
                    <span className="denim f5">
                      {'Info Update'.toUpperCase()}
                    </span>
                  </Typography.Text>
                </Col>

                <Col span={8}>
                  <MoleculeInfoGroup
                    title="Tanggal Dibuat"
                    content={
                      <ReactMoment format="DD-MM-YYYY">
                        {sectionDetail?.created_at}
                      </ReactMoment>
                    }
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Tanggal Diperbarui"
                    content={
                      <ReactMoment format="DD-MM-YYYY">
                        {sectionDetail?.updated_at}
                      </ReactMoment>
                    }
                  />
                </Col>

                <Col span={8}>
                  <MoleculeInfoGroup
                    title="Dibuat Oleh"
                    content={sectionDetail?.created_by}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Diperbarui Oleh"
                    content={sectionDetail?.updated_by}
                  />
                </Col>
              </Row>
            </AtomCard>
          </Col>

          <Col className="mt4" span={24}>
            <AtomCard title="Daftar Produk">
              <Row gutter={[0, 12]} className="mt4">
                <Col span={24}>
                  <Col span={8}>
                    <Input.Search
                      placeholder="Cari Nama Produk"
                      onSearch={(value) => setKeyword(value)}
                      size="large"
                    />
                  </Col>
                </Col>
                <Col span={24}>
                  <Row align="middle" gutter={48} justify="space-between">
                    <Col span={14}>
                      <Form
                        className="w-100 mt2"
                        name="product"
                        onFinish={applyFilter}
                        onFinishFailed={(error) => {
                          message.error(`Failed: ${error}`);
                          console.error(error);
                        }}
                      >
                        <Row align="middle" gutter={12}>
                          <Col span={9}>
                            <AtomBranchSelect
                              generateCustomOption={(item) => ({
                                  value: item.name.id,
                                  label: item.name.id
                                })
                              }
                            />
                          </Col>

                          <Col span={9}>
                            <MoleculeSelectInputGroup
                              label="Kategori Produk"
                              name="product_category"
                              placeholder="Kategori Produk"
                              allowClear
                              data={{
                                url: 'base-categories',
                                generateCustomOption: (
                                  item
                                ) => ({
                                  value: item.name.id,
                                  label: item.name.id,
                                }),
                              }}
                            />
                          </Col>

                          <Col span={6}>
                            <AtomPrimaryButton
                              htmlType="submit"
                              size="large"
                            >
                              Terapkan
                            </AtomPrimaryButton>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <OrganismDatatable
                columns={column}
                setFilterLocally
                dataSourceURL={`products`}
                dataSource={getDatatableData()}
                ref={viewTableRef}
              />
            </AtomCard>
          </Col>
        </Row>
			)}
		</OrganismLayout>
	);
};

export default AdditionalSectionDetailPage;
