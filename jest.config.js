/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  // testEnvironment: "node",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
    "^.+\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: { "^.+\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/file.js", },
  transformIgnorePatterns: ['node_modules/(?!(swiper|swiper/react|swiper/css|swiper/css/navigation|swiper/css/pagination))'],
};

