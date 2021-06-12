export default function ErrorHandler(error: any): object {
    return {
        success: false,
        message: error.message || 'Unexpected error',
        data: null,
        errors: error
    }
}