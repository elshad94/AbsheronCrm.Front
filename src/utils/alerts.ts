import Swal from 'sweetalert2';

const errorAlert = (text: string, heading?: string) => {
    Swal.fire(
        heading ?? 'Error!',
        text,
        'error'
    );
};

const successAlert = (text: string, heading?: string) => {
    Swal.fire(
        heading ?? 'Error!',
        text,
        'success'
    );
};

export {
    errorAlert,
    successAlert
};
