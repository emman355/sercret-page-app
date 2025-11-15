'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface Message {
  id: string;
  content: string;
}

interface SecretMessageContextType {
  messages: Message[];
  loading: boolean;
  error: string | null;
  setError: (msg: string | null) => void;
  messageId: string | null;
  newSecretMessage: string;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  addSecretMessage: (content: string) => Promise<void>;
  setNewSecretMessage: (msg: string) => void;
  handleEditClick: (id: string) => void;
  handleSaveSecret: (message: string) => Promise<void>
  handleCancelEdit: () => void
  refreshMessages: () => Promise<void>;
  isSaving: boolean;
}

const SecretMessageContext = createContext<SecretMessageContextType | undefined>(undefined);

export const SecretMessageProvider = ({ children }: { children: ReactNode }) => {
  const [messageId, setMessageId] = useState<string | null>(null);
  const [newSecretMessage, setNewSecretMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving] = useState(false);

  const handleEditClick = (id: string) => {
    setMessageId(id);
    setSaveStatus('idle');
  };

  const addSecretMessage = async (content: string) => {
    try {
      const response = await fetch('/api/secret-message', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Failed to add message');
      await refreshMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleSaveSecret = async (message: string) => {
    setSaveStatus('saving');
    setError(null);

    try {
      const response = await fetch('/api/secret-message', {
        method: 'PUT',
        body: JSON.stringify({ id: messageId, content: message }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Failed to update message.');

      setSaveStatus('saved');
      setNewSecretMessage('');
      setMessageId(null);
      await refreshMessages();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setSaveStatus('error');
    }
  };


  const handleCancelEdit = () => {
    setMessageId(null);
    setNewSecretMessage('');
  };
  const refreshMessages = useCallback(
    async () => {
      try {
        const response = await fetch('/api/secret-message');
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Failed to fetch messages');
        setMessages(result.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }, [])


  useEffect(() => {
    refreshMessages();
  }, [refreshMessages]);

  return (
    <SecretMessageContext.Provider
      value={{
        messages,
        loading,
        error,
        messageId,
        newSecretMessage,
        saveStatus,
        addSecretMessage,
        setNewSecretMessage,
        handleEditClick,
        handleSaveSecret,
        handleCancelEdit,
        refreshMessages,
        isSaving,
        setError,
      }}
    >
      {children}
    </SecretMessageContext.Provider>
  );
};

export const useSecretMessageContext = () => {
  const context = useContext(SecretMessageContext);
  if (!context) throw new Error('useSecretMessageContext must be used within a SecretMessageProvider');
  return context;
};
