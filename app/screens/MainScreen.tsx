import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Button } from '../components/atoms/Button/Button';
import { Text } from '../components/atoms/Text/Text';
import { CardStack } from '../components/organisms/CardStack/CardStack';
import { useRecommendations } from '../hooks/useRecommendations';

interface MainScreenProps {
  navigation: any;
}

export const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const { data, isLoading, error, refetch } = useRecommendations();

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
        <Text>Error loading recommendations</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text variant="title" style={styles.headerTitle}>
          Discover
        </Text>
        <Button
          variant="outline"
          title="Likes"
          onPress={() => navigation.navigate('LikedList')}
        />
      </View>

      <View style={styles.content}>
        {data?.data && data.data.length > 0 ? (
          <CardStack people={data.data} />
        ) : (
          <View style={styles.noContent}>
            <Text variant="title">No more people</Text>
            <Text variant="body" style={styles.noContentText}>
              Check back later for new recommendations
            </Text>
            <Button title="Refresh" onPress={() => refetch()} />
          </View>
        )}
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noContentText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});