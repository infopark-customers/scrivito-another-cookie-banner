module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|csv)$":
      "<rootDir>/src/config/test/files.js",
    "\\.(css|scss)$": "<rootDir>/src/config/test/styles.js",
    "src/(.*)": "<rootDir>/src/$1",
    "^Components/(.*)": "<rootDir>/src/Components/$1",
    "^config/(.*)": "<rootDir>/src/config/$1",
    "^utils/(.*)": "<rootDir>/src/utils/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(lodash-es|is-ip|ip-regex|parse-domain)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/config/test/setup-tests.js"],
};
