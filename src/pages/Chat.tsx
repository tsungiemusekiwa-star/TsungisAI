import React, { useState } from 'react';
import {
  CometChatConversations,
  CometChatUsers,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer
} from '@cometchat/chat-uikit-react';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import '@cometchat/chat-uikit-react/css-variables.css';

const Chat = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CometChat.User | undefined>(undefined);

  const handleUserSelect = (user: CometChat.User) => {
    setSelectedUser(user);
    setShowUserList(false);
  };

  const handleBackToConversations = () => {
    setSelectedUser(undefined);
  };

  const handleConversationClick = (conversation: CometChat.Conversation) => {
    const conversationWith = conversation.getConversationWith();
    if (conversationWith instanceof CometChat.User) {
      setSelectedUser(conversationWith);
    }
  };

  return (
    <div className="container mx-auto h-full p-0" style={{ position: 'relative' }}>
      <div className="card h-full" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="card-content p-0 h-full">
          {selectedUser ? (
            // Message View - Shows messages with selected user
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CometChatMessageHeader
                user={selectedUser}
                onBack={handleBackToConversations}
              />
              <CometChatMessageList user={selectedUser} />
              <CometChatMessageComposer user={selectedUser} />
            </div>
          ) : (
            // Conversation List View
            <CometChatConversations
              onItemClick={handleConversationClick}
            />
          )}
        </div>
      </div>

      {/* Floating Action Button - Only show in conversation list view */}
      {!selectedUser && (
        <button
          onClick={() => setShowUserList(true)}
          className="btn btn-primary"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            padding: 0,
            zIndex: 1000,
            boxShadow: '8px 8px 16px hsl(302, 19%, 82%), -8px -8px 16px hsl(302, 19%, 98%)',
          }}
          title="Start new chat"
        >
          +
        </button>
      )}

      {/* User List Modal */}
      {showUserList && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
          onClick={() => setShowUserList(false)}
        >
          <div
            className="card"
            style={{
              width: '90%',
              maxWidth: '500px',
              height: '80vh',
              maxHeight: '600px',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-content p-0 h-full flex flex-col">
              {/* Modal Header */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h2 className="text-xl font-bold text-foreground">Start New Chat</h2>
                <button
                  onClick={() => setShowUserList(false)}
                  className="btn btn-ghost"
                  style={{
                    width: '32px',
                    height: '32px',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                  title="Close"
                >
                  ×
                </button>
              </div>

              {/* User List */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <CometChatUsers
                  onItemClick={handleUserSelect}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
