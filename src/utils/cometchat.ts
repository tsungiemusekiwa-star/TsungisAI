import { CometChat } from '@cometchat/chat-sdk-javascript';
import { UIKitSettingsBuilder, CometChatUIKit } from '@cometchat/chat-uikit-react';
import { COMETCHAT_CONSTANTS } from '../config/cometchat.config';

let isInitialized = false;

export const initializeCometChat = async (): Promise<void> => {
  if (isInitialized) {
    console.log('CometChat already initialized');
    return;
  }

  try {
    const UIKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForAllUsers()
      .build();

    await CometChatUIKit.init(UIKitSettings);
    isInitialized = true;
    console.log('CometChat initialization completed successfully');
  } catch (error) {
    console.error('CometChat initialization failed:', error);
    throw error;
  }
};

export const createCometChatUser = async (
  uid: string,
  name: string
): Promise<CometChat.User> => {
  try {
    const user = new CometChat.User(uid);
    user.setName(name);

    const createdUser = await CometChat.createUser(
      user,
      COMETCHAT_CONSTANTS.AUTH_KEY
    );
    console.log('CometChat user created successfully:', createdUser);
    return createdUser;
  } catch (error: any) {
    // If user already exists, that's fine
    if (error?.code === 'ERR_UID_ALREADY_EXISTS') {
      console.log('CometChat user already exists');
      throw error;
    }
    console.error('Error creating CometChat user:', error);
    throw error;
  }
};

export const loginCometChatUser = async (uid: string): Promise<CometChat.User> => {
  try {
    // Check if already logged in
    const loggedInUser = await CometChatUIKit.getLoggedinUser();
    if (loggedInUser && loggedInUser.getUid() === uid) {
      console.log('User already logged in to CometChat');
      return loggedInUser;
    }

    // Login user
    const user = await CometChatUIKit.login(uid);
    console.log('CometChat login successful:', user);
    return user;
  } catch (error) {
    console.error('CometChat login failed:', error);
    throw error;
  }
};

export const logoutCometChatUser = async (): Promise<void> => {
  try {
    await CometChatUIKit.logout();
    console.log('CometChat logout successful');
  } catch (error) {
    console.error('CometChat logout failed:', error);
    throw error;
  }
};

export const syncFirebaseUserToCometChat = async (
  firebaseUser: { uid: string; displayName: string | null }
): Promise<void> => {
  try {
    const userName = firebaseUser.displayName || firebaseUser.uid;

    // Try to create user (will fail if already exists)
    try {
      await createCometChatUser(firebaseUser.uid, userName);
    } catch (error: any) {
      // User already exists, continue to login
      if (error?.code !== 'ERR_UID_ALREADY_EXISTS') {
        throw error;
      }
    }

    // Login to CometChat
    await loginCometChatUser(firebaseUser.uid);
  } catch (error) {
    console.error('Error syncing Firebase user to CometChat:', error);
    throw error;
  }
};
