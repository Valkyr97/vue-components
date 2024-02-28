export const orderStateTranslator = (state: string) => {
    switch (state) {
        case 'PAYED':
            return 'Pagada'
    
        case 'PENDING_PAYMENT':
            return 'Pendiente de Pago'
        
        case 'CANCELLED':
            return 'Cancelada'
        
        case 'FULFILLED':
            return 'Completada'
            
        default:
            break;
    }
}