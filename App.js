import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [tab, setTab] = useState('clean');
  const [deleted, setDeleted] = useState(false);
  
  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{padding:16, paddingBottom:100}}>
        <Text style={s.title}>AlbumSweep</Text>
        <Text style={s.sub}>127 duplicates • 2.3 GB reclaimable</Text>
        
        <View style={s.card}>
          <View style={s.ring}><Text style={s.ringText}>{deleted?'62%':'87%'}</Text></View>
          <View>
            <Text style={s.bold}>{deleted?'Cleaned! Saved 2.3 GB':'Storage Almost Full'}</Text>
            <Text style={s.purple}>Private • On-device scan</Text>
          </View>
        </View>

        <View style={s.tabBar}>
          {['clean','organize','insights'].map(t=>(
            <TouchableOpacity key={t} style={[s.tab, tab===t && s.tabActive]} onPress={()=>setTab(t)}>
              <Text style={[s.tabText, tab===t && s.tabTextActive]}>{t.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab==='clean' && (
          <View style={s.group}>
            <Text style={s.groupTitle}>Beach Sunset • 4 photos • 12.4 MB</Text>
            <View style={{flexDirection:'row', gap:8, marginTop:12}}>
              <View style={[s.thumb,{backgroundColor:'#ff9a9e'}]}><View style={s.best}><Text style={s.bestText}>BEST</Text></View></View>
              <View style={[s.thumb,{backgroundColor:'#ff9a9e', opacity:0.5}]} />
              <View style={[s.thumb,{backgroundColor:'#ff9a9e', opacity:0.3}]} />
            </View>
          </View>
        )}
        {tab==='organize' && <View style={s.group}><Text style={s.groupTitle}>Screenshots • 1203 items • 2.1 GB</Text></View>}
        {tab==='insights' && <View style={s.group}><Text style={s.groupTitle}>You can save 2.3 GB this week</Text></View>}
      </ScrollView>

      <View style={s.bottomBar}>
        <View><Text style={s.bold}>{deleted?0:23} selected</Text><Text style={s.sub}>Free 1.8 GB</Text></View>
        <TouchableOpacity style={s.deleteBtn} onPress={()=>{
          if(!deleted){ Alert.alert("Cleaned!","Moved to Recently Deleted"); setDeleted(true); }
          else setDeleted(false);
        }}>
          <Text style={{color:'white', fontWeight:'700'}}>{deleted?'Restore':'Delete Now'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#0A0A0B', paddingTop:60},
  title:{color:'white', fontSize:28, fontWeight:'800'},
  sub:{color:'#888', fontSize:13, marginTop:4},
  card:{backgroundColor:'#18181B', borderRadius:20, padding:16, marginTop:16, flexDirection:'row', alignItems:'center', gap:16},
  ring:{width:60, height:60, borderRadius:30, borderWidth:5, borderColor:'#7C5CFF', alignItems:'center', justifyContent:'center'},
  ringText:{color:'white', fontWeight:'800'},
  bold:{color:'white', fontWeight:'700'},
  purple:{color:'#7C5CFF', fontSize:12, marginTop:2},
  tabBar:{flexDirection:'row', backgroundColor:'#18181B', borderRadius:16, padding:6, marginTop:20, marginBottom:16},
  tab:{flex:1, padding:10, borderRadius:10, alignItems:'center'},
  tabActive:{backgroundColor:'white'},
  tabText:{color:'#888', fontWeight:'700', fontSize:11},
  tabTextActive:{color:'black'},
  group:{backgroundColor:'#18181B', borderRadius:20, padding:14, marginBottom:12, borderWidth:1, borderColor:'#2A2A2E'},
  groupTitle:{color:'white', fontWeight:'600', fontSize:13},
  thumb:{width:80, height:80, borderRadius:12},
  best:{position:'absolute', top:4, left:4, backgroundColor:'#7C5CFF', paddingHorizontal:6, paddingVertical:2, borderRadius:6},
  bestText:{color:'white', fontSize:8, fontWeight:'700'},
  bottomBar:{position:'absolute', bottom:0, left:0, right:0, backgroundColor:'#1E1E1E', padding:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderTopWidth:1, borderColor:'#2A2A2E'},
  deleteBtn:{backgroundColor:'#7C5CFF', paddingHorizontal:20, paddingVertical:14, borderRadius:14}
});
