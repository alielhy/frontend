import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {CouponAdminService} from '../../../../../../controller/service/admin/coupon/CouponAdminService.service';
import  {CouponDto}  from '../../../../../../controller/model/coupon/Coupon.model';
import CouponAdminCard from "../card/coupon-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const CouponAdminList: React.FC = () =>  {

    const [coupons, setCoupons] = useState<CouponDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type CouponResponse = AxiosResponse<CouponDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [couponId, setCouponId] = useState(0);

    const service = new CouponAdminService();

    const handleDeletePress = (id: number) => {
        setCouponId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(couponId);
            setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== couponId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting coupon:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [couponResponse] = await Promise.all<CouponResponse>([
            service.getList(),
            ]);
            setCoupons(couponResponse.data);
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
            const couponResponse = await service.find(id);
            const couponData = couponResponse.data;
            navigation.navigate('CouponAdminUpdate', { coupon: couponData });
        } catch (error) {
            console.error('Error fetching coupon data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const couponResponse = await service.find(id);
            const couponData = couponResponse.data;
            navigation.navigate('CouponAdminDetails', { coupon: couponData });
        } catch (error) {
            console.error('Error fetching coupon data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Coupon List</Text>

        <View style={{ marginBottom: 100 }}>
            {coupons && coupons.length > 0 ? ( coupons.map((coupon) => (
                <CouponAdminCard key={coupon.id}
                    code = {coupon.code}
                    dateStart = {coupon.dateStart}
                    dateEnd = {coupon.dateEnd}
                    name = {coupon.name}
                    influencerName = {coupon.influencer.id}
                    onPressDelete={() => handleDeletePress(coupon.id)}
                    onUpdate={() => handleFetchAndUpdate(coupon.id)}
                    onDetails={() => handleFetchAndDetails(coupon.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No coupons found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Coupon'} />

    </ScrollView>

);
};

export default CouponAdminList;
