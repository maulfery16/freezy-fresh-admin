/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, Row, Typography, message, Input, Form } from 'antd';

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

import BasedOnSearchService from '../../../services/based-on-search';
const basedOnSearchService = new BasedOnSearchService();

const BasedOnSearchPage = () => {
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
      csvRender: (item) =>
				item?.product_detail?.price ? `Rp. ${item?.product_detail?.price}` : 0,
		},
		{
			title: 'Stok Terjual',
			dataIndex: 'total_sold',
			sorter: true,
			render: (_, record) => record?.product_detail?.total_sold
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
      csvRender: (item) =>
				item?.price_after_discount ? `Rp. ${item?.price_after_discount}` : 0,
		},
		{
			title: 'Discount (%)',
			dataIndex: 'discount_percentage',
			sorter: true,
			render: (discount_percentage) =>
			discount_percentage ? `${discount_percentage} %` : '0.00 %',
		},
	];
	const viewTableRef = useRef();
	const [basedOnSearch, setBasedOnSearch] = useState(null);
	const [products, setProducts] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [filters, setFilters] = useState({
		branch: '',
		productCategory: '',
	});

	const getBasedOnSearch = async () => {
		setIsLoading(true);
		try {
			const {data} = await basedOnSearchService.getBasedOnSearch();
			setBasedOnSearch(data);
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
			getBasedOnSearch();
		})();
	}, []);

	useEffect(() => {
		viewTableRef.current.refetchData();
	}, [keyword, filters])

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Based On Search', link: location.pathname },
			]}
			title="Based On Search"
		>
			<Row>
				<Col span={24}>
					<Row align="middle" justify="space-between">
						<Typography.Title level={4}>
							<span className="fw7">
								{`Based On Search`.toUpperCase()}
							</span>
						</Typography.Title>

						<MoleculeDatatableAdditionalAction
							column={column}
							getLimit={0}
							isEdit={true}
							label="Based On Search"
							route="/view/based-on-search"
							url="based-on-search"
              filter="products"
							specifiedProp="products"
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
                      {'Info Based On Search'.toUpperCase()}
                    </span>
                  </Typography.Text>
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Title (ID)"
                    content={basedOnSearch?.title?.id}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Title (EN)"
                    content={basedOnSearch?.title?.en}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Singkat (ID)"
                    content={basedOnSearch?.short_description?.id}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Singkat (EN)"
                    content={basedOnSearch?.short_description?.en}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Lengkap (ID)"
                    content={basedOnSearch?.long_description?.id ? (
                      <MoleculeMarkdownRenderer
                        withBorder
                        text={
                          basedOnSearch?.long_description?.id
                        }
                      />
                    ) : null}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Deskripsi Lengkap (EN)"
                    content={basedOnSearch?.long_description?.en ? (
                      <MoleculeMarkdownRenderer
                        withBorder
                        text={
                          basedOnSearch?.long_description?.en
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
                        {basedOnSearch?.created_at}
                      </ReactMoment>
                    }
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Tanggal Diperbarui"
                    content={
                      <ReactMoment format="DD-MM-YYYY">
                        {basedOnSearch?.updated_at}
                      </ReactMoment>
                    }
                  />
                </Col>

                <Col span={8}>
                  <MoleculeInfoGroup
                    title="Dibuat Oleh"
                    content={basedOnSearch?.created_by}
                  />
                </Col>

                <Col span={12}>
                  <MoleculeInfoGroup
                    title="Diperbarui Oleh"
                    content={basedOnSearch?.updated_by}
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

export default BasedOnSearchPage;
