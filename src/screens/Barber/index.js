import React, {useState, useEffect} from 'react'
import {View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal} from 'react-native'
import {useNavigation , useRoute} from '@react-navigation/native'
import api from '../../api'
import Stars from '../../components/Stars'
import BarberModal from '../../components/BarberModal'

import FavoriteIcon from '../../assets/favorite.svg'
import FavoriteFull from '../../assets/favorite_full.svg'
import NavPrevButton from '../../assets/nav_prev.svg'
import NavNextButton from '../../assets/nav_next.svg'
import BackIcon from '../../assets/back.svg'
import Swiper from 'react-native-swiper'

export default function Barber() {
  const navigation = useNavigation()
  const route = useRoute()

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars:route.params.stars
  })

  const [loading, setLoading] = useState(false)
  const [favorited, SetFavorited] = useState(false)
  const [selectedService, SetSelectedService]  = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
      const getBarberInfo = async () => {
        setLoading(true)

        let json = await api.getBarber(userInfo.id)
        if(json.error === ''){

         setUserInfo(json.data)
         SetFavorited(json.data.favorited)

        } else {
          alert('Error' + json.error)
        }
        
       setLoading(false)
      }

      getBarberInfo()
  }, [])

  const handleBackButton = () => {
    navigation.goBack()
  }

  const handleFavClick = () => {
    SetFavorited(!favorited)
    api.setFavorite(userInfo.id)
  }

  const handleServiceChoose = (key) => {
    SetSelectedService(key)
    setShowModal(true)
  }

  return (

    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.Scroller}>
            {userInfo.photos && userInfo.photos.length > 0 ? 
            <Swiper 
            style={{height: 250}}
            dot={<View style={styles.SwipeDot}/>}
            activeDot={<View style={styles.SwipeDotActive}/>}
            paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
            autoplay={true}
            >
              {userInfo.photos.map((item, key) => (
                <View style={styles.SwipeItem} key={key}>
                    <Image source={{uri: item.url}} resizeMode='cover' style={styles.SwipeImage}/>
                </View>
              ))}

            </Swiper>
            : 
            <View style={styles.FakeSwiper}>
              
            </View>
            }

            <View style={styles.PageBody}>
              <View style={styles.UserInfoArea} >
              <Image source={{uri: userInfo.avatar}}  style={styles.UserInfoAvatar}/>
                <View style={styles.UserInfo}>
                    <Text style={styles.UserInfoName}>{userInfo.name}</Text>
                    <Stars stars={userInfo.stars} showNumber={true}/>
                </View>
                <TouchableOpacity style={styles.UserFavButton} onPress={handleFavClick}>
                    {favorited ? 
                   <FavoriteFull width='24' height='24' fill='#FF0000'/> 
                  :
                    <FavoriteIcon width='24' height='24' fill='#FF0000'/>
                  }
                    
                </TouchableOpacity>
              </View>

              {loading && 
                <ActivityIndicator size='large' color='#000000' style={{marginTop: 50}} />
              }

              {userInfo.services && 
                          <View style={styles.ServiceArea}>
                    <Text style={styles.ServiceTitle}>Lista de Serviços</Text>

                  {userInfo.services.map((item, key) => (
                      <View key={key} style={styles.ServiceItem}>
                          <View style={styles.ServiceInfo}>
                              <Text style={styles.ServiceName}>{item.name}</Text>
                              <Text style={styles.ServicePrice}>R$: {item.price}</Text>
                          </View>
                          <TouchableOpacity style={styles.ServiceChooseButton} onPress={() => {handleServiceChoose(key)}}>
                                <Text style={styles.ServiceChooseButtonText}>Agendar</Text>
                          </TouchableOpacity>
                      </View>
                  ))}

                </View>
              }
                
              {userInfo.testimonials && userInfo.testimonials.length > 0 && 
                 <View style={styles.TestimonialArea}>
                    <Swiper
                      style={{height: 110}}
                      showsPagination={false}
                      showsButtons={true}
                      prevButton={<NavPrevButton width='35' height='35' fill='#000000'/>}
                      nextButton={<NavNextButton width='35' height='35' fill='#000000'/>}
                    >

                      {userInfo.testimonials.map((item, key) => (
                            <View style={styles.TestimonialItem} key={key}>
                                <View style={styles.TestimonialInfo}>
                                    <Text style={styles.TestimonialName}>{item.name}</Text>
                                    <Stars stars={item.rate} showNumbers={false}/>
                                </View>

                                <Text style={styles.TestimonialBody}>{item.body}</Text>
                            </View>
                      ))}

                    </Swiper>
                </View>
              } 

            </View>
            
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
            <BackIcon width='44' height='44' fill='#FFFFFF'/>
        </TouchableOpacity>
        </ScrollView>

        <BarberModal 
          show={showModal}
          setShow={setShowModal}
          user={userInfo}
          services={selectedService}
        />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ScrollView: {
    flex: 1
  },
  FakeSwiper: {
    height: 140,
    backgroundColor: '#63c2d1'
  },
  SwipeDot: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 3
  },
  SwipeDotActive: {
    width: 10,
    height: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
    margin: 3
  },
  PageBody: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    marginTop: -50,
    minHeight: 400
  },
  UserInfo: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  ServiceArea: {
    marginTop: 30
  },
  SwipeItem: {
    flex: 1,
    backgroundColor: '#63c2d1',
  },
  SwipeImage: {
    width: '100%',
    height: 240
  },

  UserInfoArea: {
    flexDirection: 'row',
    marginTop: -30
  },
  
  UserInfoAvatar: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  UserInfoName: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  UserFavButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20

  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 0,
    zIndex: 10,
  },
  ServiceInfo: {
    flex: 1
  },
  ServiceItem: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 20
  },
  ServiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#268596'
  },
  ServicePrice: {
    fontSize: 14,
    color : '#268596'
  },
  ServiceChooseButton: {
    backgroundColor: '#4eadbe',
    borderRadius: 10,
    padding: 15
  },

  ServiceChooseButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFFFFF'
  }, 
  ServiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#268596',
    marginLeft: 30,
    marginBottom: 20
  },
  TestimonialArea: {
    marginTop: 30,
    marginBottom: 50
  },
  TestimonialItem: {
    backgroundColor: '#268596',
    padding: 15,
    borderRadius: 10,
    height: 110,
    justifyContent: 'center',
    marginHorizontal: 50
  },
  TestimonialInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  TestimonialBody: {
    color: '#FFFFFF',
    fontSize: 16
  },

  TestimonialName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }

  
})