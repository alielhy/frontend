import {Keyboard, SafeAreaView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';

import {globalStyle} from "../../../../../../shared/globalStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FilterModal from "../../../../../../zynerator/FilterModal";

import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';
import  {MemberDto}  from '../../../../../../controller/model/collaborator/Member.model';

import {CollaboratorDto} from '../../../../../../controller/model/collaborator/Collaborator.model';
import {CollaboratorAdminService} from '../../../../../../controller/service/admin/collaborator/CollaboratorAdminService.service';

type MemberUpdateScreenRouteProp = RouteProp<{ MemberUpdate: { member: MemberDto } }, 'MemberUpdate'>;

type Props = { route: MemberUpdateScreenRouteProp; };

const MemberAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { member } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

    const emptyCollaborator = new CollaboratorDto();
    const [collaborators, setCollaborators] = useState<CollaboratorDto[]>([]);
    const [collaboratorModalVisible, setCollaboratorModalVisible] = useState(false);
    const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorDto>(emptyCollaborator);


    const service = new MemberAdminService();
    const collaboratorAdminService = new CollaboratorAdminService();


    const { control, handleSubmit } = useForm<MemberDto>({
        defaultValues: {
            id: member.id ,
            description: member.description ,
            credentialsNonExpired: member.credentialsNonExpired ,
            enabled: member.enabled ,
            accountNonExpired: member.accountNonExpired ,
            accountNonLocked: member.accountNonLocked ,
            passwordChanged: member.passwordChanged ,
            username: member.username ,
            password: member.password ,
        },
    });



    const handleCloseCollaboratorModal = () => {
        setCollaboratorModalVisible(false);
    };

    const onCollaboratorSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedCollaborator(item);
        setCollaboratorModalVisible(false);
    };


    useEffect(() => {
        collaboratorAdminService.getList().then(({data}) => setCollaborators(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: MemberDto) => {
        item.collaborator = selectedCollaborator;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('Member');
        } catch (error) {
            console.error('Error saving member:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Member</Text>

            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />

            <TouchableOpacity onPress={() => setCollaboratorModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedCollaborator?.description}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>
            <CustomInput control={control} name={'credentialsNonExpired'} placeholder={'Credentials non expired'} keyboardT="numeric" />
            <CustomInput control={control} name={'enabled'} placeholder={'Enabled'} keyboardT="numeric" />
            <CustomInput control={control} name={'accountNonExpired'} placeholder={'Account non expired'} keyboardT="numeric" />
            <CustomInput control={control} name={'accountNonLocked'} placeholder={'Account non locked'} keyboardT="numeric" />
            <CustomInput control={control} name={'passwordChanged'} placeholder={'Password changed'} keyboardT="numeric" />
            <CustomInput control={control} name={'username'} placeholder={'Username'} keyboardT="default" />
            <CustomInput control={control} name={'password'} placeholder={'Password'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Member"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {collaborators &&
            <FilterModal visibility={collaboratorModalVisible} placeholder={"Select a Collaborator"} onItemSelect={onCollaboratorSelect} items={collaborators} onClose={handleCloseCollaboratorModal} variable={'description'} />
        }

    </SafeAreaView>
);
};

export default MemberAdminEdit;
