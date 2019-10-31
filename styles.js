import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
  },
  headerView: {
    marginBottom: 25,
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginBottom: 25,
  },
  contentContainer: {
    width: 200,
  }
});
