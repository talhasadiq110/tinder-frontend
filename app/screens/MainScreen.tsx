import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Button } from '../components/atoms/Button/Button';
import { Icon } from '../components/atoms/Icon/Icon';
import { Text } from '../components/atoms/Text/Text';
import { CardStack } from '../components/organisms/CardStack/CardStack';
import { useRecommendations } from '../hooks/useRecommendations';

interface MainScreenProps {
  navigation: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const { data, isLoading, error, refetch } = useRecommendations();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Swipes',
      'This will clear all your likes and dislikes, allowing you to start fresh. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch('http://localhost:8000/api/reset', { method: 'POST' });
              refetch();
            } catch (err) {
              Alert.alert('Error', 'Failed to reset data');
            }
          }
        },
      ]
    );
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <Icon name="close" size={64} color="#FF3B30" />
          <Text variant="h2" weight="bold" align="center" style={styles.errorTitle}>
            Connection Error
          </Text>
          <Text variant="body" color="secondary" align="center" style={styles.errorText}>
            Unable to load recommendations. Please check your connection and try again.
          </Text>
          <Button
            title="Try Again"
            onPress={() => refetch()}
            icon="refresh"
            style={styles.retryButton}
            size="large"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="medium"
          icon="person"
          onPress={() => navigation.navigate('Profile')}
          style={styles.headerButton}
        />

        <View style={styles.logoContainer}>
          <Text variant="h2" weight="bold" style={styles.logo}>
            spark
          </Text>
        </View>

        <View style={styles.headerRight}>
          <Button
            variant="ghost"
            size="medium"
            icon="list"
            onPress={() => navigation.navigate('LikedList')}
            style={styles.headerButton}
          />
          <Button
            variant="ghost"
            size="medium"
            icon="refresh"
            onPress={handleReset}
            style={styles.headerButton}
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FF5864"
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingCard} />
              <Text variant="body" color="secondary" style={styles.loadingText}>
                Loading recommendations...
              </Text>
            </View>
          ) : data?.data && data.data.length > 0 ? (
            <CardStack people={data.data} />
          ) : (
            <View style={styles.emptyContainer}>
              <Icon name="heart-outline" size={80} color="#E5E5E5" />
              <Text variant="h2" weight="bold" align="center" style={styles.emptyTitle}>
                No Matches Found
              </Text>
              <Text variant="body" color="secondary" align="center" style={styles.emptyText}>
                We're out of suggestions for now. Try adjusting your preferences or check back later.
              </Text>
              <Button
                title="Refresh"
                onPress={() => refetch()}
                icon="refresh"
                style={styles.refreshButton}
                size="large"
              />
            </View>
          )}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Button
            variant="ghost"
            size="xlarge"
            icon="home"
            onPress={() => { }}
            style={styles.navButton}
          />
          <Text variant="caption" color="secondary" align="center" style={styles.navLabel}>
            Discover
          </Text>
        </View>
        
        <View style={styles.navItem}>
          <Button
            variant="ghost"
            size="xlarge"
            icon="heart"
            onPress={() => navigation.navigate('LikedList')}
            style={styles.navButton}
          />
          <Text variant="caption" color="secondary" align="center" style={styles.navLabel}>
            Likes
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Math.max(16, SCREEN_WIDTH * 0.04),
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    minHeight: 60,
  },
  headerButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#FF5864',
    fontSize: 28,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: 400,
  },
  loadingCard: {
    width: Math.min(SCREEN_WIDTH - 48, 400),
    height: 400,
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  emptyTitle: {
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  refreshButton: {
    minWidth: 140,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorTitle: {
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    minWidth: 140,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: Math.max(16, SCREEN_WIDTH * 0.04),
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    backgroundColor: '#FFFFFF',
    minHeight: 80, // Increased height for larger icons
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navButton: {
    minWidth: 60, // Much larger touch target
    minHeight: 60, // Much larger touch target
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});