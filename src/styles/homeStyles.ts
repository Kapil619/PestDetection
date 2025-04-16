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
    imagePair: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    imageWrapper: {
        width: 160,
        height: 160,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
    },
    crossIcon: {
        justifyContent: "center",
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
        zIndex: 3,
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


    detectionResultsHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 10,
    },

    detectionCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        elevation: 2,

    },
    detectionHighlight: {
        fontSize: 22,
        fontWeight: "700",
        color: "#3D8D7A",
        marginBottom: 4,
    },
    smallLabel: {
        fontSize: 16,
        color: "#555",
    },
    boldValue: {
        fontSize: 18,
        fontWeight: "600",
        color: "#283618",
    },
    noPestsText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    placeholderWrapper: {
        backgroundColor: "#e6e6e6",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        color: "#666",
        fontSize: 14,
        fontStyle: "italic",
    },
});
