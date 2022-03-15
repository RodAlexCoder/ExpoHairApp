import React , {useState, useEffect}from 'react'
import {Modal, View, TouchableWithoutFeedback, StyleSheet, Image, Text, TouchableOpacity, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import ExpandIcon from '../assets/expand.svg'
import api from '../api'

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

    const [seletectYear , setSelectedYear] = useState(0)
    const [seletectMonth , setSelectedMonth] = useState(0)
    const [seletectDay , setSelectedDay] = useState(0)
    const [seletectHour , setSelectedHour] = useState(null)
    const [listDays , setListDays] = useState([])
    const [listHours , setListHours] = useState([])

    //console.log(user.available)

    useEffect(()=>{    
        if(user.available){       
        let daysInMonths = new Date(seletectYear, seletectMonth + 1, 0).getDate()
        let newListDays = []

        for(let i=1; i<=daysInMonths; i++){
            let d = new Date(seletectYear, seletectMonth, i)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()
            month = month < 10 ? '0'+month : month
            day = day < 10 ? '0'+day : day
            let selDate = `${year}-${month}-${day}`

            let availability = user.available.filter(e => e.date  === selDate)

            newListDays.push({
                status: availability.length > 0 ? true : false,
                weekday: days[d.getDay()],
                number: i
            })
        }

        setListDays(newListDays)

        setSelectedDay(0 )
        setListHours([])
        setSelectedHour(0)
        }
    }, [user, seletectMonth, seletectYear])

    useEffect(()=>{

        let today = new Date()
        setSelectedYear (today.getFullYear())
        setSelectedMonth (today.getMonth())
        setSelectedDay (today.getDay())

    },[])

    useEffect(()=> {
        if(user.available && seletectDay > 0){
            let d = new Date(seletectYear, seletectMonth, seletectDay)

            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()
            month = month < 10 ? '0'+month : month
            day = day < 10 ? '0'+day : day
            let selDate = `${year}-${month}-${day}`

            let availability = user.available.filter(e => e.date  === selDate)

            if(availability.length  > 0){
                setListHours(availability[0].hours)
            }
            
        }
        setSelectedHour(null)
    }, [user, seletectDay])

    const handleCloseButton = () => {
        setShow(false)
    } 

    const handleFinishClick = async () => {
        if(user.id && 
        service != null && 
        seletectYear > 0 && 
        seletectMonth > 0 && 
        seletectDay > 0 
        && seletectHour != null){
            
            let res = await api.setAppointment(
                user.id,
                user.services[service].id, 
                seletectYear,
                seletectMonth +1 ,
                seletectDay,
                seletectHour
            )
            if(res.error == '') {
                setShow(false)
                navigation.navigate('Appointments')
            }else {
                alert('Parou aqui ---- error: ' + res.error)
            }
            }else {
                alert('Preencha todos os dados')
            }

        }
    

    const handleLeftDateClick = ( ) => {
        let monthDate = new Date(seletectYear, seletectMonth, 1)
        monthDate.setMonth(monthDate.getMonth() -1)
        setSelectedYear(monthDate.getFullYear())
        setSelectedMonth(monthDate.getMonth())
        setSelectedDay(0)
    }

    const handleRightDateClick = () => {
        let monthDate = new Date(seletectYear, seletectMonth, 1)
        monthDate.setMonth(monthDate.getMonth() +1)
        setSelectedYear(monthDate.getFullYear())
        setSelectedMonth(monthDate.getMonth())
        setSelectedDay(0)
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
                    <TouchableOpacity style={styles.DatePrevArea} onPress={handleLeftDateClick}>
                          <NavPreIcon width='35' height='35' fill='#121212'/>
                    </TouchableOpacity>

                    <View style={styles.Datetitlearea}>
                        <Text style={styles.DatetitleareaText}>{months[seletectMonth]} {seletectYear}</Text>
                    </View>

                    <TouchableOpacity style={styles.DateNextArea} onPress={handleRightDateClick}>
                          <NavNextIcon width='35' height='35' fill='#121212'/>
                    </TouchableOpacity>
                </View>
                
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.DateList}>
                        {listDays.map((item, key)=> (
                            <TouchableOpacity 
                            key={key} 
                            onPress={()=> item.status ? setSelectedDay(item.number) : null}
                            style={{backgroundColor: item.number === seletectDay? '#4eadbe' : '#FFFFFF' ,opacity: item.status ? 1 : 0.5, width: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10, paddingVertical: 8}}
                            >
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: item.number === seletectDay? '#FFFFFF' : '#121212' }}>{item.weekday}</Text>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: item.number === seletectDay? '#FFFFFF' : '#121212'}}>{item.number}</Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>

            {seletectDay > 0 && listHours.length > 0 && 

            <View style={styles.ModalItem}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {listHours.map((item, key) => (
                    <TouchableOpacity key={key}
                                     onPress={()=>setSelectedHour(item)}
                                     style={{backgroundColor: item === seletectHour? '#4eadbe' : '#FFFFFF' , width: 73, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}
                    >
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: item === seletectHour? '#FFFFFF' : '#121212'}}>{item}</Text>

                    </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            }

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
    },
    DateList: {

    }

})