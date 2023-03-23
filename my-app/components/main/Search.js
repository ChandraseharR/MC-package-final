import React from 'react'
import { StyleSheet,View, Text, Image, FlatList } from 'react-native'
import firebase from 'firebase/compat/app'
require("firebase/firestore")
require("firebase/storage")
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

export default function Search() {

    const [users, setUsers] = React.useState(null)
     return (
        <View>
            <Text>Search</Text>
        </View>
  )
}
