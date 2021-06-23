/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Skeleton, Typography, message, Form, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismProductDatatable from '../../../components/organisms/datatable/product-datatable';
import OrganismLayout from '../../../components/organisms/layout';

const { TabPane } = Tabs;

import BasedOnSearchService from '../../../services/based-on-search';
const basedOnSearchService = new BasedOnSearchService();

const BasedOnSearchModifyPage = () => {
	const viewTableRef = useRef();

	const history = useHistory();
	const [form] = Form.useForm();

	const [basedOnSearch, setBasedOnSearch] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [productList, setProductList] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [longDescId, setLongDescId] = useState('');
	const [longDescEn, setLongDescEn] = useState('');

	const getBasedOnSearch = async () => {
		try {
			const {data} = await basedOnSearchService.getBasedOnSearch();
			setBasedOnSearch(data);
			if (data?.long_description?.id) setLongDescId(data?.long_description?.id);
			if (data?.long_description?.en) setLongDescEn(data?.long_description?.en);
			if (data.products && Array.isArray(data.products) && data.products.length > 0) {
				const tmp = [];
				data.products.map((x, idx) => {
					const {product_detail, ...rest} = x;
          if (product_detail.discount_percentage !== null && product_detail.discount_percentage !== undefined) delete product_detail.discount_percentage;
					rest.data_idx = `${Math.floor(Math.random() * 1000)}_${idx}`;
					const newObj = Object.assign({}, rest, product_detail);
					tmp.push(newObj)
				})
				setProductList(tmp);
			}
			setIsCreating(!data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setHolidayInitialValues = () => {
		return isCreating
			? {}
			: {
					en_title: basedOnSearch?.title?.en,
					id_title: basedOnSearch?.title?.id,
					id_short_desc: basedOnSearch?.short_description?.id,
					en_short_desc: basedOnSearch?.short_description?.en,
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const formData = new FormData();
			formData.append('title[id]', values.id_title);
			formData.append('title[en]', values.en_title);
			formData.append('short_description[id]', values.id_short_desc);
			formData.append('short_description[en]', values.en_short_desc);
			formData.append('long_description[id]', longDescId);
			formData.append('long_description[en]', longDescEn);

			const productsToAssign = [];
			viewTableRef.current.data.map((x) => {
				const { published_stock, id, product_id, product_detail_id, fixed_price, price, discount_percentage, is_manage_stock, price_after_discount } = x;
				const tmpObj = {
					published_stock,
					product_id,
					fixed_price,
					price,
					discount_percentage: parseFloat(discount_percentage).toFixed(2),
					is_manage_stock,
					product_detail_id: id ? id : product_detail_id,
					price_after_discount: price_after_discount ? parseInt(price_after_discount) : 0
				};
				productsToAssign.push(tmpObj);
			})
			
			
			if (isCreating) {
				const {data} = await basedOnSearchService.createBasedOnSearch(formData);
				if (data) {
					const response = await basedOnSearchService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil menambah based on search');
					}
				}
			} else {
				const {data} = await basedOnSearchService.editBasedOnSearch(basedOnSearch.id, formData);
				if (data) {
					const response = await basedOnSearchService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil mengubah based on search');
					}
				}
			}

			message.info(
				'Akan dikembalikan ke halaman daftar based on search dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/based-on-search');
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
			await getBasedOnSearch();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Based On Search', link: '/view/based-on-search' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah Based On Search',
					link: location.pathname,
				},
			]}
			title="Based On Search"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Based On Search`.toUpperCase()}</span>
			</Typography.Title>

			{!basedOnSearch ? (
				<Skeleton active />
			) : (
        <Row align="top" className="mt4" gutter={24}>
          <Col span={24}>
            <Form
              className="w-100 mt4"
              name="modify_based_on_search"
              form={form}
              onFinish={submit}
              initialValues={setHolidayInitialValues()}
              onFinishFailed={(error) => {
                message.error(`Failed: ${error}`);
                console.error(error);
              }}
            >
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
                    <MoleculeTextInputGroup
                      name="id_title"
                      label="Title (ID)"
                      placeholder="Judul Title (ID)"
                      type="text"
                      value={basedOnSearch?.title?.id}
                    />
                  </Col>

                  <Col span={12}>
                    <MoleculeTextInputGroup
                      name="en_title"
                      label="Judul (EN)"
                      placeholder="Judul (EN)"
                      type="text"
                      value={basedOnSearch?.title?.en}
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
                      value={basedOnSearch?.short_description?.id}
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
                      value={basedOnSearch?.short_description?.en}
                    />
                  </Col>

                  <Col span={12}>
                    <MoleculeTextEditorGroup
                      name="id_long_desc"
                      label="Deskripsi Lengkap (ID)"
                      value={longDescId}
                      onChange={setLongDescId}
                    />
                  </Col>

                  <Col span={12}>
                    <MoleculeTextEditorGroup
                      name="en_long_desc"
                      label="Deskripsi Lengkap (EN)"
                      value={longDescEn}
                      onChange={setLongDescEn}
                    />
                  </Col>
                </Row>
              </AtomCard>
            </Form>
          </Col>
        
          <Col className="mt4" span={24}>
            <OrganismProductDatatable
              ref={viewTableRef}
              defaultData={productList}
              canModify
            />
          </Col>
          
          <Col className="mt4" span={24}>
            <MoleculeModifyActionButtons
              backUrl="/view/based-on-search"
              isCreating={isCreating}
              isSubmitting={isSubmitting}
              label="Based On Search"
              onClick={() => form.submit()}
            />
          </Col>
        </Row>
			)}
		</OrganismLayout>
	);
};

export default BasedOnSearchModifyPage;
