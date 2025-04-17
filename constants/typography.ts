import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  heading3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  bodyLight: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: colors.textLight,
  },
  small: {
    fontSize: 12,
    color: colors.textLight,
  },
});