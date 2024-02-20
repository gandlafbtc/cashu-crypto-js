# Blinded Signatures
`@gandlaf21/blind-signature` is a JavaScript Module implementing blind signatures using `@noble/secp256k1` elliptic curve. 

## Usage 

__install:__

```shell
npm i @gandlaf21/blind-signature
```

__use:__ 

Take a look at this example for the complete flow:

```javascript
import { SigningAuthority, BlindedMessage } from "@gandlaf21/blind-signature";
//Mint(Alice)
const mint: SigningAuthority = new SigningAuthority();


//Wallet(Bob)
const message1: BlindedMessage = new BlindedMessage()

const B_ : Point = await message1.createBlindedMessageFromString("secret") // this should be random/unguessable


//Mint
const C_: Point = mint.createBlindSignature(B_)


//Wallet
const {C, secret} = message1.unblindSignature(C_, mint.publicKey)


//Mint 
const aY : Point = await mint.calculateCVerify(secret)
expect(mint.verify(aY,C)).toBe(true)

//if C===aY, the message was signed by the mint with private key a 
```

In the most likely case, the Signing Authority is not running alongside the creator of the blinded messages. We can serialize and deserialize the points, to hex strings, for simplified data transfer:

```javascript
import { hexToPoint, pointToHex } from "@gandlaf21/blind-signature";

//serialize
const b_ = pointToHex(B_)

//deserialize
const B_dec: = hexToPoint(b_)
```