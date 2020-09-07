import {authenticatedPost} from './apiService';

const InquiryService = {
    requestReservation: (data) => {
        return authenticatedPost('/api/inquiries/', data);
    }
}

export default InquiryService;