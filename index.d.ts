declare module 'react-native-biometric-identification' {
    /**
     * The supported biometry type
     */
    type BiometryType = 'FaceID' | 'TouchID' | 'Fingerprint';
  
    /**
     * Base config to pass to `TouchID.isSupported` and `TouchID.authenticate`
     */
    interface IsSupportedConfig {
      /**
       * Return unified error messages
       */
      unifiedErrors?: boolean;
    }

    interface GetAuthenticateTypeConfig {
      /**
       * **iOS only** - By default set to false. If set to true, will allow use of keypad passcode.
       */
      passwordFallback?: boolean;
    }
  
    /**
     * Authentication config
     */
    export interface AuthenticateConfig extends IsSupportedConfig {
      /**
       * **Android only** - Title of confirmation dialog
       */
      title?: string;
      /**
       * **Android only** - Color of fingerprint image
       */
      imageColor?: string;
      /**
       * **Android only** - Color of fingerprint image after failed attempt
       */
      imageErrorColor?: string;
      /**
       * **Android only** - Text shown next to the fingerprint image
       */
      sensorDescription?: string;
      /**
       * **Android only** - Text shown next to the fingerprint image after failed attempt
       */
      sensorErrorDescription?: string;
      /**
       * **Android only** - Cancel button text
       */
      cancelText?: string;
      /**
       * **iOS only** - By default specified 'Show Password' label. If set to empty string label is invisible.
       */
      fallbackLabel?: string;
      /**
       * **iOS only** - By default set to false. If set to true, will allow use of keypad passcode.
       */
      passwordFallback?: boolean;
    }
    /**
     * `isSupported` error code
     */
    type IsSupportedErrorCode =
      | 'NOT_SUPPORTED'
      | 'NOT_AVAILABLE'
      | 'NOT_PRESENT'
      | 'NOT_ENROLLED';
  
    /**
     * `authenticate` error code
     */
    type AuthenticateErrorCode =
      | IsSupportedErrorCode
      | 'AUTHENTICATION_FAILED'
      | 'USER_CANCELED'
      | 'SYSTEM_CANCELED'
      | 'TIMEOUT'
      | 'LOCKOUT'
      | 'LOCKOUT_PERMANENT'
      | 'PROCESSING_ERROR'
      | 'USER_FALLBACK'
      | 'UNKNOWN_ERROR';
  
    /**
     * Error returned from `authenticate`
     */
    export interface AuthenticationError {
      name: 'TouchIDError';
      message: string;
      code: AuthenticateErrorCode;
      details: string;
    }
    /**
     * Error returned from `isSupported`
     */
    export interface IsSupportedError {
      name: 'TouchIDError';
      message: string;
      code: IsSupportedErrorCode;
      details: string;
    }

    export enum AuthenticationType {
      AuthenticationTypeBiometrics = 'AuthenticationTypeBiometrics',
      AuthenticationTypePassword = 'AuthenticationTypePassword',
    }

    export interface AuthenticateSuccessOptions {
      authType?: AuthenticationType;
    }
  
    const Biometrics: {
      /**
       *
       * @param reason String that provides a clear reason for requesting authentication.
       * @param config Configuration object for more detailed dialog setup
       */
      authenticate(reason?: string, config?: AuthenticateConfig): Promise<AuthenticateSuccessOptions>;
      /**
       * 
       * @param config - Returns a `Promise` that rejects if TouchID is not supported. On iOS resolves with a `biometryType` `String` of `FaceID` or `TouchID`
       */
      isSupported(config?: IsSupportedConfig): Promise<BiometryType>;
      /**
       * 
       * @param config
       */
      getAuthenticateType(config?: GetAuthenticateTypeConfig): Promise<AuthenticationType>;
    };
    export default Biometrics;
  }
  