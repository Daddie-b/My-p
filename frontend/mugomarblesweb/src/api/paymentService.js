import axios from 'axios';

export const initiatePayment = async (paymentData) => {
    try {
        const response = await axios.post('https://my-p-backend.onrender.com/api/orders/payment', paymentData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error making payment:', error);
        throw error;
    }
};
