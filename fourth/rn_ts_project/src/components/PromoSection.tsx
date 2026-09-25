import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type PromoSectionProps = {
  isPromoApplied: boolean;
  promoMessage: string;
  onApplyPromo: (code: string) => void;
  onClearPromo: () => void;
};

export default function PromoSection({ isPromoApplied, promoMessage, onApplyPromo, onClearPromo }: PromoSectionProps) {
  const [inputVal, setInputVal] = useState("");

  const handlePress = () => {
    if (isPromoApplied) {
      onClearPromo();
      setInputVal("");
      return;
    }
    if (inputVal.trim().length > 0) {
      onApplyPromo(inputVal);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Промокод</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Промокод"
          placeholderTextColor="#9CA3AF"
          value={inputVal}
          onChangeText={(text) => setInputVal(text)}
          editable={!isPromoApplied}
        />
        <TouchableOpacity style={[styles.applyButton, isPromoApplied ? styles.clearButton : null]} onPress={handlePress} activeOpacity={0.8}>
          <Text style={styles.applyButtonText}>{isPromoApplied ? "Скасувати" : "Застосувати"}</Text>
        </TouchableOpacity>
      </View>

      {isPromoApplied && (
        <View style={styles.badgeContainer}>
          <View style={styles.appliedBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#15803D" style={styles.badgeIcon} />
            <Text style={styles.appliedText}>{promoMessage || "Прийнято промокод"}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingHorizontal: 14,
    fontSize: 13,
    color: "#1F2937",
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: "#15803D",
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#DC2626",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  badgeContainer: {
    marginTop: 6,
    flexDirection: "row",
  },
  appliedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeIcon: {
    marginRight: 4,
  },
  appliedText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "600",
  },
});
