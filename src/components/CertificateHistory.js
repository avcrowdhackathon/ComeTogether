import React from 'react';
import { FlatList, SafeAreaView, Text, Platform, View, Image, ActivityIndicator } from 'react-native';
import { Test, Splash } from '../components';
import firestore from "@react-native-firebase/firestore";


const CertificateHistory = ({navigation}) => {

    const [cert, setCert] = React.useState(null);
    const [wait, setWait] = React.useState(true)


    React.useEffect(()=>{
      const subscriber = firestore()
      .collection("tests")
      .where('email', '==', "stathis@aa.aa")
      .get()
      .then((res) => {
        if (res.docs.length !== 0) {
          firestore()
            .collection("tests")
            .doc(res.docs[0].ref.id)
            .onSnapshot( async (documentSnapshot) => {
              await setCert(documentSnapshot.data().tests);
              await setWait(false)
            });
          }
      })

    }, [])

    const onSelect = React.useCallback((id, authority, issueDate, testType, result) => {
      navigation.navigate('Summary',{id:id, authority:authority, issueDate:issueDate, testType:testType, result:result})
    })
    if(wait){
      return(
        <View style={{flex:1, justifyContent:'center'}}>
          <ActivityIndicator size='large' color='rgb(0, 103, 187)' />
        </View>
      )
    }
    else {
      return(
          <SafeAreaView style={{flex:1}}>
              {cert?<FlatList 
                  style={{backgroundColor:'#efeff5'}}
                  data={cert}
                  ItemSeparatorComponent={
                    () => (
                      <View
                        style={
                           { marginTop: 5 }
                        }
                      />
                    )
                  }
                  ListHeaderComponent= { () => (
                    <View
                      style={{ paddingTop:10 }}
                    />
                  )}
                  renderItem={({item}) => (
                      <Test
                          id={item.testId}
                          title={item.testType}
                          date={item.issueDate}
                          expiration={item.expireDate}
                          result={item.result}
                          onSelect={() => onSelect(item.testId, item.authority, item.issueDate, item.testType, item.result)}
                      />
                  )}
                  keyExtractor={item=>item.testId}
              />
          : 
          (
          <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#efeff5',}}>
            <Image style={{width:48, height:70, opacity: 0.5, marginVertical:6}} source={require('../../images/summary.png')}  />
            <Text style={{fontSize:20, color:'rgb(0,103,189)'}}>No Certifications Available!</Text>
          </View>
          )
        }
        </SafeAreaView>

      )
    }
}


export default CertificateHistory;