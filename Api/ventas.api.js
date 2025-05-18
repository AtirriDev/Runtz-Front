import { API } from "./api.js";


export const CargarVenta = async (venta) => {
    try {
        const res = await fetch(`${API}/Ventas/add`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta) 
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}