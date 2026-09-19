import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {assistantSuggestions} from '../../data/content';

export function AssistantScreen() {
  const {state, addChatMessage} = useAppContext();
  const [typing, setTyping] = useState(false);
  const ask = (question: string) => {
    if (typing) return;
    addChatMessage({id: `user-${Date.now()}`, role: 'user', text: question, createdAt: new Date().toISOString()});
    setTyping(true);
    setTimeout(() => {
      addChatMessage({id: `assistant-${Date.now()}`, role: 'assistant', text: answerFor(question), createdAt: new Date().toISOString()});
      setTyping(false);
    }, 700);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Image source={require('../../assets/app-icon.png')} style={styles.avatar} />
        <View><Text style={styles.title}>Club Assistant</Text><Text style={styles.status}><Text style={styles.online}>●</Text> Online · Holland Padel Connect</Text></View>
      </View>
      <View style={styles.messages}>
        {state.assistantMessages.map(message => <MessageBubble key={message.id} message={message} />)}
        {typing ? <View style={styles.typing}><Text style={styles.typingDots}>•••</Text></View> : null}
      </View>
      <View style={styles.suggestions}>
        <Text style={styles.suggestionsTitle}>SUGGESTED QUESTIONS</Text>
        {assistantSuggestions.map(question => <Pressable key={question} disabled={typing} onPress={() => ask(question)} style={[styles.suggestion, typing && styles.suggestionDisabled]}><Text style={styles.suggestionText}>{question}</Text></Pressable>)}
      </View>
    </Screen>
  );
}

function MessageBubble({message}: {message: {role: 'assistant' | 'user'; text: string; createdAt: string}}) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.messageRow, isUser && styles.userRow]}>
      {!isUser ? <Image source={require('../../assets/app-icon.png')} style={styles.messageAvatar} /> : null}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}><Text style={styles.messageText}>{message.text}</Text><Text style={styles.messageTime}>{new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text></View>
    </View>
  );
}

function answerFor(question: string) {
  const input = question.toLowerCase();
  if (input.includes('golden point')) return 'Golden Point is used at deuce (40–40). The next rally decides the game, and the receiving team chooses which side to receive from.';
  if (input.includes('bandeja')) return 'The bandeja is a controlled overhead shot with slice. It is used after a deep lob to maintain net position without taking the risk of a full smash.';
  if (input.includes('scoring')) return 'Padel uses tennis scoring: 15, 30, 40 and game. Most matches are best of three sets, with a set normally won at six games by two clear games.';
  if (input.includes('position')) return 'Beginners should move with their partner as a pair. Start near the baseline, then advance together after a deep ball or controlled serve.';
  if (input.includes('glass')) return 'Yes. After the ball bounces on the court first, it may rebound from the glass and remain in play. You can use the rebound to return it.';
  return 'Padel is played in teams of two on an enclosed court. Serve underhand diagonally, let the ball bounce before the glass, and coordinate court position with your partner.';
}

const styles = StyleSheet.create({
  header: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#202651'}, avatar: {width: 44, height: 44, borderRadius: 14}, title: {color: colors.text, fontSize: 20, fontWeight: '900'}, status: {color: colors.textMuted, fontSize: 11, marginTop: 4}, online: {color: colors.green},
  messages: {gap: 16}, messageRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 8}, userRow: {justifyContent: 'flex-end'}, messageAvatar: {width: 28, height: 28, borderRadius: 9}, bubble: {maxWidth: '82%', paddingHorizontal: 14, paddingTop: 13, paddingBottom: 9, borderRadius: 18}, assistantBubble: {backgroundColor: '#171C3E', borderWidth: 1, borderColor: '#30376F', borderTopLeftRadius: 5}, userBubble: {backgroundColor: colors.purple, borderTopRightRadius: 5}, messageText: {color: colors.text, fontSize: 14, lineHeight: 21}, messageTime: {color: 'rgba(244,245,255,0.5)', fontSize: 10, marginTop: 6, textAlign: 'right'},
  typing: {alignSelf: 'flex-start', backgroundColor: '#171C3E', borderWidth: 1, borderColor: '#30376F', borderRadius: 16, borderTopLeftRadius: 5, paddingHorizontal: 17, paddingVertical: 10}, typingDots: {color: colors.purple, letterSpacing: 4, fontWeight: '900'}, suggestions: {gap: 8}, suggestionsTitle: {color: colors.textMuted, fontSize: 10, fontWeight: '900', letterSpacing: 1}, suggestion: {borderWidth: 1, borderColor: '#30376F', backgroundColor: '#111633', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12}, suggestionDisabled: {opacity: 0.45}, suggestionText: {color: '#C8A8FF', fontSize: 13, fontWeight: '700'},
});
