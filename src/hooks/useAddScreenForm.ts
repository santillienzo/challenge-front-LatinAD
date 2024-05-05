import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Errors } from "types/misc";

export const useAddScreenForm = ()=>{

    //Declaramos el state que almacenará los valores del formulario
    const [values, setValues] = useState({
        name: "",
        description: "",
        pricePerDay: "",
        resolutionHeight: "",
        resolutionWidth: "",
        type: 'indoor'
    });
    //Declaramos el state que almacenará los errores que tengamos en el form
    const [inputErrors, setInputErrors] = useState<Errors>({})
    //Validamos un error en particular del form
    const [error, setError] = useState<string | null>(null)

    //Función para enviar el formulario
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, description, pricePerDay, resolutionHeight, resolutionWidth} = values
        //Validamos que no hayan errores
        const hasErrors = Object.keys(inputErrors).length > 0
        //Validamos que los inputs no estén vacios
        const fieldsEmpty = name == '' || description == '' || pricePerDay == '' || resolutionHeight == '' || resolutionWidth == ''

        if (fieldsEmpty) {
            setError("Todos los campos son obligatorios. Por favor completalos.")
            return
        }
        
        setError(null)


        if (!hasErrors) {
            alert("Se ejecutó")
            console.log(values)
            //Ejecutamos el submit
            // login(values, ()=>{
            //     navigation('/')
            // })
        }
    };

    //Limpiamos el error del input
    const clearError = (name:string)=> {
        setInputErrors((prev) => {
            const newErrors = {...prev };
            delete newErrors[name];
            return newErrors;
        });
    }

    const validateInput = (name: string, value: string)=>{
        //Si alguno de los valores es vacío se lanzará un error. 
        if (value === "") {
            setInputErrors((prev) => ({
                ...prev,
                [name]: "El campo es obligatorio."
            }))
        }else {
            //Si no hay errores eliminamos el error del campo
            clearError(name)
        }

        if (name === 'pricePerDay' || name === 'resolutionHeight' || name === 'resolutionWidth') {
            const isPositive = /^\d*\d+$/.test(value) && Number(value) >= 0;

            //Si el número es positivo: 
            if (!isPositive) {
                setInputErrors((prev) => ({
                    ...prev,
                    [name.toString()]: "El valor tiene que ser un número entero positivo."
                }))
            }else{
                //Si no hay errores eliminamos el error del campo
                clearError(name)
            }
        }
    }

    //Manejo de cambios en los campos del formulario
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;

        //Validamos los inputs
        validateInput(name, value)

        //Seteamos los valores
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };





    return {values, onChange, onSubmit, inputErrors, error}
}