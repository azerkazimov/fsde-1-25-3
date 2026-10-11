import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";


import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signinSchema, SigninSchema } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signin() {
    const router = useRouter();
    const [hidden, setHidden] = useState(true);
    const [focused, setFocused] = useState<string | null>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<SigninSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: SigninSchema) => {
        try {
            await AsyncStorage.setItem('data', JSON.stringify(data));
            await AsyncStorage.setItem('isLoggedIn', 'true');
            router.replace("/");
        }catch(err){
            console.error(err);
            Alert.alert('Error', 'Failed to log in');
        }
        Alert.alert('Success', 'Logged in successfully');
    }

    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
            return;
        }
        router.replace("/");
    };

    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Pressable accessibilityLabel="Go back" onPress={goBack} style={styles.back}>
                        <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
                    </Pressable>

                    <View style={styles.wordmark}>
                        <Text style={styles.wordBurger}>Burger</Text>
                        <Text style={styles.wordBite}>Bite</Text>
                    </View>

                    <Text style={styles.title}>Log in</Text>
                    <Text style={styles.subtitle}>
                        Welcome back. Pick up where your last burger left off.
                    </Text>

                    <Text style={styles.label}>Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onFocus={() => setFocused("email")}
                                onBlur={() => {
                                    onBlur();
                                    setFocused(null);
                                }}
                                placeholder="you@email.com"
                                placeholderTextColor="#8E8E93"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={[styles.field, focused === "email" && styles.fieldFocused]}
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}<Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <View style={[styles.field, styles.passwordField, focused === "password" && styles.fieldFocused]}>
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Your password"
                                    placeholderTextColor="#8E8E93"
                                    secureTextEntry={hidden}
                                    autoCapitalize="none"
                                    onFocus={() => {
                                        setFocused("password");
                                        setHidden(false);
                                    }}
                                    onBlur={() => {
                                        onBlur();
                                        setFocused(null);
                                    }}
                                    style={styles.passwordInput}
                                />
                                <Pressable
                                    accessibilityLabel={hidden ? "Show password" : "Hide password"}
                                    onPress={() => setHidden((value) => !value)}
                                    hitSlop={8}
                                >
                                    <Ionicons
                                        name={hidden ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#8E8E93"
                                    />
                                </Pressable>
                            </View>
                        )}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

                    <Text style={styles.forgot}>Forgot password?</Text>

                    <Pressable
                        accessibilityRole="button"
                        onPress={handleSubmit(onSubmit)}
                        style={({ pressed }) => pressed && styles.pressed}
                    >
                        <LinearGradient
                            colors={["#E4533C", "#C22528"]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonLabel}>Log in</Text>
                        </LinearGradient>
                    </Pressable>

                    <View style={styles.switchRow}>
                        <Text style={styles.hint}>New here? </Text>
                        <Link href="/auth/signup">
                            <Text style={styles.link}>Sign Up</Text>
                        </Link>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.legal}>
                            Your privacy is important to us. Learn how we handle your personal information.
                        </Text>
                        <Text style={styles.legal}>
                            Need help? Contact our support team for assistance.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#1B1B1F",
    },
    flex: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingBottom: 12,
    },
    back: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2A2A30",
        marginTop: 4,
    },
    wordmark: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 18,
    },
    wordBurger: {
        color: "#FF7A18",
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: -0.6,
    },
    wordBite: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: -0.6,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 22,
    },
    subtitle: {
        color: "#B5B5B8",
        fontSize: 15,
        lineHeight: 22,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    label: {
        color: "#D0D0D4",
        fontSize: 13,
        marginTop: 16,
        marginBottom: 8,
    },
    field: {
        height: 54,
        borderRadius: 16,
        backgroundColor: "#2A2A30",
        paddingHorizontal: 18,
        color: "#FFFFFF",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "transparent",
    },
    fieldFocused: {
        borderColor: "#FF7A18",
    },
    passwordField: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 14,
    },
    passwordInput: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 16,
        height: 54,
    },
    forgot: {
        color: "#FF7A18",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "right",
        marginTop: 12,
        marginBottom: 22,
    },
    button: {
        height: 54,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonLabel: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "600",
    },
    pressed: {
        opacity: 0.88,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },
    hint: {
        color: "#D0D0D4",
        fontSize: 14,
    },
    link: {
        color: "#FF7A18",
        fontSize: 14,
        fontWeight: "700",
    },
    footer: {
        marginTop: "auto",
        paddingTop: 28,
        gap: 14,
    },
    legal: {
        color: "#8E8E93",
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
    },
    error: {
        color: "#FF7A18",
        fontSize: 12,
        marginTop: 4,
    },
});
