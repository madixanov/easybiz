export interface OutgoingInterface {
    name: string,
    email: string,
    phone: string,
    messages: string,
    surname: string
}

export interface ChatMessage {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
}

export interface ChatClient {
    id: string;
    image: string;
    username: string;
}

export interface ChatItem {
    id: string;
    clientId: string;
    client: ChatClient;
    messages: ChatMessage[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface Sender {
    id: string;
    username: string;
    role: any;
    image: string;
}

export interface Message {
    id: string;
    content: string;
    createdAt: string;
    isRead: boolean;
    mediaUrl: string;
    senderId: string;
    sender: Sender;
    sessionId: string;
}

interface Favorite {
    id: string;
    content: string;
    createdAt: string;
    isRead: boolean;
    mediaUrl?: string;
    senderId: string;
    sender: {
        id: string;
        username: string;
        role?: string;
        image?: string;
    };
    sessionId: string;
    session: {
        id: string;
        clientId: string;
        adminId: string;
        status: string;
        createdAt: string;
    };
}

export interface SavedChatItem {
    id: string;
    createdAt: string;
    messageId: string;
    message: Favorite;
}
