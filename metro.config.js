const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Izinkan metro membaca file wasm untuk expo-sqlite
config.resolver.assetExts.push('wasm');

module.exports = config;