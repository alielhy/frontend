import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {CouponDetailDto}  from '../../../../../../controller/model/coupon/CouponDetail.model';

type CouponDetailViewScreenRouteProp = RouteProp<{ CouponDetailDetails: { couponDetail : CouponDetailDto } }, 'CouponDetailDetails'>;

type Props = { route: CouponDetailViewScreenRouteProp; };

const CouponDetailAdminView: React.FC<Props> = ({ route }) => {

    const { couponDetail } = route.params;
    const [isCouponDetailCollapsed, setIsCouponDetailCollapsed] = useState(false);



    const couponDetailCollapsible = () => {
        setIsCouponDetailCollapsed(!isCouponDetailCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={couponDetailCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Coupon detail</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isCouponDetailCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {couponDetail.id}</Text>
                        <Text style={globalStyle.infos}>Packaging: {couponDetail?.packaging?.id}</Text>
                        <Text style={globalStyle.infos}>Discount: {couponDetail.discount}</Text>
                        <Text style={globalStyle.infos}>Amount given influencer: {couponDetail.amountGivenInfluencer}</Text>
                        <Text style={globalStyle.infos}>Using number: {couponDetail.usingNumber}</Text>
                        <Text style={globalStyle.infos}>Max using number: {couponDetail.maxUsingNumber}</Text>
                        <Text style={globalStyle.infos}>Coupon: {couponDetail?.coupon?.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default CouponDetailAdminView;
