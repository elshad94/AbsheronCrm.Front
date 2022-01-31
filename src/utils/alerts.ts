import Swal from 'sweetalert2';

const errorAlert = (text: string, heading?: string) => {
    return Swal.fire(
        heading ?? 'Error!',
        text,
        'error'
    );
};

const successAlert = (text: string, heading?: string) => {
    return Swal.fire(
        heading ?? 'Success!',
        text,
        'success'
    );
};

const infoAlert = (text: string, heading?: string) => {
    return Swal.fire(
        heading ?? 'Info!',
        text,
        'info'
    );
};

export {
    errorAlert,
    successAlert,
    infoAlert
};
