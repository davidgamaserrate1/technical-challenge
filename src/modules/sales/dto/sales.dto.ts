
export class CreateSaleDto {
    date: string; 
    total_price:number; 
    customer_id: number;  
    user_id: number;  
}

export class UpdateSaleDto {
    date?: string; 
    total_price?:number; 
    customer_id?: number;  
}

export class SaleDto{
    id: number;
    date: string;
    total_price :number;
    customer: {
        id: number;
        name: string;
        addres: string;
        city: string;
        state: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
        active: boolean
    }
}