import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native'; 

export default function Tarjeta({onPress, isTurnedOver, children}) {
    return (
        <Pressable onPress={onPress} 
        style={!isTurnedOver ? styles.cartaUp : styles.cartaDown}>
            {isTurnedOver ?(
            <Text style={styles.text}>{children}</Text>
        ):(
            <Text style={styles.text}>?</Text>
            )}
        </Pressable>
        )
    
}

const styles = StyleSheet.create({
    cartaUp:{
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#1e293b',
        borderWidth:10,
        borderColor: '#334155',
    },
    cartaDown:{
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth:10,
        borderColor: '#334155',
        backgroundColor: '#1e293b',
    },
    text: {
        fontSize: 46,
        color: '#334155',
    }
})