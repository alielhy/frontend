import {Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Link} from '@react-navigation/native';
import {useState} from "react";
//import {Button} from 'react-native';
import {Avatar, Banner, Text, TextInput} from "react-native-paper";
import {Formik} from "formik";
import * as yup from 'yup';
import FlatButton from "../../zynerator/Flatbutton";


const moroccanPhoneNumberRegExp = /^(06|07)[0-9]{8}$/;
const formValidation = yup.object({
    numTel: yup
      .string()
      .matches(
        moroccanPhoneNumberRegExp,'le Numéro de Téléphone est invalide')
      .required('le Numéro de Téléphone est obligatoire'),
    password: yup
    .string()
    .min(4,'le mot de passe doit contenir au minimum 8 caractères')
    .required('le mot de passe est obligatoire')
  });


export default function Login({navigation}) {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [bannerVisible, setbannerVisible] = useState(false);



  /*  const handleLogin=(values)=>{
        let user =new LoginDto(values.numTel,values.password);
        user_login(user).then((result)=>{
            if(result.status == 200){
                const tokenService=new TokenService();
                tokenService.saveToken(result.data.accessToken)
                .then( navigation.navigate('homeApp'));
            }
        }).catch(err =>{
            setbannerVisible(!bannerVisible);
            setTimeout(()=>{setbannerVisible(!bannerVisible)},3.0*1000);
        })


    }*/
    
    const genInitialValues = () => ({
        numTel:'', password:''
      });
   


    return (
      
  <Formik initialValues={{ numTel:'', password:''}}
                   validationSchema={formValidation}
                  
                   onSubmit={(values,actions)=>{
                     actions.resetForm();
                     navigation.navigate("DrawerNavigation")
                       {/* handleLogin(values); */}
                    
                }}>

    { (props)=>(
        

          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
         <View style={styles.container}>
         <TouchableOpacity   onPress={()=>{setbannerVisible(!bannerVisible)}} >
         <Banner visible={bannerVisible} style={{backgroundColor:'crimson',marginTop:10,borderRadius:10}} >
            <Text variant="titleMedium" style={{color:'white'}}>Merci de vérifier votre numéro et mot de passe</Text>
         </Banner>
         </TouchableOpacity>
          
         <View style={styles.logo}>
         <Avatar.Image  size={100} source={require('../../../assets/sgbd.png')} />
             <Text style={{color:'#101f72',fontWeight:'bold',marginTop:5}}>Purchase front</Text>
         </View>
            <View style={styles.form}>
          { /* <Text variant="displaySmall" style={({marginBottom:30})}>Connexion</Text>*/}
                            <TextInput mode="outlined"
                             activeOutlineColor='#ffc20f'
                             outlineColor={props.errors.numTel? "red":"black"}
                             label="Numéro de Téléphone"  
                             style={styles.input}
                             keyboardType="numeric"
                             onChangeText={props.handleChange('numTel')} 
                             onBlur={props.handleBlur('numTel')}/>
                            <Text variant="labelSmall" style={{color:'crimson'}}> {props.touched.numTel && props.errors.numTel}</Text> 
    
                                <TextInput 
                                    style={styles.input}
                                    activeOutlineColor='#ffc20f'
                                    outlineColor={props.errors.password? "red":"black"}
                                    mode="outlined"
                                    label="Mot de Passe"
                                    secureTextEntry={passwordVisible}
                                    onChangeText={props.handleChange('password')}
                                    onBlur={props.handleBlur('password')} 
                                    right={<TextInput.Icon icon={passwordVisible ? 'eye':'eye-off'} onPress={()=>setPasswordVisible(!passwordVisible)} />}/>
                                    {props.touched.password && props.errors.password && (
                                        <Text variant="labelSmall" style={{color:'crimson'}}>{props.errors.password}</Text>
      )}
                                
                                <Text style={({ marginTop: 15,color:'#ffc20f' })}>Mot de passe oublié? <Link to={'/confirmation'} style={({ color: 'blue' })}>Rénitialiser</Link></Text>
                       </View>
                        <View style={styles.button}>
                            <FlatButton  onPress={props.handleSubmit } text={'connexion'} disabled={props.errors.password||props.errors.numTel ?true:false} ></FlatButton>
                        </View>
                        <TouchableOpacity  onPress={()=>navigation.navigate("formulaire")}>

                            <Text variant="titleMedium" style={styles.text}>Avez vous un compte? S'inscrire </Text>
                         </TouchableOpacity>
                       
                        </View>
                   
          </TouchableWithoutFeedback>   ) }
          
             
         </Formik>
         )
}
            
   
      


      
    
const styles = StyleSheet.create({

    text:{
        alignSelf:'center',
        justifyContent:'flex-end',
        marginTop:15,
        color:'#ffc20f'
    },
    button:{
        flexDirection:'column',
        justifyContent:'flex-end'
      
    },
    line:{
     borderBottomColor: '#8a8a87',
     borderBottomWidth:2,
     marginTop:10,
     width:110,
    
    },
    form: {
        flex:2,
        justifyContent:"center",
        alignItems :"center",
    },

    input:{
        borderRadius:10,
        width: '90%',
    },
    logo:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        backgroundColor:'#FFFBFB'
    },
    container: {
        flex : 1 ,
        padding:24,
        backgroundColor:'#FFFBFB',

    },

})
