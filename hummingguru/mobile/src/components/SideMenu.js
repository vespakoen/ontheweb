import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native'
import {
  DrawerItems
} from 'react-navigation'

export default props => 
  <ScrollView>
    <View style={{ height: 65 }} />
    <DrawerItems {...props} />
  </ScrollView>