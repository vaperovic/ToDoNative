module.exports = {
    "preset": "react-native",
    "transform": {
        "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
        "\\.(ts|tsx)$": "ts-jest",
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node",
    ],
};
