import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {CouponDetailAdminService} from '../../../../../../controller/service/admin/coupon/CouponDetailAdminService.service';
import  {CouponDetailDto}  from '../../../../../../controller/model/coupon/CouponDetail.model';
import CouponDetailAdminCard from "../card/coupon-detail-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const CouponDetailAdminList: React.FC = () =>  {

    const [couponDetails, setCouponDetails] = useState<CouponDetailDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type CouponDetailResponse = AxiosResponse<CouponDetailDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [couponDetailId, setCouponDetailId] = useState(0);

    const service = new CouponDetailAdminService();

    const handleDeletePress = (id: number) => {
        setCouponDetailId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(couponDetailId);
            setCouponDetails((prevCouponDetails) => prevCouponDetails.filter((couponDetail) => couponDetail.id !== couponDetailId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting coupon detail:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [couponDetailResponse] = await Promise.all<CouponDetailResponse>([
            service.getList(),
            ]);
            setCouponDetails(couponDetailResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const handleFetchAndUpdate = async (id: number) => {
        try {
            const couponDetailResponse = await service.find(id);
            const couponDetailData = couponDetailResponse.data;
            navigation.navigate('CouponDetailAdminUpdate', { couponDetail: couponDetailData });
        } catch (error) {
            console.error('Error fetching coupon detail data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const couponDetailResponse = await service.find(id);
            const couponDetailData = couponDetailResponse.data;
            navigation.navigate('CouponDetailAdminDetails', { couponDetail: couponDetailData });
        } catch (error) {
            console.error('Error fetching coupon detail data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Coupon detail List</Text>

        <View style={{ marginBottom: 100 }}>
            {couponDetails && couponDetails.length > 0 ? ( couponDetails.map((couponDetail) => (
                <CouponDetailAdminCard key={couponDetail.id}
                    packagingName = {couponDetail.packaging.id}
                    discount = {couponDetail.discount}
                    amountGivenInfluencer = {couponDetail.amountGivenInfluencer}
                    usingNumber = {couponDetail.usingNumber}
                    maxUsingNumber = {couponDetail.maxUsingNumber}
                    couponName = {couponDetail.coupon.name}
                    onPressDelete={() => handleDeletePress(couponDetail.id)}
                    onUpdate={() => handleFetchAndUpdate(couponDetail.id)}
                    onDetails={() => handleFetchAndDetails(couponDetail.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No coupon details found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'CouponDetail'} />

    </ScrollView>

);
};

export default CouponDetailAdminList;
