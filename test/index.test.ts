import { Point } from "@noble/secp256k1";
import { SigningAuthority } from "../src/model/SigningAuthority";
import { BlindedMessage } from "../src/model/BlindedMessage";
import { hexToPoint, pointToHex } from "../src/util/crypto";
describe('test blind signing workflow', () => {
    test('Test with 2 messages', async () => {
        //Mint(Alice)
        const mint: SigningAuthority = new SigningAuthority();


        //Wallet(Bob)
        const message1: BlindedMessage = new BlindedMessage()

        const message2: BlindedMessage = new BlindedMessage()
        const B_ : Point = await message1.createBlindedMessageFromString("secret")

        const B2_ : Point = await message2.createBlindedMessageFromString("secret2")
        const b2_ : string = pointToHex(B2_)


        //Mint
        const C_: Point = mint.createBlindSignature(B_)

        const B2_dec: Point = hexToPoint(b2_)
        const C2_: Point = mint.createBlindSignature(B2_dec)
        const c2_: string = pointToHex(C2_) 
        

        //Wallet
        const C2_dec: Point = hexToPoint(c2_)
        const {C, secret} = message1.unblindSignature(C_, mint.publicKey)
        const {C: C2 , secret: secret2}  = message2.unblindSignature(C2_dec, mint.publicKey)

        
        //Mint 
        const aY : Point = await mint.calculateCVerify(secret)
        const aY2 : Point = await mint.calculateCVerify(secret2)
        expect(mint.verify(aY,C)).toBe(true)
        expect(mint.verify(aY2,C2)).toBe(true)
        expect(mint.verify(aY,C2)).toBe(false)
        expect(mint.verify(aY2,C)).toBe(false)
    });
});




