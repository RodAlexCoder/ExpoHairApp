import React, {useContext} from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {UserContext} from '../contexts/UserContext'

import HomeIcon from '../assets/home.svg'
import SearchIcon from '../assets/search.svg'
import TodayIcon from '../assets/today.svg'
import FavoriteIcon from '../assets/favorite.svg'
import AccountIcon from '../assets/account.svg'




export default function CustomTabBar({state, navigation}) {
    const {state: user} = useContext(UserContext)

    const goTo = (screenName) => {
            navigation.navigate(screenName)
    }

  return (
    <View style={styles.TabArea}>
        <TouchableOpacity style={styles.TabItem} onPress={()=> goTo('Home')} >
            <HomeIcon width='30' height='30' fill="#FFFFFF" style={{opacity: state.index === 0? 1 : 0.5}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TabItem} onPress={()=> goTo('Search')}>
            <SearchIcon width='30' height='30' fill="#FFFFFF" style={{opacity: state.index === 1? 1 : 0.5}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TabItemCenter} onPress={()=> goTo('Appointments')}>
            <TodayIcon width='42' height='42' fill="#4EADBE" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.TabItem} onPress={()=> goTo('Favorites')}>
            <FavoriteIcon width='30' height='30' fill="#FFFFFF" style={{opacity: state.index === 3? 1 : 0.5}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TabItem} onPress={()=> goTo('Profile')}>
            {user.avatar !== '' ? <Image  source={{uri: user.avatar}} style={styles.AvatarIcon}/>
                                :  <AccountIcon width='30' height='30' fill="#FFFFFF" style={{opacity: state.index === 4? 1 : 0.5}}/>}
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    TabArea: {
        height: 80,
        backgroundColor: '#4eadbe',
        flexDirection: 'row'
    },
    TabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20
    },
    TabItemCenter: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#4EADBE',
        marginTop: -30
    },
    AvatarIcon: {
        width: 30,
        height: 30,
        borderRadius: 12,
    }
})