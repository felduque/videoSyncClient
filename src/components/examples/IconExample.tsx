'use client'

import { DynamicIcon } from "@/components/ui/dynamic-icon"

/**
 * Componente de ejemplo que muestra diferentes formas de usar el componente DynamicIcon
 */
export function IconExample() {
  // Lista de iconos para mostrar como ejemplo
  const iconNames = [
    "Video",
    "Music",
    "Film",
    "Image",
    "FileVideo",
    "Cast",
    "Youtube"
  ]

  return (
    <div className="p-4">
      <h2 className="mb-4 font-bold text-xl">Ejemplos de uso de DynamicIcon</h2>
      
      <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
        {/* Ejemplo básico */}
        <div className="flex flex-col items-center p-3 border rounded-md">
          <DynamicIcon name="Video" />
          <span className="mt-2 text-sm">Básico</span>
        </div>

        {/* Ejemplo con tamaño personalizado */}
        <div className="flex flex-col items-center p-3 border rounded-md">
          <DynamicIcon name="Music" size={48} />
          <span className="mt-2 text-sm">Tamaño: 48px</span>
        </div>

        {/* Ejemplo con clases personalizadas */}
        <div className="flex flex-col items-center p-3 border rounded-md">
          <DynamicIcon 
            name="Film" 
            iconClassName="text-blue-500" 
            className="bg-blue-100 p-2 rounded-full"
          />
          <span className="mt-2 text-sm">Personalizado</span>
        </div>

        {/* Ejemplo con fallback */}
        <div className="flex flex-col items-center p-3 border rounded-md">
          <DynamicIcon 
            name="IconoInexistente" 
            fallback="AlertCircle"
            iconClassName="text-red-500"
          />
          <span className="mt-2 text-sm">Con fallback</span>
        </div>
      </div>

      {/* Galería de iconos */}
      <h3 className="mt-8 mb-4 font-semibold text-lg">Galería de iconos</h3>
      <div className="gap-4 grid grid-cols-3 md:grid-cols-7">
        {iconNames.map((name) => (
          <div key={name} className="flex flex-col items-center hover:bg-gray-100 p-3 border rounded-md transition-colors">
            <DynamicIcon name={name} size={32} />
            <span className="mt-2 text-xs text-center">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}