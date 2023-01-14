
export default {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    resolver: "ts-jest-resolver",
    testEnvironment: 'node',
    testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
