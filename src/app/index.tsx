import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories, burger } from "@/mock/burger";
import BurgerCard, { BurgerCardProps } from "@/components/main/ui/burger-card";
import { Link, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        let cancelled = false;

        const checkLoggedIn = async () => {
            const stored = await AsyncStorage.getItem("isLoggedIn");
            if (!cancelled) {
                setIsLoggedIn(stored === "true");
            }
        };

        checkLoggedIn();
        const getData = async () => {
            const stored = await AsyncStorage.getItem("data");
            if (!cancelled) {
                setUser(JSON.parse(stored ?? "{}"));
            }
        };
        getData();
    }, []);

    if (!user) return <View><Text>Loading...</Text></View>

    if (isLoggedIn === null) {
        return <View style={styles.container} />;
    }

    if (!isLoggedIn) {
        return <Redirect href="/launch" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="menu-outline" size={24} color="white" />
                <View style={styles.headerContent}>
                    {user.email ? 
                    <View style={styles.userEmailContainer}>
                    <Text style={styles.userEmail}>{user.email.slice(0, 1).toUpperCase()}</Text>
                    </View>
                     :
                        <Image
                            source={{ uri: "https://img.magnific.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?semt=ais_hybrid&w=740&q=80" }}
                            style={styles.burgerImage}
                            contentFit="contain"
                        />}
                    <Ionicons name="notifications-outline" size={24} color="white" />
                </View>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Beyond Just Burgers</Text>
                <Text style={styles.subtitle}>It’s a Taste Revolution!</Text>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
            >
                {categories.map((category) => (
                    <View key={category.id} style={styles.category}>
                        <Text style={styles.categoryText}>{category.title}</Text>
                    </View>
                ))}
            </ScrollView>
            <FlatList
                data={burger}
                horizontal={true}
                contentContainerStyle={styles.burgersContainer}
                renderItem={({ item }: { item: BurgerCardProps }) => (
                    <Link href={`/burger/${item.id}/page`}>
                        <BurgerCard item={item} />
                    </Link>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242329",
        paddingHorizontal: 14,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    burgerImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        objectFit: "cover",
    },
    userEmailContainer: {
        backgroundColor: "#333",
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    userEmail: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    categoryContainer: {
        gap: 40,
    },
    category: {
        paddingVertical: 30,
        color: "#fff",
    },
    categoryText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    titleContainer: {
        paddingVertical: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#f4f4f4",
        fontSize: 16,
        fontWeight: "400",
    },

    // burger card
    burgersContainer: {
        gap: 10,
    },

})