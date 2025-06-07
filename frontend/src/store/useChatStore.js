import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';


export const useChatStore = create((set , get) => ({
    messages: [],
    users: [],
    selectedUser: null , 
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({isUsersLoading: true});
        try {
            const response = await axiosInstance.get('/messages/users');
            set({users: response.data});
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error(error.response.data.message || 'Failed to fetch users');
        } finally {
            set({isUsersLoading: false});
        }
    },
    
    getMessages: async(userId) => {
        set({ isMessagesLoading: true});
        try{
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data});
        }catch(error){
            console.error("Error fetching messages:", error);
            toast.error(error.response?.data?.message || 'Failed to fetch messages');
        } finally{
            set({ isMessagesLoading: false });
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    sendMessage: async(messageData) => {
        const { selectedUser, messages } = get();
        try{    
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, response.data] });
        }catch(error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || 'Failed to send message');
        }
    },

    subscribeToMessages: () => {
        const { selectedUser} = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMesaageSentFromSelectedUser = newMessage.senderId === selectedUser._id ;
            if (!isMesaageSentFromSelectedUser) {
                return; // Ignore messages not related to the selected user
            }
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

}));