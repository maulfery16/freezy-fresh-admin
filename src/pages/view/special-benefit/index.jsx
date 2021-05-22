import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import OrganismLayout from '../../../components/organisms/layout';

import SpecialBenefitService from '../../../services/special-benefit';

const SpecialBenefitPage = () => {
	const specialBenefitService = new SpecialBenefitService();
	const [specialBenefit, setSpecialBenefit] = useState(null);
	const [loading, setLoading] = useState(null);

	const getSpecialBenefitDetail = async () => {
		try {
			setLoading(true);

			const {
				data: specialBenefit,
			} = await specialBenefitService.getSpecialBenefit();

			if (typeof specialBenefit.data === Object)
				if (specialBenefit.data.length > 0)
					setSpecialBenefit(specialBenefit.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			getSpecialBenefitDetail();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: `Tampilan`, link: '/view' },
				{ name: `Special Benefit`, link: location.pathname },
			]}
			title="Special Benefit"
		>
			<Row align="middle" justify="space-between">
				<Col>
					<Typography.Title level={4}>
						<span className="fw7">
							{`Special Benefit`.toUpperCase()}
						</span>
					</Typography.Title>
				</Col>

				<Col>
					<Link
						to={{
							pathname: '/view/special-benefit/edit',
							state: {
								specialBenefit: specialBenefit,
							},
						}}
					>
						<AtomPrimaryButton size="large">{`Edit Detail`}</AtomPrimaryButton>
					</Link>
				</Col>
			</Row>

			{loading ? (
				<Skeleton active />
			) : !specialBenefit && !loading ? (
				<Typography.Text strong>
					<span className="denim f5">
						Belum ada Special Benefit, edit detail untuk menambahkan
					</span>
				</Typography.Text>
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title={`Info Special Benefit`}>
							<Row
								align="top"
								style={{ paddingTop: '1rem' }}
								gutter={[12, 24]}
							>
								<Col span={24}>
									<MoleculeInfoGroup
										title="Status"
										content={
											specialBenefit.is_active
												? 'AKTIF'
												: 'TIDAK AKTIF' || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Special Benefit (ID)"
										content={`${
											specialBenefit.title.id || '-'
										}
										`}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Special Benefit (EN)"
										content={`${
											specialBenefit.title.en || '-'
										}`}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Gambar Poster"
										content={
											<MoleculeImageGroup
												images={[
													{
														source:
															specialBenefit.banner_mobile ||
															null,
														label: 'Mobile',
													},
													{
														source:
															specialBenefit.banner_desktop ||
															null,
														label: 'Dekstop',
													},
												]}
											/>
										}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
									<Typography.Text strong>
										<span className="denim f5">
											INFO UPDATE
										</span>
									</Typography.Text>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{specialBenefit.created_at ||
													'-'}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{specialBenefit.updated_at ||
													'-'}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={
											specialBenefit.created_by || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={
											specialBenefit.updated_by || '-'
										}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default SpecialBenefitPage;
