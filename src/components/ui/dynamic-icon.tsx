'use client'

import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"

export interface DynamicIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Nombre del ícono de Lucide React
   */
  name: string
  /**
   * Tamaño del ícono
   */
  size?: number
  /**
   * Ícono por defecto si no se encuentra el ícono especificado
   */
  fallback?: keyof typeof Icons
  /**
   * Clases CSS adicionales para el ícono
   */
  iconClassName?: string
}

/**
 * Componente que renderiza dinámicamente un ícono de Lucide React
 */
export function DynamicIcon({
  name,
  size = 24,
  fallback = "Cast",
  className,
  iconClassName,
  ...props
}: DynamicIconProps) {
  // Obtener el componente de ícono de Lucide React
  const LucideIcon = (Icons[name as keyof typeof Icons] || Icons[fallback]) as React.ElementType

  return (
    <div className={cn(className)} {...props}>
      <LucideIcon className={cn("text-primary", iconClassName)} width={size} height={size} />
    </div>
  )
}