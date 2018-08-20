import {
  StyleSheet
} from 'react-native'

const colors = {
  
}

const fonts = {
  small: {

  },
  medium: {
    
  },
  large: {
    fontSize: 24,
    lineHeight: 36,
  }
}

const largeCenteredText = {
  ...fonts.large,
  color: '#fff',
  textAlign: 'center'
}

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.1,
  shadowRadius: 5
}

const card = {
  backgroundColor: '#2b2e37',
  padding: 10,
  borderRadius: 5,
}

const centerChildren = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

function margin(...args) {
  if (args.length === 1) {
    return {
      margin: args[0]
    }
  } else if (args.length === 2) {
    return {
      marginTop: args[0],
      marginBottom: args[0],
      marginLeft: args[1],
      marginRight: args[1],
    }
  } else if (args.length === 4) {
    return {
      marginTop: args[0],
      marginRight: args[1],
      marginBottom: args[2],
      marginLeft: args[3],
    }
  }
}

function padding(...args) {
  if (args.length === 1) {
    return {
      padding: args[0]
    }
  } else if (args.length === 2) {
    return {
      paddingTop: args[0],
      paddingBottom: args[0],
      paddingLeft: args[1],
      paddingRight: args[1],
    }
  } else if (args.length === 4) {
    return {
      paddingTop: args[0],
      paddingRight: args[1],
      paddingBottom: args[2],
      paddingLeft: args[3],
    }
  }
}

export const helpOthersStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  humm: {
    flex: 1,
    ...card,
    ...shadow,
    ...margin(10, 20)
  },
  intro: {
    ...centerChildren,
    ...padding(0, 30)
  },
  introText: {
    ...largeCenteredText
  },
  note: {
    paddingTop: 10,
  },
  noteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  controls: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submit: {
    fontSize: 20,
    color: '#fff'
  },
  comment: {
    backgroundColor: '#fff',
    fontSize: 20,
    height: 80,
    ...margin(0, 20),
    padding: 15,
    color: '#000'
  }
})

export const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252830',
  },
  spacer: {
    flex: 1
  },
  guestLogin: {
    backgroundColor: '#ffe000',
    alignItems: 'center',
    padding: 20
  },
  facebookLogin: {
    backgroundColor: '#2b608a',
    alignItems: 'center',
    padding: 20
  },
  loginText: {
    fontSize: 20,
    color: '#fff'
  },
  intro: {
    ...centerChildren,
    ...padding(0, 30)
  },
  introText: {
    ...largeCenteredText
  }
})

export const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 5,
    marginTop: 40
  },
  name: {
    marginTop: 40,
    fontSize: 24,
    lineHeight: 36,
    color: '#888'
  }
})

export const recorderStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  humm: {
    flex: 1,
    ...card,
    ...shadow,
    ...margin(10, 20)
  },
  controls: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  counter: {
    fontSize: 30,
    color: '#fff'
  },
  submit: {
    fontSize: 20,
    color: '#ffe000'
  },
  intro: {
    ...centerChildren,
    ...padding(0, 30)
  },
  introText: {
    ...largeCenteredText
  },
  note: {
    backgroundColor: '#fff',
    fontSize: 20,
    height: 80,
    ...margin(0, 20),
    padding: 15,
    color: '#000'
  }
})

export const requestsStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  humm: {
    flex: 1,
    ...card,
    ...shadow,
    ...margin(10, 20)
  },
  note: {
    paddingTop: 10,
  },
  noteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  comment: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row'
  },
  commentText: {
    color: '#9499a1'
  },
  commentersName: {
    color: '#ffe000',
    marginRight: 5
  }
})