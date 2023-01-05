import { Point, utils } from "@noble/secp256k1"
import { bytesToNumber, hexToNumber } from "../src/util/crypto"

describe('test hex to number', () => {
    test('hex string', () => {
        const hexString = 'fffff'
        expect(hexToNumber(hexString)).toEqual(BigInt(1048575))
    })
    test('not hex string', () => {
        const notHexString = 'fffxy'
        expect(()=>{hexToNumber(notHexString)}).toThrow()
    })
})

describe('(regression) test point - hex conversion', () => {
    test('hex string', () => {
        const pubK = Point.BASE.multiply(bytesToNumber(utils.randomPrivateKey()))
        const hex = pubK.toHex()
        const pointFromHex = Point.fromHex(hex)
        expect(pubK).toEqual(pointFromHex)
    })
})

