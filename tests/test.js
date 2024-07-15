import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import App from '../app/index';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('App', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should display loading indicator initially', async () => {
        const { getByTestId } = render(<App />);
        await waitFor(() => {
            expect(getByTestId('loading-indicator')).toBeTruthy();
        })
    });

    it('should display movies after fetching data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            items: [
                { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', release_date: '2021-01-01', vote_average: 8.5, vote_count: 100, overview: 'Overview 1' },
                { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', release_date: '2021-02-01', vote_average: 7.5, vote_count: 200, overview: 'Overview 2' },
            ]
        }));

        const { getByText } = render(<App />);

        await waitFor(() => {
            expect(getByText('Movie 1')).toBeTruthy();
            expect(getByText('Movie 2')).toBeTruthy();
        });
    });

    it('should display movie details when a movie is clicked', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            items: [
                { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', release_date: '2021-01-01', vote_average: 8.5, vote_count: 100, overview: 'Overview 1' },
            ]
        }));

        const { getByText, getByTestId } = render(<App />);

        await waitFor(() => {
            expect(getByText('Movie 1')).toBeTruthy();
        });

        fireEvent.press(getByText('Movie 1'));

        await waitFor(() => {
            expect(getByTestId('movie-details')).toBeTruthy();
        });
    });

    it('should close movie details when close button is clicked', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            items: [
                { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', release_date: '2021-01-01', vote_average: 8.5, vote_count: 100, overview: 'Overview 1' },
            ]
        }));

        const { getByText, getByTestId, queryByTestId } = render(<App />);

        await waitFor(() => {
            expect(getByText('Movie 1')).toBeTruthy();
        });

        fireEvent.press(getByText('Movie 1'));

        await waitFor(() => {
            expect(getByTestId('movie-details')).toBeTruthy();
        });

        fireEvent.press(getByText('Close'));

        await waitFor(() => {
            expect(queryByTestId('movie-details')).toBeNull();
        });
    });
});