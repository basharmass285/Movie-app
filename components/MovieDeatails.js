import React from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

export default function MovieDetails({ visible, movie, onClose }) {
    if (!movie) return null;

    const { width, height } = Dimensions.get('window');
    const imageHeight = height * 0.5;

    return (
        <Modal visible={visible} transparent={true} animationType="slide" testID="movie-details">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Image
                            style={[styles.image, { height: imageHeight }]}
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>{movie.title}</Text>
                        <Text style={styles.text}>Release Date: {movie.release_date}</Text>
                        <Text style={styles.text}>Score: {movie.vote_average}</Text>
                        <Text style={styles.text}>Votes: {movie.vote_count}</Text>
                        <Text style={styles.text}>Plot: {movie.overview}</Text>
                    </ScrollView>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={.7}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        height: '95%',
        backgroundColor: 'rgba(225, 225, 250, 1)',
        borderRadius: 10,
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 10,
        opacity: .8
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});