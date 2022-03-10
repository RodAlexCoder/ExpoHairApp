import React from 'react'
import {Modal, View, TouchableWithoutFeedback, StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import ExpandIcon from '../assets/expand.svg'

import NavPreIcon from '../assets/nav_prev.svg'
import NavNextIcon from '../assets/nav_next.svg'


const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
]

export default function BarberModal({show, setShow, user, service}) {

    const navigation = useNavigation()

    const handleCloseButton = () => {
        setShow(false)
    } 

    const handleFinishClick = () => {
        alert('Funcionou')
    }

    return (

        <Modal
            transparent={true}
            visible={show}
            animationType='slide'
        >
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0 , 0, 0.5)', justifyContent: 'flex-end'}}>
            <View style={{backgroundColor: '#83d6e3', borderTopLeftRadius: 20, borderTopRightRadius: 20, minHeight: 500, paddingHorizontal: 20, paddingVertical: 20}}>
                <TouchableWithoutFeedback onPress={handleCloseButton}>
                    <ExpandIcon width='40' height='40' fill='#000000'/>
                </TouchableWithoutFeedback>

                <View style={styles.ModalItem}>
                    <View style={styles.UserInfo}>
                        <Image source={{uri: user.avatar}} style={styles.UserAvatar}/>
                        <Text style={styles.UserName}>{user.name}</Text>
                    </View>
                </View>    

             {service !== null && 
                <View style={styles.ModalItem}>
                   <View style={styles.ServiceInfo}>
                       <Text style={styles.ServiceName}>{user.services[service].name}</Text>
                       <Text style={styles.ServicePrice}> R$: {user.services[service].price}</Text>

                    </View>
                </View>
            }

            <View style={styles.ModalItem}>
                <View style={styles.DateInfo}>
                    <TouchableOpacity style={styles.DatePrevArea}>
                          <NavPreIcon width='35' height='35' fill='#121212'/>
                    </TouchableOpacity>

                    <View style={styles.Datetitlearea}>
                        <Text style={styles.DatetitleareaText}>Março 2021</Text>
                    </View>

                    <TouchableOpacity style={styles.DateNextArea}>
                          <NavNextIcon width='35' height='35' fill='#121212'/>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.Finishbutton} onPress={handleFinishClick}>
                    <Text style={styles.FinishbuttonText}>Finalizar</Text>
            </TouchableOpacity>


                
            </View>           
        </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10
    },
    UserInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    UserAvatar: {
        width: 56,
        height: 56,
        borderRadius: 20,
        marginRight: 15
    },
    UserName: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
    },

    ServiceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ServiceName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    ServicePrice: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    Finishbutton: {
        backgroundColor: '#268596',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    FinishbuttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },

    DateInfo: {
        flexDirection: 'row'
    },

    DatePrevArea: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    DateNextArea: {
        flex: 1,
        alignItems: 'flex-start'
    },

    Datetitlearea: {
        width: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },

    DatetitleareaText: {
        fontSize: 17,
        fontWeight:  'bold',
        color: '#000000'
    }

})