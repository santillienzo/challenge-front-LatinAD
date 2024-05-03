import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = {
  [k:string]: string
}

const useLoginForm = () => {
  //Declaramos el state que almacenará los valores del formulario
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  //Declaramos el state que almacenará los errores que tengamos en el form
  const [errors, setErrors] = useState<Errors>({}) 
  const isFirstInput = useRef(true)

  //Función para enviar el formulario
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email !== "" && values.password !== "") {
      //
    }
  };

    //Manejo de cambios en los campos del formulario
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    /*
      Función encargada de validar los campos del formulario
      - Utilizamos useCallback para que la función no se vuelva a crear cada vez que el componente se renderice 
    */
    const validateFields = useCallback(()=>{
      //Destructuramos los valores
      const {email} = values
      const emailIsEmpty = email === ''
      const emailIsInvalid = !emailRegex.test(email)

      //Si es la primera vez que ejecutamos la app no vamos a ejecutar el control de errores
      if (isFirstInput.current) {
        //Cambios el valor de isFirstInput siguiendo el valor del email, si se escribe cambia a false
        isFirstInput.current = emailIsEmpty
      }

      //Teniendo en cuenta que en el bloque anterior isFirstInput cambió, realizamos la validación de nuevo
      if (isFirstInput.current) {
        return
      }
      
      if (emailIsEmpty) {
        setErrors((prev) => ({
          ...prev,
          email: "El email es obligatorio"
        }))
      } else if (emailIsInvalid) {
        setErrors((prev) => ({
          ...prev,
          email: "No es un email válido"
        }))
      } else{
        //Si no hay errores eliminamos el error del email
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
  
    }, [values])
  
    //Efecto que llama a la validación del form
    useEffect(() => {
      validateFields();
    }, [values.email, validateFields]);

  return {values, onChange, onSubmit, errors}
}

export default useLoginForm