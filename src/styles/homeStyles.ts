import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    heroImage: {
        width: width * 0.55,
        height: width * 0.55,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    // ...existing code...

    card: {
        width: "48%",
        backgroundColor: "#FBFBFB",
        borderRadius: 16,
        paddingVertical: 15,
        paddingHorizontal: 12,
        marginBottom: 0,
        position: "relative", // ensure we can position elements inside
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        flexDirection: "column",
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 2,
    },

    cardSubtitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#727D73",
        marginBottom: 10,
        maxWidth: "90%",
    },

    cardImageContainer: {
        alignSelf: "flex-end",
        marginRight: -5,
        marginBottom: -10,
    },

    cardImage: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    // ...existing code...
    cardActionButton: {
        backgroundColor: "#C1D8C3",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 5,
    },
    cardActionText: {
        color: "#3E3F5B",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 6,
    },

    /* Detection results area */
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
    detectionInfoRow: {
        backgroundColor: "#EBF5EB",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    detectionInfoLabel: {
        fontSize: 16,
        color: "#3D8D7A",
        fontWeight: "600",
        marginRight: 4,
    },
    detectionInfoValue: {
        fontSize: 16,
        color: "#6B8C5B",
        fontWeight: "700",
        marginRight: 10,
    },
    noDetection: {
        fontSize: 16,
        color: "#fff",
        marginTop: 10,
    },

    resultsCard: {
        marginTop: 20,
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#3D8D7A",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },

    resultsCardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#3D8D7A",
        marginBottom: 15,
        textAlign: "center",
    },

    /* Modal Styles */
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        position: "relative",
    },
    closeIcon: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 15,
        borderRadius: 5,
    },
    modalSaveButton: {
        backgroundColor: "#A4B465",
        padding: 10,
        borderRadius: 5,
        alignSelf: "center",
        width: "40%",
    },
    modalSaveText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    detectionBadge: {
        backgroundColor: "#E0F7FA",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginBottom: 12,
    },

    detectionBadgeText: {
        fontSize: 16,
        color: "#00796B",
        fontWeight: "600",
    },
    resultRow: {
        flexDirection: "column",
        paddingVertical: 6,
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        alignItems: "center",
        justifyContent: "center",
    },

    resultLabel: {
        fontWeight: "black",
        fontSize: 18,
        color: "white",
    },

    resultValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    resultInfo: {
        width: "100%",
        marginTop: 8,
    },
});
