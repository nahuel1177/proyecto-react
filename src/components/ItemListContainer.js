import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Notiflix from 'notiflix';
import ItemList from "./ItemList";

const ItemListContainer = () => {

    const [products, setProducts] = useState([])
    const params = useParams()

    useEffect(() => {

        //toast.info("Cargando Productos...")
        let filter

        const productsCollection = collection(db, "products")
        
        if(!params.categoria){
            filter = productsCollection
        }else{
            filter = query(productsCollection, where('type', '==', params.categoria))
        }
        
        const pedido = getDocs(filter)
        console.log(pedido)
        pedido
            .then((respuesta) => {

                const items = respuesta.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                setProducts(items)
                //toast.dismiss()
                //toast.success("Productos cargados!")
                console.log("Productos Cargados")
            })
            .catch((error) => {
                
                Notiflix.Notify.failure("Error al cargar productos!")
                console.log("Error Notificacion")
            })

    }, [params.categoria, products])

    return (

        <div className="row row-cols-1 row-cols-md-3 g-4" id="product-container">

            <ItemList productos={products} />

        </div>

    )
}

export default ItemListContainer;