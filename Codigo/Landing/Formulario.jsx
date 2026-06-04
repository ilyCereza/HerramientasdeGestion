

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Formulario() {

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    area: "",
    mensaje: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error

  // 📌 Manejar cambios
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 📌 Validación
  const validate = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Correo no válido";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Este campo es obligatorio";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje no puede estar vacío";
    }

    return newErrors;
  };

  // 📌 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setStatus(null);

    emailjs.send(
      "service_kidnrmh",
      "template_uyvkbho",
      formData,
      "u76bYiCTHtHrQ44vp"
      
    )
    .then(() => {
      setStatus("success");
      setFormData({
        nombre: "",
        email: "",
        area: "",
        mensaje: ""
      });
    })
    .catch(() => {
      setStatus("error");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="z-1 relative lg:px-12 *:w-full flex flex-wrap items-center gap-8 w-full h-full text-lg p-4 lg:p-0 mr-8 lg:mr-0 border-r-4 lg:border-r-0 border-red-400/30">

      <h3 className="text-4xl font-bold text-center w-full h-fit relative">Formulario</h3>

      {/* Nombre */}
      <div>
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          type="text"
          maxLength="40"
          placeholder="Nombre completo:"
          className="bg-white border-aqua border-2 p-2 rounded-md text-sm w-full"
        />
        {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="text"
          maxLength="40"
          placeholder="Correo de contacto:"
          className="bg-white border-aqua border-2 p-2 rounded-md text-sm w-full"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Área */}
      <div>
        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
          type="text"
          maxLength="40"
          placeholder="Área de interés:"
          className="bg-white border-aqua border-2 p-2 rounded-md text-sm w-full"
        />
        {errors.area && <p className="text-red-500 text-xs">{errors.area}</p>}
      </div>

      {/* Mensaje */}
      <div>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          className="bg-white border-aqua border-2 p-2 rounded-md min-h-32 text-sm w-full"
          placeholder="Mensaje:"
          maxLength="200"
        />
        {errors.mensaje && <p className="text-red-500 text-xs">{errors.mensaje}</p>}
      </div>

      {/* Botón */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="btn bg-aqua border-none text-grey/80 px-8 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {/* Mensajes */}
      {status === "success" && (
        <p className="text-green-500 text-center w-full">
            Información enviada correctamente.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-500 text-center w-full">
            Hubo un error, intenta más tarde.
        </p>
      )}

    </form>
  );
}