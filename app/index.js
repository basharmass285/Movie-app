import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, StatusBar, View, Dimensions, ActivityIndicator } from 'react-native';
import MovieDetails from '../components/MovieDeatails';
import { MovieItem } from '../components/MovieItem';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/list/5?api_key=d4bc3c640586e7f90dc68d8b300247ff&language=en-US')
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const { width } = Dimensions.get('window');
    const fontSize = width * 0.05;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} translucent backgroundColor="transparent" />
            <View style={styles.actionBar}>
                <Text style={[styles.actionBarText, { fontSize }]}>Movie App</Text>
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator testID="loading-indicator" size="large" color="#6200EE" />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                </View>
            ) : (
                <ScrollView>
                    {movies &&
                        movies.map((m) => (
                            <TouchableOpacity key={m.id} activeOpacity={0.7} onPress={() => setSelected(m)}>
                                <MovieItem movie={m} />
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            )}
            <MovieDetails
                visible={!!selected}
                movie={selected}
                onClose={() => setSelected(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#ecf0f1',
    },
    actionBar: {
        width: '100%',
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        alignItems: 'left',
        justifyContent: 'center',
        elevation: 4,
        zIndex: 10,
    },
    actionBarText: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 15
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});