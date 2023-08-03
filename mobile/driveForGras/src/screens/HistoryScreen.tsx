import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Screen } from '../components';

const HistoryScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text>HistoryScreen</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Screen(HistoryScreen);
