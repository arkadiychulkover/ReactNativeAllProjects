import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useShopStore } from '../store/shopStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const THEME_GREEN = '#477361';

export default function ProfileScreen({ navigation }: Props) {
  const shippingAddress = useShopStore((state) => state.shippingAddress);
  const paymentMethod = useShopStore((state) => state.paymentMethod);
  const bag = useShopStore((state) => state.bag);

  const totalBagItems = Object.values(bag).reduce((sum, qty) => sum + qty, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE</Text>
        <View style={styles.iconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>{shippingAddress.name}</Text>
          <Text style={styles.userEmail}>eliza.reed@example.com</Text>
        </View>

        <View style={styles.statsCard}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate('YourBag')}
          >
            <Text style={styles.statValue}>{totalBagItems}</Text>
            <Text style={styles.statLabel}>Bag Items</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Default Shipping</Text>
          <View style={styles.infoCard}>
            <Ionicons name="location-outline" size={22} color={THEME_GREEN} />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>{shippingAddress.name}</Text>
              <Text style={styles.infoCardSubtitle}>
                {shippingAddress.address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Saved Payment</Text>
          <View style={styles.infoCard}>
            <Ionicons name="card-outline" size={22} color={THEME_GREEN} />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>{paymentMethod.brand}</Text>
              <Text style={styles.infoCardSubtitle}>
                {paymentMethod.cardNumber}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="storefront-outline" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Browse Catalog</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('YourBag')}
          >
            <Ionicons name="bag-handle-outline" size={18} color={THEME_GREEN} />
            <Text style={styles.secondaryButtonText}>Go to Your Bag</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EAECEF',
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 36,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    letterSpacing: 0.5,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 14,
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  infoCardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  actionsContainer: {
    marginTop: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: THEME_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
  },
  secondaryButtonText: {
    color: THEME_GREEN,
    fontSize: 15,
    fontWeight: '700',
  },
});