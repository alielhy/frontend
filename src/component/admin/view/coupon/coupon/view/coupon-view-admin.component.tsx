import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {CouponDto}  from '../../../../../../controller/model/coupon/Coupon.model';

type CouponViewScreenRouteProp = RouteProp<{ CouponDetails: { coupon : CouponDto } }, 'CouponDetails'>;

type Props = { route: CouponViewScreenRouteProp; };

const CouponAdminView: React.FC<Props> = ({ route }) => {

    const { coupon } = route.params;
    const [isCouponCollapsed, setIsCouponCollapsed] = useState(false);

    const [isCouponDetailsCollapsed, setIsCouponDetailsCollapsed] = useState(true);

    const couponDetailsCollapsible = () => {
        setIsCouponDetailsCollapsed(!isCouponDetailsCollapsed);
    };

    const couponCollapsible = () => {
        setIsCouponCollapsed(!isCouponCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={couponCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Coupon</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isCouponCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {coupon.id}</Text>
                        <Text style={globalStyle.infos}>Code: {coupon.code}</Text>
                        <Text style={globalStyle.infos}>Date start: {coupon.dateStart}</Text>
                        <Text style={globalStyle.infos}>Date end: {coupon.dateEnd}</Text>
                        <Text style={globalStyle.infos}>Name: {coupon.name}</Text>
                        <Text style={globalStyle.infos}>Influencer: {coupon?.influencer?.id}</Text>

                    </View>

                </View>

            </Collapsible>

            <TouchableOpacity onPress={couponDetailsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Coupon details</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isCouponDetailsCollapsed}>

                {coupon.couponDetails && coupon.couponDetails.length > 0 ? ( coupon.couponDetails.map((item, index) => (
                    <View key={index} style={globalStyle.itemCard}>
                        <View>
                            <Text style={globalStyle.infos}>Packaging: {item?.packaging?.id}</Text>
                            <Text style={globalStyle.infos}>Discount : {item.discount}</Text>
                            <Text style={globalStyle.infos}>Amount given influencer : {item.amountGivenInfluencer}</Text>
                            <Text style={globalStyle.infos}>Using number : {item.usingNumber}</Text>
                            <Text style={globalStyle.infos}>Max using number : {item.maxUsingNumber}</Text>

                        </View>
                    </View>
                    )) ) : (
                    <View style={globalStyle.itemCard}>
                        <Text style={globalStyle.infos}>No coupon details</Text>
                    </View>
                )}

            </Collapsible>

        </ScrollView>

    </View>
);
};

export default CouponAdminView;
