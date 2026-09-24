import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useShopStore } from '../store/shopStore';

type Props = NativeStackScreenProps<RootStackParamList, 'YourBag'>;

const THEME_GREEN = '#477361';
const BORDER_COLOR = '#EAECEF';

export default function YourBagScreen({ navigation }: Props) {
  const bag = useShopStore((state) => state.bag);
  const bagItemOptions = useShopStore((state) => state.bagItemOptions);
  const products = useShopStore((state) => state.products);
  const shippingAddress = useShopStore((state) => state.shippingAddress);
  const paymentMethod = useShopStore((state) => state.paymentMethod);
  const updateQuantity = useShopStore((state) => state.updateQuantity);
  const updateShippingAddress = useShopStore((state) => state.updateShippingAddress);
  const updatePaymentMethod = useShopStore((state) => state.updatePaymentMethod);
  const clearBag = useShopStore((state) => state.clearBag);

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [tempName, setTempName] = useState(shippingAddress.name);
  const [tempAddress, setTempAddress] = useState(shippingAddress.address);

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [tempBrand, setTempBrand] = useState(paymentMethod.brand);
  const [tempCardNumber, setTempCardNumber] = useState(paymentMethod.cardNumber);

  const bagItems = Object.entries(bag)
    .filter(([_, qty]) => qty > 0)
    .map(([productId, qty]) => {
      const product = products.find((p) => p.id === productId);
      const options = bagItemOptions[productId];
      return { productId, quantity: qty, product, size: options?.size || product?.defaultSize || 'M' };
    })
    .filter((item) => item.product !== undefined);

  const subtotal = bagItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const shippingFee = bagItems.length > 0 ? 15.0 : 0.0;
  const tax = bagItems.length > 0 ? subtotal * 0.05 : 0.0;
  const total = subtotal + shippingFee + tax;

  const handleSaveAddress = () => {
    updateShippingAddress(tempName, tempAddress);
    setAddressModalVisible(false);
  };

  const handleSavePayment = () => {
    updatePaymentMethod(tempBrand || 'Visa', tempCardNumber);
    setPaymentModalVisible(false);
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Confirmed!',
      `Thank you, ${shippingAddress.name}! Your order totaling $${total.toFixed(2)} has been placed successfully.\nDelivering to: ${shippingAddress.address}`,
      [{ text: 'Back to Shop', onPress: () => { clearBag(); navigation.navigate('Home'); } }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#1E232A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR BAG</Text>
        <View style={styles.iconPlaceholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {bagItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="bag-outline" size={64} color="#A0AEC0" />
            <Text style={styles.emptyTitle}>Your bag is empty</Text>
            <Text style={styles.emptySubtitle}>
              Explore our latest fashion collection and add items to your bag.
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreButtonText}>Explore Products</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.itemsList}>
            {bagItems.map(({ productId, quantity, product, size }) => {
              if (!product) return null;
              return (
                <View key={productId} style={styles.cartItem}>
                  <View style={styles.itemImageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {product.name} -
                    </Text>
                    <Text style={styles.itemSubtitle}>
                      {product.sizes.includes('7') ? `Size ${size}` : size}
                    </Text>
                    <Text style={styles.itemPrice}>
                      ${product.price.toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.stepperContainer}>
                    <TouchableOpacity
                      style={styles.stepperButton}
                      onPress={() => updateQuantity(productId, -1)}
                    >
                      <Ionicons name="remove" size={15} color="#4A5568" />
                    </TouchableOpacity>
                    <Text style={styles.stepperValue}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.stepperButton}
                      onPress={() => updateQuantity(productId, 1)}
                    >
                      <Ionicons name="add" size={15} color="#4A5568" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {bagItems.length > 0 && (
          <>
            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionRow}
              activeOpacity={0.7}
              onPress={() => {
                setTempName(shippingAddress.name);
                setTempAddress(shippingAddress.address);
                setAddressModalVisible(true);
              }}
            >
              <View style={styles.actionRowContent}>
                <Text style={styles.actionRowTitle}>Shipping Address</Text>
                <Text style={styles.actionRowPrimaryText}>{shippingAddress.name}</Text>
                <Text style={styles.actionRowSecondaryText}>
                  {shippingAddress.address}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#718096" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionRow}
              activeOpacity={0.7}
              onPress={() => {
                setTempBrand(paymentMethod.brand);
                setTempCardNumber(paymentMethod.cardNumber);
                setPaymentModalVisible(true);
              }}
            >
              <View style={styles.actionRowContent}>
                <Text style={styles.actionRowTitle}>Payment Method</Text>
                <View style={styles.paymentBadgeRow}>
                  <View style={styles.visaBadge}>
                    <Text style={styles.visaBadgeText}>VISA</Text>
                  </View>
                  <Text style={styles.paymentMethodText}>
                    {paymentMethod.cardNumber}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#718096" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.placeOrderButton}
              activeOpacity={0.85}
              onPress={handlePlaceOrder}
            >
              <Text style={styles.placeOrderButtonText}>
                PLACE ORDER - ${total.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <Modal
        visible={addressModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Shipping Address</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.modalInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="e.g. Eliza Reed"
              placeholderTextColor="#A0AEC0"
            />

            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.modalInput}
              value={tempAddress}
              onChangeText={setTempAddress}
              placeholder="e.g. 45 Bright St, NYC"
              placeholderTextColor="#A0AEC0"
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setAddressModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSaveAddress}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={paymentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Payment Method</Text>

            <Text style={styles.inputLabel}>Card Brand</Text>
            <TextInput
              style={styles.modalInput}
              value={tempBrand}
              onChangeText={setTempBrand}
              placeholder="e.g. Visa, Mastercard"
              placeholderTextColor="#A0AEC0"
            />

            <Text style={styles.inputLabel}>Card Details</Text>
            <TextInput
              style={styles.modalInput}
              value={tempCardNumber}
              onChangeText={setTempCardNumber}
              placeholder="e.g. Visa **** 7890"
              placeholderTextColor="#A0AEC0"
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setPaymentModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSavePayment}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    borderBottomColor: BORDER_COLOR,
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
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  itemsList: {
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  itemImageContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#EEF2F1',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    textTransform: 'uppercase',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 4,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F1',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 8,
  },
  stepperButton: {
    padding: 4,
  },
  stepperValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    minWidth: 16,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F3F5',
    marginVertical: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  actionRowContent: {
    flex: 1,
  },
  actionRowTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  actionRowPrimaryText: {
    fontSize: 14,
    color: '#475569',
  },
  actionRowSecondaryText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  paymentBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  visaBadge: {
    backgroundColor: '#1A1F71',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  visaBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#475569',
  },
  summaryContainer: {
    marginTop: 6,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  placeOrderButton: {
    backgroundColor: THEME_GREEN,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: THEME_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 30,
    lineHeight: 20,
  },
  exploreButton: {
    marginTop: 24,
    backgroundColor: THEME_GREEN,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: THEME_GREEN,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
