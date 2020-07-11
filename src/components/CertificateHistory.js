import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { Test } from '../components';

const CertificateHistory = ({navigation}) => {
    const certs = [
        {
          id: '1',
          type: 'First Item',
          date: '26-2-2019',
          expiration: '2-3-2019',
          result: true
        },
        {
          id: '2',
          type: 'Second Item',
          date: '26-2-2019',
          expiration: '2-3-2019',
          result: false
        },
        {
          id: '3',
          type: 'Third Item',
          date: '26-2-2019',
          expiration: '2-3-2019',
          result: true
        },
      ];

    React.useEffect(()=>{

    })

    const onSelect= React.useCallback(id => {
        navigation.navigate('Summary',{id:id})
    })

    return(
        <SafeAreaView style={{flex:1}}>
            <FlatList
                data={certs}
                renderItem={({item}) => (
                    <Test
                        id={item.id}
                        title={item.type}
                        date={item.date}
                        expiration={item.expiration}
                        result={item.result}
                        onSelect={onSelect}
                    />
                )}
                keyExtractor={item=>item.id}
            />
        </SafeAreaView>
    )
}


export default CertificateHistory;