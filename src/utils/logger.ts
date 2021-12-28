const info = (...params: unknown[]) => {
    console.log('INFO\t', params);
};

const error = (...params: unknown[]) => {
    console.error('ERROR\t', params);
};

const warning = (...params: unknown[]) => {
    console.warn('WARNING\t', params);
};

const logger = {
    info, error, warning
};

export default logger;