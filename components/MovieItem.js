import { Text, StyleSheet, View, Image } from "react-native"

export const MovieItem = ({ movie }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            />
            <View style={styles.desContainer}>
                <Text style={styles.title}>{movie?.title}</Text>
                <Text style={styles.descrption}>{movie?.release_date}</Text>
                <Text style={styles.descrption}>{movie?.vote_average}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 8,
        borderWidth: 1,
        borderColor: 'rgba(156, 160, 230, .7)',
        borderRadius: 5,
        margin: 10,
        backgroundColor: 'rgba(156, 160, 230, .3)'
    },
    image: {
        width: 70,
        height: 100,
        marginRight: 10
    },
    desContainer: {
        flex: 1,
        top: 0
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        flexWrap: 'wrap',
    },
    descrption: {
        fontSize: 12,
        fontWeight: 'light',
        opacity: .8
    }
});