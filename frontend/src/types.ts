export interface Operation {
    id: string;
    name: string;
    number: number;
    suboperations: Suboperation[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  
  export interface Suboperation {
    id: string;
    name: string;
    number: number;
    operation_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  