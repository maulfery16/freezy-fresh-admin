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

import RecommendationService from '../../../services/recommendation';
const recommendationService = new RecommendationService();

const RecommendationModifyPage = () => {
	const viewTableRef = useRef();

	const history = useHistory();
	const [form] = Form.useForm();

	const [recommendation, setRecommendation] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [productList, setProductList] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [longDescId, setLongDescId] = useState('');
	const [longDescEn, setLongDescEn] = useState('');

	const getRecommendation = async () => {
		try {
			const {data} = await recommendationService.getRecommendation();
			setRecommendation(data);
			if (data?.long_description && data?.long_description?.id) setLongDescId(data?.long_description?.id);
			if (data?.long_description && data?.long_description?.en) setLongDescEn(data?.long_description?.en);
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
			console.error(error.message);
			message.error(error.message);
		}
	};

	const setHolidayInitialValues = () => {
		return isCreating
			? {}
			: {
					en_title: recommendation?.title?.en,
					id_title: recommendation?.title?.id,
					id_short_desc: recommendation?.short_description?.id,
					en_short_desc: recommendation?.short_description?.en,
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
				const { max_stock_per_user, published_stock, id, product_id, product_detail_id, fixed_price, price, discount_percentage, is_manage_stock, price_after_discount } = x;
				const tmpObj = {
					max_stock_per_user: parseInt(max_stock_per_user),
					published_stock,
					product_id,
					fixed_price,
					price,
					discount_percentage: parseFloat(discount_percentage).toFixed(2),
					is_manage_stock,
					product_detail_id: id ? id : product_detail_id,
					price_after_discount: price_after_discount ? parseInt(price_after_discount) : parseInt(price)
				};
				productsToAssign.push(tmpObj);
			})
			
			
			if (isCreating) {
				const {data} = await recommendationService.createRecommendation(formData);
				if (data) {
					const response = await recommendationService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil menambah produk rekomendasi');
					}
				}
			} else {
				const {data} = await recommendationService.editRecommendation(recommendation.id, formData);
				if (data) {
					const response = await recommendationService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil mengubah produk rekomendasi');
					}
				}
			}

			message.info(
				'Akan dikembalikan ke halaman daftar produk rekomendasi dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/recommendation');
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
			await getRecommendation();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk-produk', link: '/products' },
				{ name: 'Produk Rekomendasi', link: '/products/recommendation' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah Produk Rekomendasi',
					link: location.pathname,
				},
			]}
			title="Produk Rekomendasi"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Produk Rekomendasi`.toUpperCase()}</span>
			</Typography.Title>

			{!recommendation ? (
				<Skeleton active />
			) : (
        <Row align="top" className="mt4" gutter={24}>
          <Col span={24}>
            <Form
              className="w-100 mt4"
              name="modify_product_recommendation"
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
                        {'Info Produk Rekomendasi'.toUpperCase()}
                      </span>
                    </Typography.Text>
                  </Col>

                  <Col span={12}>
                    <MoleculeTextInputGroup
                      name="id_title"
                      label="Title (ID)"
                      placeholder="Judul Title (ID)"
                      type="text"
                      value={recommendation?.title?.id}
                    />
                  </Col>

                  <Col span={12}>
                    <MoleculeTextInputGroup
                      name="en_title"
                      label="Judul (EN)"
                      placeholder="Judul (EN)"
                      type="text"
                      value={recommendation?.title?.en}
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
                      value={recommendation?.short_description?.id}
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
                      value={recommendation?.short_description?.en}
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
              maxStockPerUser
              canModify
            />
          </Col>
          
          <Col className="mt4" span={24}>
            <MoleculeModifyActionButtons
              backUrl="/products/recommendation"
              isCreating={isCreating}
              isSubmitting={isSubmitting}
              label="Produk Rekomendasi"
              onClick={() => form.submit()}
            />
          </Col>
        </Row>
			)}
		</OrganismLayout>
	);
};

export default RecommendationModifyPage;
