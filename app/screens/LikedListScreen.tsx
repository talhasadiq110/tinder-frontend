import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Button } from '../components/atoms/Button/Button';
import { Text } from '../components/atoms/Text/Text';
import { UserCard } from '../components/molecules/UserCard/UserCard';
import { useLikedList } from '../hooks/useLikedList';

interface LikedListScreenProps {
  navigation: any;
}

export const LikedListScreen: React.FC<LikedListScreenProps> = ({ navigation }) => {
  const { data, isLoading, error } = useLikedList();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading liked list</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Button
          variant="outline"
          title="Back"
          onPress={() => navigation.goBack()}
        />
        <Text variant="title" style={styles.headerTitle}>
          Your Likes
        </Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={data?.data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <UserCard person={item} showActions={false} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  listContent: {
    padding: 20,
    gap: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
});