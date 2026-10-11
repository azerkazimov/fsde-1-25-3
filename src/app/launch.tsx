import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function LaunchScreen() {
    const router = useRouter()
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const availableHeight = height - insets.top - insets.bottom;
    const maxArtHeight = Math.min(availableHeight * 0.44, (width - 56) * (424 / 290));
    const artHeight = Math.max(200, maxArtHeight);
    const fittedWidth = artHeight * (290 / 424);

    useEffect(()=>{
        setTimeout(()=>{
            router.replace("/auth/signin")
        }, 3000)
    }, [])

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.hero}>
                <View style={[styles.art, { width: fittedWidth, height: artHeight }]}>
                    <View style={styles.shadow} />
                    <Image
                        source={require("../../assets/images/launch.png")}
                        style={styles.burger}
                        contentFit="contain"
                    />
                    <View style={styles.wordmark} pointerEvents="none">
                        <Text style={[styles.word, styles.wordBurger, { fontSize: width * 0.095 }]}>Burger</Text>
                        <Text style={[styles.word, styles.wordBite, { fontSize: width * 0.095 }]}>Bite</Text>
                    </View>
                </View>
            </View>

            {/* <Text style={styles.tagline}>
                Join us and start your{"\n"}journey to burger{"\n"}perfection.
            </Text>

            <View style={styles.actions}>
                <Link href="/auth/signin" asChild>
                    <Pressable accessibilityRole="button" style={({ pressed }) => pressed && styles.pressed}>
                        <LinearGradient
                            colors={["#E4533C", "#C22528"]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonLabel}>Log in</Text>
                        </LinearGradient>
                    </Pressable>
                </Link>

                <Link href="/auth/signup" asChild>
                    <Pressable accessibilityRole="button" style={({ pressed }) => pressed && styles.pressed}>
                        <LinearGradient
                            colors={["#F6B042", "#E8881A"]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonLabel}>Sign Up</Text>
                        </LinearGradient>
                    </Pressable>
                </Link>

                <Text style={styles.hint}>New here? Create an account to get started!</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.legal}>
                    Your privacy is important to us. Learn how we handle your personal information.
                </Text>
                <Text style={styles.legal}>
                    Need help? Contact our support team for assistance.
                </Text>
            </View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#1B1B1F",
        paddingHorizontal: 28,
        justifyContent: "center",
        alignItems: "center",
    },
    hero: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 4,
    },
    art: {
        alignItems: "center",
        justifyContent: "center",
    },
    burger: {
        width: "100%",
        height: "100%",
    },
    shadow: {
        position: "absolute",
        bottom: "5%",
        width: "52%",
        height: 12,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.28)",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.45,
        shadowRadius: 18,
    },
    wordmark: {
        position: "absolute",
        top: "30%",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    word: {
        fontWeight: "800",
        letterSpacing: -0.6,
    },
    wordBurger: {
        color: "#FF7A18",
    },
    wordBite: {
        color: "#FFFFFF",
    },
    tagline: {
        color: "#FFFFFF",
        fontSize: 22,
        lineHeight: 30,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 22,
    },
    actions: {
        gap: 14,
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
    hint: {
        color: "#D0D0D4",
        fontSize: 13,
        textAlign: "center",
        marginTop: 4,
    },
    footer: {
        marginTop: "auto",
        paddingTop: 20,
        paddingBottom: 12,
        gap: 14,
    },
    legal: {
        color: "#8E8E93",
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
    },
    pressed: {
        opacity: 0.88,
    },
});
