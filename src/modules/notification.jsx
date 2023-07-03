import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function notification(message, color) {
    return (
        toast({
            text: message,
            duration: 2500,
            newWindow: true,
            close: true,
            gravity: "top", //
            position: "center", //
            backgroundColor: color,
            stopOnFocus: true, // 
        }).showToast()
    )
}

export default notification