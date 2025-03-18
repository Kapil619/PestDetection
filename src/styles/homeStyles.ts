import { Dimensions, StyleSheet } from "react-native";


const { width } = Dimensions.get("window");

export const homeStyles = StyleSheet.create({
    detectionInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    detectionInfoLabel: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        marginRight: 5,
    },
    detectionInfoValue: {
        fontSize: 19,
        color: "#FFD700", // highlighted color
        fontWeight: "700",
        marginRight: 15,
    },
    noDetection: {
        fontSize: 16,
        color: "#fff",
        marginTop: 10,
    },
    uploadContainer: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    imageWrapper: {
        width: 250,
        height: 180,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
        marginBottom: 10,
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
    },
    crossIcon: {
        position: "absolute",
        top: 5,
        right: 5,
    },
    detectionItem: {
        alignItems: "center",
        marginBottom: 5,
    },
    pestName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1B4D3E",
    },
    confidence: {
        fontSize: 16,
        color: "#555",
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    image: {
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        flexDirection: "row",
        gap: 6,
    },
    buttonText: {
        color: "#1B4D3E",
        fontSize: 16,
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        width: "90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1B4D3E",
        marginBottom: 10,
    },
    cardContent: {
        fontSize: 16,
        color: "#1B4D3E",

        textAlign: "center",
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: "#A4B465",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    cardButtonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "600",
    },
});
