/*
 *   Sample Code Disclaimer
 * 
 * - Micros Systems Inc. grants you a non-exclusive copyright license to use this programming code 
 *   example from which you can generate similar function tailored to your own specific needs.
 *
 * - This example has not been thoroughly tested under all conditions and is provided for illustrative 
 *   purposes only, therefore Micros Systems Inc. cannot guarantee or imply reliability, serviceability, 
 *   or function of this program.
 *
 * - The sample program contained herein is provided to you "AS IS" without any warranties of any kind 
 *   and the implied warranties of non-infringement, merchantability and fitness for a particular purpose
 *   are expressly disclaimed.
 * 
 */

import java.io.ByteArrayOutputStream;
import java.security.SecureRandom;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;

public class EncryptionUtil {
	private static String _algorithm = "AES";
	private static String _transformation = "AES/CBC/PKCS5Padding";
	private static String _key = "71335a57d480c1d06a261d7194d296ca";
	private static String _plainText = "lastName=Doe&firstName=John&nameId=12345";
	private static int    _keyLength = 128;
	
	public static void main(String[] args) {

		try {
			EncryptionUtil eu = new EncryptionUtil ();

			System.out.println( "Transformation: " + _transformation + " (" + _keyLength + ")" );
			System.out.println( "Secret Key: " + _key );
			System.out.println( "Plain text: " + _plainText );

			// encrypt
			String cipherText = eu.encrypt( _key, _plainText );
			System.out.println( "Encrypted string: " + cipherText );

			// decrypt
			String outPlainText = eu.decrypt( _key, cipherText );
			System.out.println( "Decrypted text: " + outPlainText );

		} catch ( Exception e ) {
			e.printStackTrace();
		}
	}

	public String encrypt(String strKey, String plainText) {
		String hexCipherText = null;

		try {
			ByteArrayOutputStream os = new ByteArrayOutputStream();

			// Unencode the hex encoded key obtained from MCP and instantiate a SecretKeySpec object with it
			SecretKeySpec skeySpec = new SecretKeySpec( Hex.decodeHex( strKey.toCharArray()), _algorithm );

			// Instantiate a cipher object passing the transformation string
			Cipher cipher = Cipher.getInstance( _transformation );
						
			// Generate an initialization vector (IV) of the size determined by the cipher
			// and populate it with the output from a SecureRandom api call
			byte[] ivBytes = new byte[cipher.getBlockSize()];
			SecureRandom rnd = new SecureRandom();
			rnd.nextBytes( ivBytes );

			// Initialize the cipher with the key specs and the initialization vector obtained above
			cipher.init( Cipher.ENCRYPT_MODE, skeySpec, new IvParameterSpec( ivBytes ) );

			// Prepend the initialization vector to the result of the doFinal call (where the actual encryption happens)
			byte[] cipherIV = cipher.getIV();
			byte[] cipherBytes = cipher.doFinal( plainText.getBytes() );
			
			os.write( cipherIV );
			os.write( cipherBytes );

			// Hex encode the resulting byteArray (this is the output expected by MCP’s decryption processor)
			hexCipherText = Hex.encodeHexString( os.toByteArray() );
			
		} catch ( Exception e ) {
			// Catch and log exceptions here
		}

		return hexCipherText;
	}

	// The decryption method is provided here for testing and verification purposes
	public String decrypt(String strKey, String hexCipherData) {
		String plainText = null;

		try {
			SecretKeySpec skeySpec = new SecretKeySpec( Hex.decodeHex( strKey.toCharArray()), _algorithm );
			Cipher cipher = Cipher.getInstance( _transformation );
			
			byte[] cipherData = Hex.decodeHex( hexCipherData.toCharArray() );
			byte[] ivBytes = Arrays.copyOfRange( cipherData, 0, cipher.getBlockSize() );
			byte[] cipherText = Arrays.copyOfRange( cipherData, cipher.getBlockSize(), cipherData.length );

			cipher.init( Cipher.DECRYPT_MODE, skeySpec, new IvParameterSpec( ivBytes ) );
			plainText = new String( cipher.doFinal( cipherText ) );
			
		} catch ( Exception e ) {
			// Catch and log exceptions here
		}

		return plainText;
	}
}
